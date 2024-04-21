---
title: "[C++] The C++ Standard Template Library(STL) - list, forward_list"
keywords: ["C++", "STL", "list", "forward_list"]
description: "C++ 中 STL 的 list 的函式與使用範例"
date: 2022-04-17T11:45:58+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
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
+ 而單向鏈結陣列則為 forward_list

## 函式庫
+ `#include <list>`
## 宣告
+ `list<data_type> list_name;`
## 初始化
```C++
list<int> lst;          // 宣告
```

## 函式
### 1. front()
### 2. back()
### 3. push_front()
### 4. push_back()
### 5. pop_front()
### 6. pop_back()
### 7. list::begin()
### 8. list::end()
### 9. list::rbegin()
### 10. list::rend()
### 11. list::cbegin()
### 12. list::cend()
### 13. list::crbegin()
### 14. list::crend()
### 15. empty()
### 16. insert()
### 17. erase()
### 18. assign()
### 19. remove()
### 20. list::remove_if()
### 21. reverse()
### 22. size()
### 23. list::resize()
### 24. sort()
### 25. list::max_size()
### 26. list::unique()
### 27. list::emplace_front()
### 28. list::emplace_back()
### 29. list::clear()
### 30. list::operator=
### 31. list::swap()
### 32. list::splice()
### 33. list::merge()4
### 34. list::emplace()


## 示例

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
#### 17. list.assign()
#### 18. list.remove()
#### 19. list.remove_if()
#### 20. list.reverse()
#### 21. list.size()
#### 22. list.resize()
#### 23. list.sort()
#### 24. list.max_size()
#### 25. list.unique()
#### 26. list.emplace_front()
#### 27. list.emplace_back()
#### 28. list.clear()
#### 29. list.swap()
#### 30. list.splice()
#### 31. list.merge()
#### 32. list.emplace()

+ 你可能會想繼續閱讀…
    + 回到[容器(Containers)](/c++/stl_container)
    + [vector](/c++/stl_vector)
    + [deque](/c++/stl_deque)
    + [arrays](/c++/stl_arrays)
    + [forward_list](/c++/stl_forward_list)
