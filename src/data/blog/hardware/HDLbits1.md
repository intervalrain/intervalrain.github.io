---
title: "[VHDL] HDLbits 1 - Getting Started"
author: "Rain Hu"
pubDatetime: 2022-05-28T00:10:20+08:00
description: "Verilog tutorial"
category: "Hardware"
tags: ["Programming", "HDLbits"]
math: true
---
# [HDLBits](https://hdlbits.01xz.net/wiki/Main_Page)
> HDLBits 是一系列小型電路設計的練習，用於使用 Verilog 硬體描述語言(HDL)進行數位硬體設計。
> 由教學的題型由淺入深，逐步建立起電路設計的技能。
> 每個問題都會要求讀者使用 Verilog 設計一個小電路。HDLBits 會對提交的程式碼作判讀。透過一組測試碼來進行向量模擬，並與解答比較，檢查正確性。

# Catalog
[1. Getting Started](/verilog/hdlbits1/#1-getting-started)  
[2. Verilog Language](/verilog/hdlbits2/#2-verilog-language)  
[3. Circuits](/verilog/hdlbits3/#3-circuits)  
[4. Verification: Reading Simulations](/verilog/hdlbits4/#4-getting-started)  
[5. Verification: Writing Testbenches](/verilog/hdlbits5/#5-verification---writing-testbenches)  
[6. CS450](/verilog/hdlbits6/#6-cs450)  

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
