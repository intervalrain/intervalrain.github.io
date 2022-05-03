---
title: "[VHDL] 3. Lexical Conventions 詞彙規範"
date: 2022-05-02T16:01:10+08:00
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

# 3. 詞彙規範(Lexical conventions)
+ 這份文件描述了VHDL文檔中使用的詞彙與他們的規範
## 3.1 詞彙符號
+ VHDL 文檔應為由詞彙符號(lexical tokens)組成的串流(stream)。一個詞彙符號由一個或多個字元組成。文檔中的符號不拘於排版，是自由排放的，也就是說空格與換行符號不影響語義，除了作轉義標記用時(escaped identifiers)。
+ VHDL 中的語彙符號包含以下：
    - White space
    - Comment
    - Operator
    - Number
    - String
    - Identifier
    - Keyword
## 3.2 White Space
+ 空白鍵包含 space、tab、newlines、formfeeds。
+ 這些字元可以被忽略，除非它們用於分隔其他詞彙符號時。
+ 然而在 String 中，blank 與 tab 被視為重要字元。
## 3.3 Comment
+ VHDL 有兩種形式加入註釋
    + `// 短註釋`
    + `/** 區塊註釋 */`
+ 不支援巢狀結構。
+ 用法同 C 語言。
## 3.4 Operator
+ 運算子可以以單子句、雙子句、多子句的方式運用在述句中，[Clause 5](/posts/verilog/ch5/) 中將會討論它們的作用。
+ 單運算子(unary operator) 應該出在他的運算元左邊。
    + 例：`!a`
+ 雙運算子(binary operator) 應該出現在兩個運算元中間。
    + 例：`a + b`
+ 條件運算子有兩個運算子符號用來隔開三個運算用。
    + 例：`a ? b : c`
## 3.5 Number
+ *constant numbers* 被視為整數常數(integer constants)或實數常數(real constants)。
    + Syntax for integer and real numbers: 
        ```verilog
        number ::= decimal_number 
                | octal_number 
                | binary_nunmber 
                | hex_number
                | real_number
        real_number ::= unsigned_number.unsigned_number
                    | unsigned_number[.unsigned_number]exp[sign]unsigned_number
        exp ::= e|E
        decimal_number ::= unsigned_number
                        | [size]decimal_base unsigned_number
                        | [size]decimal_base x_digit { _ }
                        | [size]decimal_base z_digit { _ }
        binary_number ::= [size]binary_base binary_value
        octal_number ::= [size]octal_base octal_value
        hex_number ::= [size]hex_base hex_value
        sign ::= + | -
        size ::= non_zero_unsigned_number
        non_zero_unsigned_number ::= non_zero_decimal_digit { _ | decimal_digit}
        unsigned_number ::= decimal_digit { _ | decimal_digit}
        binary_value ::= binary_digit { _ | binary_digit}
        octal_value ::= octal_digit { _ | octal_digit}
        hex_value ::= hex_digit { _ | hex_digit}
        decimal_base ::= '[s|S]d | '[s|S]D
        binary_base ::= '[s|S]b | '[s|S]B
        octal_base ::= '[s|S]o | '[s|S]o
        hex_base ::= '[s|S]h | '[s|S]H
        non_zero_decimal_digit ::= 1|2|3|4|5|6|7|8|9
        decimal_digit ::= 0|1|2|3|4|5|6|7|8|9
        binary_digit ::= x_digit|z_digit|0|1
        octal_digit ::= x_digit|z_digit|0|1|2|3|4|5|6|7
        hex_digit ::= x_digit|z_digit|0|1|2|3|4|5|6|7|8|9|a|b|c|d|e|f|A|B|C|D|E|F
        x_digit ::= x|X
        z_digit ::= z|Z|?
        ```
### 3.5.1 數字
+ 數字常數可以依形式被區分為十進制(decimal)、十六進制(hexadecimal)、八進制(octal)、二進制(binary)。
+ 有兩種表達整數常數的形式：
    + 一種是簡單的字面十進制數字，也就是 `0`到`9`，用可選用的`+`、`-`單運算子開頭。
    + 另一種是*based constant*，最多由三個符號組成，一個可選用的 size 常數，一個 `'`(apostrophe, ASCII 0x27) 與緊接著一個 base format 字元，一位數字來代表其值。這三個符號被巨集替換應要是合法的。
## 3.6 String
## 3.7 Identifier
## 3.8 Keyword