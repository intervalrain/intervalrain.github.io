---
title: "[C++] Cout functions"
author: "Rain Hu"
pubDatetime: 2022-04-08T10:20:38+08:00
description: "C++ 的 cout 函式介紹"
category: "Programming"
tags: ["C++"]
math: true
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