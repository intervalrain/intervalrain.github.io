---
title: "[C++] How to Initialize vector in C++"
date: 2022-03-03T01:33:02+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "Desc Text."                     
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
# 如何初始化 vector
## 事先準備
+ `#include <iostream>`
+ `#include <vector>`
+ `using namespace std;`

### 1. 利用 push_back() 函式
```Cpp
vector<int> A;
A.push_back(1);
A.push_back(2);
A.push_back(3);  // A = [1,2,3]
```

### 2. 利用重載建構子(overloaded constructor)
```Cpp
int size = 5;
int fill = 2;
vector<int> B(size, fill);  // B = [2,2,2,2,2]
```

### 3. 將 array 傳給 vector 的建構子(-std=c++11)
```Cpp
vector<int> C{1, 2, 3, 4, 5};  // C = [1,2,3,4,5]
```

### 4. 利用既有的 array
```Cpp
int array[] = {1,2,3,4,5};
vector<int> D(array, array+4);   // D = [1,2,3,4]
```

### 5. 利用既有的 vector
```Cpp
vector<int> E(C.begin()+1, C.end()-3);   // E = [2]
```
   
### 6. 利用 fill 函式
```Cpp
vector<int> F(6);
fill(F.begin(), F.end(), 3);   // F = [3,3,3,3,3,3]
```

[Reference](https://www.simplilearn.com/tutorials/cpp-tutorial/how-to-initialize-a-vector-in-cpp)