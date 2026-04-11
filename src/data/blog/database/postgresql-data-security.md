---
title: "[PostgreSQL] 資料保護機制"
author: "Rain Hu"
pubDatetime: 2026-04-11T15:50:33+08:00
description: "在 PostgreSQL 中透過 Schema 隔離與 Column-Level GRANT 實現資料保護，讓不同角色只能存取該看到的資料。"
tags: ["PostgreSQL", "Database", "Security"]
---

在一般的 PostgreSQL 專案中，所有的 table 都放在預設的 `public` schema 裡。隨著系統規模成長，這種做法會產生幾個問題：

- **任何能連上資料庫的角色，預設都能看到所有 table**
- 機密資料（密碼 hash、API key）和一般業務資料混在一起
- 背景 worker 和前端 API 共用相同的存取範圍，難以限縮權限

PostgreSQL 提供了兩層原生保護機制：
1. **Schema 隔離** — table 級別的存取控制
2. **Column-Level GRANT** — 欄位級別的讀寫控制

---

## 一、Schema 隔離

### 架構設計

將 Schema 分為三層：

| Schema | 用途 | 存取角色 |
|--------|------|----------|
| `public` | 使用者可存取的業務資料 | API server、一般查詢 |
| `private` | 系統機密（users、credentials、tokens） | 僅限特權管理角色 |
| `worker` | 背景非同步任務所需的資源（job queue、排程、log） | 僅限 worker 應用程式 |

```
┌────────────────────────────────────────────┐
│                 PostgreSQL                 │
│                                            │
│  ┌───────────┐ ┌──────────┐ ┌────────────┐ │
│  │  private  │ │  public  │ │   worker   │ │
│  │           │ │          │ │            │ │
│  │ users     │ │ products │ │ jobs       │ │
│  │ api_keys  │ │ orders   │ │ schedules  │ │
│  │ tokens    │ │ posts    │ │ audit_logs │ │
│  │ secrets   │ │ comments │ │ outbox     │ │
│  └───────────┘ └──────────┘ └────────────┘ │
└────────────────────────────────────────────┘
```

### 建立 Schema

```sql
-- 清除預設的 public schema 權限（重要！）
REVOKE ALL ON SCHEMA public FROM PUBLIC;

CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS private;
CREATE SCHEMA IF NOT EXISTS worker;
```

> PostgreSQL 預設會讓所有角色都能存取 `public` schema，必須先 `REVOKE` 才有意義。

### 建立角色與授權

```sql
-- API server 角色：只能看 public
CREATE ROLE api_server LOGIN PASSWORD 'xxx';
GRANT USAGE ON SCHEMA public TO api_server;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api_server;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO api_server;

-- Worker 角色：只能看 worker
CREATE ROLE payment_app LOGIN PASSWORD 'xxx';
GRANT USAGE ON SCHEMA worker TO payment_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA worker TO payment_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA worker
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO payment_app;

CREATE ROLE logistic_app LOGIN PASSWORD 'xxx';
GRANT USAGE ON SCHEMA worker TO logistic_app;
GRANT ALL ON ALL TABLES IN SCHEMA worker TO logistic_app;

CREATE ROLE audit_app LOGIN PASSWORD 'xxx';
GRANT USAGE ON SCHEMA worker TO audit_app;
GRANT SELECT ON ALL TABLES IN SCHEMA worker TO audit_app;  -- 審計只需讀取
```

### 設定 search_path

`search_path` 決定了角色在不加 schema 前綴時，預設去哪裡找 table：

```sql
-- API server 只看得到 public
ALTER ROLE api_server SET search_path = public;

-- Worker 角色只看得到 worker
ALTER ROLE payment_app SET search_path = worker;
ALTER ROLE logistic_app SET search_path = worker;
ALTER ROLE audit_app SET search_path = worker;
```

這樣一來，`payment_app` 連下 `SELECT * FROM users` 都會失敗 — `users` 在 `private` schema，不在它的 `search_path` 裡，也沒有 `USAGE` 權限。

### Private schema 的特殊處理

`private` schema 不授權給任何應用程式角色。如果 `api_server` 需要驗證使用者，透過 **function** 間接查詢：

```sql
CREATE OR REPLACE FUNCTION public.authenticate(
  p_email TEXT,
  p_password TEXT
) RETURNS TABLE(user_id UUID, display_name TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.name
  FROM private.users u
  WHERE u.email = p_email
    AND u.password_hash = crypt(p_password, u.password_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.authenticate TO api_server;
```

`SECURITY DEFINER` 讓 function 以**建立者的權限**執行 — `api_server` 看不到 `private.users`，但能透過這個 function 完成驗證。

---

## 二、Column-Level GRANT

Schema 隔離解決的是「哪些 table 可以看」，但同一張 table 裡，不同角色能操作的**欄位**也應該不同。PostgreSQL 支援欄位級別的 `GRANT`。

### 場景

假設 `public.user` 表結構如下：

```sql
CREATE TABLE public.user (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  password    TEXT NOT NULL,
  member_ranking INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

一個 `visitor` 角色（前端使用者）不應該看到 `email`、`password`，也不能改 `member_ranking`。

### 精確授權

```sql
CREATE ROLE visitor LOGIN PASSWORD 'xxx';
GRANT USAGE ON SCHEMA public TO visitor;

-- 只能讀 id, name, member_ranking
-- 只能改 name
GRANT
    SELECT(id, name, member_ranking),
    UPDATE(name)
ON
    public.user
TO
    visitor;
```

這樣 visitor 的行為被精確限制：

```sql
-- OK
SELECT id, name, member_ranking FROM public.user;

-- ERROR: permission denied for column "email"
SELECT email FROM public.user;

-- ERROR: permission denied for column "member_ranking"
UPDATE public.user SET member_ranking = 99 WHERE id = '...';

-- OK
UPDATE public.user SET name = 'New Name' WHERE id = '...';
```

### 搭配不同角色

| 角色 | SELECT | UPDATE | INSERT | DELETE |
|------|--------|--------|--------|--------|
| `visitor` | `id, name, member_ranking` | `name` | - | - |
| `api_server` | 全部 | `name, email` | 全部 | - |
| `db_admin` | 全部 | 全部 | 全部 | 全部 |

```sql
-- api_server 可以讀取全部，但只能更新 name 和 email
GRANT SELECT ON public.user TO api_server;
GRANT UPDATE(name, email) ON public.user TO api_server;
GRANT INSERT ON public.user TO api_server;
```

---

## 三、Row-Level Security（RLS）

前兩節的 Schema 隔離與 Column-Level GRANT 都是**靜態**的 — 角色建立後，權限就固定了。但有些場景需要**動態**判斷：

> 「使用者 A 只能看到自己的訂單，不能看到使用者 B 的。」

這就是 RLS 的用途：在每次 transaction 發起時，**實時驗證**當前角色對每一 row 的 CRUD 權限。

### 啟用 RLS

```sql
-- 啟用 RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 強制 table owner 也受 RLS 限制（預設 owner 不受限）
ALTER TABLE public.orders FORCE ROW LEVEL SECURITY;
```

### 定義 Policy

```sql
-- visitor 只能看到自己的訂單
CREATE POLICY orders_select ON public.orders
    FOR SELECT
    TO visitor
    USING (user_id = current_setting('user_id')::UUID);

-- visitor 只能更新自己的訂單
CREATE POLICY orders_update ON public.orders
    FOR UPDATE
    TO visitor
    USING (user_id = current_setting('user_id')::UUID);

-- visitor 只能刪除自己的訂單
CREATE POLICY orders_delete ON public.orders
    FOR DELETE
    TO visitor
    USING (user_id = current_setting('user_id')::UUID);

-- visitor 新增訂單時，user_id 必須是自己
CREATE POLICY orders_insert ON public.orders
    FOR INSERT
    TO visitor
    WITH CHECK (user_id = current_setting('user_id')::UUID);
```

`current_setting('user_id')` 會從當前 transaction 的設定中取值，這個值由應用層在每次 request 時注入。

### 應用層注入 Session Context

以 PostGraphile / GraphQL 為例，在每個 request 進入時，將使用者身份寫入 transaction 設定：

```js
pgSettings: async (req) => {
    const user_id = await getCookie(req.headers["x-session"]);
    return {
        role: "visitor",
        "user_id": user_id,
    };
},
```

對應到 PostgreSQL 層面，這等同於在 transaction 開始時執行：

```sql
BEGIN;
SET LOCAL role = 'visitor';
SET LOCAL user_id = 'abc-123-def';

-- 接下來所有查詢都受 RLS policy 約束
SELECT * FROM public.orders;
-- 只會回傳 user_id = 'abc-123-def' 的 rows

COMMIT;
```

### 效能考量：Security vs Performance 的取捨

RLS 是動態的，代價也是動態的。有幾個效能節點需要注意：

**1. Connection Pool 與角色綁定**

PostgreSQL 的 connection pool（如 PgBouncer）中的 connection 是跟角色綁定的 — 同一個 connection 只能在**同一個 role** 中重用。如果每個使用者都用不同角色：

```
visitor_alice → 需要自己的 connection
visitor_bob   → 不能重用 alice 的 connection
```

新角色會需要**冷啟動**一個新 connection，導致 pool 效率下降。

**2. 實務上的折衷做法**

| 做法 | 安全性 | Pool 效率 | 適用場景 |
|------|--------|-----------|---------|
| 每個使用者一個 role | 最高 | 最低 | 使用者數量少（如內部系統） |
| **共用 role + `SET LOCAL`** | **高** | **高** | **多數 Web 應用** |
| 不用 RLS | 低 | 最高 | 信任應用層的 WHERE 過濾 |

推薦的做法是**共用少量角色**（如 `visitor`、`api_server`），搭配 `SET LOCAL` 在 transaction 內注入使用者身份。這樣：
- Connection pool 只需要維護少量角色的 connections（pool 效率高）
- RLS policy 透過 `current_setting()` 取得使用者身份（安全性不打折）

```sql
-- PgBouncer pool 裡只有 visitor 角色的 connections
-- 每個 transaction 透過 SET LOCAL 區分使用者
BEGIN;
SET LOCAL user_id = 'alice-uuid';   -- 不切換角色，只設定 context
SELECT * FROM public.orders;         -- RLS 根據 user_id 過濾
COMMIT;
-- connection 歸還 pool，下一個 request 可以重用
```

**3. Query Plan Cache**

RLS policy 中的 `current_setting()` 是 **stable function** — PostgreSQL 不會對它做 plan cache 跨 transaction 重用，每次都會重新評估。這意味著 RLS 的 query plan 無法像靜態 WHERE 一樣被完美 cache，但在大多數場景下影響微乎其微。

---

## 為什麼要這樣做？

### 1. 最小權限原則（Principle of Least Privilege）

每個角色只能存取它需要的資料。即使 `api_server` 被 SQL injection 攻擊，攻擊者也無法：
- 讀取 `private.users` 的密碼 hash（Schema 隔離）
- 透過 `visitor` 角色偷看 `email` 欄位（Column-Level GRANT）
- 操作 `worker.jobs` 來觸發非預期的背景任務

### 2. 爆炸半徑控制（Blast Radius）

| 沒有保護機制 | 三層保護 |
|---|---|
| 攻擊者可存取所有 table 的所有欄位 | Schema 隔離：只能存取被授權的 schema |
| 可以讀取使用者密碼 | Column GRANT：只能讀寫被授權的欄位 |
| 可以看到其他使用者的資料 | RLS：只能看到自己的 row |

### 3. 職責分離（Separation of Concerns）

- **Schema 層**：不同團隊各自管理自己的 schema，減少 migration 衝突
- **Column 層**：前端能看到什麼欄位，由 DB 層決定，不依賴應用程式過濾
- **審計時**：透過 `information_schema.column_privileges` 可以查看完整的權限矩陣

### 4. 三層保護的定位

| 做法 | 複雜度 | 防護粒度 | 效能影響 | 判斷時機 |
|------|--------|---------|---------|---------|
| **Schema 隔離** | 低 | Table 級別 | 零 | 靜態（角色建立時） |
| **Column-Level GRANT** | 中 | 欄位級別 | 零 | 靜態（角色建立時） |
| **Row-Level Security** | 高 | Row 級別 | 微量 | **動態（每次 transaction）** |

前兩層是靜態配置，設定後不需要額外運算。RLS 是動態的，每次查詢都會評估 policy，但換來的是 row 級別的精確控制。根據系統需求選擇合適的層級，或三層組合使用。

---

## 常見問題

### 跨 Schema 查詢怎麼辦？

建立 **View** 在 `public` schema，只暴露必要欄位：

```sql
CREATE VIEW public.order_summary AS
SELECT o.id, o.total, u.name AS customer_name
FROM public.orders o
JOIN private.users u ON o.user_id = u.id;

GRANT SELECT ON public.order_summary TO api_server;
```

### 和 ORM 相容嗎？

主流 ORM 都支援 schema：
- **Entity Framework**：`[Table("orders", Schema = "public")]`
- **Prisma**：`@@schema("public")`
- **SQLAlchemy**：`__table_args__ = {"schema": "public"}`

搭配 `search_path` 設定，多數情況下 ORM 不需要額外修改。

## 小結

PostgreSQL 原生提供三層遞進的資料保護機制：

1. **Schema 隔離**（`public` / `private` / `worker`）— 控制誰能看到哪些 table
2. **Column-Level GRANT** — 控制誰能讀寫哪些欄位
3. **Row-Level Security** — 控制誰能存取哪些 row

前兩層是靜態的，零效能成本，適合在系統早期就建立。第三層是動態的，需要在安全性與效能之間取得平衡 — 推薦用**共用角色 + `SET LOCAL`** 的方式，兼顧 connection pool 效率與 row 級別的存取控制。
