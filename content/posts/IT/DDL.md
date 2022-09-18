---
title: "[IT] 動態鏈結庫(DDL)"
date: 2022-09-18T22:45:56+08:00
tags: ["Algorithm", "Java", "C++", "Programming", "Life", "Music", "Semiconductor", "Logic Design", "TCAD"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Command to construct DDL"
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
# 動態鏈結庫(Dynamic Linked Library, DDL)
+ 將程式中重複引用的程式庫獨立包裝出來以便共同引用
+ 好處是比起靜態庫更節省空間
+ 也可以單獨修改動態庫文件

## 示例
+ 創建一個自定義程式庫 math.c
```C++
// math.c
int add(int a, int b)
{
    return a + b;
}

```
+ 建建一個 math.h 只包含函式的宣告
```C++
// math.h
int add(int a, int b);
```

+ 將 math.c 編譯成一個動態庫
    + `-shared` 表明是一個 shared library
    + `.so` 是 Linux 下的動態庫的副檔名，Windows 下為 `.dll`
```shell
$ gcc -shared -fPIC math.c -o libmath.so
```
+ 在主程式中包含 math.h 頭文件
```C++
// main.c
#include <stdio.h>
#include <math.h>

int main()
{
    printf("add(1, 2) returns %d\n", add(1, 2));
    return 0;
}
```
+ 利用 `-l` 編譯主程式
    + 省略 `libmath.so` 中的 **lib** 與 **.so** 為 `-lmath`
```shell
gcc main.c -lmath -L. -o main
```

## 系統在路徑下找不到文件的解決方案
1. 將動態庫複製到系統路徑下(需要 root 權限)
```shell
$ sudo ^C cp libmath.so /usr/local/lib/
```
2. 使用環境變量，將當前目錄加到 `LD_LIBRARY_PATH` 環境變量中
```shell
$ export LD_LIBRARY_PATH="$(pwd)"       // 將當前目錄叫到 LD_LIBRARY_PATH中
$ echo $LD_LIBRARY_PATH                 // 測試是否調用成功
```
