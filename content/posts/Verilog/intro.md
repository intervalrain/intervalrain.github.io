---
title: "[VHDL] Verilog Hardware Description Language"
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
# 1 Verilog HDL
## 1.1 Verilog 簡介
+ 一套硬體描述語言
    + 輔助設計**數位系統**
    + 描述電路的行為
    + 電子自動化工具
+ 類似C語言的硬體描述語言
    + 易學、容易接受
    + 高階行為描述
    + 切勿使用軟體思維(循序)撰寫(硬體描述語言多是並行的)
+ 支援多種硬體層級的描述方式
    + 從低階到高階模式
    + 依照不同的方法設計
+ 支援階層式的設計方法
    + 樹狀式的設計結構
    + 由繁化簡
## 1.2 Verilog 的模型
## 1.2.1 電晶體層級
+ Transistor Level
+ 或低階交換層次模型(Switch Level Model)
+ Verilog 最低階的層次模型
+ 電路是由開關與電晶體所組成
+ 一般不會採取低階的層級來進行設計
## 1.2.2 邏輯閘層級
+ Gate Level
+ 使用基本的邏輯閘元件
+ AND、OR、NOT
+ 邏輯電路圖
## 1.2.3 資料流層級
+ Data Flow Level
+ 描述電路中資料的處理方式
+ 資料如何在電路中運算及傳送
+ 輸入持續驅動輸出
+ 運算式
    + 如：`out = a + b + c`
## 1.3.4 行為模型
+ Behavior Level
+ Verilog 最高階的層次模型
+ 不需考慮硬體元件的特型，只需放在模組的功能描述
+ 很像 C 語言
+ 合成軟體工具
## 1.3.5 結構式模型
+ Structure Level
+ 引用硬體模組的模式
+ 類似邏輯閘層次模型
+ 支援階層式設計法
    + 將複雜電路分為層狀結構
    + 架構上類似樹狀結構
        + Bottom-up：元件→子模組→設計目標
        + Top-Down：設計目標→子模組→元件
        + Mixed：設計目標→子模組←元件(常用於大型複雜系統)
            + \\(
                \boxed{\text{Full Adder}}
                \begin{cases}
                    \boxed{\text{Half Adder}}
                    \begin{cases}
                        \boxed{\text{XOR}}\\\\
                        \boxed{\text{AND}}
                    \end{cases}\\\\
                    \boxed{\text{Half Adder}}
                    \begin{cases}
                        \boxed{\text{XOR}}\\\\
                        \boxed{\text{AND}}
                    \end{cases}\\\\
                    \boxed{\text{OR}}
                \end{cases}\\\\
                \text{設計目標}\qquad\qquad\text{子模組}\qquad\text{元件}
            \\)
## 1.3 Verilog 語法詞彙
+ 由一連串的標記(token)所組成
    + 識別字(identifiers)
    + 關鍵字(keywords)
    + 字串(strings)
    + 註解(comments)
    + 空白(whitespace)
    + 數值(numbers)
## 1.3.1 識別字(identifiers)
+ 描述電路行為所使用的自訂物件
    + 不違反命名規則，工程師自行定義的物件名稱
+ 命名規則
    + 字母、數字、底線`_`或是錢字號`$`所組合而成。
    + 開頭只能使用字母或底線。
    + 識別字是有**大小寫**之分的。
+ 舉例
    ```plaintext
    Shift_reg_b         (Valid)
    _bus123             (Valid)
    $error_condition    (Invalid)
    NT$899              (Valid)
    3_bit_data          (Invalid)
    ```
## 1.3.2 關鍵字(keywords)
+ 描述電路語法所保留的一組特殊名稱的標記
+ 定義語言的結構來描述電路
    + 輸入(input)、輸出(output)
    + 資料型態、電路行為
+ 所有關鍵字都必須使用小寫表示
+ 不可當作識別字使用
+ 常見關鍵字
    \\(\begin{array}{|l|l|l|l|l|l|}\hline
        \text{always}&\text{and}&\text{assign}&\text{begin}&\text{buf}&\text{bufif0}\\\\\hline
        \text{bufif1}&\text{case}&\text{casex}&\text{casez}&\text{cmos}&\text{default}\\\\\hline
        \text{defparam}&\text{else}&\text{end}&\text{endcase}&\text{endfunction}&\text{endmodule}\\\\\hline
        \text{endtask}&\text{event}&\text{for}&\text{forever}&\text{fork}&\text{function}\\\\\hline
        \text{highz0}&\text{highz1}&\text{if}&\text{initial}&\text{inout}&\text{input}\\\\\hline
        \text{integer}&\text{join}&\text{module}&\text{nand}&\text{negedge}&\text{nmos}\\\\\hline
        \text{nor}&\text{not}&\text{notif0}&\text{notif1}&\text{or}&\text{output}\\\\\hline
        \text{parameter}&\text{pmos}&\text{posedge}&\text{pull0}&\text{pull1}&\text{pulldown}\\\\\hline
        \text{pullup}&\text{rcmos}&\text{real}&\text{realtime}&\text{reg}&\text{repeat}\\\\\hline
        \text{rnmos}&\text{rpmos}&\text{rtran}&\text{rtranif0}&\text{rtranif1}&\text{strong0}\\\\\hline
        \text{string1}&\text{supply0}&\text{supply1}&\text{task}&\text{time}&\text{tran}\\\\\hline
        \text{tranif0}&\text{tranif1}&\text{tri}&\text{tri0}&\text{tri1}&\text{triand}\\\\\hline
        \text{trior}&\text{trireg}&\text{wait}&\text{wand}&\text{weak0}&\text{weak1}\\\\\hline
        \text{while}&\text{wire}&\text{wor}&\text{xnor}&\text{xor}\\\\\hline
    \end{array}\\)
## 1.3.3 字串(strings)
+ 一連串字元(character)組成的單一個體
+ 可含有字母、數字、及一些特殊字元
+ 字串的所有字元必須在同一行上，並在**雙引號**之間
## 1.3.4 註解(comments)
+ 程式碼中加入說明文字
    + 可讀性(readability)
    + 文件化(documentation)
    + 版權宣告(license declaration)
+ 以`//`開頭的單行註解(one-line comment)
+ 以`/*`為開頭，並以`*/`為結尾的多行註解(multiple-line comment)
+ 多行註解不支援巢狀結構
## 1.3.5 空白(whitespace)
+ 區隔不同物件
+ 空格(blank spaces，\b)
+ 欄位(tabs，\t)
+ 換行(newlines，\n)
+ 除字串內空白，註解與空白在編譯與合成時會被忽略
## 1.3.6 數值(numbers)
+ Verilog 有兩種數值表示法
    + 固定長度(sized): 定義位元寬度
        + `<size>'<bsase format><number>`
            + `<size>`：十進位來表示此數的位元數(bits)
            + `<base format>`：定義進制
                + `'H`|`'h`：十六進制
                + `'D`|`'d`：十進制
                + `'O`|`'p`：八進制
                + `'B`|`'b`：二進制
            + `<number>`：用`<base format>`來表示數值
            + 若為負號，將`-`放在`<size>`前面
        + 舉例：
            + `18'h47CB`：18 bits 的十六進位數 47CB
            + `13'h47CB`：13 bits 的十六進位數(因未給定高位元自動補0) 7CB
            + `12'd1023`：12 bits 的十進位數 1023
            + `9'o723`：9 bits 的八進位數 723
            + `5'b11101`：5bits 的二進位數 11101
            + `5'b1xx01`：含有 unknown values 的表示法
    + 不定長度(unsized): 未定義位元寬度
        + '`<base format><number`
            + 不使用`<size>`規定位元長度
            + 使用 HDL 編譯器內定的長度(32bit的寬度)
            + 沒有寫明`<base format>`，則**內定為十進制**
        + 舉例：
            + `'h47CB`：32 bits 的十六進位數 47CB
            + `1023`：32 bits 的十進位數 1023
            + `'o723`：32 bits 的八進位數 723
            + `'b11101`：32 bits 的二進位數 11101
+ Verilog 有四種數值位準(value level)
    + \\(\begin{array}{|c|l|}\hline
            \text{數值位準}&\text{實際電路狀態}\\\\\hline
            \text{0}&\text{邏輯0，假(false)，接地}\\\\\hline
            \text{1}&\text{邏輯1，真(true)，接壓電源}\\\\\hline
            \text{x}&\text{不確定值(unknown value)}\\\\\hline
            \text{z}&\text{高阻抗(high impedance)，浮接狀態(floating state)}\\\\\hline
        \end{array}
    \\)

## 2.4 Verilog 資料物件與型態
+ 資料物件(data objects)
    + 描述行為過程中所使用的訊號載具
    + 一個物件經過處理再傳到另一個物件
+ 資料型態(data type)
    + 定義資料物件的類型
    + 接線、暫存器、參數等
## 2.4.1 接線(Nets)
+ 接線(nets)是連接實體元件的連接線
+ 要被驅動才能改變其內部的值
+ 最主要的關鍵字是 `wire`
    + 一個位元的純量(scalar)
    + 多位元長度的向量(vector)
    + 內定值為 `z`(高阻抗、浮接)
+ 宣告方式
    ```Verilog
    wire w;         // 宣告一條接線，命名為w，內定預設值為z
    wire x = 1'b0;  // 宣告一條接線，命名為x，並指定x為邏輯0
    wire a, b, c    // 宣告三條接線，命名為a, b, c
    ```
## 2.4.2 暫存器(Registers)
+ 抽象的資料儲存物件(有別於實體暫存器 D flip-flop)
+ 保留一個數值直到下一次指定新值為止
+ 觀念類似 C 語言中的變數
+ 主要的關鍵字是 `reg`
    + 一個位元的純量(scalar)
    + 多位元長度的向量(vector)
    + 內定值為 `x`(未知)
+ \\(\begin{array}{|l|l|}\hline
    \text{reg}&\text{可變動位元寬度的無號整數(unsigned integer variable)}\\\\\hline
    \text{integer}&\text{32位元寬度的有號整數(signed 32-bit integer variable)，}\\\\
    &\text{算術運算產生2補數結果(2's complement results))}\\\\\hline
    \text{real}&\text{雙倍精確度之有號浮點數}\\\\
    &\text{(signed floating-point variable with double precision)}\\\\\hline
    \text{time}&\text{64位元寬度的無號整數(unsigned 64-bit integer variable)}\\\\\hline
    \end{array}\\)
    + 設計電路請以`reg`為主，其他類型合成器可能不支援。
+ 宣告方式
    ```Verilog
    reg a;          // 宣告 1 個 1 位元暫存器為 a，定位值為 1 位元的 x
    reg x, y;       // 宣告 2 個宣存器，命名為 x, y
    integer count;  // 宣告 1 個整數為 count，值可以為正負
    real fraction;  // 宣告 1 個浮點數為 fraction，值含小數點
    ```
## 2.4.3 純量與向量(scalar and vector)
+ 純量(scalar)
    + 一個位元的物件
+ 向量(vector)
    + 多個位元的物件
+ 接線(ex. wire) 與 reg
    + 內定一位元
    + `[大數字:小數字]`、`[小數字:大數字]`→`[MSB:LSB]`
+ 宣告方式
    ```Verilog
    wire a;         // 宣告 1 個 1-bits 接線
    wire [4:0] x;   // 宣告 1 個 5-bits 接線
    reg b;          // 宣告 1 個 1-bits 暫存器
    reg [0:7] y;    // 宣告 1 個 8-bits 暫存器
    reg [31:0] z;   // 宣告 1 個 32-bits 暫存器
    ```
## 2.4.4 陣列(Array)
+ 多個暫存器、接線的聚合體
+ 索引值(index)定義聚合體中的個別物件
+ 支援多維度的陣列
+ 記憶體(memory)、暫存器檔案(register file)
+ 陣列中暫存器、接線的個數
    + `[大數字:小數字]`、`[小數字:大數字]`
+ 宣告方式
    ```Verilog
    // mem_block 是一個包含 128 個暫存器的陣列，
    // 每個暫存器皆為 32 位元寬
    reg [31:0] mem_block [127:0];
    // mem_2D 是一個 2 維 4x64 的暫存器陣列，
    // 每個暫存器皆為 8 位元寬
    reg [7:0] mem_2D [3:0][63:0];
    ```
## 2.4.5 參數(parameter)
+ 定義編譯合成電路時的常數
+ 每次編譯合成前更改，編譯合成器會根據參數值產生相對應的電路
+ 重複使用
+ 關鍵字 `parameter`
+ 宣告方式
    ```Verilog
    parameter width = 4;
    wire [width-1:0] a, b;  // 接線 a 和 b 的位元寬度，會隨著參數值的改變而變動
    reg [width-1:0] y;      // 暫存器 y 的位元寬度，會隨著參數值的改變而變動
    ```
## 2.5 模組(Module)、埠(Port)
## 2.5.1 模組(Module)
+ 一個電路區塊、可以由其他模組組成
+ 連接模組時
    + 考慮模組的輸入與輸出介面
    + 不需要考慮模組內部的詳細電路
+ 電路設計時
    + 只修改模組內部電路
    + 不會改變電路外部及周遭的模組
+ 模組內部的電路描述可包含
    + 訊號資料型態宣告
    + 引用其他模組(邏輯閘)
    + `assign` 資料處理模型之描述
    + `always` 行為模型之描述
    + **函數(function)** 與 **任務(task)**
    + 除訊號宣告需先描述，其他部分撰寫的順序，不影響電路行為
+ 模組宣告
    + 以關鍵字 `module` 為開頭，在其後加一個識別用的模組名稱(module name)
    + 再來是**輸入與輸出埠列**(module terminal list)和埠列宣告，接著是模組內部關於電路的描述
    + 以關鍵字 `endmodule` 做為模組結尾
    + 支援階層`式的設計概念
    ```Verilog
    module module_name(terminal_list)
    port_declaration(...)
    param_declaration(optional)
    data_type_declaration(wire, reg)
    other_module(logic_gate)
    assign data_flow_model
    always behavior_model
    function, task
    endmodule
    ```
## 2.5.2 埠(port)
+ 終端點、模組與外界溝通的介面接點(門)
+ 一個模組通常是經由一串的輸入輸出埠稱為埠列(terminal list)來與外界溝通
+ 若模組與外界不需要溝通，則埠列也就不存在(封閉系統)
    + 測試環境(test bench)
+ 埠的宣告
    + 埠的宣告可分為輸入埠(input)、輸出埠(output)、雙向埠(inout)三種。
    + 埠的宣告型態內定為接線(net)的 `wire`，若需要將訊號儲存起來則埠號型態須宣告成暫存器 `reg`。
    + 輸入埠和雙向埠只能是接線(net)，**不可宣告成暫存器**。
    + 輸出埠可以宣告成接線(net)或暫存器。
    ```Verilog
    module full_adder(a, b, carry, sum);    // 埠列
    input  [3:0] a, b;                      // 輸入埠(4位元向量)
    input  carry                            // 輸入埠(1位元純量)
    output [4:0] sum;                       // 輸出埠(5位元向量)
    reg    [4:0] sum;                       // 因輸出sum需儲存資料，故宣告成暫存器
    ...
    endmodule
    ```
## 2.6 邏輯閘層次模型
+ 利用關鍵字即可引用基本的邏輯閘元件
+ 基本的邏輯閘關鍵字
    + `and`
    + `nand`
    + `or`
    + `nor`
    + `not`
    + `xor`
    + `xnor`
## 2.6.1 多個輸入邏輯閘(Multiple-Input Gates)
+ `and`、`nand`、`or`、`nor`、`xor`、`xnor`
+ 具有多個純量(scalar)的輸入，但是只有一個純量的輸出
+ **多個輸入邏輯閘的輸出總是放在埠列(post list)的第一個位置，而輸入則是跟在輸出的後面**
    輸出必須透過接線(wire)連接，輸入無規定
+ 多個輸入邏輯閘的別名可以加或是不加
+ 使用方法
    ```Verilog
    gate_type instance(out, in_1, in_2, in_3, ..., in_n);
    gate_type inst_1(out_1, in1_1, in1_2, in1_3, ..., in1_n),
              inst_2(out_2, in2_1, in2_2, in2_3, ..., in2_n),
              inst_3(out_3, in3_1, in3_2, in3_3, ..., in3_n),
              ...
              inst_m(out_m, in_m1, in_m2, in_m3, ..., in_mn);
    ```
+ \\(\begin{array}{ccc}
    \underbrace{\text{a, b, c, d}}_{\text{輸入}}
    \rightarrow 
    \boxed{\text{Multiple-Input Gate}}
    \rightarrow
    \underbrace{\text{e}} _{\text{輸出}}
    \end{array}
    \\)
+ \\(\text{and\quad a1(}
     \underbrace{\text{e}}_{\text{輸出}}
     \text{, }
     \underbrace{\text{a, b, c, d}} _{\text{輸入}}
     \text{);}
     \\)
## 2.6.2 多個輸出邏輯閘(Multiple-Output Gates)
+ `not`、`buf`
+ 具有一個或是多個純量(scalar)的輸出，但是只有一個純量的輸入
+ **多個輸出邏輯閘的輸出是放在埠列(port list)的前面位置，而輸入則是放在列後面位置**
    + 輸出必須透過接線(wire)連接，輸入無規定
+ 多個輸出邏輯閘的別名可以加或是不加
+ 使用方法
    ```Verilog
    gate_type instance(out_1, out_2, out_3, ..., out_n, in);
    gate_type inst_1(out1_1, out1_2, out1_3, ..., out1_n, in1),
              inst_2(out2_1, out2_2, out2_3, ..., out2_n, in2),
              inst_3(out3_1, out3_2, out3_3, ..., out3_n, in3),
              ...
              inst_m(out_m1, out_m2, out_m3, ..., out_mn, in_m);
    ```
+ \\(\begin{array}{ccc}
    \underbrace{\text{d}}_{\text{輸入}}
    \rightarrow 
    \boxed{\text{Multiple-Output Gate}}
    \rightarrow
    \underbrace{\text{a, b, c}} _{\text{輸出}}
    \end{array}
    \\)
+ \\(\text{not\quad n1(}
     \underbrace{\text{a, b, c}}_{\text{輸出}}
     \text{, }
     \underbrace{\text{d}} _{\text{輸入}}
     \text{);}
     \\)

+ 邏輯閘層次模型範例
    + ![sample1](/posts/Verilog/images/sample1.png)
        ```Verilog
        module and_or_gate(in1, in2, in3, in4, out;
        
        input  in1, in2, in3, in4;
        output out;

        wire   w1, w2;
        
        and a1(w1, in1, in2);
        and a2(w2, in3, in4);
        or  o1(out, w1, w2);

        endmodule
        ```