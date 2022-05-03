---
title: "[VHDL] 1. Overview 概述"
date: 2022-05-01T19:00:13+08:00
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

# 1、概述
## 1.1 範圍
+ Verilog 是一種硬體描述語言(HDL)，它在被標準化為 IEEE Std 1364™-1995 且被第一次修訂為 IEEE Std 1364-2001。此修訂更正並澄清了在
1995 年和 2001 年版本中定義模稜兩可。而 IEEE Std 1800™-2005 解決了 IEEE 1364-2001 的不兼容和不一致的問題。  
+ 該文件的目的是作為 Verilog HDL 的完整規範。本文件包含以下：
    - 所有 Verilog HDL 結構的形式語法和語義
    - 標準延遲格式 (standard delay format, SDF) 結構的形式語法和語義
    - 模擬系統任務和函式，例如文本輸出顯示命令
    - 編譯器指令，例如文本替換巨集和仿真時間縮放
    - 程式語言介面 (Programming language interface, PLI) 綁定機制
    - Verilog 程序介面 (VPI) 的形式語法和語義
    - 使用範例
    - SDF 的訊息延遲模型
    - VPI 表頭檔
## 1.2 本文件中使用的約定
+ 該文件被組織成條款(clauses)，每個條款都著重於語言的特定領域。每個條款中的子條款討論各種結構和概念。從基本介紹和構造、概念的基本原理開始，再來是語法和語義描述，最後是範例和註釋。
+ 在本文件中，以下術語會被時常用到，對不同的讀者會帶有不帶的意義：
    + ***shall*** 用於表示**強制性規定(mandatory requirements)**。
    + ***may*** 用於表示**非必要(optional)**。
    1. 對於處理 Verilog HDL 工具的開發人員，***shall*** 表示標準強加(standard imposes)的規定，必須實現符合此要求的結果並且在不符合規定時指定相對應的報錯。
    2. 對於 Verilog HDL 模型開發人員，***shall*** 表示其特徵遵循 Verilog HDL 的原生定義，模型開發者需要遵守其隱含的約束。***may*** 表示模型開發人員可以自行決定其功能，但是一旦定義了功能，則模型開發人員必須遵循其定義的法則。
    3. 對於 Verilog HDL 模型使用者， ***shall*** 表示其特徵遵循模型開發者的定義。模型使用者可以參照其模型的 VHDL 文本的規定。
## 1.3 句法描述
+ Verilog HDL 的形式語法使用 Backus-Naur From (BNF) 進行描述。以下為使用規範：  
    - 小寫，可包含下底線(_)，用來表示句法類別(syntactic categories)。  
        + 例：`module_declaration`
    - 粗體字用於保留關鍵字、運算子和語句必要的標點符號。  
        + 例：`module` 、 `=>` 、 `;`
    - 豎線(`|`)用來分隔多個選項，除非它以粗體顯示，粗體表示其自身為一個整個。  
        + 例：一元運算符 ::= + | - | ！ | ~ | & | **〜&** | | | **~|** | ^ | **~^** | **^~**  
    - 方括號(`[]`)包含可選項目。  
        + 例：`input_declaration ::= input [range] list_of_variables ;`
    - 大括號 ({}) 將重複的項目括起來，除非它以粗體顯示，粗體表示其自身為一個整個。該項目可能出現零次或多次；重複從左到右發生等價的左遞迴規則。因此，以下兩條規則是等價的：  
        + `list_of_param_assignments ::= param_assignment { , param_assignment }`
        + `list_of_param_assignments ::= param_assignment | list_of_param_assignment, param_assignment`
    - 如果任何類別的名稱以斜體開頭，則其除去斜體的部分即為類別名稱。斜體部分旨在傳達一些語義訊息。
        + 例：“*msb*_index” 和 “*lsb*_index” 等價於 “index”。
+ 在正文中，*斜體字*表示其術語被定義，`寬字體` 表示範例、檔名、常數，特別是 `0`,`1`,`x`,`z`。

## 1.4 本文件中顏色的使用
+ 該文件使用最少的顏色來增強可讀性。著色不是必要的，且以純黑白格式查看時，不會影響本文件的準確性。當超連結到其他參考資料時，會出現下底線。

## 1.5 本文件的內容

 [1. Overview](/posts/verilog/ch1/)  
 [2. Normative references](/posts/verilog/ch2/)  
 [3. Lexical conventions](/posts/verilog/ch3/)  
 [4. Data Types](/posts/verilog/ch4/)  
 [5. Expressions](/posts/verilog/ch5/)  
 [6. Assignments](/posts/verilog/ch6/)  
 [7. Gate- and switch-level modeling](/posts/verilog/ch7/)  
 [8. User-defined primitives(UDPs)](/posts/verilog/ch8/)  
 [9. Behavioral modeling](/posts/verilog/ch9/)  
 [10. Tasks and functions](/posts/verilog/ch10/)  
 [11. Scheduling semantics](/posts/verilog/ch11/)  
 [12. Hierachical structures](/posts/verilog/ch12/)  
 [13. Configuraing the contents of a design](/posts/verilog/ch13/)  
 [14. Specify blocks](/posts/verilog/ch14/)  
 [15. Timing checks](/posts/verilog/ch15/)  
 [16. Backannotation using the standard delay format(SDF)](/posts/verilog/ch16/)  
 [17. System tasks and functions](/posts/verilog/ch17/)  
 [18. Value change dump (VCD) files](/posts/verilog/ch18/)  
 [19. Compiler directives](/posts/verilog/ch19/)  
 [20. Programming language interface(PLI) overview](/posts/verilog/ch20/)  
 21. PLI TF and ACC interface mechanism (deprecated)  
 22. Using ACC routines(deprecated)  
 23. ACC routine definitions (deprecated)  
 24. Using TF routines (deprecated)  
 25. TF routines definitions (deprecated)  
 [26. Using Verilog procedural interface (VPI) routines](/posts/verilog/ch26/)  
 [27. VPI routine definitions](/posts/verilog/ch27/)  
 [28. Protected envelopes](/posts/verilog/ch28/)  
 [29. Appendix](/posts/verilog/ch29/)

## 1.6 棄用的條款 (Deprecated Clauses)
+ IEEE Std 1364-2005 棄用了該標準先前版本中包含的 Verilog PLI TF 和 ACC 例程。這些例程在 Clause 21 到 Clause 25、部分[Clause 29](/posts/verilog/ch29/)進行了描述。這些條款和附錄的文本已從該版本的文件中刪除。這些不推薦使用的條款和附件的文本可以在 IEEE Std 1364-2001 中找到。

## 1.7 表頭檔列表
+ [Clause 29](/posts/verilog/ch29/) 中包含的 `vpi_user.h` 表頭檔列表是本文件的規範部分。所有相容的軟體工具都應該使用相同的函式宣告、常量定義和結構定義。

## 1.8 範例
+ VHDL 與 C 語言的小範例會時常出現在這份文件當中，這些範例提供了豐富的訊息，它們指在說明 VHDL 的結果與 PLI 的函式用法，並非定義完整的語法。

## 1.9 必備條件
+ [Clause 20](/posts/verilog/ch20/)、[Clause 26](/posts/verilog/ch26/)、[Clause 27](/posts/verilog/ch27/)、[Clause 29](/posts/verilog/ch29/) 預先假設了 C 語言為已備知識。