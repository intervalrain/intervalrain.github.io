---
title: "[CA] Lec 0 - Introduction to Computer Architecture"
date: 2022-03-23T00:18:35+08:00
tags: ["CA", "Programming", "Computer Science"]
draft: false
Categories: CA     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, Operating System, CS50, CA
description: "Introduction to Computer Architecture"                     
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
# 計算機結構簡介
## 二進制
+ 從真實世界的 **類比訊號** 到方便儲存與傳送的 **數位訊號** (Analog to Digital)。
+ 訊號容易用 **二進制** 表達，在電子電路上，可以用 **電子開關(Switch)** 來描述(bit)。
+ 利用 **電晶體(Transistor)** 其特性，可以作為一個電子開關。
    + 現今的積體電路最常見的電晶體為 **MOSFET** (Metal Oxide Silicon Field Effect Transistor)。
    + 利用閘極(Gate)控制源極(Source)與汲極(Drain)的電子通道。
+ 電子開關 → 邏輯閘 → 邏輯電路、記憶元件 → 計算機
## 計算機結構/組織
![architecture](/images/CA/Lec0/architecture.png)
+ 計算機結構 Computer Architecture
    + **處理器(processor)**
        + Control
        + Datapath
    + **記憶體(memory)**
    + **裝置(Devices)**
        + Input: 鍵盤、滑鼠、磁碟
        + Output: 磁碟、顯示器、影印機
![organization](/images/CA/Lec0/organization.png)
+ 計算機組織 Computer Organization(架構)
    + 功能元件的性能: registers, ALU, shifters
    + Structure
    + Dataflow
    + Control logic
    + **Register Transfer Level(RTL)** description

![arch](/images/CA/Lec0/arch.png)
+ 計算機結構
    + **Computer Architecture = Instruction Set Architecture(ISA) + Machine Organization**
    + Software 與 Hardware 間的 interface。(不同層級抽象化的協同)
    + 因應不同的需求所設計出來的機械**結構**。
        + 選用的演算法
        + 選用的程式語言或編譯器
        + 選用的作業系統
        + 處理器
        + I/O 系統與裝置
    + 指令集Instruction Set Architecture(ISA)
        + 可編程的儲存量(programmable storage)
        + 資料型別與結構：編碼與表現(Encodings and Representations)
        + Instruction Set
        + Instruction Formats
        + 讀寫資料的模式與指令
        + 例外狀況
        + e.g. [Intel(CISC)、Arm(RISC)](https://www.techbang.com/posts/10678-fully-understand-arm-processors-cisc-and-risc-are-what-history-structure-a-see-through-the-computer-96-issues-cover-story-the-king?msclkid=3b721fcfaac611ec864fb9dcb0668cc9)
            + CISC: Complex Instruction Set Computer
            + RISC: Reduced Instruction Set Computer

# [目錄]
+ Chapter 1. [Computer Abstractions and Technology](https://intervalrain.github.io/posts/ca/lec1)
+ Chapter 2. [Instruction Set Architecture](https://intervalrain.github.io/posts/ca/lec2)
+ Chapter 3. [Computer Arithmetic](https://intervalrain.github.io/posts/ca/lec3)
+ Chapter 4. [Designing a Single-Cycle Processor](https://intervalrain.github.io/posts/ca/lec4)
+ Chapter 5. [Pipelining](https://intervalrain.github.io/posts/ca/lec5)
+ Chapter 6. [Memory Hierarchy](https://intervalrain.github.io/posts/ca/lec6)