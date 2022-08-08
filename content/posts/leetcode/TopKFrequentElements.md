---
title: "[Leetcode] 347. Top K Frequent Elements"
date: 2022-07-23T23:48:15+08:00
tags: ["Leetcode"]
draft: false
Categories: Leetcode
description: "priority queue" 
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

# 347. Top K Frequent Elements
---
+ Hardness: Medium
> Given an integer array `nums` and an integer `k`, return the `k` *most frequent elements*. You may return the answer in any order.  

**Example 1:**  
\\(\begin{array}{|l|}\hline
\text{Input: nums = [1,1,1,2,2,3], k = 2}\\\\
\text{Output: nums = [1,2]}\\\\\hline
\end{array}\\)  

**Example 2:**  
\\(\begin{array}{|l|}\hline
\text{Input: nums = [1], k = 1}\\\\
\text{Output: nums = [1]}\\\\\hline
\end{array}\\)  

```C++
class Solution{
public:
    vector<int> topKElements(vector<int>& nums, int k){
        auto comp = [](const auto& a, const auto& b) { return a.second < b.second; };
        unordered_map<int,int> map;
        vector<int> res;
        for (int num : nums) map[num]++;
        priority_queue<pair<int,int>>, vector<pair<int,int>>, decltype(comp) pq(map.begin(), map.end(), comp);
        while (k--){
            res.push_back(pq.top().first);
            pq.pop();
        }
        return res;
    }
}; 
```

## 解題重點
+ 如果不熟 custom comparator 的話，也可以先把小的物件取出再拿大的。
+ 需要熟記 priority_queue 的宣告方式。
    1. `greater<>` 與 `less<>`
    ```C++
    priority_queue<int, vector<int>, greater<int>> pq;  // descending order
    priority_queue<int, vector<int>, less<int>> pq;     // ascending order
    ```
    ```C++
    auto comp = [](const auto& a, const auto& b) { return condition; } ;
    priority_queue<element, container, decltype(comp)> pq(iterator::start, iterator::end, comp);
    ```
    或
    ```C++
    priority_queue<element> pq;   // 預設為 max_heap
    ```