---
title: "[VHDL] HDLbits 1 - Getting Started"
date: 2022-05-28T00:10:20+08:00
tags: ["VHDL", "Programming", "Verilog", "HDLbits"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Verilog tutorial"                     
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
# [HDLBits](https://hdlbits.01xz.net/wiki/Main_Page)
> HDLBits 是一系列小型電路設計的練習，用於使用 Verilog 硬體描述語言(HDL)進行數位硬體設計。
> 由教學的題型由淺入深，逐步建立起電路設計的技能。
> 每個問題都會要求讀者使用 Verilog 設計一個小電路。HDLBits 會對提交的程式碼作判讀。透過一組測試碼來進行向量模擬，並與解答比較，檢查正確性。

# Catalog
[1. Getting Started](/posts/verilog/hdlbits1/#1-getting-started)  
[2. Verilog Language](/posts/verilog/hdlbits2/#2-verilog-language)  
[3. Circuits](/posts/verilog/hdlbits3/#3-circuits)  
[4. Verification: Reading Simulations](/posts/verilog/hdlbits4/#4-getting-started)  
[5. Verification: Writing Testbenches](/posts/verilog/hdlbits5/#5-verification---writing-testbenches)  
[6. CS450](/posts/verilog/hdlbits6/#6-cs450)  

# 1 Getting Started

## \\(\text{assign one}\\)
+ Build a circuit with no inputs and one output. The output should always drive 1 (or logic high).
```Verilog
module top_module( output one);
    
    assign one = 1'b1;

endmodule
```
---
## \\(\text{assign zero}\\)
+ Build a circuit with no inputs and one output that outputs a constant 0.
```Verilog
module top_module(
    output zero );

    assign zero = 1'b0;

endmodule
```
