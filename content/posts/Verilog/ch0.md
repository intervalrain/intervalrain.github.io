---
title: "[VHDL] IEEE 標準硬體描述語言"
date: 2022-05-01T17:37:22+08:00
tags: ["VHDL", "Programming", "Verilog"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: ["computer", "computer languages", "digital systems", "electronic systems", "hardware", "hardward description languages", "hardware design", "HDL", "PLI", "programming language interface", "Verilog", "Verilog HDL", "Verilog PL"]
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
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
# IEEE 標準硬體描述語言
+ IEEE Standard for Verilog Hardware Description Language
## 介紹
+ 在 1995 年，Verilog hardware description language(HDL) 成為了 IEEE 的標準規範(IEEE Std 1364-1995)，它被設計成簡單、直覺、且有效率的標準規範語言，可應用於驗證模擬、時效分析、測試分析與合成。這些特性使得 Verilog 成為大量 ic 設計者的選擇。
+ Verilog 包含一組很豐富的內建型別(primitives)，包含邏輯閘(logic gates)、自定義型別(user-defined primitives)、開關(switches)與線邏輯(wired logic)，它還具備了元件接腳的延遲(pin-to-pin delay)和時間分析。具象化層級的混合本質上可以被兩種資料型態所描述：**電路(nets)** 與 **變數(variables)**，以變數與電路表示的連續賦值(continuous assignments)，可以將值驅動到電路上，形成基本的**結構構造(structural construct)**；而有序的賦值(procedural assignments)，其中牽涉了變數與電路值的運算，可以被存入變數，形成基本的**行為構造(behavior construct)**。一個設計包含了一組包含輸入與輸出介面的模組(module)，還有函式的描述，可以為結構構造的、行為構造的、或是混合的。這些模組形成有層級的結構(hierarchy)且被接通於不同電路之間。
+ Verilog 語言具備可擴展性，透過**程式語言介面(programming language interface, PLI)**、與 **Verilog 程序介面(Verilog procedual interface, VPI)**。PLI/VPI 是一種可允許外部函數訪問硬體描述語中的資料的一種組合，且可促進與模擬動態的互動。PLI/VPI 的應用包含將 VHDL 仿真器(simulator)與其他模擬與電腦輔助系統(computer-assisted design, CAD)、客製化的除錯任務(costomized debugging task)、延遲計算器(delay calculators)、注釋器(annotators)相接連。
## 目錄
### [1. Overview](/posts/verilog/ch1/)  
### [2. Normative references](/posts/verilog/ch2/)  
### [3. Lexical conventions](/posts/verilog/ch3/)  
### [4. Data Types](/posts/verilog/ch4/)  
### [5. Expressions](/posts/verilog/ch5/)  
### [6. Assignments](/posts/verilog/ch6/)  
### [7. Gate- and switch-level modeling](/posts/verilog/ch7/)  
### [8. User-defined primitives(UDPs)](/posts/verilog/ch8/)  
### [9. Behavioral modeling](/posts/verilog/ch9/)  
### [10. Tasks and functions](/posts/verilog/ch10/)  
### [11. Scheduling semantics](/posts/verilog/ch11/)  
### [12. Hierachical structures](/posts/verilog/ch12/)  
### [13. Configuraing the contents of a design](/posts/verilog/ch13/)  
### [14. Specify blocks](/posts/verilog/ch14/)  
### [15. Timing checks](/posts/verilog/ch15/)  
### [16. Backannotation using the standard delay format(SDF)](/posts/verilog/ch16/)  
### [17. System tasks and functions](/posts/verilog/ch17/)  
### [18. Value change dump (VCD) files](/posts/verilog/ch18/)  
### [19. Compiler directives](/posts/verilog/ch19/)  
### [20. Programming language interface(PLI) overview](/posts/verilog/ch20/)  
### 21. PLI TF and ACC interface mechanism (deprecated)  
### 22. Using ACC routines(deprecated)  
### 23. ACC routine definitions (deprecated)  
### 24. Using TF routines (deprecated)
### 25. TF routines definitions (deprecated)
### [26. Using Verilog procedural interface (VPI) routines](/posts/verilog/ch26/)  
### [27. VPI routine definitions](/posts/verilog/ch27/)  
### [28. Protected envelopes](/posts/verilog/ch28/)  
### [29. Appendix](/posts/verilog/ch29/)
