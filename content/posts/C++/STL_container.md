---
title: "[C++] The C++ Standard Template Library(STL) - Container"
date: 2022-04-15T01:09:18+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Introduction to containers in STL"
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

# 容器(Containers)

+ C++ container 基本上分為四大類：
    + Sequence containers
    + Container adaptors
    + Associative containers
    + Unordered associative containers
    + 還有兩個特殊 containers: valarray, bitset

\\(\begin{array}{|l|l|l|l|l|l|}\hline
\text{Name}&\text{Iterators}&\text{Capacity}&\text{Access}&\text{Modifiers}&\text{Others}
\\\\\hline
\text{array}&\text{begin}&\text{size}&\text{[]}&\text{swap}
\\\\&\text{end}&\text{empty}&\text{at}
\\\\&&&\text{front}
\\\\&&&\text{back}
\\\\\hline
\text{vector}&\text{begin}&\text{size}&\text{[]}&\text{push\\_back}&\text{}
\\\\&\text{end}&\text{empty}&\text{at}&\text{pop\\_back}
\\\\&&\text{capacity}&\text{front}&\text{insert}
\\\\&&&\text{back}&\text{erase}
\\\\&&&&\text{swap}
\\\\&&&&\text{clear}
\\\\\hline
\text{deque}&\text{begin}&\text{size}&\text{[]}&\text{push\\_back}&\text{}
\\\\&\text{end}&\text{empty}&\text{at}&\text{pop\\_back}
\\\\&&&\text{front}&\text{insert}
\\\\&&&\text{back}&\text{erase}
\\\\&&&&\text{swap}
\\\\&&&&\text{clear}
\\\\\hline
\text{list}&\text{begin}&\text{size}&\text{front}&\text{push\\_back}&\text{sort}
\\\\&\text{end}&\text{empty}&\text{back}&\text{pop\\_back}&\text{reverse}
\\\\&&&&\text{insert}
\\\\&&&&\text{erase}
\\\\&&&&\text{swap}
\\\\&&&&\text{clear}
\\\\\hline
\text{forward\\_list}&\text{begin}&\text{empty}&\text{front}&\text{push\\_front}&\text{sort}
\\\\&\text{end}&&&\text{pop\\_back}&\text{reverse}
\\\\&&&&\text{insert\\_after}
\\\\&&&&\text{erase\\_after}
\\\\&&&&\text{swap}
\\\\&&&&\text{clear}
\\\\\hline
\end{array}
\\) 


## 基礎容器
### [pair](/posts/c++/stl_pair)
## 序列式容器(Sequence Containers)
+ 特點是不會對儲存的元素進行排序，元素排列的順序取決於儲存的順序。
### [vector](/posts/c++/stl_vector)
### [list, forward_list](/posts/c++/stl_list)
### [deque](/posts/c++/stl_deque)
### [arrays](/posts/c++/stl_arrays)
## 容器適配器(Container Adaptors)
+ 用於封裝序列容器的類模板，在一般的序列容器的基礎上提供一些不同的功能，通過實現適配器的介面來提供不同的功能。
### [queue](/posts/c++/stl_queue)
### [priority_queue](/posts/c++/stl_priority_queue)
### [stack](/posts/c++/stl_stack)
## 關聯性容器(Associative Containers)
+ 又名 Map、Dictionary，是一種抽象的資料結構，包含著類似於(key, value)的有序對(entry)。
+ 一個關聯陣列中的有序對(entry)可以重複(如multimap)，也可以不重複(map)。
+ 利用雜湊表(Hash Table)或搜尋樹(search tree)實現，有些情況下，有可以使用直接定址的陣列、二元搜尋樹或其他專門的結構。
### [set](/posts/c++/stl_set)
### [multiset](/posts/c++/stl_multiset)
### [map](/posts/c++/stl_map)
### [multimap](/posts/c++/stl_multimap)
## 無序關聯容器(Unordered Associative Containers(C++11))
+ 通過雜湊表(Hash Table)實現的資料結構。
+ 無序是指元素的名字(或者鍵值)的儲存是無序的；這與用平衡二元樹實現的有序的關聯性容器是相對概念。
### [unordered_set](/posts/c++/stl_unordered_set)
### [unordered_multiset](/posts/c++/stl_unordered_multiset)
### [unordered_map](/posts/c++/stl_unordered_map)
### [unordered_mutlimap](/posts/c++/stl_unordered_multimap)

+ 你可能會想繼續閱讀…
    + [演算法(Algorithms)](/posts/c++/stl_algo)
    + [函式(Functions)](/posts/c++/stl_function)
    + [迭代器(Iterators)](/posts/c++/stl_iterator)
    + [Utility Library](/posts/c++/stl_util)