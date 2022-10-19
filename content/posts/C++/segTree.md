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


## Leetcode. 307 範例
+ https://leetcode.com/problems/range-sum-query-mutable/
1. TreeNode 變形 
```C++
class NumArray {
    class SegTree {
    public:
        int val;
        int begin, end;
        SegTree* left, *right;
        SegTree(int v):val(v) {}
        SegTree(int v, int b, int e):val(v), begin(b), end(e) {}
        SegTree(int v, int b, int e, SegTree* l, SegTree* r)
            :val(v), begin(b), end(e), left(l), right(r) {}
    };
    
    SegTree* root;
    
    SegTree* build(vector<int>& nums, int b, int e){
        if (e < b) return NULL;
        if (b == e) return new SegTree(nums[b], b, b);
        int mid = b + (e-b)/2;
        SegTree* left = build(nums, b, mid);
        SegTree* right = build(nums, mid+1, e);
        return new SegTree(left->val + right->val, b, e, left, right);
    }
    
    void update(SegTree* node, int index, int val){
        if (node->begin == index && node->end == index){
            node->val = val;
        } else {
            int mid = node->begin + (node->end - node->begin)/2;
            if (index <= mid){
                update(node->left, index, val);
            } else {
                update(node->right, index, val);
            }
            node->val = node->left->val + node->right->val;
        }
    }
    int query(SegTree* node, int left, int right){
        if (node->begin == left && node->end == right){
            return node->val;
        }
        int mid = node->begin + (node->end - node->begin)/2;
        if (right <= mid){
            return query(node->left, left, right);
        } else if (left > mid){
            return query(node->right, left, right);
        }
        return query(node->left, left, mid) + query(node->right, mid+1, right);
    }
    
public:
    NumArray(vector<int>& nums) {
        root = build(nums, 0, nums.size()-1);
    }
    
    void update(int index, int val) {
        update(root, index, val);
    }
    
    int sumRange(int left, int right) {
        return query(root, left, right);
    }
};
```
2. zkw 線段樹
```C++
class NumArray {
    class SegTree {
        vector<int> arr;
        int m, n;
    public:
        SegTree(vector<int>& nums) {
            n = nums.size();
            for (m = 1; m < n; m <<= 1);
            build(nums);
        }
        void build(vector<int>& nums) {
            arr.assign(2*m, 0);
            for (int i = 0; i < n; ++i) arr[m+i] = nums[i];
            for (int i = m-1; i; --i) arr[i] = arr[i<<1] + arr[i<<1|1];
        }
        void update(int index, int val) {
            int diff = val - arr[m+index];
            for (index += m; index; index >>= 1) arr[index] += diff;
        }
        int query(int left, int right) {
            int sum = 0;
            for (int i = left+m, j = right+m; i <= j; i >>= 1, j >>= 1){
                if (i & 1) sum += arr[i++];
                if (!(j & 1)) sum += arr[j--];
            }
            return sum;
        }
    };
public:
    SegTree* root;
    NumArray(vector<int>& nums) {
        root = new SegTree(nums);
    }
    
    void update(int index, int val) {
        root->update(index, val);
    }
    
    int sumRange(int left, int right) {
        return root->query(left, right);
    }
};
```

# BIT(binary indexed tree)
```C++
class NumArray {
public:
    class Bit {
    public:
        vector<int> bit;
        int n;
        Bit(vector<int>& nums) {
            n = nums.size();
            bit.assign(n+1, 0);
            for (int i = 0; i < n; i++){
                build(i+1, nums[i]);
            }
        }
        void build(int index, int val) {
            while (index <= n){
                bit[index] += val;
                index = next(index);
            }
        }
        int next(int index) {
            return index + (index & -index);
        } 
        int parent(int index) {
            return index - (index & -index);
        }
        int getSum(int index) {
            int sum = 0;
            while (index){
                sum += bit[index];
                index = parent(index);
            }
            return sum;
        }
    };
    Bit* bit;
    NumArray(vector<int>& nums) {
        bit = new Bit(nums);
    }
    
    void update(int index, int val) {
        int diff = val - sumRange(index, index);
        bit->build(index+1, diff);
    }
    
    int sumRange(int left, int right) {
        return bit->getSum(right+1) - bit->getSum(left);
    }
};
```