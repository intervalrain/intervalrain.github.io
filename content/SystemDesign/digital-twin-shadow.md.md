---
title: "[System Design] Digital Twin Shadow 設計：高頻場景下如何確保 Desired / Reported 的順序性"
date: 2026-04-09T20:35:38+08:00
keywords: ["System Design"]
description: ""
tags: ["System Design"]
draft: false
Categories: ["programming", "system design"]
author: ["Rain Hu"]
showToc: true
TocOpen: true
math: true
mermaid: true
hidemeta: false
canonicalURL: "https://intervalrain.github.io/"
disableHLJS: true
disableShare: true
disableHLJS: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowCodeCopyButtons: true
---
以下是整理好的 Markdown，已經把你整個問題（高頻 + reorder + retry）提升到 production-grade 設計層級 👇

---

## 問題背景

在 Digital Twin（Shadow）架構中，常見資料流：

```text
Client → Desired State → Shadow → Device → Reported State → Shadow
```

在**高頻更新（high throughput）**場景下，會出現以下問題：

### 典型錯誤情境

```text
時間序：
A → B → C

實際處理順序（因 async / retry / DB latency）：
A → C → B
```

如果系統沒有設計保護機制，最終資料可能變成：

```text
C 被 B 覆蓋（狀態倒退）
```

**State Regression（狀態回滾）**

---

## ⚠️ 問題本質

這不是單純「DB 太慢」的問題，而是：

> **Distributed System 無法保證順序（ordering），只能保證單調性（monotonicity）**

### 主要來源：

* 非同步處理（async / parallel）
* message retry（timeout / at-least-once delivery）
* multi-instance（水平擴展）
* DB write latency

---

## 常見但錯誤的解法

### 1. In-memory mutex / queue（per-device）

```text
device → queue → single worker
```

#### 問題：

* ❌ 無法跨 instance（multi-node 失效）
* ❌ crash 後順序破壞
* ❌ retry 無法處理
* ❌ 不能防止舊資料覆蓋新資料

---

### 2. 使用 traceId 判斷順序

```text
traceId: UUID
```

#### 問題：

* ❌ 無法比較新舊
* ❌ 只能做 dedup，不能做 ordering

---

### 3. 使用 timestamp

```text
timestamp: now()
```

#### 問題：

* ❌ clock skew（多機時間不同步）
* ❌ 無法保證全域順序

---

## 正確設計核心：Version + CAS（Compare-And-Set）

### 核心原則

> **不要試圖保證順序，而是保證「舊資料無法覆蓋新資料」**

---

## 解法一：Version 控制（必要）

### 資料模型

```sql
shadow(
  device_id,
  version,
  desired_state,
  reported_state
)
```

---

### 更新邏輯（CAS）

```sql
UPDATE shadow
SET desired_state = ?, version = ?
WHERE device_id = ?
AND version < ?
```

---

### 特性

* ✔ 防止 state regression
* ✔ 不怕 reorder
* ✔ 不怕 retry
* ✔ 支援 multi-instance

---

## 解法二：Server-side Version（當 client 沒有 version）

如果 client 沒提供 version：

### ✔ 作法

```text
server 為每個 device 維護單調遞增 version
```

---

### 實作方式

#### 方法 1：DB sequence（per device）

```sql
SELECT nextval('device_123_seq');
```

#### 方法 2：Redis INCR

```text
INCR device:{id}:version
```

---

### ⚠️ 注意

> server 無法還原「client 原始順序」，只能保證「處理順序一致」

---

## 解法三：Idempotency（去重）

### 使用 traceId

```json
{
  "traceId": "uuid"
}
```

---

### 實作

#### 方法 1：DB unique constraint

```sql
INSERT INTO processed(trace_id) VALUES (?)
```

#### 方法 2：Redis

```text
SETNX trace:{id}
```

---

### 目的

* ✔ 避免 retry 重複寫入
* ✔ 保證操作只執行一次

---

## 解法四：Flow Control（可選優化）

### 1. Per-device queue（非必要）

```text
device → queue → worker
```

#### 用途：

* 降低 DB contention
* 平滑流量

⚠️ **不能當作 correctness 保證**

---

### 2. Debounce / Coalescing

```text
A → B → C → D（短時間內）
```

只保留：

```text
D（latest）
```

#### 用途：

* 降低寫入頻率
* 適合 IoT 高頻更新

---

## 推薦架構（Production）

```text
NATS / MQ
   ↓
ShadowAgent
   ├─ Dedup (traceId)
   ├─ Assign Version (per-device)
   ├─ (optional) Queue / Debounce
   ↓
DB (CAS update)
```

---

## 設計轉變（關鍵思維）

### 錯誤觀念

```text
後送的資料 = 新的資料
```

---

### 正確觀念

```text
只有 version 大的資料 = 新的資料
```

---

## 進階設計（可選）

### 1. Event Sourcing

```text
append-only log
→ materialized view
```

---

### 2. Logical Clock（如果 client 可配合）

```json
{
  "logicalTs": 123
}
```

* Lamport Clock
* Vector Clock

---

### 3. Shadow State 分離

```text
desired
reported
delta
```

👉 類似 AWS IoT Shadow

---

## 最終結論

> **在 Distributed System 中，順序無法保證，但單調性可以**

---

### 必要條件

* Version（per-device）
* CAS（DB 層保護）

---

### 建議搭配

* Idempotency（traceId）
* Queue（流量控制）
* Debounce（高頻優化）

---

### 不可依賴

* in-memory queue
* timestamp
* traceId 排序

---

## 一句話總結

> **不要試圖讓資料「不亂序」，而是讓亂序也不會出錯**
