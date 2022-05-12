---
title: "[Logic Design] Lec 7 - 組合電路設計與閘模擬"
date: 2021-10-11T09:52:13+08:00
tags: ["Logic Design"]
draft: false
Categories: Logic Design     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily
description: "Combinational Circuit Design and Simulation Using Gates"
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

# Review
+ 組合電路設計
    + 建構真值表將輸出表示成輸入的函式 \\(\text{Inputs}\rightarrow\boxed{\text{MUX}}\rightarrow\text{Outputs}\\)
    + 用 K-map, Q-M method 等方法得到簡化的布林表達式
+ 多層、多輸出的電路(Multi-level & Multi-outputs)
+ Mininum SOP 起點
    + Minimum two-level \\(\text{AND-OR, NAND-NAND, OR-NAND, NOR-OR}\\)
+ Minimum POS 起點
    + Minimum two-level \\(\text{OR-AND, NOR-NOR, AND-NOR, NAND-AND}\\)

# 限制 fan-in 數的電路設計
+ Ex1
    + \\(\text{用 3 pin 的 NOR Gate 實現}f(a,b,c,d)=\sum m(0,3,4,5,8,9,10,14,15)\\)
    + \\(\begin{array}{|c|c|c|c|c|}\hline
        f &00&01&11&10\\\\\hline
        00& 1& 1& 0& 1\\\\\hline
        01& 0& 1& 0& 1\\\\\hline
        11& 1& 0& 1& 0\\\\\hline
        10& 0& 0& 1& 1\\\\\hline
        \end{array}\\)
    + 從 POS 開始
    + \\(f'=a' b' c' d+ab' cd+abc' + a' bc+a' cd'\\\\
          \quad=b' d(a' c'+ac)+a' c(b+d')+abc'\\)
    + ![1](/posts/LogicDesign/L7/1.png)
    + ![2](/posts/LogicDesign/L7/2.png)
+ Ex2 Multiple-Output
    + \\(\text{用 2 pin 的 NAND 與 NOT 實現}\\)
    + \\(f_1=\sum m(0,2,3,4,5)=b' c'+ab' +a' b\\\\
         f_2=\sum m(0,2,3,4,7)=b' c'+bc+a' b\\\\
         f_3=\sum m(1,2,6,7)=a' b' c+ab+bc'\\)
    + \\(\begin{array}{|c|c|c|}\hline
        f_1&0&1\\\\\hline
        00&1&1\\\\\hline
        01& &1\\\\\hline
        11&1& \\\\\hline
        10&1& \\\\\hline
        \end{array}\quad
        \begin{array}{|c|c|c|}\hline
        f_1&0&1\\\\\hline
        00&1&1\\\\\hline
        01& & \\\\\hline
        11&1&1 \\\\\hline
        10&1& \\\\\hline
        \end{array}\quad
        \begin{array}{|c|c|c|}\hline
        f_1&0&1\\\\\hline
        00& & \\\\\hline
        01&1& \\\\\hline
        11& &1\\\\\hline
        10&1&1\\\\\hline
        \end{array}
        \\)
    + \\(f_1=b'(a+c')+a' b\\\\
         f_2=(b'+c)(b+c')+b' c'\\\\
         f_3=b(a+c')+a' b' c\\)
    + ![3](/posts/LogicDesign/L7/3.png)


# 閘延遲與時序圖
+ 邏輯閘必然存在延遲，固然小，但存在。
    ![inverter](/posts/LogicDesign/L7/inverter.png)
    ![gatedelay](/posts/LogicDesign/L7/gatedelay.png)
+ 組合電路
    ![g1g2](/posts/LogicDesign/L7/g1g2.png)
    ![g1g2t](/posts/LogicDesign/L7/g1g2t.png)
+ 延遲亦可能來自電線，電線愈長則延遲可能愈久。
## Control value
+ \\(\text{AND gate}\\) 的 control value 是 \\(0\\)
+ \\(\text{OR gate}\\) 的 control value 是 \\(1\\)
+ \\(\text{AND=2ns}\\\\
\text{NOR=3ns}\\)
+ ![hazard1](/posts/LogicDesign/L7/VWXYZ.png)
+ ![hazard2](/posts/LogicDesign/L7/VWXYZ2.png)
+ 若 X 訊號相反時， Z 要到 5ns 訊號才有意義。
# 組合邏輯中的 Hazards



# 邏輯電路的模擬與測試