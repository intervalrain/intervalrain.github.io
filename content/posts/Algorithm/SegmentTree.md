---
title: "[Algorithm] Segment Tree 線段樹"
date: 2022-05-01T23:43:57+08:00
tags: ["Algorithm", "Java", "Programming"]
draft: false
Categories: Algorithm     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, Operating System, CS50
description: "Segment Tree algorithm"
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
# 前言
+ 在參加 gfg contest 時，遇到一題線段樹的運用，在比賽當下只能直覺的想出暴力解，O(n*k)。直到在研讀競速程設時發現了 segment tree，才驚覺這題可以這樣解…
# Segment Tree線段樹
> 線段樹也是二元樹的一種，是一種用空間換取時間複雜度的演算法，特用於某種狀況。例：update Query 問題。

## 使用場景
+ 原題目：
> You are given an array of n elements, initially all a[i] = 0.
> q queries need to be performed.
> Each query contains three Integer l, r, x and you need to change all a[i] to (a[i] | x) for all l <= i <= r.
> Return the array after executing Q queries.

+ 簡譯：
> 假設有一含有 n 個元素的陣列 `a[]`  
> 與一個含有 k 個陣列的二維陣列 `q[][3]`  
> `q[k][0]` 代表左標 `l`  
> `q[k][1]` 代表右標 `r`  
> `q[k][2]` 代表運算元 `x`，其中 `0 <= l <= r <= n - 1`  
> `a[]` 的初始值為 `{0, 0, ... 0}`  
> 每次 `a[]` 左標 `l` 與 右標 `r` 之間的所有元素會對 `x` 做 `|` 運算  
> 即 `a[l...r] = a[l...r] | x`  
> 而最後會得到對 k 個 `q[][]` 進行 update 得到 update 過後的 `a[]`。

+ 範例1：
```
/** Input: */  
n = 3, k = 2  
q = {{0,2,1},{0,2,2}}  
/** Output: */ 
a[] = {3,3,3}  
```
+ 範例1：
```
/** Input: */  
n = 3, k = 2  
q = {{0,1,1},{2,2,2}}  
/** Output: */ 
a[] = {1,2,3}  
```

## 暴力法
