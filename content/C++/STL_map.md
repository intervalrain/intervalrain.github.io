---
title: "[C++] The C++ Standard Template Library(STL) - map"
keywords: ["C++", "STL", "map", "multimap", "unordered_map", "unordered_multimap"]
description: "C++ 中 STL 的 map 的函式與使用範例"
date: 2022-04-23T22:24:21+08:00
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
# map
## 宣告
```Cpp
map <int, int> mp; // key和value都是整數
```

## 方法
### mp[key] = value;
+ 加入新的key-value pair
### mp.count(key);
+ 檢查 key 是否存在 map 中
### mp.erase(key);
+ 刪除 key
### mp.clear();
+ 清空 map 中的所有元素：
### value = mp[key]
+ 利用 key 取值
### mp.empty()
+ 判斷是否為空的map
### map 的遍歷
+ 遍歷整個map時，利用iterator操作：
+ 取key：it->first 或 *(it).first
+ 取value：it->second 或 *(it).second
```Cpp
for (auto it = mp.begin(); it != mp.end(); ++it){
    cout << it->first << " => " << it->second << '\n';
}
 
for (auto it = mp.begin(); it != mp.end(); ++it){
    cout << (*it).first << " => " << (*it).second << '\n';
}
```