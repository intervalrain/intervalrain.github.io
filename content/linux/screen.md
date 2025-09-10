---
title: "[Linux] Screen command summary"
date: 2025-09-10T11:10:58+08:00
tags: ["Linux", "Screen"]
draft: false
Categories: Linux     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "A simple summary of screen command in linux"
author: "Rain Hu"
showToc: true
TocOpen: true
math: true                  # KaTex or not
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


## 🖥 基本操作

* **啟動新的 session**

  ```bash
  screen -S mysession
  ```

  `-S` 指定一個名字（例如 *mysession*），方便管理。

* **退出並結束 session**

  ```bash
  exit
  ```

  或在 screen 裡 **Ctrl+D**。

---

## 🔄 分離 / 重連

* **分離 (detach，不結束程式)**

  ```text
  Ctrl+A 然後按 D
  ```

  這樣程式繼續跑，你可以安全登出 SSH。

* **列出所有 session**

  ```bash
  screen -ls
  ```

  會看到類似：

  ```
  1234.mysession (Detached)
  ```

* **重新連線**

  ```bash
  screen -r 1234
  ```

  或者如果只有一個 session：

  ```bash
  screen -r
  ```

* **強制把別人佔用的 session 拉過來**

  ```bash
  screen -d -r 1234
  ```

  (`-d` 先 detach，`-r` 再 reattach)

---

## 🔧 控制現有 session

* **在現有 session 上送指令**

  ```bash
  screen -X -S mysession quit
  ```

  (`-X` = 執行命令，`-S` = 指定 session 名稱)

* **直接殺掉 session**

  ```bash
  screen -X -S mysession quit
  ```

  或

  ```bash
  kill 1234
  ```

  (1234 是 `screen -ls` 裡的 PID)

---

## 📑 多視窗操作（在同一個 session 裡）

* **開新視窗**
  `Ctrl+A c`

* **切換視窗**
  `Ctrl+A n` → 下一個
  `Ctrl+A p` → 上一個
  `Ctrl+A "` → 列出視窗選單

* **改視窗名稱**
  `Ctrl+A A`

---

## 📝 快速總結

* `screen -S name` → 開新 session
* `Ctrl+A D` → detach
* `screen -ls` → 列出 session
* `screen -r` → attach 回去
* `screen -d -r` → 強制 attach
* `exit` → 結束 session
