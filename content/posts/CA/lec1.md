---
title: "[CA] Lec 1 - Computer Abstraction and Technology"
date: 2022-03-24T01:12:11+08:00
tags: ["CA", "Programming", "Computer Science"]
draft: false
Categories: CA     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "History of computer"
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
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
# 計算機的抽象化與科技
![arch](/images/CA/Lec0/arch.png)
## 電腦的定義
+ 一種可以進行**計算**的裝置，特指**可編程(programmable)** 且可執行高速的數學或邏輯的運算，或可收集、儲存、處理資料的電子器械。
    + 一般用途 or 特別用途
    + 可編程 or 不可編程
    + 科學用 or 商務
    + 機械械 or 電子式 or 電機 ...
        + Instruction 與 data 分開儲存的結構稱為 [哈佛架構Harvard Architecture](https://zh.wikipedia.org/zh-tw/%E5%93%88%E4%BD%9B%E7%BB%93%E6%9E%84?msclkid=c1396340ab9a11eca75aa799cfa527fc)
### 電腦的歷史
+ ENIAC (Electronic Numberical Integrator and Calculator)
    + 1943 - 1946 at the University of Pennsylvania
    + 約 25 公尺長、2.5 公尺高
    + 由真空管製成: 耗能、易燒壞KJKKI
    + 1900個加法/每秒
+ 商業化、電晶體的發現 in 1947
+ 使用電晶體的電腦 (IBM 14001, Big Blue) in 1959
+ IC(Integrated Circuit) in 1958 at 德儀
+ 微處理器(Intel 4004) in 1971
+ Apple II in 1977
+ 個人電腦(IBM PC) in 1981
+ IBM 開放式系統(open system)使得周邊設備大量的發展
    + Xerox PARC Alto: 具備滑鼠、[以太網路](https://zh.wikipedia.org/wiki/以太网)、[點陣圖](https://zh.wikipedia.org/wiki/位图)、按鍵、菜單、[WYSIWYG編輯器](https://zh.wikipedia.org/wiki/所见即所得)
    + 區域網路
    + 雷射列印
    + client / server 分散式計算
+ 應用程式
    + VisiCalc for Applie II in 1979
+ 超大型積體電路 VLSI(Very-Large-Scale Integration)
+ **RISC(Reduced Instruction Set Computer)** 的出現，對應於 **CISC(Complex Instruction Set Computer)**
    + RISC: MIPS
    + CISC: Intel x86 processor
+ Post PC Era: Embedded Computer
    + 冰箱、手機、手錶…
### 電腦的發展
+ 應用
    + 行動電腦
    + 手機
    + 人類基因體計畫
    + 世界網路
    + 搜尋引擎
+ **摩爾定律 Moore's Law**
![moore](/images/CA/Lec1/moore.png)
    + Line Width/Feature Size: 電晶體的 Source 與 Drain 的距離，約是 gate length。
    ![nmos](/images/CA/Lec1/nmos.png)
### 電腦的分類
+ 通用電腦
    + 特性：
        + 軟體相容性
        + 產品生命週期短
        + 更好的效能(more transistors)與人機介面
    + 個人電腦 Personal Computers
        + 一般用途、軟體多樣性
        + 取決於**成本**與**效能**的權衡
    + 伺服器電腦 Server Computers
        + 基於網路的
        + 高容量、效能、可靠度
        + 範圍可小至伺服，大至建築
    + 超級電腦 Supercomputers
        + 高端的科學與工程計算
        + 最高的效能，但小的市佔
+ 特殊用途電腦
    + 特性：
        + 通常沒有浮點數、記憶體管理
        + 會與各種功能的外部裝置(peripherals)協作 e.g. DSP
            + 多元的 ISA、效能、外部裝置
            + 較不需考量相容性(通常是 pre-determined program)，ISA更簡單、低功耗
        + 更多元的結構、生命週期更長
        + 高產低銷 (Large volume sale and low price)
        + 趨勢：低成本、更多功
            + SoC(system-on-chip)、micro P core on ASIC
    + 嵌入式電腦 Embedded Computers
        + 隱身在系統中
        + 嚴格的功耗、效能、成本考量
---
## 