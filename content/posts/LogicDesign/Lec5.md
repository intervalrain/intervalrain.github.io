---
title: "[Logic Design] Lec 05 - Quine-McClusky Method"
date: 2021-09-18T03:11:35+08:00
tags: ["Logic Design"]
draft: false
Categories: Logic Design     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily
description: "Quine-McClusky method - systematic method to simplify boolean algebra for computer."
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
# 概要
+ 當變數愈來愈多時，很難依靠人眼判斷，所以必須計設系統化的簡化過程讓電腦運行。
+ 系統化的簡化過程
    + 輸入：minterm expansion
    + 輸出：minimum SOP
    + 步驟：
        1. 找出所有質函項，並試著將和項消除到不能再消，利用\\(XY+XY'=X\\)
        2. 利用質函項圖找出最小解
---
+ 範例：\\(F(a,b,c)=a' b' c' + ab' c'+ab' c+ abc\\)
    + \\(
    \boxed{
        \def\arraystretch{1.4}\begin{array}{c|c|c|c|c}
             &a' b'&a' b&ab&ab'\\\\\hline
            c'&1&&&1\\\\\hline
            c&&&1&1
        \end{array}
    }
    \\)
    + 所有蘊函項：\\(a' b' c', ab' c', ab' c, abc, ab', b' c', ac\\)
    + 質函項：\\(ab', b' c', ac\\)
    + 基本質函項：\\(b' c', ac\\)
    + Min SOP：\\(F(a,b,c)=b' c'+ac\\)
# 決定質函項(prime implicants)
+ 找出所有質函項
    1. 將每個 minterm 以二進制表示。
    2. 統計每個項的`1`的數量作為 index 並分群。
    3. 將分完群的 minterm 以 index 排列。
    4. 從 index 最小開始，往 index + 1 的群，尋找可以用\\(XY+XY'=X\\)簡化的組合
    5. 檢查所有的項都合併成組合，留下來的項即為質函項。
    6. 重複步驟 4 到 步驟 5 直到沒有函項可以合併。  
    ***被打勾表示不是質函項(prime implicants)***
+ 範例：\\(f(a,b,c,d)=\sum m(0,1,2,5,6,7,8,9,10,14)\\)
    + \\(f(a,b,c,d)=P1+P2+P3+P4+P5+P6\\)
    + \\(f(a,b,c,d)=a' c' d+a' bd+a' bc+cd'+b' d'+b' c'\\)
    + \\(\boxed{
        \def\arraystretch{1.4}\begin{array}{c|cc}
            &\text{Column I}\\\\\hline
            m_0&0000&\checkmark\\\\\hline
            m_1&0001&\checkmark\\\\
            m_2&0010&\checkmark\\\\
            m_8&1000&\checkmark\\\\\hline
            m_5&0101&\checkmark\\\\
            m_6&0110&\checkmark\\\\
            m_9&1001&\checkmark\\\\
            m_{10}&1010&\checkmark\\\\\hline
            m_7&0111&\checkmark\\\\
            m_{14}&1110&\checkmark
        \end{array}
    }\\)
    \\(\boxed{
        \def\arraystretch{1.4}\begin{array}{c|cc}
            &\text{Column II}\\\\\hline
            m_0,m_1&000.&\checkmark\\\\
            m_0,m_2&00.0&\checkmark\\\\
            m_0,m_8&.000&\checkmark\\\\\hline
            m_1,m_5&0.01&\text{P1}\\\\
            m_1,m_9&.001&\checkmark\\\\
            m_2,m_6&0.10&\checkmark\\\\
            m_2,m_{10}&.010&\checkmark\\\\
            m_8,m_9&100.&\checkmark\\\\
            m_8,m_{10}&10.0&\checkmark\\\\\hline
            m_5,m_7&01.1&\text{P2}\\\\
            m_6,m_7&011.&\text{P3}\\\\
            m_6,m_{14}&.110&\checkmark\\\\
            m_{10},m_{14}&1.10&\checkmark
        \end{array}
    }\\)
    \\(\boxed{
        \def\arraystretch{1.4}\begin{array}{c|cc}
        &\text{Column III}\\\\\hline
        m_0,m_1,m_8,m_9&.00.&\text{P4}\\\\
        m_0,m_2,m_8,m_{10}&.0.0&\text{P5}\\\\
        \sout{m_0,m_8,m_1,m_9}&\sout{.00.}\\\\
        \sout{m_0,m_8,m_2,m_{10}}&\sout{.0.0}\\\\\hline
        m_2,m_6,m_{10},m_{14}&..10&\text{P6}\\\\
        \sout{m_2,m_{10},m_6,m_{14}}&\sout{..10}\\\\
        \end{array}
    }
    \\)
# 質函項圖(表)
+ 範例
    + \\(
    \boxed{
        \def\arraystretch{1.4}\begin{array}{r|l|c|cccccccccc}
                      &       &  &0&1&2&5&6&7&8&9&10&14\\\\\hline
            0, 1, 8, 9&b' c'  &P6&\checkmark&\checkmark&&&&&\checkmark&\oplus\\\\
            0, 2, 8,10&b' d'  &P5&\checkmark&&\checkmark&&&&\checkmark&&\checkmark\\\\
            2, 6,10,14&c d'   &P4&&&\checkmark&&\checkmark&&&&\checkmark&\oplus\\\\
                  1, 5&a' c' d&P1&&\checkmark&&\checkmark\\\\
                  5, 7&a' bd  &P2&&&&\checkmark&&\checkmark\\\\
                  6, 7&a' bc  &P3&&&&&\checkmark&\checkmark\\\\
        \end{array}
    }
    \\)
    + \\(
    \boxed{
        \def\arraystretch{1.4}\begin{array}{r|l|c|cccccccccc}
            &&&5&7\\\\\hline
            1,5&a' c'd&P1&\checkmark\\\\
            5,7&a' bd &P2&\checkmark&\checkmark\\\\
            6,7&a' bc &P3&&\checkmark\\\\
        \end{array}
    }
    \\)
    + 優先選 \\(\oplus\\)的質函項(只出現過一次，代表是基本質函項)，如範例\\(P6與P4\\)。
    + 刪除選出的質函項後化簡成更簡化的質函項圖。
    + 選可以同時照顧到最多函項的質函項。
    + \\(\rightarrow f(a,b,c)=P2+P4+P6=a' bd+cd'+b' c'\\)
    + (若沒有基本質函項時，有可以有多個最佳解)
# Petrick's method
+ 用來解出質函項圖的所有 min SOP 解。
+ 在使用 Petrick 法前，需將所有基本質函項與其函蓋的 minterms 從表上劃掉。
+ 範例：\\(F=\sum m(0,1,2,5,6,7)\\)  
\\(
    \boxed{
        \def\arraystretch{1.4}\begin{array}{r|l|c|cccccc}
            P1&0,1&a' b'&\checkmark&\checkmark\\\\
            P2&0,2&a' c'&\checkmark&&\checkmark\\\\
            P3&1,5&b' c &&\checkmark&&\checkmark\\\\
            P4&2,6&b  c'&&&\checkmark&&\checkmark\\\\
            P5&5,7&a  c &&&&\checkmark&&\checkmark\\\\
            P6&6,7&a  b &&&&&\checkmark&\checkmark\\\\
        \end{array}
    }
\\)
    + \\(\def\arraystretch{1.4}\begin{array}{l}
    0\rightarrow P1+P2\\\\
    1\rightarrow P1+P3\\\\
    2\rightarrow P2+P4\\\\
    5\rightarrow P3+P5\\\\
    6\rightarrow P4+P6\\\\
    7\rightarrow P5+P6\\\\
    \end{array}\\)
    + \\(P=(P1+P2)(P1+P3)(P2+P4)(P3+P5)(P4+P6)(P5+P6)=1\\)
    + \\(P=(P1+P2P3)(P4+P2P6)(P5+P3P6)\\)
    + \\(P=P1P4P5+P1P2P5P6+P2P3P4P5+P2P3P5P6+P1P3P4P6+P1P2P3P6+P2P3P4P6+P2P3P6\\)
    + 刪掉含有\\(P2P3P6\\)的和項
    + \\(P=P1P4P5+P1P2P5P6+P2P3P4P5+P1P3P4P6+P2P3P6\\)
    + \\(\text{min Sol:}\\)
        + \\(F=P1+P4+P5=a' b'+bc'+ac\\)
        + \\(F=P2+P3+P6=a' c'+b' c+ab\\)
# 考慮 Don't Care 的情形
+ 稍微修改一下 Quine-McClusky 方法
    1. 找出所有質函項：將DC視為minterms
    2. 建構出質函項表：DC不必列在表頭
+ 範例：\\(F(A,B,C,D)=\sum m(2,3,7,9,11,13)+\sum d(1,10,15)\\)
    + \\(\boxed{\def\arraystretch{1.4}\begin{array}{rrl}
        1&0001&\checkmark\\\\
        2&0010&\checkmark\\\\\hline
        3&0011&\checkmark\\\\
        9&1001&\checkmark\\\\
        10&1010&\checkmark\\\\\hline
        7&0111&\checkmark\\\\
        11&1011&\checkmark\\\\
        13&1101&\checkmark\\\\\hline
        15&1111&\checkmark
    \end{array}}\\)
    \\(\boxed{\def\arraystretch{1.4}\begin{array}{rrl}
        1,3&00.1&\checkmark\\\\
        1,9&.001&\checkmark\\\\
        2,3&001.&\checkmark\\\\
        2,10&.01.&\checkmark\\\\\hline
        3,7&0.11&\checkmark\\\\
        3,11&.011&\checkmark\\\\
        9,11&10.1&\checkmark\\\\
        9,13&1.01&\checkmark\\\\
        10,11&101.&\checkmark\\\\\hline
        7,15&.111&\checkmark\\\\
        11,15&1.11&\checkmark\\\\
        13,15&11.1&\checkmark\\\\
    \end{array}}\\)
    \\(\boxed{\def\arraystretch{1.4}\begin{array}{rrl}
        1,3,9,11&.0.1\\\\
        2,3,10,11,&.01.\\\\
        3,7,11,15&..11\\\\
        9,11,13,15&1..1\\\\
    \end{array}}\\)
    + \\(\boxed{\def\arraystretch{1.4}\begin{array}{r|cccccc}
        &2&3&7&9&11&13\\\\\hline
        1,3,9,11&&\checkmark&&\checkmark&\checkmark\\\\
        *2,3,10,11&\oplus&\checkmark&&&\checkmark\\\\
        *3,7,11,15&&\checkmark&\oplus&&\checkmark\\\\
        *9,11,13,15&&&&\checkmark&\checkmark&\oplus\\\\
    \end{array}}\\)
    + \\(F=B' C+CD+AD\\)
    + 其中 1 被當作 0，10、15當作1。