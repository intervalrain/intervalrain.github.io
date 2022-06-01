---
title: "[C++] The C++ Standard Template Library(STL) - pair"
date: 2022-06-02T01:23:15+08:00
tags: ["Algorithm", "Java", "C++", "Programming", "Life", "Music", "Semiconductor", "Logic Design", "TCAD"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Introduction to data structure pair"  
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

# pair
## 宣告
+ `pair (data_type1, data_type2) Pair_name;`
### 初始化
```C++
pair<int, int> p1;
pair<int, char> p2(1, 'a');
pair<int, int> p3(1, 10);
pair<int, int> p4(p3);

p2 = make_pair(1, 'a');
```
## 成員
+ `.first`
+ `.second`

## 函式
### 1. make_pair(v1, v2);
### 2. operators(=, ==, !=, >=, <=)
### 3. pair1.swap(pair2);