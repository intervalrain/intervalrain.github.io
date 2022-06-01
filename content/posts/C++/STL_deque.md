---
title: "[C++] The C++ Standard Template Library(STL) - deque"
date: 2022-06-12T01:36:18+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Introduction to deque" 
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

# Deque
+ 不同於 stack 與 queues， deques 兩個端點都支援擴展。
+ 基於 doubly linked list，deques 有幾項額外的特徵：
    + 支援隨機存取
    + 插入元素時間 \\(O(1)\\)
## 函式
### 1. push_front()
### 2. push_back()
### 3. front()
### 4. back()

### 5. begin()
### 6. end()
### 7. insert()
### 8. erase()
### 9. pop_front()
### 10. pop_back()
### 11. empty()
### 12. clear()
### 13. random_access()

## 內部運作原理
![deque](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20191224101416/Untitled-Diagram5.png)
+ 上述所有函數和操作都在雙鏈表中以O（1）時間執行，但這些清單不能隨機訪問任何元素。C++中的deque也是如此。這個 O（1） 在 deque 中可以使用圓形陣列來實現。使用循環陣列，可以在O（1）時間內實現從陣列的正面和背面插入和刪除等操作以及元素的隨機訪問。但這帶來了一個問題。當 deque 增長到超出容量時，使用者將需要將數位大小加倍，並將所有數據複製到陣列中。此外，如果數據是某個使用者定義的對象，那麼加倍和複製數據的成本就會變得非常昂貴。
這是一個基本的解決方案。Deque使用一些棘手的實現，當它說O（1）來push_back（）和push_front（）時，它實際上是調用的複製構造函數數量的常數時間。因此，如果數據物件是具有多個成員的某個類物件，則最小化複製構造函數調用的數量將節省時間。此外，複製構造函數調用的次數是恆定的。現在讓我們看看如何實現這一點。
1. 這可以通過使用指向一些固定大小的塊的指標數位來實現，這些塊包含deque數據。下面是一個說明性示例。
2. 這些 Deque 數據被劃分為固定大小的塊。在這裡，我們考慮了將數據劃分為大小為5的固定塊。
3. 塊的填充從指標的兩個 deque 陣列的中間開始，並使用push_front和push_back操作向前和向後擴展。中間塊通常是滿的，當它被填滿時，數據被移動到上部或下部塊。
4. 在上部塊中，元素以相反的順序推送，因為在這種情況下，填充數據的第一個位置將是4，然後是3，2，1，0。但是在中間和下部塊中，數據按正向順序填充，如0，1，2，3，4等。
5. 當上面的塊被填滿時，指標將創建一個新塊並開始指向一個新的數位塊。這為更多數據創造了空間。在這種情況下，也可以填充指標塊。這會導致一個問題。
6. 這是加倍來救援的時候。在加倍時，指標陣列的大小加倍。這不會複製整個數據，而只會複製指標。這是許多人在討論恆定時間時提出的一般論點。時間在調用的複製構造函數數方面保持不變。
7. 如果數據集非常大，則指標塊幾乎不會執行加倍，因為單個指標可以指向大量數據塊。因此，指標陣列被填充並加倍的可能性非常小。