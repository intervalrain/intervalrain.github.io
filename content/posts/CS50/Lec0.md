---
title: "[CS50] Lecture 0 Introduction to Computer Science"
date: 2022-02-23T00:43:18+08:00
tags: ["CS50", "Programming"]
draft: true
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "Desc Text."                     
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: false
draft: false
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
# 什麼是 Computer Science(CS)? 
+ CS 意在**解決問題**，更精準地說，是將問題 (input) 轉換成答案 (output) 的過程。
+ 在計算機的世界，為了表達 inputs 和 outputs，我們必須將資訊標準化來儲存與操作它們，因為計算機只讀得懂 0 與 1 (開路/通路)。
# 如何表達數字?
+ 在人類的世界，人們使用十進制(Decimal)。
+ 在計算機的世界，用的是二進制(Binary)，也就是 0 與 1。
  + $1+1=10$
  + $(1,2,3,4,5,6,7,...)_{10}=(001,010,011,100,101,110,111,...)_2$
+ 每個二進制的位元(digit)稱為 bit。
+ 在現代計算機結構中，是由數以億計的電晶體(transistors)所組成的。
  + 電晶體是一種具有開關(switch)性質的邏輯元件。
+ 大部分的計算機一次用 8 個 bits，或稱 1 bytes，來表達數字。
  + $8 \text{bits}=1 \text{bytes}$
# 如何表達文字?
+ 要表達文字，只需將不同的字元定義到對應的數字即可。
+ ASCII，American Standard Code for Information Interchange，即是一種基於拉丁字母的編碼系統，可應用顯示現代英語。
  + `A->65`, `B->66`, ...etc
  + `a->97`, `b->98`, ...etc
  + `H->72`, `I->73`, `!->33`, so `HI!=72, 73, 33`
+ 在不同語言，有不同的字符，就必須定義新的編碼系統，來容納更多的字符。
  + 如 Unicode。
  + 如 emojo 顏文字也是一種字符。
# 如何表達顏色?
+ 同理，可以把不同的數字定義給不同的顏色，其中最常見的就是 RGB 系統。
  + 由紅綠藍色塊所組成。
  + 紅、綠、藍又個別以 8 bits 儲存的 256 種不同層度的顏色強度表示。
  + 一共由 24 bits 來表達，超過1百萬種顏色。
# 那圖案、影片、音樂呢?
  + 圖案是由數以萬計的色塊(dots)所組成，在螢幕顯示器上我們稱作畫素(pixels)。
  + 影片則是由連續的圖案經由連續播放所建構而成的。
  + 音樂同樣可以用 bits 來表達，其中 MIDI 是一種用數字來表達音符的形式。

> ***All are composed by 0 and 1 in the computer world.***

# 演算法 (Algorithms)
+ 我們現在可以表達 inputs 和 outputs 了，接下來要開始解決問題。
+ 演算法就是將 inputs 經過一連串系統性、且有邏輯的指令(instructions)轉化成 outpus 的過程。
+ 試想我們要從電話簿中查朋友的電話，電話簿是按照名字排序的。
  > 1. 我們可以從第一頁往後找到最後一頁，只有名字與電話是存在的，我們就會在電話簿中找到，所以這個方法是無誤的。  
  > 2. 我們也可以兩頁兩頁找，但我們有可能因此錯失我們要查的號碼。  
  > 3. 我們也可以一次翻到當前電話簿的一半，利用電話簿的排序規則，決定往左半邊找或右半邊找，並且持續這個步驟直到找到。
+ 將上述的演算法效率視覺化如下：
![bigO](/images/bigO.png)
+ 從上圖可見，當我們處理的樣本數很大時(電話簿頁數很多)，那麼我們用方法1解決問題的時間(找到號碼的時間)就會大的很多。而利用方法3解決問題的時間則會呈對數成長。
+ 因此，好的演算法設計，會大大的影響計算機的操作效率。

# Pseudocode
+ 我們可以用英文(或人類語言)來表達我們的演算法，這種寫作方式叫作 Pseudocode。
```Pseudocode
Pick up phone book
Open to middle of phone book
Look at page
If person is on page
    Call person
Else if person is earlier in book
    Open to middle of left half to book
    Go back to line 3
Else if person is later in book
    Open to middle of right half to book
    Go back to line 3
Else
    Quit
```
+ 其中像**Pick up**、**Open to**、**Look at**、**Quit**這些動作，在計算機中我們稱作函式(functions)。
+ 其中分枝的部分**If**、**Else**，稱作條件(conditions)。
+ 而我們需要決定的判斷式如**person is on page**、**person is earlier than book**、**person is later in book**稱為布林邏輯值(Boolean expressions)，也就是Yes or No，是或否。
+ 最後，不斷地重覆**Go back to line 3**的動作，稱作迴圈(loops)。
+ 接下來我們會繼續遇到各種玩意：
  + function
    + 引數 arguments, 傳回值 return values
  + conditionals
  + Boolean expressions
  + loops
  + variables
+ 和 David 的第一個程式：將 "hello, world" 印到螢幕上。
```C
#include <stdio.h>

int main(void)
{
    printf("hello, world\n");
}
```

# Scratch
+ 試試看到 Scratch(https://scratch.mit.edu/) 這套圖像化軟體語言操作看看吧！

Reference: https://cs50.harvard.edu/college/2021/fall/notes/0/