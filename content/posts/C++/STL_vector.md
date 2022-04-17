---
title: "[C++] The C++ Standard Template Library(STL) - Vector"
date: 2022-04-16T22:08:37+08:00
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
# vector
+ Vectors 是一動態陣列，可以自動的調整其容器的容量。
+ Vector 的元素被儲存在連續的記憶體空間，所以可以使用迭代器(iterators)來進行存取。
+ 在 vectors 中，元素是被插入在尾端的，插入尾端的時間取決於是否須進行容量的調整。
+ 在 vectors 中，刪除尾端元素的時間複雜度則是固定的\\(O(1)\\)，因為不會發生容量調整。
+ 在 vectors 的前端或中間插入元素或是清除元素，時間的複雜度都是\\(O(n)\\)。
## 迭代器(Iterators)
#### 1. vec.begin()
+ 回傳指向 vector 中第一個元素的迭代器 (vec[0])
#### 2. vec.end()
+ 回傳指向 vector 中最後一個元素之後一個的迭代器 (vec[n+1])
#### 3. vec.rbegin()
+ 回傳指向 vector 中最後一個元素的反向迭代器 (vec[n])
#### 4. vec.rend()
+ 回傳指向 vector 中第一個元素之前一個的反向迭代器 (vec[-1])
#### 5. vec.cbegin()
+ 回傳指向 vector 中第一個元素的常數迭代器 (vec[0])
#### 6. vec.cend()
+ 回傳指向 vector 中最後一個元素之後一個的常數迭代器 (vec[n+1])
#### 7. vec.crbegin()
+ 回傳指向 vector 中最後一個元素的反向常數迭代器 (vec[n])
#### 8. vec.crend()
+ 回傳指向 vector 中第一個元素之前一個的反向常數迭代器 (vec[-1])
```Cpp
#include <bits/stdc++.h>

using namespace std;

int main(){
    int arr[] = {1,1,2,3,5,8,13,21,34,55};
    int n = sizeof(arr)/sizeof(arr[0]);
    vector<int> vec(arr, arr + n);  // initialize with array
    
    cout << "Output of begin() and end(): ";
    for (auto i = vec.begin(); i != vec.end(); ++i) cout << *i << " ";
    
    cout << "\nOutput of rbegin() and rend(): ";
    for (auto i = vec.rbegin(); i != vec.rend(); ++i) cout << *i << " ";
    
    cout << "\nOutput of cbegin() and cend(): ";
    for (auto i = vec.cbegin(); i != vec.cend(); ++i) cout << *i << " ";

    cout << "\nOutput of crbegin() and crend(): ";
    for (auto i = vec.crbegin(); i != vec.crend(); ++i) cout << *i << " ";

    return 0;
}

```
結果：
```
Output of begin() and end(): 1 1 2 3 5 8 13 21 34 55 
Output of rbegin() and rend(): 55 34 21 13 8 5 3 2 1 1 
Output of cbegin() and cend(): 1 1 2 3 5 8 13 21 34 55 
Output of crbegin() and crend(): 55 34 21 13 8 5 3 2 1 1
```

## 容量(capacity)
#### 1. vec.size()
+ 回傳 vector 的元素數量
#### 2. vec.max_size()
+ 回傳 vector 可以持有的最大元素數量
#### 3. vec.capacity()
+ 回傳 vector 當前被分配到的儲存空間，以元素數目表示
#### 4. vec.empty()
+ 回傳容器是否沒有元素的
#### 5. vec.shrink_to_fit()
+ 將容器的容量縮減到剛好符合它的元素數量，並丟棄所有超出容量的元素
#### 6. vec.resize(int n)
+ 將容器的容量重新調整到 `n` 個元素的大小
#### 7. vec.reserve(int n)
+ 將容器的容量重新調整到至少可以容納 `n` 個元素的大小。
```Cpp
#include <bits/stdc++.h>

#include "print.cc"

using namespace std;

int main(){
    vector<int> vec;
    for (int i = 0; i <= 12; ++i)
        vec.push_back(i);
    cout << "Max_size: " << vec.max_size() << "\n";

    cout << "==================================\n";
    cout << "Initial" << "\n";
    cout << "Size: " << vec.size() << "\n";
    cout << "Capacity: " << vec.capacity() << "\n";
    print(vec);
    cout << "==================================\n";

    vec.resize(8);
    cout << "After resize(8)" << "\n";
    cout << "Size: " << vec.size() << "\n";
    cout << "Capacity: " << vec.capacity() << "\n";
    print(vec);
    cout << "==================================\n";

    vec.shrink_to_fit();
    cout << "After fitting" << "\n";
    cout << "Size: " << vec.size() << "\n";
    cout << "Capacity: " << vec.capacity() << "\n";
    print(vec);
    cout << "==================================\n";

    vec.reserve(20);
    cout << "After reserve(20)" << "\n";
    cout << "Size: " << vec.size() << "\n";
    cout << "Capacity: " << vec.capacity() << "\n";
    print(vec);
    cout << "==================================\n";

    cout << "If the vector is empty: ";
    vec.empty() ? (cout << "Empty") : (cout << "Not empty") << "\n";

    return 0;
}
```
結果：
```
Max_size: 4611686018427387903
==================================
Initial
Size: 13
Capacity: 16
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
==================================
After resize(8)
Size: 8
Capacity: 16
[0, 1, 2, 3, 4, 5, 6, 7]
==================================
After fitting
Size: 8
Capacity: 8
[0, 1, 2, 3, 4, 5, 6, 7]
==================================
After reserve(20)
Size: 8
Capacity: 20
[0, 1, 2, 3, 4, 5, 6, 7]
==================================
If the vector is empty: Not empty
```

## 存取元素(access elements)
#### 1. vec[int n]
+ 回傳 `n` 指標位置的值
#### 2. at(int n)
+ 回傳 `n` 指標位置的位
#### 3. front()
+ 回傳第一個元素的值
#### 4. back()
+ 回傳最後一個元素的值
#### 5. data()
+ 回傳一個直接的指標指向 vector 的記憶體位置
```Cpp
#include <bits/stdc++.h>
#include "print.cc"

using namespace std;

int main(){
    int arr[] = {0, 1, 2, 3, 4, 5, 6, 7};
    int n = sizeof(arr)/sizeof(arr[0]);
    vector<int> vec(arr, arr + n);
    print(vec);
    
    cout << "vec[2]: " << vec[2] << "\n";
    cout << "vec.at(4): " << vec.at(4) << "\n";
    cout << "vec.front(): " << vec.front() << "\n";
    cout << "vec.back(): " << vec.back() << "\n";

    int* pos = vec.data();
    
    for (int* i = pos; i != pos + vec.size(); i++){
        cout << *i << " ";
    }

    return 0;
}
```
結果
```
[0, 1, 2, 3, 4, 5, 6, 7]
vec[2]: 2
vec.at(4): 4
vec.front(): 0
vec.back(): 7
0 1 2 3 4 5 6 7 
```

## 修改元素(modify elements)
#### 1. assign(int n, int val)
+ 指派新的值到 vector 中，並取代舊的值
#### 2. push_back(int val)
+ 將新的值加到 vector 的尾端
#### 3. pop_back()
+ 將 vector 的尾端的值取出並移除
#### 4. insert(iterator it, int val)
+ 在 vector 的指定位置加入新的值 
#### 5. erase(iterator it)
+ 移除 vector 指定位置的移
#### 6. v1.swap(v2)
+ 交換兩個 vector 的值
#### 7. vec.clear()
+ 清除 vector 的所有值

```Cpp
#include <bits/stdc++.h>
#include "print.cc"

using namespace std;

int main(){
	vector<int> vec;

    cout << "After assign(5, 10): \n";
	vec.assign(5, 10);
    print(vec);

    cout << "After push_back(15): \n";
	vec.push_back(15);
    print(vec);
	int n = vec.size();
	cout << "The last element is: " << vec.back() << "\n";

    cout << "After pop_back(): \n";
	vec.pop_back();
    print(vec);

    cout << "After insert(vec.begin(), 5): \n";
	vec.insert(vec.begin(), 5);
    print(vec);

    cout << "After erase(vec.begin()): \n";
	vec.erase(vec.begin());
    print(vec);

	vec.clear();
	cout << "Vector size after clear(): " << vec.size() << "\n";

	vector<int> v1, v2;
	v1.push_back(1);
	v1.push_back(2);
	v2.push_back(3);
	v2.push_back(4);

	cout << "Vector 1: ";
	print(v1);

	cout << "Vector 2: ";
	print(v2);

	// Swaps v1 and v2
	v1.swap(v2);

	cout << "After Swap \nVector 1: ";
	print(v1);

	cout << "Vector 2: ";
	print(v2);

    return 0;
}
```
結果
```
After assign(5, 10): 
[10, 10, 10, 10, 10]
After push_back(15): 
[10, 10, 10, 10, 10, 15]
The last element is: 15
After pop_back(): 
[10, 10, 10, 10, 10]
After insert(vec.begin(), 5): 
[5, 10, 10, 10, 10, 10]
After erase(vec.begin()): 
[10, 10, 10, 10, 10]
Vector size after clear(): 0
Vector 1: [1, 2]
Vector 2: [3, 4]
After Swap 
Vector 1: [3, 4]
Vector 2: [1, 2]
```