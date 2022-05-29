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
\\(\text{assign one}\\)
+ Build a circuit with no inputs and one output. The output should always drive 1 (or logic high).
```Verilog
module top_module( output one);
    
    assign one = 1'b1;

endmodule
```
---
\\(\text{assign zero}\\)
+ Build a circuit with no inputs and one output that outputs a constant 0.
```Verilog
module top_module(
    output zero );

    assign zero = 1'b0;

endmodule
```
# 2 Verilog Language
## 2.1 Basics
\\(\text{wire}\\)
+ Create a module with one input and ont output that behaves like a wire
![wire](https://hdlbits.01xz.net/mw/images/7/77/Wire.png)
```Verilog
module top_module( input in, output out);
    
    assign out = in;

endmodule
```
---
\\(\text{multi-in-out}\\)
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
\\(\text{not gate}\\)
+ Create a module that implements a NOT gate.
![Notgate](https://hdlbits.01xz.net/mw/images/9/9e/Notgate.png)
```Verilog
module top_module( input in, output out );

    assign out = ~in;

endmodule
```
---
\\(\text{and gate}\\)
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
\\(\text{nor gate}\\)
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
\\(\text{xnor gate}\\)
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
\\(\text{wire declaration}\\)
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
\\(\text{7458}\\)
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
\\(\text{vector}\\)
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
\\(\text{vector select}\\)
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
\\(\text{vector swap}\\)
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
\\(\text{vector gates}\\)
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
---
\\(\text{gate-prefix vector}\\)
+ Build a combinational circuit with four inputs, in[3:0]. There are 3 outputs: 
    + out_and: output of a 4-input AND gate.
    + out_or: output of a 4-input OR gate.
    + out_xor: outout of a 4-input XOR gate.
```Verilog
module top_module (
    input [3:0] in,
    output out_and,
    output out_or,
    output out_xor );

    assign out_and = & in;
    assign out_or = | in;
    assign out_xor = ^ in;

endmodule
```
---
\\(\text{vector concatenate}\\)
+ Given several input vectors, concatenate them together then split them up into several output vectors. There are six 5-bit input vectors: a, b, c, d, e, and f, for
![vector3](https://hdlbits.01xz.net/mw/images/0/0c/Vector3.png)
```Verilog
module top_module (
    input [4:0] a, b, c, d, e, f,
    output [7:0] w, x, y, z );

    assign {w, x, y, z} = {a, b, c, d, e, f, 2'b11};

endmodule
```
---
\\(\text{vector reverse}\\)
+ Given an 8-bit input vector [7:0], reverse its bit ordering.
```Verilog
module top_module(
    input [7:0] in,
    output [7:0] out 
);

    assign {out[0], out[1], out[2], out[3], out[4], out[5], out[6], out[7]} = in

endmodule
```
```Verilog
module top_module(
    input [7:0] in,
    output [7:0] out 
);

    always @(*) begin
        for (int i=0; i<8; i++)
            out[i] = in[8-i-1];
    end

endmodule
```
```Verilog
module top_module(
    input [7:0] in,
    output [7:0] out 
);

	generate
		genvar i;
		for (i=0; i<8; i = i+1) begin: my_block_name
			assign out[i] = in[8-i-1];
		end
	endgenerate

endmodule
```
---
\\(\text{vector replication}\\)
+ Build a circuit that sign-extends an 8-bit number to 32 bits. This requires a concatenation of 24 copies of the sign bit (i.e., replicate bit[7] 24 times) followed by the 8-bit number itself.
```Verilog
module top_module (
    input [7:0] in,
    output [31:0] out );

    assign out = {{24{in[7]}}, in};

endmodule
```
---
\\(\text{vector replication2}\\)
+ Given five 1-bit signals (a, b, c, d, and e), compute all 25 pairwise one-bit comparisons in the 25-bit output vector. The output should be 1 if the two bits being compared are equal.
![vector5](https://hdlbits.01xz.net/mw/images/a/ac/Vector5.png)
```Verilog
module top_module (
    input a, b, c, d, e,
    output [24:0] out );

    assign out = ~{{5{a}}, {5{b}}, {5{c}}, {5{d}}, {5{e}}} ^ {5{a,b,c,d,e}};

endmodule
```
## 2.3 Modules: Hierarchy
By now, you're familiar with a module, which is a circuit that interacts with its outside through input and output ports. Larger, more complex circuits are built by composing bigger modules out of smaller modules and other pieces (such as assign statements and always blocks) connected together. This forms a hierarchy, as modules can contain instances of other modules.

The figure below shows a very simple circuit with a sub-module. In this exercise, create one instance of module mod_a, then connect the module's three pins (in1, in2, and out) to your top-level module's three ports (wires a, b, and out). The module mod_a is provided for you — you must instantiate it.

When connecting modules, only the ports on the module are important. You do not need to know the code inside the module. The code for module mod_a looks like this:
```Verilog
module mod_a ( input in1, input in2, output out );
    // Module body
endmodule
```
The hierarchy of modules is created by instantiating one module inside another, as long as all of the modules used belong to the same project (so the compiler knows where to find the module). The code for one module is not written inside another module's body (Code for different modules are not nested).

You may connect signals to the module by port name or port position. For extra practice, try both methods.
**Connecting Signals to Module Ports**  
There are two commonly-used methods to connect a wire to a port: by position or by name.

**By position**  
The syntax to connect wires to ports by position should be familiar, as it uses a C-like syntax. When instantiating a module, ports are connected left to right according to the module's declaration. For example:

`mod_a instance1 ( wa, wb, wc );`

This instantiates a module of type mod_a and gives it an instance name of "instance1", then connects signal wa (outside the new module) to the first port (in1) of the new module, wb to the second port (in2), and wc to the third port (out). One drawback of this syntax is that if the module's port list changes, all instantiations of the module will also need to be found and changed to match the new module.

**By name**  
Connecting signals to a module's ports by name allows wires to remain correctly connected even if the port list changes. This syntax is more verbose, however.

`mod_a instance2 ( .out(wc), .in1(wa), .in2(wb) );`

The above line instantiates a module of type mod_a named "instance2", then connects signal wa (outside the module) to the port named in1, wb to the port named in2, and wc to the port named out. Notice how the ordering of ports is irrelevant here because the connection will be made to the correct name, regardless of its position in the sub-module's port list. Also notice the period immediately preceding the port name in this syntax.  

---
\\(\text{module}\\)
![module](https://hdlbits.01xz.net/mw/images/c/c0/Module.png)
```Verilog
module top_module ( input a, input b, output out );

    mod_a u_mod_a (
        .in1 (a),
        .in2 (b),
        .out (out)
    );
    
endmodule
```
---
\\(\text{module\\_pos}\\)
+ This problem is similar to the previous one (module). You are given a module named mod_a that has 2 outputs and 4 inputs, in that order. You must connect the 6 ports by position to your top-level module's ports out1, out2, a, b, c, and d, in that order.
You are given the following module:
![module_pos](https://hdlbits.01xz.net/mw/images/b/b7/Module_pos.png)
```Verilog
module top_module (
    input a, b, c, d,
    output out1, out2 );

    mod_a u_mod_a(out1, out2, a, b, c, d);

endmodule
```
---
\\(\text{module\\_name}\\)
+ This problem is similar to module. You are given a module named mod_a that has 2 outputs and 4 inputs, in some order. You must connect the 6 ports by name to your top-level module's ports:You are given the following module:
![module_name](https://hdlbits.01xz.net/mw/images/d/dd/Module_name.png)
```Verilog
module top_module ( 
    input a, 
    input b, 
    input c,
    input d,
    output out1,
    output out2
);
    
    mod_a u_mod_a(
        .out1 (out1),
        .out2 (out2),
        .in1  (a),
        .in2  (b),
        .in3  (c),
        .in4  (d)
    );

endmodule
```
---
\\(\text{module\\_shift}\\)
+ You are given a module my_dff with two inputs and one output (that implements a D flip-flop). Instantiate three of them, then chain them together to make a shift register of length 3. The clk port needs to be connected to all instances.
Note that to make the internal connections, you will need to declare some wires. Be careful about naming your wires and module instances: the names must be unique.  
The module provided to you is: `module my_dff ( input clk, input d, output q );`
![module_shift](https://hdlbits.01xz.net/mw/images/6/60/Module_shift.png)
```Verilog
module top_module ( input clk, input d, output q );
    
    wire q1;
    wire q2;
    
    my_dff(clk, d, q1);
    my_dff(clk, q1, q2);
    my_dff(clk, q2, q);
	
endmodule
```
---
\\(\text{module\\_shift8}\\)
+ You are given a module my_dff8 with two inputs and one output (that implements a set of 8 D flip-flops). Instantiate three of them, then chain them together to make a 8-bit wide shift register of length 3. In addition, create a 4-to-1 multiplexer (not provided) that chooses what to output depending on sel[1:0]: The value at the input d, after the first, after the second, or after the third D flip-flop. (Essentially, sel selects how many cycles to delay the input, from zero to three clock cycles.)
The module provided to you is: `module my_dff8 ( input clk, input [7:0] d, output [7:0] q );`  
The multiplexer is not provided. One possible way to write one is inside an always block with a case statement inside. 
![module_shift8](https://hdlbits.01xz.net/mw/images/7/76/Module_shift8.png)
```Verilog
module top_module ( 
    input clk, 
    input [7:0] d, 
    input [1:0] sel, 
    output [7:0] q 
);
    wire [7:0] q1;
    wire [7:0] q2;
    wire [7:0] q3;
    my_dff8 (clk, d, q1);
    my_dff8 (clk, q1, q2);
    my_dff8 (clk, q2, q3);
    
    // multiplexer: mux9to1v
    always@(*) begin
        case(sel)
            2'd0: q = d;
            2'd1: q = q1;
            2'd2: q = q2;
            2'd3: q = q3;
        endcase
    end
    
endmodule

```
---
\\(\text{module\\_adder}\\)
+ You are given a module add16 that performs a 16-bit addition. Instantiate two of them to create a 32-bit adder. One add16 module computes the lower 16 bits of the addition result, while the second add16 module computes the upper 16 bits of the result, after receiving the carry-out from the first adder. Your 32-bit adder does not need to handle carry-in (assume 0) or carry-out (ignored), but the internal modules need to in order to function correctly. (In other words, the add16 module performs 16-bit a + b + cin, while your module performs 32-bit a + b).  
Connect the modules together as shown in the diagram below. The provided module add16 has the following declaration:
`module add16 ( input[15:0] a, input[15:0] b, input cin, output[15:0] sum, output cout );`
![module_add](https://hdlbits.01xz.net/mw/images/a/a3/Module_add.png)
```Verilog
module top_module(
    input [31:0] a,
    input [31:0] b,
    output [31:0] sum
);
    wire [15:0] sum1;
    wire [15:0] sum2;
    wire cout1;
    wire cout2;

    add16 (a[15:0], b[15:0], 1'b0, sum1, cout1);
    add16 (a[31:16], b[31:16], cout1, sum2, cout2);
    
    assign sum = {sum2, sum1};
    
endmodule
```
---
\\(\text{module\\_full adder}\\)
+ You are given a module add16 that performs a 16-bit addition. You must instantiate two of them to create a 32-bit adder. One add16 module computes the lower 16 bits of the addition result, while the second add16 module computes the upper 16 bits of the result. Your 32-bit adder does not need to handle carry-in (assume 0) or carry-out (ignored).  
Connect the add16 modules together as shown in the diagram below. The provided module add16 has the following declaration:  
`module add16 ( input[15:0] a, input[15:0] b, input cin, output[15:0] sum, output cout );`  
Within each add16, 16 full adders (module add1, not provided) are instantiated to actually perform the addition. You must write the full adder module that has the following declaration:  
`module add1 ( input a, input b, input cin, output sum, output cout );`  
Recall that a full adder computes the sum and carry-out of a+b+cin.  
In summary, there are three modules in this design:
    + top_module — Your top-level module that contains two of...
    + add16, provided — A 16-bit adder module that is composed of 16 of...
    + add1 — A 1-bit full adder module.
![module_fadd](https://hdlbits.01xz.net/mw/images/f/f3/Module_fadd.png)
```Verilog
module top_module (
    input [31:0] a,
    input [31:0] b,
    output [31:0] sum
);

    wire [15:0] sum1;
    wire [15:0] sum2;
    wire cout1;
    wire cout2;
    
    add16 (a[15:0], b[15:0], 1'b0, sum1, cout1);
    add16 (a[31:16], b[31:16], cout1, sum2, cout2);
    assign sum = {sum2, sum1};
    
endmodule

module add1 ( input a, input b, input cin,   output sum, output cout );
    assign sum = a ^ b ^ cin;
    assign cout = (a&b)|(b&cin)|(cin&a);
    // assign {cout, sum} = a + b + cin;
endmodule
```
---

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


