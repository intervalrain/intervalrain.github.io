---
title: "[Java] HashMap中的hashCode設計原理"
date: 2022-04-22T11:22:39+08:00
tags: ["Java", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "why hashcode >>> 16"
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
# 程式碼
```Java
static final int hash(Object key){
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```
# h >> 16 的用途
+ h是`key.hashCode()`，`h >>> 16`代表的是取其高位的16位

# key.hashCode() ^ (h >> 16)
+ 這與 Java1.8 中 `tab[(n-1) & hash]` 的原理有關
    ```Java
    static int indexFor(int h, int length){
        return h & (length - 1);
    }
    ```
    + 返回的值即為陣列的下標。
    + 大多數情況下，capacity 都小於2^16，所以在此的 & 運算，只會對 h 的低16位進行 & 運算。
    + 若將高位16位也加入計算，可以增加下標的發散度，避免衝突的次數。
    + 而使用 XOR 的原因是，更較於 AND 或 OR 均勻，因為 AND 會使結果趨向於 0，OR 會使結果趨向於 1。
