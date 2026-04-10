---
title: "[C++] The C++ Standard Template Library(STL) - pair"
author: "Rain Hu"
pubDatetime: 2022-06-02T01:23:15+08:00
description: "C++ 中 STL 的 pair 的函式與使用範例"
category: "Programming"
tags: ["C++"]
math: true
---

# pair
## 函式庫
+ `#include <utility>`
## 宣告
+ `pair<data_type1, data_type2> Pair_name;`
## 初始化
```C++
pair<int, int> p1;          // 宣告但不初始化
pair<int, char> p2(1, 'a'); // 不同資料型態的初始化
pair<int, int> p3(1, 10);   // 同資料型態的初始化
pair<int, int> p4(p3);      // 利用其它 pair 來初始化
pair<int, int> p5 = {1, 2}  // 用 assign 的方式初始化

p2 = make_pair(1, 'a');     // 利用 make_pair 函式
```
## 成員
+ `.first`
+ `.second`

## 函式
### 1. make_pair(v1, v2);
### 2. pair1.swap(pair2);
### 3. tie(a,b)


## 示例
```C++
#include <iostream>
#include <utility>
using namespace std;

int main(){
    // initialize
    pair<int,int> p1;
    pair<int,int> p2(2,4);
    pair<int,char> p3(3,'c');
    pair<int,int> p4(p2);
    pair<int,int> p5 = {5,10};

    // member
    cout << p2.first << " " << p2.second << endl;       // 2 4
    cout << p3.first << " " << p3.second << endl;       // 3 c
    cout << p4.first << " " << p4.second << endl;       // 2 4
    cout << p5.first << " " << p5.second << endl;       // 5 10

    // function
    p1 = make_pair(1,2);
    cout << p1.first << " " << p1.second << endl;       // 1 2

    // a.swap(b)
    p1.swap(p2);
    cout << p1.first << " " << p1.second << endl;       // 2 4
    cout << p2.first << " " << p2.second << endl;       // 1 2

    // tie(a,b) = pair
    int a, b;
    tie(a, b) = p1;
    cout << a << " " << b << endl;                      // 2 4

    return 0;
}
```