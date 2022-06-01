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
+ 而單向鏈結陣列則為 [forward_list](/posts/c++/stl_forward_list)。

```Cpp
#include <iostream>
#include <iterator>
#include <list>

using namespace std;

void print(list<int> lst){
    list<int>::iterator it;
    for (it = lst.begin(); it != lst.end(); ++it){
        cout << *it << " ";
    }
    cout << "\n";
}

int main(){
    list<int> lst1, lst2;
    for (int i = 0; i < 10; ++i){
        lst1.push_back(i);
        lst2.push_front(i);
    }
    cout << "List1 is : ";
    print(lst1);
    cout << "List2 is : ";
    print(lst2);

    cout << "List1.front() : " << lst1.front() << "\n";
    cout << "List2.back() : " << lst2.back() << "\n";

    cout << "After List1.pop_front() : ";
    lst1.pop_front();
    print(lst1);
    cout << "After List2.pop_back() : ";
    lst2.pop_back();
    print(lst2);

    cout << "After List1.reverse() : ";
    lst1.reverse();
    print(lst1);

    cout << "After List2.sort() : "; 
    lst2.sort();
    print(lst2);

    return 0;
}
```

## 函式(functions)
#### 1. list.front()
+ Returns the value of the first element in the list.
#### 2. list.back()
+ Returns the value of the last element in the list.
#### 3. list.push_front(E val)
+ Adds a new element `val` at the beginning of the list.
#### 4. list.push_back(E val)
+ Adds a new element `val` at the end of the list.
#### 5. list.pop_front()
+ Removes the first element of the list, and reduces size of the list by 1. Won't return value.
#### 6. list.pop_back()
+ Removes the last element of the list, and reduces size of the list by 1. Won't return value.
#### 7. list.begin()
+ Returns a **iterator** pointing to the first element of the list.
#### 6. list.end()
+ Returns a **iterator** pointing to the theoretical last element which follows the last element.
#### 7. list.rbegin()
+ Returns a **reverse iterator** which points to the last element of the list.
#### 8. list.rend()
+ Returns a **reverse iterator** which points to the position before the beginning of the list.
#### 9. list.cbegin()
+ Returns a **constant random access iterator** which points to the beginning of the list.
#### 10. list.cend()
+ Returns a **constant random access iterator** which points to the end of the list.
#### 11. list.crbegin()
+ Returns a **constant reverse random access iterator** which points to the beginning of the list.
#### 12. list.crend()
+ Returns a **constant reverse random access iterator** which points to the end of the list.
#### 13. list.empty()
+ Returns whether the list is empty or not.
#### 14. list.insert(pos, n, val)
+ `pos`: iterator, to point out the position to insert
+ `n`: the numbers of val to insert (optional, default = 1)
+ `val`: the insert elements
+ Inserts new elements in the list before the element at a specified position.
#### 15. list.erase(pos)
+ `pos`: iterator, to point out the position to erase
+ Removes a single element from the list.
#### 16. list.erase(first, last)
+ `first`: iterator, to point out the begining of the range.
+ `last`: iterator, to point out the end of the range.
+ Removes a range of elements from the list.
#### 16. list.assign()
#### 17. list.remove()
#### 18. list.remove_if()
#### 19. list.reverse()
#### 20. list.size()
#### 21. list.resize()
#### 22. list.sort()
#### 23. list.max_size()
#### 24. list.unique()
#### 25. list.emplace_front()
#### 26. list.emplace_back()
#### 27. list.clear()
#### 28. list.swap()
#### 29. list.splice()
#### 30. list.merge()
#### 31. list.emplace()


+ 你可能會想繼續閱讀…
    + 回到[容器(Containers)](/posts/c++/stl_container)
    + [vector](/posts/c++/stl_vector)
    + [deque](/posts/c++/stl_deque)
    + [arrays](/posts/c++/stl_arrays)
    + [forward_list](/posts/c++/stl_forward_list)
