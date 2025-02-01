---
title: "[LeetCode] 定長 Sliding Window Pattern"
date: 2022-10-25T12:31:32+08:00
tags: ["Leetcode", "Sliding Window"]
draft: false
Categories: Leetcode
author: "Rain Hu"
showToc: true
TocOpen: true
math: true
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