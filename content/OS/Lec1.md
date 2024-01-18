---
title: "[OS] Lec 1 - Introduction"
date: 2022-02-24T02:43:30+08:00
tags: ["OS", "Programming", "Computer Science"]
draft: false
Categories: OS     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "概觀作業系統的歷史發展與進程" 
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
draft: false
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
    image: "/images/os.png"
    alt: "Oh! You closed up the window, so you cannot see raining"
    relative: false
    hidden: false
---
# 一、OS 簡介
作業系統(Operating system, OS) 是管理電腦硬體與軟體資源的電腦程式，同時也是電腦系統的核心與基石。OS主要有以下兩個功能：
+ 資源分配者
+ 監控使用者程式的執行，以防止不正常的運作造成對系統的危害。

## 一個標準 PC 的作業系統應該提供以下功能：
+ 行程管理 (processing management)
+ 記憶體管理 (memory management)
+ 檔案系統 (file system)
+ 網路通訊 (networking)
+ 安全機制 (security)
+ 使用者介面 (user integerface)
+ 驅動程式 (device drivers)

## OS 系統依大小來區分：
+ 大型電腦：IBM OS/360
+ 個人電腦：Windows、Linux、BSD、Mac OS X
+ 嵌入式：VxWorks、eCos、Sysbian OS、Palm OS

## 依品牌來區分：
+ 類 Unix 家族：包含 System V、BSD 與 Linux。
+ 微軟 Windows：Windows NT 核心，包含 Windows 2000、Windows XP。
+ 蘋果 mac OS：執行於蘋果 Macintosh 系列電腦上的作業系統
+ Chrome OS：基於 Google 的瀏覽器 Google Chrome 的 Linux 核心。

![OSillustration](/images/OSillustration.png)
![LinuxFrame](/images/LinuxFrame.png)

# 二、常見的系統類型
1. Multiprogramming System
+ 系統中存在多組行程同時 (concurrent) 執行，避免 CPU 閒置，提升 CPU 利用度。(注意不是平行執行(parallel))
+ **Multiprogramming Degree**：系統內所存在的等待執行 process 數目，Multiprogramming degree 愈高，則 CPU 使用度可能愈高。(非必定的原因是可能產生 [Thrashing](https://en.wikipedia.org/wiki/Thrashing_(computer_science)?msclkid=538c57fda94411ecab513fc0770bc011) 現象)
  + 當 CPU 效能降低時，系統會引入更多的 process 讓 CPU 盡可能工作。但當存有太多 process 時，大部分的工作會花費在 page fault 造成的 Page Replacement，致使 CPU 效率下降，最後造成 CPU 效能愈來愈低。
    + [方法1] 降低 Multiprogramming Degree
    + [方法2] 利用 Page Fault Frequency (Ratio) 控制來防止 Thrashing。
    + [方法3] 利用 Working Set Model 預估各 Process 在不同執行時期所需的頁框數，並依此提供足夠的頁框數。

2. 分時系統 Time Sharing System
+ Multiprogramming System 的一種，OS 透過資源分享，使得每個使用者都認為有一套專屬的系統存在，反應時間(Response Time)通常是一秒內。
+ 常見配置：
  + 行程排程採用 RR 排程([Round-robin scheduling](https://en.wikipedia.org/wiki/Round-robin_scheduling?msclkid=b581068fa94511ecb177ee89989dbbee))
  + 記憶體空間所有使用者分享
  + 使用虛擬記憶體技術
  + I/O Device 透過 Spooling(Simultaneous Peripheral Operation On-Line) 技術(把磁碟當成一個巨大緩衝區使用)共享。

3. 分散式系統 Distributed System
+ 須符合兩個條件，硬體上每台電腦都是自主的，軟體上用戶將整個系統看作是一台電腦。一般分為兩類：
  + Client-Server System
  + Peer-to-peer

+ 舉例：志願計算，使用志願者電腦的閒置計算力，透過網際網路進行資料傳輸(如 Folding@home 蛋白質摺疊研究計畫)
+ 分散式系統的好處：
  + 資源共享 (Resource sharing)
  + 加快計算速度 (Speed up)
  + 可靠性 (Reliability)：指不容易因為一台電腦 shut down 而全部崩潰
  + 通訊需求 (Coummunication Need)

  補充：勿將 Multiprocessor 與分散式系統混為一談
  + Symmetric Multiprocessing (SMP)：對稱式多元處理，每一個處理器具有相同的功能，可靠度高，強調負載平衡。
  + Asymmetric Multiprocessing (ASMP)：非對稱式多元處理，Master/Slave 架構。

4. 即時系統 Real Time System
+ 定義嚴謹的固定時間限制，電腦在處理工作時必須在這個定義的時間內完成，否則工作就算失效。
  + 硬性即時系統(Hard Real Time Sydstem)：對於完成工作的時間有極嚴格的限制。若 Prcess 未能於規定的時間內完成，則 Process 即屬失效。(意義同即時系統之定義)
    + 工廠自動化系統、軍事系統、核能安控等。
    + Application Program 設計上非常重要。
    + Data 及 Program 皆存在 ROM 或 RAM 中。
    + 不使用虛擬記憶體，因為 Page Fault 的處理時間過長。
    + 減少 os 的干預以降低 Dispatch Latency。
  + 軟性即時系統(Soft Real Time System)：保證高優先權的 Process 必須先於所有低優先權的 Process 完成。
    + Multimedia System、Virtual Reality等。(影音多媒體的緩衝時間)
    + CPU 的 Scheduling 應能支援 Priority Scheduling 且不能提供類似 Aging 技術。
    + 可和分時系統、virtual memory 共存。

5. 叢集系統 Clustered System
+ 叢集系統共享儲存裝置，集合許多 CPU 並且經由 LAN 連線緊密地連結以完成工作。
+ 叢集系統主要是利用多台獨立的電腦系統或是工作站來共同完成大型數值的平行計算。

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