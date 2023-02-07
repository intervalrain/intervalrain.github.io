---
title: "[Algo] 2-3. 分治法 Divide and Conquer"
date: 2023-01-27T10:48:42+08:00
tags: ["CS", "Algo"]
draft: false
Categories: Leetcode
author: "Rain Hu"
showToc: true
TocOpen: true
math: true
mermaid: true
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
## 一、分治法

+ 分治法，簡而言之就是分而治之，把複雜的問題分成兩個或更多個相似或相似的子問題，直到子問題可以直接求解，最後再將子問題的解做合併。
+ 三步驟：`Divide`、`Conquer`、`Merge`
+ 以 pseudo code 來表示大概像：
    ```C++
    void func(collection set) {
        // 子問題求解
        if (base_case) {
            // 根據要求將子問題解合併成母問題解
            do_something
            return;
        }
        // 將母問題分解成子問題
        for (collection subset : set) {
            func(subset);
        }
    }
    ```

{{<mermaid>}}
graph LR;
    母問題-->子問題1;
    母問題-->子問題2;
    subgraph Divide
    子問題1-->最小子問題1;
    子問題1-->最小子問題2;
    子問題2-->最小子問題3;
    子問題2-->最小子問題4;
    end
    subgraph Conquer
    最小子問題1-->最小子問題解1;
    最小子問題2-->最小子問題解2;
    最小子問題3-->最小子問題解3;
    最小子問題4-->最小子問題解4;
    end
    subgraph Merge
    最小子問題解1-->合併;
    最小子問題解2-->合併;
    最小子問題解3-->合併;
    最小子問題解4-->合併;
    end
    合併-->母問題解
{{</mermaid>}}
+ 舉例說明，河內塔遊戲：
![hanoi](https://pic3.zhimg.com/v2-62f8246d7a1c955f1b7206171cca14ce_r.jpg)
    + 河內塔是由三根桿子以大小不同碟片所組成的遊戲，僧人一次可以從一根桿子移動一個碟片到另一根桿子，但是小的碟片若放憂大的碟片下面會使得小的碟片裂開(也就是碟片只能由上而下從小排到大)，試問將一座塔從一根桿子完整的移動到另一根桿子需要移動多少次。
    ![solve](http://notepad.yehyeh.net/Content/DS/CH02/img/TowerOfHanoiStep.png)
    + 思考上面的情形，以三個碟片為例，若我們要從 `A` 到 `C` 移動一座塔，我們可以將之分解成「如何把上面兩個碟片移動到 `B`」，因為剩下的一個大碟片，可以很簡單的從 `A` 移動到 `C`。也就是說 `f3(A->C) = f2(A->B) + f1(A->C) + f2(B->C)`。
    + 再更進一步，`f2(A->B)` 和 `f2(B->C)` 其實就是移動兩個碟片到另一座塔，所以可以分解成 `f2(A->C) = f1(A->B) + f1(A->C) + f1(B->C)`，至此，我們已經把 `f3` 都分解成可以代表**一次移動**的最小子問題的解 `f1` 了：
    {{<mermaid>}}
    graph TD;
    A[f3,A->C]
    B[f2,A->B]
    C[f1,A->C]
    D[f2,B->C]
    E[f1,A->C]
    F[f1,A->B]
    G[f1,C->B]
    H[f1,B->A]
    I[f1,B->C]
    J[f1,A->C]
        A-->B
        A--->C
        A-->D
        B-->E
        B-->F
        B-->G
        D-->H
        D-->I
        D-->J
    {{</mermaid>}}
    + 故我們可以以數學方式證明：  
    \\(\begin{array}{l}
        T(n)=T(n-1)+T(1)+T(n-1)=2T(n-1)+T(1)\\\\
        T(n-1)=T(n-2)+T(1)+T(n-2)=2T(n-2)+T(1)\\\\
        T(n)=2[2T(n-2)+T(1)]+T(1)\\\\
        T(n)=2\times2T(n-2)+(1+2)T(1)\\\\
        T(n)=2^k\times T(n-k)+(1+2+...+2^k)T(1)\\\\
        令k=n-1\\\\
        T(n)=2^{n-1}\times T(1)+(1+2+...+2^{n-1})T(1)\\\\
        T(n)=2^{n-1}\times T(1)+\frac{2^{n-1}-1}{2-1}T(1)\\\\
        T(n)=(2^n-1)\times T(1)
    \end{array}\\)
    + 得所需要的移動次數為 \\(2^n-1\\) 次
+ 分治法的特色
    1. 要解決的問題有一定的規模
    2. 該問題可以分解成若干個規模較小的問題
    3. 可以找到一個 base case，可以直接求解(如上述數學證明的\\(T(1)\\))
    4. 分解出來的子問題都是相互獨立的。(若有相依性，則無法使用分治法)
+ 分治法的時間複雜度  
    + 將規模為 `n` 的問題分為 `k`個規模為 `n/m` 的子問題去解，那麼可以得到  
    \\(T(n)=kT(n/m)+f(n)\\)
## 二、分治法的應用
### 1. 二元搜索法 Binary Search
+ 令有一**已排序**的數列，欲查找該數列中是否有數值 `x`。
    + 由於該數列已經過排序，所以我們無需遍歷整個數列，我們可以選擇每次挑選數列的中間值，若目標比中間值大，則選擇大的那側再繼續做篩選，此法稱為二元搜索法，其時間複雜度可以從線性搜索法的 \\(O(n)\\) 降低到 \\(O(n\log n)\\)。
    ```C++
    int binarySearch(vector<int>& nums, int target) {
        int left = 0, right = nums.size()-1;
        while (left <= right) {
            int mid = left + (right-left)/2;
            if (nums[mid] == target)
                return mid;
            else if (nums[mid] < target) 
                left = mid + 1;
            else if (nums[mid] > target)
                right = mid - 1;
        }
        return -1;
    }
    ```
### 2. Strassen 矩陣乘法
+ 試做一個矩陣\\(A\\)與矩陣\\(B\\)內積。
    + \\(
        A=\left[\begin{matrix}A_{11}&A_{12}\\\\A_{21}&A_{22}\end{matrix}\right],
        B=\left[\begin{matrix}B_{11}&B_{12}\\\\B_{21}&B_{22}\end{matrix}\right],
        C=\left[\begin{matrix}C_{11}&C_{12}\\\\C_{21}&C_{22}\end{matrix}\right],其中\\\\
        \left[\begin{matrix}C_{11}&C_{12}\\\\C_{21}&C_{22}\end{matrix}\right]=\left[\begin{matrix}A_{11}&A_{12}\\\\A_{21}&A_{22}\end{matrix}\right]\cdot\left[\begin{matrix}B_{11}&B_{12}\\\\B_{21}&B_{22}\end{matrix}\right]
    \\)
    + 若通過一般展開可得  
    \\(
        C_{11}=A_{11}\cdot B_{11}+A_{12}\cdot B_{21}\\\\
        C_{12}=A_{11}\cdot B_{12}+A_{12}\cdot B_{22}\\\\
        C_{21}=A_{21}\cdot B_{11}+A_{22}\cdot B_{21}\\\\
        C_{22}=A_{21}\cdot B_{12}+A_{22}\cdot B_{22}
    \\)
    + 從上可得計算兩個 \\(n\cdot n\\) 的矩陣內積需要 兩個 \\(\frac{n}{2}\cdot\frac{n}{2}\\) 的矩陣做 8 次的乘法加上 4 次的加法，其時間複雜度可以表示成：  
        + \\(
            T(n)=8T(\frac{n}{2})+\Theta(n^2)\\\\
            T(\frac{n}{2})=8T(\frac{n}{4})+\Theta({\frac{n}{2}}^2)\\\\
            T(n)=8\left[{8T(\frac{n}{4})+\Theta({{(\frac{n}{2}})}^2)}\right]+\Theta(n^2)\\\\
            T(n)=8^2T(\frac{n}{4})+\Theta(n^2)+8\Theta(\frac{n^2}{4})=8^2T(\frac{n}{4})+(1+2)\Theta(n^2)\\\\
            T(n)=8^kT(\frac{n}{2^k})+(1+2+...+2^{k-1})\Theta(n^2)\\\\
            令n=2^k\\\\
            T(n)=n^3T(1)+(\frac{n/2-1}{2-1})\Theta(n^2)\approx \Theta(n^3)
        \\)
    + 若使用 Strassen 演算法
        1. 同樣將矩陣\\(A,B,C\\)作分解，\\(時間\Theta(1)\\)
        2. 創建 10 個 \\(\frac{n}{2}\cdot\frac{n}{2}\\) 的矩陣 \\(S_1,S_2,...,S_{10}\\)，時間\\(\Theta(n^2)\\)  
            \\(
                S_1=B_{12}-B_{22}\\\\
                S_2=A_{11}+A_{12}\\\\
                S_3=A_{21}+A_{22}\\\\
                S_4=B_{21}-B_{11}\\\\
                S_5=A_{11}+A_{22}\\\\
                S_6=B_{11}+B_{22}\\\\
                S_7=A_{12}-A_{22}\\\\
                S_8=B_{21}+B_{22}\\\\
                S_9=A_{11}-A_{21}\\\\
                S_{10}=B_{11}+B_{12}\\\\
            \\)
        3. 遞迴的計算 7 個矩陣積 \\(P_1,P_2,...,P_7\\)，其中每個矩陣\\(P_i\\)都是\\(\frac{n}{2}\cdot\frac{n}{2}\\)的。  
            \\(
                P_1=A_{11}\cdot S_1=A_{11}\cdot B_{12}-A_{11}\cdot B_{22}\\\\
                P_2=S_2\cdot B_{22}=A_{11}\cdot B_{22}+A_{12}\cdot B_{22}\\\\
                P_3=S_3\cdot B_{11}=A_{21}\cdot B_{11}+A_{22}\cdot B_{11}\\\\
                P_4=A_{22}\cdot S_4=A_{22}\cdot B_{21}-A_{22}\cdot B_{11}\\\\
                P_5=S_5\cdot S_6=A_{11}\cdot B_{11}+A_{11}\cdot B_{22}+A_{22}\cdot B_{11}+A_{22}\cdot B_{22}\\\\
                P_6=S_7\cdot S_8=A_{12}\cdot B_{21}+A_{12}\cdot B_{22}-A_{22}\cdot B_{21}-A_{22}\cdot B_{22}\\\\\\\\
                P_7=S_9\cdot S_{10}=A_{11}\cdot B_{11}+A_{11}\cdot B_{12}-A_{21}\cdot B_{11}-A_{21}\cdot B_{12}\\\\\\\\\\\\
            \\)
        4. 藉由 \\(P_i\\) 來計算得到 矩陣 \\(C\\)：時間\\(\Theta(n^2)\\)  
            \\(
                C_{11}=P_5+P_4-P_2+P_6\\\\
                C_{12}=P_1+P_2\\\\
                C_{21}=P_3+P_4\\\\
                C_{22}=P_5+P_1-P_3-P_7
            \\)
        + 綜合已上可得：
            + \\(
                T(n)=\bigg\lbrace
                \begin{array}{ll}
                    \Theta(1)&若n=1\\\\
                    7T{\frac{n}{2}}+\Theta(n^2)&若n>1
                \end{array}
            \\)
            + 故時間複雜度可推得 \\(T(n)=\Theta(n^{\log_27})\approx \Theta(n^{2.807})\\)
        + 參考來源 [Wikipedia](https://zh.wikipedia.org/wiki/%E6%96%BD%E7%89%B9%E6%8B%89%E6%A3%AE%E6%BC%94%E7%AE%97%E6%B3%95)

### 3. 合併排序 Merge Sort
+ 在[[Algo] 0-4. 二元樹(Binary Tree)](/posts/cs/algo/binary_tree)中有介紹過，**合併排序**跟**快速排序**都有著類似前序、後序的結構，
+ 步驟：
    1. 將數列拆成若干個只有 1 個元素的子數列(因為只有一個元素，所有可以視為已排序的數列)。
    2. 將已排序的數列兩兩合併，直到所有的數列都合併完成，即完成排序。
+ 程式碼實作：[mergeSort](https://github.com/intervalrain/Cpp/blob/main/algo/sorting/mergeSort.cpp)
### 4. 快速排序 Quick Sort
+ 步驟：
    1. 選定一個數當作樞紐(pivot)，將小於此數的值都放到左邊，大於此數的都放到右邊。
    2. 反覆同樣動作，直到子數列只有一個數，即完成排序。
+ 程式碼實作：[quickSort](https://github.com/intervalrain/Cpp/blob/main/algo/sorting/quickSort.cpp)

## 三、例題
---

+ 回到目錄：[[Algo] 演算法筆記](/posts/cs/algo)  
+ 想要複習：[[Algo] 2-2. 貪心演算法](/posts/cs/algo/greedy)
+ 接著閱讀：[[Algo] 2-4. 回溯法](/posts/cs/algo/backtracking)