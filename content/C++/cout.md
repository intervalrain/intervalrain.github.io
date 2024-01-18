---
title: "[C++] Cout functions"
keywords: ["cout", "C++"]
description: "C++ 的 cout 函式介紹"
date: 2022-04-08T10:20:38+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
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
# cout Functions
### 設定顯示小數點位數
+ `setprecision(int n)` and `fixed`
```Cpp
#include <iostream>
#include <iomanip>

using namespace std;

int main(){

    double a = 5.43/2.653;
    cout << a << endl;                  // 2.04674
    cout << setprecision(3) << fixed;
    cout << a << endl;                  // 2.047
    
    return 0;
}
```

### 顯示 Boolean 值
+ `std::boolalpha`
```Cpp
#include <iostream>

using namespace std;

int main(){

    bool a = true;
    cout << a << endl;          // 1
    cout << std::boolalpha;
    cout << a << endl;          // true

    return 0;
}
```