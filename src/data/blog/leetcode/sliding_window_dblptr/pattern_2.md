---
title: "[LeetCode] 不定長 Sliding Window Pattern"
author: "Rain Hu"
pubDatetime: 2022-11-01T14:00:00+08:00
description: ""
category: "Algorithm"
tags: ["Sliding Window"]
math: true
---
+ 不定長度的 sliding window pattern
+ 步驟    
    move sliding window  
        (1) 滑動左指標直到 window 有效
        (2) 加入右指標
        (3) 更新
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
    Solution(): _w() {}
    int solve(vector<int>& nums, int k) {
        _w = make_unique<WindowImpl>(k);
        int len = 0;
        int n = nums.size(), left = 0, right = 0;

        while (right < n) {
            int num = nums[right++];
            while (_w->check(num)) _w->erase(nums[left++]);
            _w->add(num);
            res = max(res, right-left);
        }
        return len;
    }
};
```