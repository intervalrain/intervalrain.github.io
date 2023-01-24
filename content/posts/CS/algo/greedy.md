---
title: "[Algo] 2-2. 貪心演算法 Greedy"
date: 2023-01-24T18:31:15+08:00
tags: ["CS", "Algo"]
draft: false
Categories: CS
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
cover:
    image: "/images/faang.webp"
    alt: "Oh! You closed up the window, so you cannot see raining"
    relative: false
    hidden: false
---
## 一、貪心演算法
+ 是一種**在每一步都採前當下看起來最好的選擇**的一種策略。
+ 由於是當下看起來最好的選擇，故也有可能選到錯的路線，導致最終的答案不是最佳解。
+ 先舉個生活中常見的例子：
    + 今天小明的撲滿裡存滿了大大小小的1塊、5塊跟10塊，今天小明打算要要幫撲滿瘦身，令它的重量降低，那麼小明可以到銀行換鈔，將幣值小、重量重的硬幣集結起來換成幣值大、重量輕的紙鈔。
    + 用貪心演算法的思維，我們一定是從幣值大的 1000 開始換起，再來 500、100、50、10，以此類推，有多少換多少。
    ```C++
    // vector<int>& nums = {1000, 500, 100, 50, 10, 5, 1};
    vector<int> coinChange(vector<int>& nums, int money) {
        vector<int> res(nums.size(), 0);
        for (int i = 0; i < nums.size(); i++) {
            res[i] += (money / nums[i]);
            money %= nums[i];
        }
        return res;
    }
    ```
    + 但若我們新增了一個幣值是 `23`，那麼上面這個思路就有可能會導致錯誤。
---
+ 回到目錄：[[Algo] 演算法筆記](/posts/cs/algo)  
+ 想要複習：[[Algo] 2-1. 暴力演算法](/posts/cs/algo/brute_force)
+ 接著閱讀：[[Algo] 2-3. 分治法](/posts/cs/algo/divide_and_conquer)