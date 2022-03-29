---
title: "[Logic Design] Lec 3 - Minterm 與 Maxterm 展開"
date: 2021-09-24T17:35:54+08:00
tags: ["Logic Design"]
draft: false
Categories: Logic Design     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily
description: "Applicatin of Boolean Algebra"
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
# 布林表達式的轉換
+ 將文字敘述轉換成布林表達式：
> \\(
  \def\arraystrecth{1.5}\begin{array}{l}
    \underbrace{\text{The alarm will ring}}_ {Z}
    \text{ iff }
    \underbrace{\text{the power of alarm is on}} _{A}
    \text{ and }
    \underbrace{\text{the door is not closed}} _{B'} \\\\
    \text{ or }
    \underbrace{\text{it is after 6 p.m.}} _{C}
    \text{ and }
    \underbrace{\text{the window is not closed}} _{D'}
  \end{array}
\\)
+ \\(Z=AB'+CD'\\)

# 由真值表開始建構邏輯電路
+ Truth Table:  
\\(
    \boxed{
        \def\arraystretch{1}\begin{array}{ccc|c|c}
            A&B&C&f&f'\\\\\hline
            0&0&0&0&1\\\\
            0&0&1&0&1\\\\
            0&1&0&0&1\\\\
            0&1&1&1&0\\\\
            1&0&0&1&0\\\\
            1&0&1&1&0\\\\
            1&1&0&1&0\\\\
            1&1&1&1&0
        \end{array}
    }
\\)
+ 利用 1's 的函數  
\\(f=A' BC+AB' C'+AB' C+ABC'+ABC\\)  
\\(=A' BC+AB'+AB\\)  
\\(=A' BC+A\\)  
\\(=A+BC\\)
+ 利用 0's 的函數  
\\(f=(A+B+C)(A+B+C')(A+B'+C)\\)  
\\(=(A+B)(A+B'+C)\\)  
\\(=A+B(B'+C)\\)  
\\(=A+BC\\)
# Minterm 與 maxterm 展開
+ 以 \\(F=A' BC+A\\) 為範例
\\(
    \boxed{
        \def\arraystretch{1}\begin{array}{c|ccc|c|c|cc}
            \text{Row No.}&A&B&C&\text{Minterns}&\text{Maxterms}&f&f'\\\\\hline
            0&0&0&0&\text{A'B'C'}=\text{m}_0&\text{A+B+C}=\text{M}_0&0&1\\\\
            1&0&0&1&\text{A'B'C}=\text{m}_1&\text{A+B+C'}=\text{M}_1&0&1\\\\
            2&0&1&0&\text{A'BC'}=\text{m}_2&\text{A+B'+C}=\text{M}_2&0&1\\\\
            3&0&1&1&\text{A'BC}=\text{m}_3&\text{A+B'+C'}=\text{M}_3&1&0\\\\
            4&1&0&0&\text{AB'C'}=\text{m}_4&\text{A'+B+C}=\text{M}_4&1&0\\\\
            5&1&0&1&\text{AB'C}=\text{m}_5&\text{A'+B+C'}=\text{M}_5&1&0\\\\
            6&1&1&0&\text{ABC'}=\text{m}_6&\text{A'+B'+C}=\text{M}_6&1&0\\\\
            7&1&1&1&\text{ABC}=\text{m}_7&\text{A'+B'+C'}=\text{M}_7&1&0\\\\
        \end{array}
    }
\\)
+ \\(m_i'=M_i\\)
+ \\(\text{f=A'BC+A=1}\\)  
  \\(\text{=A'BC+AB'C'+AB'C+ABC'+ABC}\\)  
  \\(=m_3+m_4+m_5+m_6+m_7\\)  
  \\(=\sum m(3,4,5,6,7)\\)
+ \\(\text{f=(A+B+C)(A+B+C')(A+B'+C)=0}\\)  
  \\(=M_0M_1M_2\\)  
  \\(=\prod M(0,1,2)\\)

+ Maxterm 與 minterm 的轉換  
\\(
    \boxed{
        \def\arraystretch{1}\begin{array}{rcl}
            g&=&\sum m(2,3,4,6,7)\\\\
             &=&\prod M(0,1,5)\\\\
            g'&=&\sum m(0,1,5)\\\\
            g&=&[\sum m(0,1,5)]'\\\\
             &=&\prod m'(0,1,5)\\\\
             &=&\prod M(0,1,5)
        \end{array}
    }
\\)
+ 性質：
  + \\(\boxed{\text{m}_i\text{m}_j=0\text{ if i}\neq j}\\)

# 未完整定義的函式(Don't Care)
+ Truth table:  
\\(
  \boxed{
    \def\arraystretch{1}\begin{array}{lll|l}
      A&B&C&F\\\\\hline
      0&0&0&1\\\\
      0&0&1&X\leftarrow \text{Don't care}\\\\
      0&1&0&0\\\\
      0&1&1&1\\\\
      1&0&0&0\\\\
      1&0&1&0\\\\
      1&1&0&X\leftarrow \text{Don't care}\\\\
      1&1&1&1\\\\
    \end{array}
  }
\\)
+ 表達式：
  + \\(F=\sum m(0,3,7)+\sum d(1,6)=\prod M(2,4,5)\cdot \prod(1,6)\\)
# Binary adders and subtracters
## Half Adder 半加器
  + \\(X,Y_{\text{in}}\rightarrow{\boxed{\text{Half Adder}}\rightarrow \text{Sum}}\\)
  + Truth Table:  
\\(
  \boxed{
    \def\arraystretch{1}\begin{array}{cc|c}
      X&Y&Sum\\\\\hline
      0&0&0\\\\
      0&1&1\\\\
      1&0&1\\\\
      1&1&0\\\\
    \end{array}
  }
\\)
  + 表達式： \\(\text{Sum}=X' Y+XY'\\)

## Full Adder 全加器
  + \\(X,Y,C_{\text{in}}\rightarrow{\boxed{\text{Half Adder}}\rightarrow C_{out}, \text{Sum}}\\)
  + Truth Table:  
\\(
  \boxed{
    \def\arraystretch{1}\begin{array}{ccc|cc}
      X&Y&C_{\text{in}}&C_{\text{out}}&\text{Sum}\\\\\hline
      0&0&0&0&0\\\\
      0&0&1&0&1\\\\
      0&1&0&0&1\\\\
      0&1&1&1&0\\\\
      1&0&0&0&1\\\\
      1&0&1&1&0\\\\
      1&1&0&1&0\\\\
      1&1&1&1&1\\\\
    \end{array}
  }
\\)
  + 表達式：
    + \\(\text{Sum}=X\oplus Y\oplus C_{\text{in}}\\)
    + \\(C_\text{out}=YC_{\text{in}}+XC_{\text{in}}+XY\\)
  + 邏輯電路
  ![fulladder](/images/fullAdder.png)
## 4-Bit Parallel Adder (Ripple Carry Adder)
  + 四個平行串接的全加器 (Full Adder)
  ![4bitadder](/images/4bitadder.png)

## Binary Subtracter
  + 用全加器來實現減法器

  ![subtracter](images/sub.png)

# Speeding up integer additions
# Binary multiplication

