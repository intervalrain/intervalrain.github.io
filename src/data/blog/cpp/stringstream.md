---
title: "[C++] stringstream 類範例 - split 與 concat"
author: "Rain Hu"
pubDatetime: 2022-10-14T00:21:23+08:00
description: "C++ 中字拆的 split 實作與 concatenate 實作"
category: "Programming"
tags: ["C++"]
math: true
---
# stringstream
![stringstream](http://www.pconline.com.cn/pcedu/empolder/gj/c/0504/pic/08cppios01.gif)
+ 需引用 `<sstream>` , `<iostream>`, `<string>`函式庫
+ 配合 `str()` 將 stringstream 類轉換成 string 類別。
## split()
```C++
vector<string> split(string& str, char del){
    stringstream ss(str);
    string item;
    vector<string> res;
    while (getline(ss, item, del)){
        if (!item.empty()){
            res.push_back(item);
        }
    }
    return res;
}
```

## concat()
```C++
string concat(vector<string>& svec, char del){
    stringstream ss;
    for (const auto& s : svec){
        ss << s << del;
    }
    return ss.str();
}
```

### [leetcode 1859. Sorting the Sentence]
```C++
class Solution {
public:
    string sortSentence(string s) {
        vector<string> tmp = split(s, ' ');
        int n = tmp.size();
        vector<string> svec(n);
        for (const string& s : tmp){
            int pos = s.back() - '1';
            svec[pos] = s.substr(0, s.length()-1);
        }
        return concat(svec, ' ');
    }
    string concat(vector<string>& svec, char del){
        string res;
        stringstream ss;
        for (const string& s : svec)
            ss << del << s;
        res = ss.str();
        return res.substr(1);
    }
    vector<string> split(string& str, char del){
        vector<string> res;
        stringstream ss(str);
        string item;
        while (getline(ss, item, del)){
            if (!item.empty()){
                res.push_back(item);
            }
        }
        return res;
    }
};
```