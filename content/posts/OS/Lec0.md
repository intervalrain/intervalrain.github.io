---
title: "[OS] 作業系統-歷史回顧 Historical prospective"
date: 2022-02-24T02:43:30+08:00
tags: ["Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
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
searchHidden: true
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

+ OS 的工作包含：
  + 記憶體管控。
  + CPU 排程。
  + I/O 系統。

## Time-sharing System
+ 使用者與系統間具有互動性
  + CPU 頻繁的切換不同的工作，所以會有很多時間點可以接收 I/O。
  + 使用者可以及時看到結果。
  + 使用者感受像是同時進行的，但其實是很快速的切換在不同的工作之間。
    
+ OS 的工作包含：
  + Virtual memory，從硬碟中借儲存空間出來，當作 memory 來使用。
  + 檔案系統和硬碟管理。
  + 同步化(Synchronization) 和 死鎖(deadlock)。

||Batch|Multi-programming|Time-sharing |
|:-:|:-:|:-:|:-:|
|系統模型|單一使用者、單一作業|單一使用者、多作業排程|多使用者、作業平行處理| Single user   | Mutiple|
|目的|簡單|增加資源利用效率(機本)|提升反應速度(人本)|
|OS 特徵|N.A.|CPU 排程、記憶體管理、I/O系統|檔案系統、虛擬記憶體、同步化、死鎖|

# 電腦系統結構

## 桌面系統(Desktop Systems)：單處理器(single processor)
+ PC(personal computer)
+ GUI
+ I/O devices: 鍵盤、滑書、螢幕、印表機…
+ 多元的 OS
  + Window, MacOS, Unix, Linux
+ 缺乏檔案與作業系統的保護
  + 木馬、病毒
## 平行系統(Parallel Systems)：多核處理器(multiprocessor/tightly couplde system)
+ 多核、或多 CPU。
+ 通常共享記憶體
+ 
### 記憶體存取結構(Memory Access Architecture)

### 統一記憶體存取架構 Uniform memory access(UMA)
### 非統一記憶體存取架構 Non-uniform memory access(NUMA)

## 分散式系統(Distributed Systems：