---
title: "[Logic Design] Lec 07 - 組合電路設計與模擬"
date: 2021-09-18T03:11:35+08:00
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
    + ![1](/LogicDesign/L7/1.png)
    + ![2](/LogicDesign/L7/2.png)
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
    + ![3](/LogicDesign/L7/3.png)


# 閘延遲與時序圖
+ 邏輯閘必然存在延遲，固然小，但存在。
    ![inverter](/LogicDesign/L7/inverter.png)
    ![gatedelay](/LogicDesign/L7/gatedelay.png)
+ 組合電路
    ![g1g2](/LogicDesign/L7/g1g2.png)
    ![g1g2t](/LogicDesign/L7/g1g2t.png)
+ 延遲亦可能來自電線，電線愈長則延遲可能愈久。
## Control value
+ \\(\text{AND gate}\\) 的 control value 是 \\(0\\)
+ \\(\text{OR gate}\\) 的 control value 是 \\(1\\)
+ \\(\text{AND=2ns}\\\\
\text{NOR=3ns}\\)
+ ![hazard1](/LogicDesign/L7/VWXYZ.png)
+ ![hazard2](/LogicDesign/L7/VWXYZ2.png)
+ 若 X 訊號相反時， Z 要到 5ns 訊號才有意義。
# 組合邏輯中的 Hazards
+ Hazard 是在切換輸入時，因閘延遲而產生的錯誤訊號。
+ 種類
    ![hazard](/LogicDesign/L7/hazard.png)
+ 若相鄰兩個 1 不來自同一個邏輯閘(在 K-map 上沒有被框在一起)則會存在 hazard。
    + \\((A,B,C)=(1,0,1)\rightarrow (1,1,1)\\)
![static_hazard](/LogicDesign/L7/static_hazard.png)
+ 可將相鄰的所有蘊函項框在一起，避免「一個bit切換」的 hazard 發生。
![hazard_removed.png](/LogicDesign/L7/hazard_removed.png)
# 邏輯電路的模擬與測試
+ 對模擬邏輯電路來說
    + 有明確的電路元素與連線
    + 決定輸入
    + 觀察輸出
## 輸入值
+ 有四種，分別為：
    + 0 (low)
    + 1 (high)
    + X (unknown)
    + Z (don't care, High impedence)
    ![4value](/LogicDesign/L7/4value.png)
+ \\(\text{AND } \\& \text{ OR } \text{function for 4-value simulation}\\)
    + \\(\begin{array}{c|cccc}
    \text{AND}&0&1&X&Z\\\\\hline
             0&0&0&0&0\\\\
             1&0&1&X&X\\\\
             X&0&X&X&X\\\\
             Z&0&X&X&X\\\\
    \end{array}
    \qquad
    \begin{array}{c|cccc}
    \text{OR}&0&1&X&Z\\\\\hline
            0&0&1&X&X\\\\
            1&1&1&1&1\\\\
            X&X&1&X&X\\\\
            Z&X&1&X&X\\\\
    \end{array}
    \\)
## 驗證(verification)與測試(testing)
+ 邏輯電路的輸出錯誤，可以由下面兩種方式偵錯：
    + 驗證(Verification)
        + 錯誤的電路設計
        + 邏輯閘接線錯誤
        + 輸入訊號錯誤
    + 測試(Testing)
        + 邏輯閘缺陷
        + 金屬接線缺陷
+ 已知 \\(A=B=C=D=1時，F=0\\)
![testing](/LogicDesign/L7/testing.png)