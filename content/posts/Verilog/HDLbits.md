---
title: "[VHDL] HDLbits"
date: 2022-05-28T00:10:20+08:00
tags: ["VHDL", "Programming", "Verilog"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Desc Text."                     
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

# 1 Getting Started
## - assign one
+ Build a circuit with no inputs and one output. The output should always drive 1 (or logic high).
```Verilog
module top_module( output one);
    
    assign one = 1'b1;

endmodule
```
---
## - assign zero
+ Build a circuit with no inputs and one output that outputs a constant 0.
```Verilog
module top_module(
    output zero );

    assign zero = 1'b0;

endmodule
```
# 2 Verilog Language
## 2.1 Basics
### - wire
+ Create a module with one input and ont output that behaves like a wire
![wire](https://hdlbits.01xz.net/mw/images/7/77/Wire.png)
```Verilog
module top_module( input in, output out);
    
    assign out = in;

endmodule
```
---
### - wire4
+ Create a module with 3 inputs and 4 outputs that behaves like wires that makes these connections:
![wire4](https://hdlbits.01xz.net/mw/images/1/15/Wire4.png)
```Verilog
module top_module( 
    input a,b,c, 
    output w,x,y,z );

    assign w = a;
    assign x = b;
    assign y = b;
    assign z = c;

endmodule
```
---
### - notgate
+ Create a module that implements a NOT gate.
![Notgate](https://hdlbits.01xz.net/mw/images/9/9e/Notgate.png)
```Verilog
module top_module( input in, output out );

    assign out = ~in;

endmodule
```
---
### - andgate
+ Create a module that implments an AND gate.
![Andgate](https://hdlbits.01xz.net/mw/images/7/78/Andgate.png)
```Verilog
module top_module( 
    input a,b,
    output out );

    assign out = a & b;

endmodule
```
---
### - norgate
+ Create a module that implements a NOR gate. A NOR gate is an OR gate with its output inverted. A NOR function needs two operators when written in Verilog.
![norgate](https://hdlbits.01xz.net/mw/images/5/5b/Norgate.png)
```Verilog
module top_module(
    input a,b,
    output out );

    assign out = ~(a|b);

endmodule
```
---
### - xnorgate
+ Create a module that implements a XNOR gate.
![xnorgate](https://hdlbits.01xz.net/mw/images/6/6d/Xnorgate.png)
```Verilog
module top_module(
    input a, b,
    output out );

    assign out = ~(a^b);

endmodule
```
---
### - wire decl
+ Implement following circuits. Create two intermediate wires to connect the AND and OR gates together. Note that the wire that feeds the NOT gate is really wire out, so you do not necessarily need to declare a third wire here. Notice how wires are driven by exactly one source (output of a gate), but can feed multiple inputs.
![Wiredecl](https://hdlbits.01xz.net/mw/images/3/3a/Wiredecl2.png)
```Verilog
module top_module(
    input a,b,c,d,
    output out, out_n );

    wire w1, w2;
    assign w1 = a & b;
    assign w2 = c & d;
    assign out = w1 | w2;
    assign out_n = ~out;

endmodule
```
---
### - 7458
+ The 7458 is a chip with four AND gates and two OR gates. Create a module with the same functionality as the 7458 chip. It has 10 inputs and 2 outputs.
![7458](https://hdlbits.01xz.net/mw/images/e/e1/7458.png)
```Verilog
module top_module(
    input p1a, p1b, p1c, p1d, p1e, p1f,
    output p1y,
    intput p2a, p2b, p2c, p2d,
    output p2y );

    wire w1a, w1b;
    wire w2a, w2b;

    assign w1a = p1a & p1b & p1c;
    assign w1b = p1d & p1e & p1f;
    assign p1y = w1a | w1b;
    assign w2a = p2a & p2b;
    assign w2b = p2c & p2d;
    assign p2y = w2a | w2b;

endmodule
```
## 2.2 Vectors
### - vector0
+ Build a circuit that has one 3-bit input, then outputs the same vector, and also splits it into three separate 1-bit outputs. Connect outputs o0 to the input vector's position 0, o1 to position 1, etc.  
In a diagram, a tick mark with a number next to it indicates the width of the vector (or "bus"), rather than drawing a separate line for each bit in the vector.
![vector0](https://hdlbits.01xz.net/mw/images/a/ae/Vector0.png)
```Verilog
module top_module (
    input wire [2:0] vec,
    output wire [2:0] outv,
    output wire o2,
    output wire o1,
    output wire o0  );

    assign outv = vec;
    assign o0 = vec[0];
    assign o1 = vec[1];
    assign o2 = vec[2];

endmodule
```
---
### - vector1
+ Build a combinational circuit that splits an input half-word (16 bits, [15:0]) into lower [7:0] and upper [15:8] bytes.
```Verilog
module top_module (
    input [15:0] in,
    output [7:0] out_hi,
    output [7:0] out_lo );

    assign out_hi = in[15:8];
    assign out_lo = in[7:0];

endmodule
```
---
### - vector2
+ A 32-bit vector can be viewed as containing 4 bytes (bits [31:24], [23:16], etc.). Build a circuit that will reverse the byte ordering of the 4-byte word.  
AaaaaaaaBbbbbbbbCcccccccDddddddd => DdddddddCcccccccBbbbbbbbAaaaaaaa  
This operation is often used when the endianness of a piece of data needs to be swapped, for example between little-endian x86 systems and the big-endian formats used in many Internet protocols.
```Verilog
module top_module (
    input [31:0] in,
    output [31:0] out 
);
    assign out[31:24] = in[ 7: 0];
    assign out[23:16] = in[15: 8];
    assign out[15: 8] = in[23:16];
    assign out[ 7: 0] = in[31:24];

endmodule
```
---
### - vectorgates
+ uild a circuit that has two 3-bit inputs that computes the bitwise-OR of the two vectors, the logical-OR of the two vectors, and the inverse (NOT) of both vectors. Place the inverse of b in the upper half of out_not (i.e., bits [5:3]), and the inverse of a in the lower half.
![vectorgates](https://hdlbits.01xz.net/mw/images/1/1b/Vectorgates.png)
```Verilog
module top_module (
    input [2:0] a,
    input [2:0] b,
    output [2:0] out_or_bitwise,
    output out_or_logical,
    output [5:0] out_not
);

    assign out_or_bitwise = a | b;
    assign out_or_logical = a || b;
    assign out_not[2:0] = ~a;
    assign out_not[5:3] = ~b;

endmodule
```
### - gate4
## 2.3 Modules: Hierarchy
## 2.4 Procedures
## 2.5 More Verilog Features
# 3 Circuits
## 3.1 Combinational Logic
### 3.1.1 Basic Gates
### 3.1.2 Multiplexers
### 3.1.3 Arithmetic Circuits
### 3.1.4 Karnaugh Map to Circuit
## 3.2 Sequential Logic
### 3.2.1 Latches and Flip-Flops
### 3.2.2 Counters
### 3.2.3 Shift Registers
### 3.2.4 More Circuits
### 3.2.5 Finite State Machines
## 3.3 Building Larger Circuits
# 4 Verification: Reading Simulations
## 4.1 Finding bugs in code
## 4.2 Build a circuit from a simulation waveform
# 5 Verification: Writing Testbenches
# 6 CS450


