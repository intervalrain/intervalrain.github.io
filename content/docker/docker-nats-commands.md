---
title: "[Docker] Docker 指令 以 NATS 為例"
date: 2025-10-05T06:39:57+08:00
tags: ["Docker", "NATS"]
draft: false
Categories: programming
description: "Docker commands collection"
author: "Rain Hu"
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
cover:
    image: "/images/cover.jpg"
    alt: "Oh! You closed up the window, so you cannot see raining"
    relative: false
    hidden: false
---

# Docker NATS Server 指令大全

## 1. 容器生命週期管理

### 創建並啟動容器
```bash
# 基本啟動（無配置文件）
docker run -d \
  --name nats-server \
  -p 4222:4222 \
  -p 8222:8222 \
  nats:latest

# 使用配置文件
docker run -d \
  --name nats-server \
  -p 4222:4222 \
  -p 8222:8222 \
  -v $(pwd)/nats-server.conf:/nats-server.conf \
  nats:latest \
  --config /nats-server.conf

# 啟用 JetStream
docker run -d \
  --name nats-server \
  -p 4222:4222 \
  -p 8222:8222 \
  nats:latest \
  -js

# 完整配置（JetStream + 持久化 + 配置文件）
docker run -d \
  --name nats-server \
  -p 4222:4222 \
  -p 8222:8222 \
  -p 6222:6222 \
  -v $(pwd)/nats-data:/data \
  -v $(pwd)/nats-server.conf:/nats-server.conf \
  nats:latest \
  -js -sd /data --config /nats-server.conf
```

**參數說明：**
- `-d`: 後台運行（detached mode）
- `--name`: 容器名稱
- `-p 4222:4222`: 客戶端連接端口
- `-p 8222:8222`: HTTP 監控端口
- `-p 6222:6222`: 集群路由端口
- `-v`: 掛載卷（volume mount）
- `-js`: 啟用 JetStream
- `-sd`: JetStream 存儲目錄

### 啟動已存在的容器
```bash
docker start nats-server
```

### 停止容器
```bash
# 正常停止（發送 SIGTERM，等待 10 秒）
docker stop nats-server

# 強制停止（發送 SIGKILL）
docker kill nats-server

# 停止並等待指定秒數
docker stop -t 30 nats-server
```

### 重啟容器
```bash
docker restart nats-server
```

### 暫停/恢復容器
```bash
# 暫停（凍結進程）
docker pause nats-server

# 恢復
docker unpause nats-server
```

## 2. 容器查詢與監控

### 查看容器列表
```bash
# 查看運行中的容器
docker ps

# 查看所有容器（包括已停止）
docker ps -a

# 只顯示容器 ID
docker ps -q

# 過濾查看 NATS 容器
docker ps | grep nats
docker ps -a --filter "name=nats"
```

### 查看容器詳細信息
```bash
# 完整信息（JSON 格式）
docker inspect nats-server

# 查看特定字段
docker inspect nats-server --format='{{.State.Status}}'
docker inspect nats-server --format='{{.NetworkSettings.IPAddress}}'
docker inspect nats-server --format='{{.Config.Cmd}}'
docker inspect nats-server --format='{{.HostConfig.PortBindings}}'
```

### 查看容器日誌
```bash
# 查看全部日誌
docker logs nats-server

# 實時跟蹤日誌（類似 tail -f）
docker logs -f nats-server

# 查看最後 100 行
docker logs --tail 100 nats-server

# 顯示時間戳
docker logs -t nats-server

# 查看最近 10 分鐘的日誌
docker logs --since 10m nats-server

# 查看某個時間點之後的日誌
docker logs --since 2025-01-01T00:00:00 nats-server
```

### 查看容器資源使用
```bash
# 查看實時資源使用（CPU、內存、網絡、磁盤）
docker stats nats-server

# 查看所有容器的資源使用
docker stats

# 只顯示一次（不實時更新）
docker stats --no-stream nats-server
```

### 查看容器進程
```bash
docker top nats-server
```

### 查看容器端口映射
```bash
docker port nats-server
```

## 3. 容器交互

### 進入容器
```bash
# 使用 bash（如果容器有 bash）
docker exec -it nats-server bash

# 使用 sh（NATS 容器通常只有 sh）
docker exec -it nats-server sh

# 執行單個命令
docker exec nats-server ps aux
docker exec nats-server ls -la /data
```

### 從容器複製文件
```bash
# 從容器複製到主機
docker cp nats-server:/nats-server.conf ./nats-server.conf
docker cp nats-server:/data ./nats-data

# 從主機複製到容器
docker cp ./nats-server.conf nats-server:/nats-server.conf
```

## 4. 容器刪除與清理

### 刪除容器
```bash
# 刪除已停止的容器
docker rm nats-server

# 強制刪除運行中的容器
docker rm -f nats-server

# 刪除多個容器
docker rm nats-server nats-server-2

# 刪除所有已停止的容器
docker container prune

# 刪除所有容器（危險！）
docker rm -f $(docker ps -aq)
```

## 5. 鏡像管理

### 查看鏡像
```bash
# 列出所有鏡像
docker images

# 查看 NATS 鏡像
docker images | grep nats
```

### 拉取鏡像
```bash
# 拉取最新版本
docker pull nats:latest

# 拉取特定版本
docker pull nats:2.10.7
docker pull nats:2.10.7-alpine

# 拉取所有標籤
docker pull -a nats
```

### 刪除鏡像
```bash
# 刪除指定鏡像
docker rmi nats:latest

# 強制刪除
docker rmi -f nats:latest

# 刪除未使用的鏡像
docker image prune

# 刪除所有未使用的鏡像
docker image prune -a
```

## 6. 網絡管理

### 查看網絡
```bash
# 列出所有網絡
docker network ls

# 查看容器使用的網絡
docker inspect nats-server --format='{{.NetworkSettings.Networks}}'
```

### 創建自定義網絡
```bash
# 創建網絡
docker network create nats-network

# 在自定義網絡中啟動容器
docker run -d \
  --name nats-server \
  --network nats-network \
  -p 4222:4222 \
  nats:latest

# 將現有容器連接到網絡
docker network connect nats-network nats-server

# 斷開網絡連接
docker network disconnect nats-network nats-server
```

## 7. 卷（Volume）管理

### 查看卷
```bash
# 列出所有卷
docker volume ls

# 查看卷詳情
docker volume inspect nats-data
```

### 創建卷
```bash
# 創建命名卷
docker volume create nats-data

# 使用卷啟動容器
docker run -d \
  --name nats-server \
  -v nats-data:/data \
  -p 4222:4222 \
  nats:latest \
  -js -sd /data
```

### 刪除卷
```bash
# 刪除指定卷
docker volume rm nats-data

# 刪除未使用的卷
docker volume prune
```

## 8. Docker Compose 管理

### 創建 docker-compose.yml
```yaml
version: '3.8'

services:
  nats:
    image: nats:latest
    container_name: nats-server
    ports:
      - "4222:4222"  # Client port
      - "8222:8222"  # HTTP monitoring
      - "6222:6222"  # Routing port for clustering
    command: ["-js", "-sd", "/data"]
    volumes:
      - nats-data:/data
      - ./nats-server.conf:/nats-server.conf
    restart: unless-stopped

volumes:
  nats-data:
```

### Docker Compose 指令
```bash
# 啟動服務（後台運行）
docker-compose up -d

# 啟動服務（前台運行，查看日誌）
docker-compose up

# 停止服務（保留容器）
docker-compose stop

# 停止並刪除容器
docker-compose down

# 停止並刪除容器、網絡、卷
docker-compose down -v

# 查看服務狀態
docker-compose ps

# 查看日誌
docker-compose logs
docker-compose logs -f nats

# 重啟服務
docker-compose restart

# 重新構建並啟動
docker-compose up -d --build

# 擴展服務（運行多個實例）
docker-compose up -d --scale nats=3
```

## 9. 實用組合指令

### 快速重建容器
```bash
# 停止、刪除、重新創建
docker stop nats-server && docker rm nats-server && \
docker run -d \
  --name nats-server \
  -p 4222:4222 \
  -p 8222:8222 \
  nats:latest -js
```

### 查看容器完整配置
```bash
docker run --rm nats:latest --help
docker run --rm nats:latest --version
```

### 清理所有 NATS 相關資源
```bash
# 停止並刪除所有 NATS 容器
docker ps -a | grep nats | awk '{print $1}' | xargs docker rm -f

# 刪除 NATS 鏡像
docker images | grep nats | awk '{print $3}' | xargs docker rmi -f

# 刪除 NATS 卷
docker volume ls | grep nats | awk '{print $2}' | xargs docker volume rm
```

## 10. 健康檢查與診斷

### 檢查 NATS 服務是否正常
```bash
# 檢查端口是否開放
docker exec nats-server sh -c "nc -zv localhost 4222"

# 查看 NATS 服務器信息（需要安裝 curl）
curl http://localhost:8222/varz

# 使用 NATS CLI 測試（需要安裝 nats-cli）
docker run --rm -it --network host nats:latest nats-server -v
```

### 導出容器為鏡像
```bash
# 將運行中的容器保存為新鏡像
docker commit nats-server my-nats:v1.0

# 導出鏡像為 tar 文件
docker save -o nats-backup.tar nats:latest

# 從 tar 文件導入鏡像
docker load -i nats-backup.tar
```

## 11. 常用場景

### 開發環境：快速啟動 NATS
```bash
docker run -d --name nats -p 4222:4222 -p 8222:8222 nats:latest -js
```

### 測試環境：臨時容器（退出自動刪除）
```bash
docker run --rm -it -p 4222:4222 nats:latest
```

### 生產環境：持久化 + 配置文件
```bash
docker run -d \
  --name nats-prod \
  --restart=always \
  -p 4222:4222 \
  -p 8222:8222 \
  -p 6222:6222 \
  -v /opt/nats/data:/data \
  -v /opt/nats/nats-server.conf:/nats-server.conf \
  nats:latest \
  -js -sd /data --config /nats-server.conf
```

## 12. 疑難排解

### 容器無法啟動
```bash
# 查看詳細錯誤信息
docker logs nats-server
docker inspect nats-server | grep -i error

# 檢查端口是否被佔用
lsof -i :4222
netstat -an | grep 4222
```

### 容器運行但無法連接
```bash
# 檢查防火牆
sudo iptables -L

# 檢查容器網絡
docker inspect nats-server --format='{{.NetworkSettings.IPAddress}}'

# 測試容器內部連接
docker exec nats-server nc -zv localhost 4222
```

### 性能問題
```bash
# 查看資源限制
docker inspect nats-server --format='{{.HostConfig.Memory}}'
docker inspect nats-server --format='{{.HostConfig.CpuShares}}'

# 設置資源限制
docker run -d \
  --name nats-server \
  --memory="512m" \
  --cpus="1.0" \
  -p 4222:4222 \
  nats:latest
```

---

## 快速參考表

| 操作 | 指令 |
|------|------|
| 創建並啟動 | `docker run -d --name nats -p 4222:4222 nats:latest` |
| 啟動 | `docker start nats-server` |
| 停止 | `docker stop nats-server` |
| 重啟 | `docker restart nats-server` |
| 刪除 | `docker rm -f nats-server` |
| 查看日誌 | `docker logs -f nats-server` |
| 進入容器 | `docker exec -it nats-server sh` |
| 查看狀態 | `docker ps -a | grep nats` |
| 查看資源 | `docker stats nats-server` |
