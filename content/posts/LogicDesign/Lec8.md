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
+ \\(n 個 \text{input} 可以對應到 2^n 個 \text{output}\\)
![decoder](/posts/LogicDesign/L8/decoder.png)
+ 事實上，n 個 input 在編碼器前成生各種 minterm 的組合，後面面編碼器就是將 minterm \\(OR\\) 起來。
![2to4decoder](/posts/LogicDesign/L8/2to4decoder.png)
+ 7442 編碼器，數字 1 到 9 產生對應位置的輸出為 0。
+ 這樣的設計可以使雜訊的干擾變輕。
+ 配合 \\(\text{NAND Gate}\\)，其實就跟前面的編碼器一樣，是產生 minterm 再 \\(OR\\) 起來的過程。
![7442](/posts/LogicDesign/L8/7442.png)
+ \\(F_1=m_1+m_2+m_4 \qquad F_2=m_4+m_7+m_9\\)
![7442a](/posts/LogicDesign/L8/7442a.png)
# 編碼器(Encoder)
+ Priority Encoder
+ 8-to-3 編碼，將輸入將對應的數字編到 abc 中。
+ 若 input 端有兩個以上為 1，則輸出數字較高的數(MSB)。
+ d 的作用，用來表示輸入是否含有 1，否則為 0。
![encoder](/posts/LogicDesign/L8/encoder.png)
# 唯讀記憶體(Read only memories, ROMs)
+ 唯讀記憶體就是一個編寫好的編碼器，輸入就像是位址(address)。
![ROM](/posts/LogicDesign/L8/ROM.png)
+ General Form
+ \\(\text{n inputs}\rightarrow 2^n 個 \text{words} \rightarrow \text{m outputs}\\)
![ROMa](/posts/LogicDesign/L8/ROMa.png)
+ 可以把 ROM 看成 decoder 加上 memory array
![ROMa](/posts/LogicDesign/L8/ROMb.png)
+ 用二極體形成 \\(OR\\) 的效果，一般也會將二極體極化成黑點。
+ 二極體在這邊使電流為單向流動，一般二極體的壓降為 0.7V。
+ 整個矩陣稱為 OR-plane。
+ word line 用於控制儲存單元與 bit line 的連通
+ bit line 用於讀寫儲存單元。(此處只有讀)
![ROMlogic](/posts/LogicDesign/L8/ROMlogic.png)
## ROM 的變形
+ PROM (prgrammable ROM): 使用光罩定義金屬線
+ OTP (one time program ROM): 利用 fuse 熔斷機制，一次性
+ [EPROM(Erasable Programmable ROM)](https://zh.wikipedia.org/wiki/%E5%8F%AF%E6%93%A6%E9%99%A4%E5%8F%AF%E8%A6%8F%E5%8A%83%E5%BC%8F%E5%94%AF%E8%AE%80%E8%A8%98%E6%86%B6%E9%AB%94) 
+ [EEPROM(Electrically Erasable Programmable ROM)](https://www.bing.com/ck/a?!&&p=e8e7ebb1e0244b68652327e240ce70bfb30d911a168646bafc34ef8a057a3d09JmltdHM9MTY1NTQwMjUwMyZpZ3VpZD0yMGIxZmU2Ni1mYmQzLTQwOTctYThkNy02NWFkZDYzZmM5MGEmaW5zaWQ9NTE2Ng&ptn=3&fclid=60e5998b-ed9e-11ec-9bb0-156d89d30233&u=a1aHR0cHM6Ly96aC53aWtpcGVkaWEub3JnL3poLXR3LyVFOSU5QiVCQiVFNSVBRCU5MCVFNiU4QSVCOSVFOSU5OSVBNCVFNSVCQyU4RiVFNSU4RiVBRiVFOCVBNCU4NyVFNSVBRiVBQiVFNSU5NCVBRiVFOCVBRSU4MCVFOCVBOCU5OCVFNiU4NiVCNiVFOSVBQiU5NA&ntb=1) 

# 可程式化邏輯元件(programmable logic devices)
# 現場可程式化邏輯閘陣列(Field programmable gate arrays, FPGAs)