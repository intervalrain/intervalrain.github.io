---
title: "[OS] Lec 0 - Introduction"
date: 2022-02-24T02:43:30+08:00
tags: ["OS", "Programming", "Computer Science"]
draft: false
Categories: Operating System     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "概觀作業系統的歷史發展與進程" 
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
draft: false
hidemeta: false
comments: false
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
# 大型主機系統(Mainframe System)

## Batch
+ 較好的耐用度、安全性
+ 常用於大量數據分析
+ 常用於醫院、金融業
+ 計算機一次只執行一件事
+ 使用者與計算機的執行沒有互動性
+ CPU 時常處在閒置的狀態(因為 I/O speed 遠小於 CPU speed)
+ OS 處理完一件事後，才將控制權交給下一個工作

## Multi-programming
+ 讓 I/O 與計算的工作可以同時進行，減少 CPU 閒置的時間。
+ **Spooling**(Simultaneous Peripheral Operation On-Line)。
+ 但仍是一次執行一件事。
![multiprogramming](/images/multiprogramming.png)
![scheduling](/images/scheduling.png)

+ OS 的工作包含：
  + 記憶體管控。
    + 系統必須分配記憶體給不同的程式
  + CPU 排程。
    + 系統必須決定哪些程式要執行
  + I/O 系統。
    + 系統提供 I/O 的排程與裝置的分配

## Time-sharing System
+ 使用者與系統間具有互動性
  + CPU 頻繁的切換不同的工作，所以會有很多時間點可以接收 I/O。
  + 使用者可以及時看到結果。
  + 使用者感受像是同時進行的，但其實是很快速的切換在不同的工作之間。
    
+ OS 的工作包含：
  + Virtual memory，從硬碟中借儲存空間出來，當作 memory 來使用。
  + 檔案系統和硬碟管理。
  + 同步化(Synchronization) 和 死鎖(deadlock)。

\\(
  \def\arraystretch{1.5}\begin{array}{|c|c|c|c|}\hline
    &\text{Batch}&\text{Multi-programming}&\text{Time-sharing}\\\\\hline
    \text{系統模型}&\text{單一使用者、單一作業}&\text{單一使用者、多作業排程}&\text{多使用者、作業平行處理}\\\\\hline
    \text{目的}&\text{簡單}&\text{增加資源利用效率(機本)}&\text{提升反應速度(人本)}\\\\\hline
    \text{特徵}&\text{N.A.}&\text{CPU 排程、記憶體管理、I/O系統}&\text{檔案系統、虛擬記憶體、同步化、死鎖}\\\\\hline
  \end{array}
\\)

# 電腦系統結構

## 桌面系統(Desktop Systems)：單處理器(single processor)
+ PC(personal computer)
+ GUI
+ I/O devices: 鍵盤、滑書、螢幕、印表機…
+ 多元的 OS
  + Window, MacOS, Unix, Linux
+ 缺乏檔案與作業系統的保護
  + 木馬、病毒
## 平行系統(Parallel Systems)：多處理器(multiprocessor/tightly couplde system)
![systembus](/images/systembus.png)
+ 多核、或多 CPU。
+ 通常共享記憶體
+ 優點：
  + Throughput: 提升計算能力 
  + Economical: 很多裝置可以共用、節省成本
  + Reliability: 當其中一個 CPU 壞掉時，不會使得電腦完全無法操作。
+ 分類：
  + 對稱式多處理器系統 Symmetric multiprocessor system(SMP)
    + 作業系統控制的每個處理器都扮演相同角色
    + 大多 CPU 屬於這種
    + 需要額外處理 synchronization
  + 非對稱式多處理器系統Asymmetric multiprocessor system
    + 每個處理器被指派處理不同的特殊工作
    + 一個主要的 master CPU 與多個 slave CPUs
    + 常見於極大的系統
### 多核處理器 Multi-Core Processor
+ 在單一的 CPU 有多核
+ On-chip communication 比 between-chip communication 還快
+ One chip with multiple core 比 multiple single-core chips 還節能

### Many-Core Processor
+ Nvidia General-Purpose GPU 圖形處理器
  + Single Instruction Multiple Data
  + 處理矩陣更快
+ Intel Xeon Phi
+ TILE64


### 記憶體存取結構(Memory Access Architecture)

### 統一記憶體存取架構 Uniform memory access(UMA)
### 非統一記憶體存取架構 Non-uniform memory access(NUMA)

## 分散式系統(Distributed Systems)：