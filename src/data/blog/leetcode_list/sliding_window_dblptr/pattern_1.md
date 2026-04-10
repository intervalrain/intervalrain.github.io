---
title: "[LeetCode] 定長 Sliding Window Pattern"
author: "Rain Hu"
pubDatetime: 2022-10-25T12:31:32+08:00
description: ""
category: "Algorithm"
tags: ["Sliding Window"]
math: true
---
+ 定長度的 sliding window pattern
+ 步驟
    1. construct sliding window + check condition
    2. move sliding window  
        (1) remove item  
        (2) check condition  
        (3) add item  
```cpp
class Window {
public:
    virtual void add(int num) = 0;
    virtual void erase(int num) = 0;
    virtual bool check(int num) = 0;
    virtual ~Window() {}
};

class Solution {
private:
    unique_ptr<Window> _w;
public:
    bool solve(vector<int>& nums, int k) {
        _w = make_unique<WindowImpl>(k);
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if (i >= k) _w->erase(nums[i-k]);
            if (_w->check(nums[i])) return true;
            _w->add(nums[i]);
        }
        return false;
    }
};
```