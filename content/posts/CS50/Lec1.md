---
title: "[CS50] Lec 1 - C"
date: 2022-03-10T02:39:12+08:00
tags: ["CS50", "Programming"]
draft: false
Categories: CS50     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily
description: "Introduction to programming language C"
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: false
math: true                  # KaTex or not
hidemeta: false
comments: false
canonicalURL: "https://intervalrain.github.io/"
disableHLJS: true
disableShare: true
disableHLJS: false
hideSummary: false
searchHidden: true
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

# C
+ 當我們要去評價程式碼的品質時，我們會考慮以下元素：
  + 正確性(correctness): 程式碼是否有正確的解決我們的問題
  + 設計(design): 程式碼的好壞決定於它的**效率**與**可讀性**
  + 風格(style): 程式碼在視覺上是否有良好的format
+ 我們的第一個 C 語言程式：
```C
#include <stdio.h>

int main(void)
{
    printf("hello, world\n");
}
```
# 整合開發環境、編譯器、介面 IDEs, compilers, interfaces
+ 在執行程式前，我們必須將程式碼轉變成電腦可讀的 binary codes，也就是 0 與 1。
+ IDE(integrated development environments) 可以協助我們開發、編譯程式碼。如[Visual Studio Code](https://en.wikipedia.org/wiki/Visual_Studio_Code)
+ 我們撰寫的程式碼為開源碼(source code)，我們必須將他轉變成機器碼(machine code)，才能被電腦執行。
+ 編譯器(compiler)是將一種語言轉變成另一種語言的程式，例如將開源碼編譯成機器碼。
+ 
