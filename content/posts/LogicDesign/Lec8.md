---
title: "[Logic Design] Lec 8 - 多工器、編碼器、可程式化邏輯元件"
date: 2021-10-14T08:52:13+08:00
tags: ["Logic Design"]
draft: false
Categories: Logic Design     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily
description: "Combinational Circuit Design and Simulation"
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
# 多工器(Multiplexer, MUX)
+ 一個 \\(2^n\text{ to }1\\) 多工器，需要有 n 個控制項(選項器)
    + \\(\begin{array}{c|c|l}
    \text{MUX}&\text{sel}&\text{Output}\\\\\hline
    \text{2 to 1}&1&A' I_0+AI_1\\\\\hline
    \text{4 to 1}&2&A' B' I_0+A' BI_1+AB' I_2+ABI_3\\\\\hline
    \text{8 to 1}&3&A' B' C' I_0+A' B' CI_1+...\\\\\hline
    2^n\text{ to 1}&n&\sum_{k=0}^{2^n-1}m_kI_k
    \end{array}\\)
+ quad multiplexer 
    + 多了一個致能(enable, en)來控制多工器
    ![quadMUX](/posts/LogicDesign/L8/quadMUX.png)
+ 用 4-1 多工器實現三個變數函式
    ![sample](/posts/LogicDesign/L8/sample.png)   
    + 代數展開   
    \\(\begin{array}{rl}
    F(A,B,C)&=A' B'+AC\\\\
            &=A' B'(C+C')+A(B+B')C\\\\
            &=A' B'\cdot1+A' B\cdot0+AB' C+ABC
    \end{array}\\)
    + 真值表法  
    \\(\begin{array}{|cccc:cc|}\hline
       &A&B&C&F\\\\\hline
       &0&0&0&1\\\\
    I_0&0&0&1&1&1\\\\\hline
       &0&1&0&0\\\\
    I_1&0&1&1&0&0\\\\\hline
       &1&0&0&0\\\\
    I_2&1&0&1&1&C\\\\\hline
       &1&1&0&0\\\\
    I_3&1&1&1&1&C\\\\\hline
    \end{array}\\)
    + Verilog
        + [4-to-1 MUX implements 3-var function](https://github.com/intervalrain/Verilog/blob/main/3varMUX/threevarMUX.v)  
        + [test bench](https://github.com/intervalrain/Verilog/blob/main/3varMUX/threevarMUX_tb.v)
        ![3varMUX](/posts/LogicDesign/L8/3varMUX.png)

# 三態緩衝器(Three state buffer)
![buffer](/posts/LogicDesign/L8/buffer.png)
+ 緩衝器(Buffers)的用途:
    + 用來增加閘輸出的趨動力(driving force)
    + 因為閘並聯而造成電容增加(fan out)，電容增加充電變慢，使電路變慢
    + 總體而言，可用來調節電路的速度。
+ 三態緩衝器:
    ![tristate](/posts/LogicDesign/L8/tristate.png)
    + Three-state buffer 或 tri-state buffer
    + 真值表  
        \\(\begin{array}{|cc|c|}\hline
        B&A&C\\\\\hline
        0&0&Z\\\\\hline
        0&1&Z\\\\\hline
        1&0&0\\\\\hline
        1&1&1\\\\\hline
        \end{array}\\)
    + 利用 tri-state buffer 實現 2-to-1 MUX
        ![tristateMUX](/posts/LogicDesign/L8/tristateMUX.png)
    + tri-state buffer 並聯
        + 真值表  
            \\(\begin{array}{|c|c|c|c|c|}\hline
             &X&0&1&Z\\\\\hline
            X&X&X&X&X\\\\\hline
            0&X&0&X&0\\\\\hline
            1&X&X&1&1\\\\\hline
            Z&X&0&1&Z\\\\\hline
            \end{array}\\)
    + 應用
        + Bus 匯流排
            ![bus](/posts/LogicDesign/L8/bus.png)
        + Chip I/O
            ![IO](/posts/LogicDesign/L8/IO.png)


# 解碼器(Decoder)
# 編碼器(Encoder)
# 唯讀記憶體(Read only memories, ROMs)
# 可程式化邏輯元件(programmable logic devices)
# 現場可程式化邏輯閘陣列(Field programmable gate arrays, FPGAs)