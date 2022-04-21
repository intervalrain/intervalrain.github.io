---
title: "[Logic Design] Lec 5 - Quine-McClusky Method"
date: 2021-10-01T01:09:39+08:00
tags: ["Logic Design"]
draft: false
Categories: Logic Design     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily
description: "Simplify Boolean function with K-map"
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
+ 範例：\\(f(a,b,c,d)=\sum m(0,1,2,5,6,7,8,9,10,14)\\)
    + \\(\boxed{
        \def\arraystretch{1.4}\begin{array}{c|cc}
            &\text{Column I}\\\\\hline
            m_0&0000\\\\\hline
            m_1&0001\\\\
            m_2&0010\\\\
            m_8&1000\\\\\hline
            m_5&0101\\\\
            m_6&0110\\\\
            m_9&1001\\\\
            m_{10}&1010\\\\\hline
            m_7&0111\\\\
            m_{14}&1110
        \end{array}
    }\\)
    \\(\boxed{
        \def\arraystretch{1.4}\begin{array}{c|cc}
            &\text{Column II}\\\\\hline
            m_0,m_1&000.\\\\
            m_0,m_2&00.0\\\\
            m_0,m_8&.000\\\\\hline
            m_1,m_5&0.01&\text{P1}\\\\
            m_1,m_9&.001\\\\
            m_2,m_6&0.10\\\\
            m_2,m_{10}&.010\\\\
            m_8,m_9&100.\\\\
            m_8,m_{10}&10.0\\\\\hline
            m_5,m_7&01.1&\text{P2}\\\\
            m_6,m_7&011.&\text{P3}\\\\
            m_6,m_{14}&.110\\\\
            m_{10},m_{14}&1.10
        \end{array}
    }\\)
    \\(\boxed{
        \def\arraystretch{1.4}\begin{array}{c|cc}
        &\text{Column III}\\\\\hline
        m_0,m_1,m_8,m_9&.00.&\text{P4}\\\\
        m_0,m_2,m_8,m_{10}&.0.0&\text{P5}\\\\
        m_2,m_6,m_{10},m_{14}&..10&\text{P6}\\\\
        \end{array}
    }
    \\)
# 質涵項圖
# Petrick's method
# Simplification of incompletely specified functions