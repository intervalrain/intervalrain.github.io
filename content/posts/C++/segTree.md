---
title: "[C++] Segment Tree"
date: 2022-10-18T23:14:38+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Segment Tree Introduction"                     
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
# 線段樹 Segment Tree
## 簡介
+ 線段樹是演算法中常用來維護**區間訊息**的資料結構。
+ 空間複雜度為 \\(O(n)\\)，\\(n\\) 代表區間數。
+ 查詢的時間複雜度為 \\(O(\log n+k)\\)，\\(k\\) 代表符合條件的區間數量。
+ 線段樹將每個長度為為 1 的區間劃分為左右兩個區間遞迴求解，把整個線段劃分為一個樹型結構，通過合併左右兩個區間訊息來求得該區間的訊息。
+ 在實現時，我們考慮遞迴建樹，設當前的根節點為 root，如果根節點管轄的區間長度已經是 1，則可以直接根據數組上相應位置的值初始化該節點。否則需將該區間從中點處分割為兩個子區間，分別進入左右子節點遞迴建樹，最後合併兩個子節點的訊息，
## 建樹 build
```C++
void build(int s, int t, int p, const vector<int>& arr){
    if (s == t){
        tree[p] = SegmentItem(arr[s], 1);
        return;
    }
    int m = s + ((t - s) >> 1);
    build(s, m, p*2, arr);
    build(m+1, t, p*2+1, arr);
    // push_up
    tree[p] = tree[p*2] + tree[(p*2)+1];
}
```
## 查詢 query
```C++
SegmentItem find(int l, int r, int s, int t, int p){
    if (l <= s && t <= r){
        return tree[p];
    }
    int m = s + ((t - s) >> 1);
    SegmentItem sum;
    if (r <= m) return find(l, r, s, m, p*2);
    if (l > m) return find(l, r, m+1, t, p*2+1);
    return find(l, r, s, m, p*2) + find(l, r, m+1, t, p*2+1);
}
```

# zkw 線段樹
+ 來自清華大學張昆瑋(zkw)-《統計的力量》
+ 以非遞迴的方式構建，效率更高，程式更短。
## 結構
+ 線段樹索引堆疊：
![zkw1](/images/zkw1.jpg)
+ 轉成二進制：
![zkw2](/images/zkw2.jpg)
+ 規律：
    + 一個節點的父節點是該數右移 1，低位捨棄。
    + 一個節點的左子節點是該數左移 1，右子節點是該數左移 1 再加 1。
    + 同一層的節點是依次遞增的，第 \\(n\\) 層有 \\(2^{n-1}\\)個節點
    + 最後一層有多少個節點，值域就是多少
## 建樹 build
+ 最後一層不是 2 的次冪怎麼辦？依然開到 2 的次冪，其餘省略
```C++
int n, M, q;
int d[N<<1];
inline void build(int n){
    for (M = 1; M < n; M <<= 1);
    for (int i = M+1; i <= M+n; i++) d[i] = in();
}
```
+ 其中 `in()` 為需要的操作，如下：
    + 維護區間和
    ```C++
    for (int i = M-1; i; --i) d[i] = d[i<<1]+d[i<<1|1];
    ```
    + 維護最大值
    ```C++
    for (int i = M-1; i; --i) d[i] = max([i<<1],d[i<<1|1]);
    ```
    + 維護最小值
    ```C++
    for (int i = M-1; i; --i) d[i] = min([i<<1],d[i<<1|1]);
    ```
## 單點操作
+ 單點修改
```C++
void update(int x, int v){
    d[x=M+x] += v;
    while (x) d[x>>=1]=d[x<<1]+d[x<<1|1];
}
```
+ 單點查詢(差分思想)
把 d 維護的值修改一下，變成維護它與父節點的差值
```C++
void build(int n){
    for (M=1; M <= n+1; M <<= 1);
    for (int i = M+1; i <= M+N; i++) d[i] = in();
    for (int i = M-1; i; --i){
        d[i] = min(d[i<<1], d[i<<1|1]);
        d[i<<1] -= d[i];
        d[i<<1|1] -= d[i];
    } 
}
```
+ 當前的查詢則為
```C++
int sum(int x, int res = 0){
    while (x) {
        res += d[x];
        x >>= 1;
    }
    return res;
}
```

## 區間操作
+ 詢問區間和，把 [s,t] 區間換成 (s,t) 開區間來計算
```C++
int sum(int s, int t, int res = 0){
    for (s = s+M-1, t=t+M+1; s^t^1; s >>= 1, t >>= 1){
        if (~s&1) res += d[s^1];
        if ( t&1) res += d[t^1];
    }
    return res;
}
