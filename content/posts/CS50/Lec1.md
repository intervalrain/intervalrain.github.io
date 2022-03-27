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
+ 在 IDE 中，我們可以在一個叫作 **terminal** 的視窗中輸入指令。
+ **terminal** 提供了 command-line interface(CLI)
+ 當我們輸入 `make hello`，會產生一個叫作 **hello** 的檔案，我們可以透過輸入 `./hello` 執行它。
  + `.` 代表當下的目錄，上面的指令代表我們要執行當下目錄中叫作 **hello** 的檔案。
  + **hello** 即是內含機器碼的檔案。
+ 欲刪除檔案可以用 `rm` 指令。
+ 輸入 `ls` 列出當下目錄所包含的檔案。
+ 若源碼檔經過修過，則必須重新編譯，才能對執行檔進行修改。

# 函式、引數、傳回值、變數 Functions, Arguments, Return Values, Variables
```C
printf("Hello, world");
```
+ 此處，介紹一個叫作 `printf` 的函數
  + `f` 代表 **formatted** 的字串。字串是多個字元(characters)組成的字詞，在 C 中，我們需要用雙引號(`""`)來包住它。
  + 括號 `()` 使我們可以輸入引數，也就是 printf 函數的 **input**。
  + 最後，我們需要分號 `;`，來宣告述句的結束。
+ 其中，函式的一種產物叫作 **side effect**，也就是我們可以觀察到的變化，如螢幕印出字樣，或是發出聲響。
+ 相比與 **side effects，我們也可以將函式的回傳值用於程式中，回傳值通被儲存於變數中。

```C
string answer = get_string("What's your name? ");
```
+ 此處，示範 CS50 IDE 中的一個函數。
  + 這裡的 `get_string`為函式，而`What's your name? ` 為引數。
  + 然後，我們可以將回傳值存入到變數中，以上例，我們可利用賦值運算子(`=`)將右值(r_value)傳給左值(l_value)的`answer`。
  + 最後，我們宣告變數的**變數型別(type)**。
    + 如果我們嘗試將上述的變數改為其他變數型別，編譯器會顯示錯誤。

```C
printf("Hello, world\n");
```
+ 我們此處為了換行，而使用了 `escape sequence` `\n`。