---
title: "[計算機作業系統] 概述"
date: 2022-07-02T04:00:55+08:00
tags: ["OS", "Programming"]
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
cover:
    image: "/images/faang.webp"
    alt: "Oh! You closed up the window, so you cannot see raining"
    relative: false
    hidden: false
---

## 基本特徵
### 1. 並行計算
+ **並行計算(concurrent computing)** 是指宏觀上在一段時間內能同時運行多個進程，微觀上是交替發生的；而**平行計算(parallel computing)** 則指同一個時間內能運行多個指令。
+ 平行計算需要硬體支持，如多線程(multi-thread)、多核處理器(multi-core processor)或者分散式計算機系統(distributed OS)。
+ 作業系統通過引入進程(process)與線程(thread)，使程式能夠並行運作。
### 2. 共享
+ 共享是指系統中的資源可以被多個並行進程共同使用。
+ 有兩種共享方式：互斥共享(mutual exclusion)與同時訪問(time sharing)。
+ 互斥共享的資源稱為臨界資源(critical resources)，例如印表機等，在同一時間內只允許一個進程訪問，需要用同步機制來實現互斥訪問。
### 3. 虛擬
+ 虛擬技術把一個物理實體轉換為多個邏輯實體。
+ 主要有兩種虛擬技術：分時技術(time sharing)、空間分享技術。
+ 多個進程能在同一個處理器上並行處理使用了分時技術，讓每個進程輪流占用處理器，每次只執行一小個時間片段並快速切換。
+ 虛擬記憶體使用了空間分享技術，它將物理記憶體抽象化為地址空間，每個進程都有各自的地址空間。地址空間的頁被映射到物理記憶體中，地址空間的頁並不需要全部在物理記憶體中，當使用到一個沒有物理記憶體的頁時，執行頁面置換演算法，將該頁置換到記憶體中。
### 4. 異步(Asynchronous)
+ 異步指進程不是一次性執行完畢，而是走走停停，以不可知的速度向前推進。

## 基本功能
### 1. 進程管理
+ 進程管理、進程同步、進程通信、死鎖處理、處理調度等。
### 2. 記憶體管理
+ 記憶體分配、地址映射、記憶體保護與共享、虛擬記憶體等。
### 3. 文件管理
+ 文件儲存空間的管理、目錄管理、文件讀寫管理和保護等。
### 4. 設備管理
+ 完成用戶的 I/O 請求，方便用戶使用各種設備，並提高設備的利用率。
+ 主要包含緩衝管理、設備分配、設備處理、虛擬設備等。

## 系統調用
+ 如果一個進程在用戶模式(user mode)需要使用內核模式(kernel mode)的功能，就進行系統調用從而陷入內核，由作業系統代為完成。
![interface](https://camo.githubusercontent.com/e6e9338fcb2f8c849b5ed9798862d27937d80c94721948dd87c5dec1e739c2c6/68747470733a2f2f63732d6e6f7465732d313235363130393739362e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f74475056302e706e67)
+ Linux 的系統調用主要有以下這些：
|-|-|
|**Task**|**Commands**|
|進程控制|fork(); exit(); wait();|
|進程通信|pipe(); shmget(); mmap();|
|文件操作|open(); read(); write();|
|設備操作|ioctl(); read(); write();|
|訊息維護|getpid(); alarm(); sleep();|
|安全|chmod(); umask(); chown();|
## 內核與微內核
![ring](https://th.bing.com/th/id/R.859db91aeb8ec96109d43097bd911459?rik=lA7Jg6HrEIuyFA&riu=http%3a%2f%2fresources.infosecinstitute.com%2fwp-content%2fuploads%2fKernelDebugging-03012013.jpg&ehk=XDpXoi61cf6s%2fX4BOz3ghmFHsUIdfRiN8q%2f82rDn8%2fM%3d&risl=&pid=ImgRaw&r=0)

### 1. 內核(kernel)
+ 內核是將作業系統功能作為一個緊密結合的整體放到內核。
+ 由於各模塊共享訊息，因此有很高的性能。
### 2. 微內核(microkernel)
+ 由於作業系統不斷複雜化，因此將一部分作業系統功能移出內核，從而降低內核的複雜性。移出的部分根據分層的原則劃分成若干服務，相互獨立。
+ 在微內核結構下，作業系統被劃分成小的、定義良好的模塊，只有微內核這一個模塊運行在內核模式，其餘模塊運行時在用戶模式。
+ 因為脫試頻繁地在用戶模式與內核模式間進行切換，所以有一定的性能損失。
![kernel](https://docs.microsoft.com/zh-cn/windows-hardware/drivers/gettingstarted/images/userandkernelmode01.png)

## 中斷分類
### 1. 中斷(interrupt)
+ 由 CPU 執行指令以外的事件引起，如 I/O 完成中斷，表示設備輸入/輸出處理已經完成，處理器能夠發送下一個輸入/輸出請求。此外還有時鐘中斷、控制台中斷等。
### 2. 異常(exception)
+ 由 CPU 執行指令的內部事件引起，如非法操作碼、地址越界、算術溢位(overflow)等。
### 3. 陷入(trap)
+ 在用戶程序中使用系統調用。