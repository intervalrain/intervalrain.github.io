---
title: "[計算機作業系統] 進程管理"
date: 2022-07-02T04:00:55+08:00
tags: ["OS", "CS"]
draft: false
Categories: CS
author: "Rain Hu"
showToc: true
TocOpen: true
math: true
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

# 進程管理
## 進程與執行緒
### 1. 進程(process)
+ 進程是資源分配的基本單位。
+ 進程控制塊(Process Control Block, PCB)描述進程的基本訊息和運行狀態，所謂的創建進程和撤銷進程，都是指對 PCB 的操作。
![PCB](https://www.usna.edu/Users/cs/bilzor/ic411/calendar.php?key=c8bc3778e1e290e4a99e60360fa8c03a340b21ad&type=class&event=6)
### 2. 執行緒(thread)
+ 執行緒又稱線程，是獨立調度的基本單位。
+ 一個進程可以有多個執行緒，它們共享進程資源。
+ 以瀏覽器(browser)為例，瀏覽器進程有很多執行緒，如 HTTP 請求(request)、事件響應、渲染。執行緒的並行處理(concurrent)使得瀏覽器中點擊一個新的超連結從而發起 HTTP 請求時，瀏覽器還可以響應用戶的其它事件。
    ![thread](https://4.bp.blogspot.com/-QyEW1jszBJM/UnUsSC-mVOI/AAAAAAAAABY/Z94NgDcWTb4/s640/process-thread.png)

### 3. 區別
1. 擁有資源
    + 進程是資源分配的基本單位，但是執行緒不擁有資源，而是訪問隸屬進程的資源。
2. 調度
    + 執行緒是獨立調度的基本單位，在同一進程中，執行緒的切換不會引起進程切換，從一個進程中的執行緒切換到另一個進程中的執行緒時，才會進行進程的切換。
3. 系統開銷
    + 由於創建或撤銷進程時，系統都要為之分配或回收資源，如硬碟中的記憶體、I/O 設備等，所付出的開銷遠大於創建或撤銷執行緒時的開銷。
    + 同樣的，在進行進程切換時，涉及當前執行進程 CPU 環境的保存及新調度進程 CPU 環境的設置，而執行緒切換只需保存和設置少量暫存器的內容，開銷較小。
4. 溝通
    + 執行緒可以通過直接讀寫同一個進程中的數據進行溝通，但是進程的溝通需要借助 IPC(inter-process communication)。
## 進程狀態的切換
![process state](https://jingtao.fun/images/%E8%AF%BB%E4%B9%A6-%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/image-20201102105129598.png)
+ 就緒就態(ready)：等待被調度
+ 執行狀態(running)
+ 阻塞狀態(waiting)：等待資源
    + 只有就緒狀態和執行狀態可以相互轉換，其它的都是單向轉換。就緒狀態的進程通過調度演算法從而獲得 CPU Time，轉為執行狀態；而執行狀態的進程，在分配給它的 CPU Time 片段用完之後就會轉為就緒狀態，等待下一次調度。
    + 阻塞狀態是缺少需要的資源從而由執行狀態轉換而來，但是該資源不包括 CPU Time, 缺少 CPU Time 會從執行狀態轉換為就緒狀態。
## 進程調度演算法
+ 不同環境的調度演算法目標不同，因此需要針對不同環境來討論調度演算法。
### 1. 批次處理系統(batch system)
+ 
### 2. 交互式系統(time sharing system)
### 3. 即時系統(real time system)
## 進程同步
### 1. 臨界區
### 2. 同步與互斥(synchronization and asynchronization)
### 3. 訊號量
### 4. 管程
## 經典同步問題
### 1. 哲學家進餐問題
### 2. 讀寫問題
## 進程溝通
### 1. 管道
### 2. FIFO
### 3. 訊息佇列
### 4. 訊號量
### 5. 記憶體共享
### 6. word 套接

