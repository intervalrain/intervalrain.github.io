---
title: "[Java] Integer.bitCount 解析"
date: 2022-03-01T20:37:02+08:00
tags: ["Java", "Programming"]
draft: true
Categories: programming
description: "Desc Text."                     
author: "Rain Hu"
showToc: true
TocOpen: false
math: true
draft: false
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

# Integer.bitCount 的函式解析
+ 要計算整數以二進制的方式表示時，所有 bit 位為 1 的總和。

## 雛形
+ 從低位開始，檢查是否為 1。
```Java
public static int bitCount(int i){
    int count = 0;
    while (i > 0) {
        if ((i & 1) == 1)    // 如果最低位為 1，count就加 1
            count++;
        i >>= 1;             // 向右推進 1 位，等同於 num /= 2;
    }
    return count;
}
```
+ 時間複雜度為 \\(O(n)\\)，\\(n\\) 為整數的位數(bit 數)。

## 優化
+ 利用(i - 1) & i 可以消除最低位數的 1 的性質來計算。
```Java
public static bitCount(int i){
    int count = 0;
    while (i > 0){
        i = i & (i - 1);       // 0b0101_1100 - 1 = 0b0101_1011, 且 0b0101_1100 & 0b0101_1011 = 0b0101_1000;
        count++;
    }
    return count;
}
```
+ 時間複雜度為 \\(O(n))\\)，\\(n\\) 為位數為 1 的個數。

## 利用 int 的特性再優化
+ 因為 int 的最大正整數為 2^31，故我們可以兩兩錯位相加來求和
```Java
private static int bitCount(int i){
    i = (i & 0x55555555) + ((i >>> 1) & 0x55555555);  // 0b0101_0101_0101_0101_0101_0101_0101_0101
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);  // 0b0011_0011_0011_0011_0011_0011_0011_0011
    i = (i & 0x0f0f0f0f) + ((i >>> 4) & 0x0f0f0f0f);  // 0b0000_1111_0000_1111_0000_1111_0000_1111
    i = (i & 0x00ff00ff) + ((i >>> 8) & 0x00ff00ff);  // 0b0000_0000_1111_1111_0000_0000_1111_1111
    i = (i & 0x0000ffff) + ((i >>>16) & 0x0000ffff);  // 0b0000_0000_0000_0000_1111_1111_1111_1111
    return i;
}
```
+ 時間複雜度為 \\(O(1))\\)。

## Source Code(final)
```Java
public static int bitCount(int i) {
    // HD, Figure 5-2
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    i = i + (i >>> 8);
    i = i + (i >>> 16);
    return i & 0x3f;
}
```
+ 一、三、四、五步不進行消位，在最後再利用 i & 0x3f 消去不必要的位數