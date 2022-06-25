---
title: "[Logic Design] Lec 6 - Multi-Level Gate Circuits / NAND and NOR Gates"
date: 2021-09-18T03:11:35+08:00
tags: ["Logic Design"]
draft: false
Categories: Logic Design     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily
description: "Multi-level gate circuits. nand gates and nor gates introduction."
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
# Multi-level gate circuits
+ 如何決定 level 數：
    1. Gate input number & Delay determine level
    2. Factoring to accomplish different level
    + AND-OR: 2-level SOP
    + OR-AND: 2-level POS
    + OR-AND-OR: 3-level circuit of AND and OR → no particular ordering
+ 4 level gates: \\(\text{Z=(AB+C)(FG+D+E)+H}\\)
![1](/posts/LogicDesign/L6/1.png)
+ 3 level gates: (case fan out) \\(\text{AB(D+E)+C(D+E)+ABFG+CFG+H}\\)
    + Factoring 可變成 4-level \\(\text{(AB+C)(D+E+FG)+H}\\)
![2](/posts/LogicDesign/L6/2.png)
+ level & gate & gate inputs 的關係會隨之變化，可根據電路設計的需求改變
    + 範例：
    ![3](/posts/LogicDesign/L6/3.png)
    + \\(
        \begin{array}{llll}
            f(a,b,c,d)=\sum(1,5,6,10,13,14)\\\\
            f=(c+d)(a'+b+c)(c'+d')(a+b+c')&\text{2 levels}&\text{5 gates}&\text{14 gate inputs}\\\\
            f=[c+d(a'+b)][c'+d'(a+b)]&\text{4 levels}&\text{7 gates}&\text{14 gate inputs}\\\\
            f=(c+a' d+bd)(c'+ad'+bd')&\text{3 levels}&\text{7 gates}&\text{16 gate inputs}\\\\
            f=a' c' d+bc' d+bcd'+acd'&\text{2 levels}&\text{5 gates}&\text{16 gate inputs}\\\\
            f=c' d(a'+b)+cd'(a+b)&\text{3 levels}&\text{5 gates}&\text{12 gate inputs}
        \end{array}
        \\)
    + \\(
        \boxed{\begin{array}{c|c|c|c|c}
        &00&01&11&10\\\\\hline
        00&m_0&m_4&m_{12}&m_{8}\\\\\hline
        01&m_1&m_5&m_{13}&m_{9}\\\\\hline
        11&m_3&m_7&m_{15}&m_{11}\\\\\hline
        10&m_2&m_6&m_{14}&m_{10}
        \end{array}}\rightarrow
        \boxed{\begin{array}{c|c|c|c|c}
        &00&01&11&10\\\\\hline
        00&&&&\\\\\hline
        01&1&1&1&\\\\\hline
        11&&&&\\\\\hline
        10&&1&1&1
        \end{array}}\\)
    + \\(\boxed{\begin{array}{c|c|c|c|c}
        &a' b'&a' b&ab&ab'\\\\\hline
        c' d'&&&&\\\\\hline
        c' d&1&1&1&\\\\\hline
        cd&&&&\\\\\hline
        cd'&&1&1&1
        \end{array}}\\\\
        =a' c' d+bc' d+bcd'+acd'=(a'+b)c' d+(a+b)cd'\\\\
        =(c' d'+ab' c'+cd+a' b' c)'=(c+d)(a'+b+c)(c'+d')(a+b+c')\\\\
        =[c+d(a'+b)][c'+d'(a+b)]=(c+a' d+bd)(c'+ad'+bd')
        \\)


# NAND and NOR gates
## NAND
+ 符號
![nand](/posts/LogicDesign/L6/nand.png)
+ 真值表  
    \\(\boxed{\begin{array}{cc|cc}
        A&B&AB&\overline{AB}\\\\\hline
        0&0&0&1\\\\
        0&1&0&1\\\\
        1&0&0&1\\\\
        1&1&1&0
    \end{array}}
    \\)
+ 布林表達式：  
    \\(F=(ABC)'=A'+B'+C'\\)

## NOR
+ 符號
![nor](/posts/LogicDesign/L6/nor.png)
+ 真值表  
    \\(\boxed{\begin{array}{cc|cc}
        A&B&AB&\overline{AB}\\\\\hline
        0&0&0&1\\\\
        0&1&1&0\\\\
        1&0&1&0\\\\
        1&1&1&0
    \end{array}}
    \\)
+ 布林表達式：  
    + \\(F=(A+B+C)'=A' B' C'\\)

## Functionally Complete Sets of Gates
+ 定義：當所有的布林式皆可以被這組邏輯閘組合而成，則這組邏輯閘為 Functionally Complete
    + \\(\lbrace{\text{AND, OR, NOT}}\rbrace\\)
    + \\(\lbrace{\text{AND, NOT}}\rbrace\rightarrow \text{OR}=X+Y=(X' Y')'\\)
    + \\(\lbrace{\text{OR, NOT}}\rbrace\rightarrow \text{AND}=XY=(X'+Y')'\\)
    + \\(\lbrace{\text{NAND}}\rbrace\\)
    + \\(\lbrace{\text{NOR}}\rbrace\\)
    + \\(\lbrace{\text{3-input Minority Gate}}\rbrace\\)

## Majority Gate and Minority Gate
+ 真值表  
    \\(\boxed{\begin{array}{ccc|cc}
        A&B&C&F_M&F_m\\\\\hline
        0&0&0&0&1\\\\
        0&0&1&0&1\\\\
        0&1&0&0&1\\\\
        0&1&1&1&0\\\\
        1&0&0&0&1\\\\
        1&0&1&1&0\\\\
        1&1&0&1&0\\\\
        1&1&1&1&0
    \end{array}}\\)
    + \\(\text{(0, B, C)}\rightarrow\boxed{\text{Minority Gate}}=\text{NAND}=\text{(BC)'=\text{B'+C'}}\\)
    + \\(\text{(1, B, C)}\rightarrow\boxed{\text{Minority Gate}}=\text{NOR}=\text{(B+C)'=\text{B'C'}}\\)
    + \\(\text{(A, A, A)}\rightarrow\boxed{\text{Minority Gate}}=\text{NOT}=\text{A'}\\)
    + \\(\text{(0, B', C')}\rightarrow\boxed{\text{Minority Gate}}=\text{AND}=\text{BC}\\)
    + \\(\text{(1, B', C')}\rightarrow\boxed{\text{Minority Gate}}=\text{OR}=\text{B+C}\\)
# 2-level NAND and NOR gates
## DeMorgon's Law
+ 等效邏輯閘：![demorgon](/posts/LogicDesign/L6/Demorgon.png)
    + \\((A+B)'=A' B'\\)
    + \\((AB)'=A'+B'\\)
    + \\(A+B=(A' B')'\\)
    + \\(AB=(A'+B')'\\)
+ \\(\text{Ex1: AND/OR}\rightarrow\text{NAND/NAND}\\)
    + ![tonand](/posts/LogicDesign/L6/tonand.png)
+ \\(\text{Ex2: AND/OR}\rightarrow\text{NOR/NOR}\\)
    + ![tonor](/posts/LogicDesign/L6/tonor.png)
# Multi-level NAND and NOR circuits
+ Multi-level NAND and NOR circuits
![sample1](/posts/LogicDesign/L6/sample1.png)
    + \\(\text{to NAND gate}\\)  
    ![sample2](/posts/LogicDesign/L6/sample2.png)
    + \\(\text{to NOR gate}\\)
    ![sample3](/posts/LogicDesign/L6/sample3.png)   

# Multi-output circuit realization
![MUX](/posts/LogicDesign/L6/MUX.png)
+ 實際一個多工器(multiplexer)內的電路實現，可以用 fan out 的方式達到最佳化。
+ 整體最佳不一定代表個別都為最佳。
+ 實作1:
    + \\(F_1(A,B,C,D)=\sum m(11,12,13,14,15) =AB+ACD \\\\
       F_2(A,B,C,D)=\sum m(3,7,11,12,13,15)=ABC'+CD\\\\
       F_3(A,B,C,D)=\sum m(3,7,12,13,14,15)=A' CD+AB\\\\
    \\)
    + \\(
    \begin{array}{|c|c|c|c|c|}\hline
    F_1&00&01&11&10\\\\\hline
    00&  &  & 1&  \\\\\hline
    01&  &  & 1&  \\\\\hline
    11&  &  & 1& 1\\\\\hline
    10&  &  & 1&  \\\\\hline
    \end{array}\quad
    \begin{array}{|c|c|c|c|c|}\hline
    F_2&00&01&11&10\\\\\hline
    00&  &  & 1&  \\\\\hline
    01&  &  & 1&  \\\\\hline
    11& 1& 1& 1& 1\\\\\hline
    10&  &  &  &  \\\\\hline
    \end{array}\quad
    \begin{array}{|c|c|c|c|c|}\hline
    F_3&00&01&11&10\\\\\hline
    00&  &  &1 &  \\\\\hline
    01&  &  &1 &  \\\\\hline
    11& 1&1 &1 &  \\\\\hline
    10&  &  &1 &  \\\\\hline
    \end{array}
    \\)
\\(\text{9 Gates, 21 Gate inputs}\rightarrow\text{7 Gates, 18 Gate inputs}\\)
    + \\(\text{Share AB(fan out)}\\)
    + \\(\text{A'CD+ACD=CD}\\)
        + \\(F_1(A,B,C,D)=AB+ACD \\\\
       F_2(A,B,C,D)=ABC'+ACD+A' CD\\\\
       F_3(A,B,C,D)=A' CD+AB\\\\
       \lbrace{AB,A' CD,ACD,ABC'}\rbrace
        \\)
![multi1](/posts/LogicDesign/L6/multi1.png)
![multi2](/posts/LogicDesign/L6/multi2.png)
+ 實作2:  
    + \\(f_1=\sum m(2,3,5,7,8,9,10,11,13,15)=bd+b' c+ab'\\\\
       f_2=\sum m(2,3,5,6,7,10,11,14,15)=a' bd+c\\\\
       f_3=\sum m(6,7,8,9,13,14,15)=bc+ab' c'+abd\\\\
       \rightarrow\text{10 Gates, 25 Gate inputs}
    \\)  
    + \\(
    \begin{array}{|c|c|c|c|c|}\hline
    f_1&00&01&11&10\\\\\hline
    00&  &  &  &1 \\\\\hline
    01&  &1 &1 &1 \\\\\hline
    11&1 &1 &1 &1 \\\\\hline
    10&1 &  &  &1 \\\\\hline
    \end{array}\quad
    \begin{array}{|c|c|c|c|c|}\hline
    f_2&00&01&11&10\\\\\hline
    00&  &  &  &  \\\\\hline
    01&  &1 &  &  \\\\\hline
    11&1 &1 &1 &1 \\\\\hline
    10&1 &1 &1 &1 \\\\\hline
    \end{array}\quad
    \begin{array}{|c|c|c|c|c|}\hline
    f_3&00&01&11&10\\\\\hline
    00&  &  &  &1 \\\\\hline
    01&  &  &1 &1 \\\\\hline
    11&  &1 &1 &  \\\\\hline
    10&  &1 &1 &  \\\\\hline
    \end{array}
    \\)
    + \\(
    \text{(1) } b' c+bc = c\\\\
    \text{(2) } a' bd+abd = bd\\\\
    \text{用}\lbrace{b' c, bc, a'bd, abd, ab' c'}\rbrace\text{組合上例}
    \\)
    + \\(
    f_1=b' c+(abd+a' bd)+ab' c'\\\\
    f_2=(b' c+ bc)+a' bd\\\\
    f_3=bc+abd+ab' c'\\\\
    \lbrace {b' c,bc,abd,a' bd,ab' c'}\rbrace\\\\
    \rightarrow\text{8 Gates, 23 Gate inputs}
    \\)
+ 實作3:
    + \\(
        f_1=\sum m(1,5,9,13,15)=c' d+abd\\\\
        f_2=\sum m(4,6,12,14,15)=bd'+abc\\\\
        \rightarrow\text{6 Gates, 14 Gate inputs}
    \\)
    + \\(\begin{array}{|c|c|c|c|c|}\hline
    f_1&00&01&11&10\\\\\hline
    00&  &  &  &  \\\\\hline
    01& 1& 1& 1& 1\\\\\hline
    11&  &  & 1&  \\\\\hline
    10&  &  &  &  \\\\\hline
    \end{array}\quad
    \begin{array}{|c|c|c|c|c|}\hline
    f_2&00&01&11&10\\\\\hline
    00&  & 1& 1&  \\\\\hline
    01&  &  &  &  \\\\\hline
    11&  &  & 1&  \\\\\hline
    10&  & 1& 1&  \\\\\hline
    \end{array}\\)
    + 使上面兩式共用 \\(abcd\\)
    + \\(
    f_1=c' d+abcd\\\\
    f_2=bd'+abcd\\\\
    \rightarrow\text{5 Gates, 12 Gate inputs}
    \\)
+ 實作4:
    + \\(
        f_1=\sum m(0,3,4,5,6,14)=a' c' d'+a' bc'+a' cd'+bcd'\\\\
        f_2=\sum m(0,1,4,6,8,10)=a' c' d'+bc' d'+a' b' c'+bcd'\\\\
        \rightarrow\text{8 Gates, 26 Gate inputs}
    \\)
    + \\(\begin{array}{|c|c|c|c|c|}\hline
    f_1&00&01&11&10\\\\\hline
    00& 1& 1&  &  \\\\\hline
    01&  & 1&  &  \\\\\hline
    11&  &  &  &  \\\\\hline
    10& 1& 1& 1&  \\\\\hline
    \end{array}\quad
    \begin{array}{|c|c|c|c|c|}\hline
    f_1&00&01&11&10\\\\\hline
    00& 1& 1& 1&  \\\\\hline
    01& 1&  &  &  \\\\\hline
    11&  &  &  &  \\\\\hline
    10&  & 1& 1&  \\\\\hline
    \end{array}
    \\)
    + 不 combine 各自做最佳化
    + \\(
    f_1=a' d'+a' bc'+bcd'\\\\
    f_2=a' b' c'+bd'\\\\
    \rightarrow\text{7 Gates, 18 Gate Inputs}
    \\)
## 多輸出電路的基本質函項
+ 參考實作3，若基本質函項可通過多工器中其他的輸入共用的話，則對多輸出電路而言並非基本質函項(Essential prime terms)。
+ 參考實作4，\\(a' d'(m_2),a' bc'(m_5), a' b' c'(m_1), bd'(m_{12})\\)皆為基本質函項。
+ 一般而言，不會為了共享而把基本質函項拆開。
## 和項共用(Shared by sum terms)
![1](/posts/LogicDesign/L6/8421.png)
+ 真值表   
\\(\begin{array}{|cccc|cccc:c|}\hline
a&b&c&d&w&x&y&z&\\\\\hline
0&0&0&0&0&0&1&1&0\\\\\hline
0&0&0&1&0&1&0&0&1\\\\\hline
0&0&1&0&0&1&0&1&2\\\\\hline
0&0&1&1&0&1&1&0&3\\\\\hline
0&1&0&0&0&1&1&1&4\\\\\hline
0&1&0&1&1&0&0&0&5\\\\\hline
0&1&1&0&1&0&0&1&6\\\\\hline
0&1&1&1&1&0&1&0&7\\\\\hline
1&0&0&0&1&0&1&1&8\\\\\hline
1&0&0&1&1&1&0&0&9\\\\\hline
1&0&1&0&X&X&X&X&\\\\\hline
1&0&1&1&X&X&X&X&\\\\\hline
1&1&0&0&X&X&X&X&\\\\\hline
1&1&0&1&X&X&X&X&\\\\\hline
1&1&1&0&X&X&X&X&\\\\\hline
1&1&1&1&X&X&X&X&\\\\\hline
\end{array}\\)
+ k-map  
\\(\begin{array}{|c|c|c|c|c||}\hline
 w&00&01&11&10\\\\\hline
00&  &  & X& 1\\\\\hline
01&  & 1& X& 1\\\\\hline
11&  & 1& X& X\\\\\hline
10&  & 1& X& X\\\\\hline
\end{array}
\begin{array}{|c|c|c|c|c||}\hline
 x&00&01&11&10\\\\\hline
00&  & 1& X&  \\\\\hline
01& 1&  & X& 1\\\\\hline
11& 1&  & X& X\\\\\hline
10& 1&  & X& X\\\\\hline
\end{array}
\begin{array}{|c|c|c|c|c||}\hline
 y&00&01&11&10\\\\\hline
00& 1& 1& X& 1\\\\\hline
01&  &  & X&  \\\\\hline
11& 1& 1& X& X\\\\\hline
10&  &  & X& X\\\\\hline
\end{array}
\begin{array}{|c|c|c|c|c|}\hline
 z&00&01&11&10\\\\\hline
00& 1& 1& X& 1\\\\\hline
01&  &  & X&  \\\\\hline
11&  &  & X& X\\\\\hline
10& 1& 1& X& X\\\\\hline
\end{array}\\)
+ \\(w=a+bc+bd=a+b(c+d)\\\\
    x=bc' d'+b' d+b' c=bc' d'+b'(c+d)\\\\
    y=c' d'+cd\\\\
    z=d'
\\)
+ Sum terms 也可以 share
+ Multi-output circuits 也可以只用 \\(\text{NAND/NOR}\\) 表示
## Multi-Output NAND/NOR circuits
+ 範例![mo1](/posts/LogicDesign/L6/mo1.png)
    + \\(\text{to NAND}\\)
    ![mo1](/posts/LogicDesign/L6/mo2.png)
    + \\(\text{to NOR}\\)
    ![mo1](/posts/LogicDesign/L6/mo3.png)

