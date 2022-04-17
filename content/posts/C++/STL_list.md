---
title: "[C++] The C++ Standard Template Library(STL) - List"
date: 2022-04-17T11:45:58+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Introduction to Vector"
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

# list
+ Lists 是序列式容器，但其記憶體的分配並非連續的。
+ 跟 vector 相比，其遍歷的速度會較慢\\(O(n)\\，但一旦位置確定後，其插入(insert)或移除(delete)元素的速度很快\\(O(1)\\)。
+ 一般來說，List 指的是雙向鏈結陣列(doubly linked list)。
+ 而單向鏈結陣列則為 [forward_list](https://intervalrain.github.io/posts/c++/stl_forward_list)。

## 函式(functions)
#### 1. list.front()
#### 2. list.back()
#### 3. list.push_front(E val)
#### 4. list.push_back(E val)
#### 5. list.begin()
#### 6. list.end()
#### 7. list.rbegin()
#### 8. list.rend()
#### 9. list.cbegin()
#### 10. list.cend()
#### 11. list.crbegin()
#### 12. list.crend()
#### 13. list.empty()
#### 14. list.insert()
#### 15. list.erase()
#### 16. list.assign()
#### 17. list.remove()
#### 18. list.remove_if()
#### 19. list.reverse()
#### 20. list.size()
#### 21. list.resize()
#### 22. 


+ 你可能會想繼續閱讀…
    + 回到[容器(Containers)](https://intervalrain.github.io/posts/c++/stl_container)
    + [vector](https://intervalrain.github.io/posts/c++/stl_vector)
    + [deque](https://intervalrain.github.io/posts/c++/stl_deque)
    + [arrays](https://intervalrain.github.io/posts/c++/stl_arrays)
    + [forward_list](https://intervalrain.github.io/posts/c++/stl_forward_list)