---
title: "macOS 上 NemoClaw mTLS 修復筆記"
author: "Rain Hu"
pubDatetime: 2026-05-05T17:36:29+08:00
description: "Fix mTLS issue on macOS when onboarding NemoClaw"
tags: ["NemoClaw", "OpenClaw"]
---

# macOS 上 NemoClaw mTLS 修復筆記

## 症狀

```
$ nemoclaw onboard
...
[4/8] Setting up inference provider
Error:   × transport error
  ├─▶ invalid peer certificate: UnknownIssuer
  ╰─▶ invalid peer certificate: UnknownIssuer
```

執行 `nemoclaw list`、`nemoclaw <name> destroy`、`openshell status` 時也會出現相同錯誤。

## 根本原因

NemoClaw 的 CLI 透過 **mTLS(雙向 TLS， mutual Transport Layer Security)** 與其 OpenShell gateway 溝通，並使用自簽憑證。CLI 將客戶端材料保存於:

```
~/.config/openshell/gateways/<gateway>/mtls/
├── ca.crt    ← CLI 信任的 CA
├── tls.crt   ← CLI 自身的客戶端憑證
└── tls.key   ← CLI 自身的客戶端金鑰
```

cluster 內存在 **兩個不同的 CA**:

| Cluster Secret | 用途 |
|---|---|
| `openshell-client-ca`(位於 `openshell-client-tls`) | 簽發 CLI 客戶端憑證(mTLS 認證方向:client → server) |
| `openshell.openshell.svc.cluster.local`(位於 `openshell-server-tls`) | Server 自簽憑證(mTLS 驗證方向:client 信任 server) |

NemoClaw 進行 onboard 時，CLI 的 `ca.crt` 應該要同時包含 **兩個 CA**。但在我們這次的安裝中，只存在 client CA — 因此 CLI 連線到 server 時無法驗證 server 的自簽憑證，丟出 `UnknownIssuer`。

確切原因尚未明朗(可能是 cluster 重啟時重新產生憑證，也可能是安裝程式的 bug)。但無論如何，修復方式都一樣:重建 `ca.crt`，將兩個 CA 都包含進去。

## 診斷步驟

```bash
# 1. 檢查 server 提供的憑證
openssl s_client -connect 127.0.0.1:8080 < /dev/null 2>/dev/null \
  | openssl x509 -subject -issuer -noout
# subject=CN=openshell.openshell.svc.cluster.local
# issuer =CN=openshell.openshell.svc.cluster.local   ← 自簽

# 2. 檢查 CLI 信任的 CA
openssl x509 -in ~/.config/openshell/gateways/nemoclaw/mtls/ca.crt -subject -noout
# subject=CN=openshell-client-ca   ← 不一致 — 這個 CA 並未簽發 server 憑證

# 3. 列出 cluster 中的 secrets
docker exec openshell-cluster-nemoclaw kubectl get secrets -n openshell
# openshell-client-tls    Opaque (3 fields)
# openshell-server-tls    kubernetes.io/tls (2 fields)
# ...
```

## 修復方式

重建 `ca.crt`，使其同時包含 client CA(保留)與 server 憑證:

```bash
cd ~/.config/openshell/gateways/nemoclaw/mtls

# 先備份目前狀態
cp ca.crt ca.crt.bak

# 從 cluster 取出 server 憑證
docker exec openshell-cluster-nemoclaw kubectl get secret openshell-server-tls \
  -n openshell -o jsonpath='{.data.tls\.crt}' | base64 -d > server.crt

# 串接:保留現有 client CA + 加入 server 憑證
cat ca.crt.bak server.crt > ca.crt
```

驗證:

```bash
$ openssl crl2pkcs7 -nocrl -certfile ca.crt | openssl pkcs7 -print_certs -noout
subject=CN=openshell-client-ca
issuer =CN=openshell-client-ca

subject=CN=openshell.openshell.svc.cluster.local
issuer =CN=openshell.openshell.svc.cluster.local
```

測試:

```bash
$ openshell status -g nemoclaw
Server Status
  Gateway: nemoclaw
  Server:  https://127.0.0.1:8080
  Status:  Connected           ← 原本是 UnknownIssuer
  Version: 0.0.36
```

## 為什麼 `NODE_TLS_REJECT_UNAUTHORIZED=0` 沒有效果

這個環境變數只會在 **Node.js** 中停用 TLS 驗證。但這次的 TLS 錯誤是由 Rust binary `openshell` 拋出的(從 eyre 風格的 `× ├─▶ ╰─▶` 排版可以看出)。Rust 的 `rustls` 並不會理會 Node.js 的環境變數。`openshell` 也沒有 `--insecure` 旗標可用，因此 CA bundle 必須要正確。

## 必要環境設定

`openshell` 預期 Docker socket 位於 `/var/run/docker.sock`。但在 macOS Docker Desktop 上，實際 socket 位於 `~/.docker/run/docker.sock`，因此需要設定:

```bash
export DOCKER_HOST=unix:///Users/$USER/.docker/run/docker.sock
```

加入 `~/.zshrc` 以便永久生效。
