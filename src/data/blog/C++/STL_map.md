---
title: "[C++] The C++ Standard Template Library(STL) - map"
author: "Rain Hu"
pubDatetime: 2022-04-23T22:24:21+08:00
description: "C++ 中 STL 的 map 的函式與使用範例"
category: "Programming"
tags: ["C++"]
math: true
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