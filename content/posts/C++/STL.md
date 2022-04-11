---
title: "[C++] The C++ Standard Template Library(STL)"
date: 2022-04-06T16:04:36+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Introduction to STL"
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

# STL
> 標準模板庫(Standard Template Library, STL)是提供常用資料結構模板的程式庫，其包含了類別(classes)、演算法(algorithms)與迭代器(iterators)。  
> STL 是通用的程式庫，所以所有的元素都是泛型的，可以[點此瞭解更多模板(template)的內容](https://www.geeksforgeeks.org/templates-cpp/)。

# STL 的四大組成
## 演算法(Algorithms)
### Non-Manupulating Algorithms
1. `sort(first_iterator, last_iterator)`: 對 vector 作排序
2. `reverse(first_iterator, last_iterator)`: 反轉 vector 的排序
3. `*max_element(first_iterator, last_iterator)`: 找出 vector 的最大值
4. `*min_element(first_iterator, last_iterator)`: 找出 vector 的最小值
5. `accumulate(first_iterator, last_iterator, initial value of sum)`: 計算 vector 的總和
```Cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <numeric>

using namespace std;

void print(vector<int>& vec){
    for (vector<int>::iterator it = vec.begin(); it != vec.end(); it++){
        cout << *it << " ";
    }
    cout << endl;
}

int main(){
    int arr[] = {10, 20, 5, 23, 42, 15};
    int n = sizeof(arr)/sizeof(arr[0]);
    vector<int> vec(arr, arr + n);

    // print initial vector
    print(vec);                         // [10, 20, 5, 23, 42, 15]

    // sort
    sort(vec.begin(), vec.end());       // [5, 10, 15, 20, 23, 42]
    print(vec);

    // reverse
    reverse(vec.begin(), vec.end());    // [42, 23, 20, 15, 10, 5]
    print(vec);

    // max & min
    cout << *max_element(vec.begin(), vec.end()) << endl;   // 42
    cout << *min_element(vec.begin(), vec.end()) << endl;   // 5

    // accumulate
    cout << accumulate(vec.begin(), vec.end(), 0) << endl;  // 115

    return 0;
}

```

6. `count(first_iterator, last_iterator, x)`: 計算 vector 中 x 的數量
7. `find(fist_iterator, last_iterator, x)`: 回傳 vector 中第一個符合的 iterator，若無則傳回 v.end()。
```Cpp
#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

int main()
{
	int arr[] = {10, 20, 5, 23 ,42, 20, 15};
	int n = sizeof(arr)/sizeof(arr[0]);
	vector<int> vec(arr, arr + n);
	cout << count(vec.begin(), vec.end(), 20);      // 2

	find(vec.begin(), vec.end(),5) != vec.end() ?   // Element found 
					   cout << "\nElement found":
				   cout << "\nElement not found";

	return 0;
}
```
8. `binary_search(first_iterator, last_iterator, x)`: 測試 x 是否存在已排序的 vector 中
9. `lower_bound(first_iterator, last_iterator, x)`: 傳回指向不小於 x 的元素的 iterator
10. `upper_bound(first_iterator, last_iterator, x)`: 傳回指向大於 x 的元素的 iterator

```Cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main(){
    int arr[] = {5, 10, 15, 20, 20, 23, 42, 45};
    int n = sizeof(arr)/sizeof(arr[0]);
    vector<int> vec(arr, arr + n);
    sort(vec.begin(), vec.end());

    cout << binary_search(vec.begin(), vec.end(), 20) << endl;                  // 1
    cout << (lower_bound(vec.begin(), vec.end(), 20) - vec.begin()) << endl;    // 3
    cout << (upper_bound(vec.begin(), vec.end(), 20) - vec.begin()) << endl;    // 5

    return 0;
}
```
### Manipulating Algorithms
1. `arr.erase(position_to_be_deleted)`: 移除指定位置的元素
2. `arr.erase(unique(arr.begin(), arr.end()), arr.end())`: 移除已排序的 vector 中重複的元素
```Cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main(){
    int arr[] = {5, 10, 15, 20, 20, 23, 42, 45, 20, 20, 20, 20, 20};
    int n = sizeof(arr)/sizeof(arr[0]);
    vector<int> vec(arr, arr + n);                          // [5, 10, 15, 20, 20, 23, 42, 45, 20, 20, 20, 20, 20]

    vec.erase(vec.begin() + 1);                             // [5, 15, 20, 20, 23, 42, 45, 20, 20, 20, 20, 20]
    sort(vec.begin(), vec.end());                           // [5, 15, 20, 20, 20, 20, 20, 20, 20, 23, 42, 45]
    vec.erase(unique(vec.begin(), vec.end()), vec.end());   // [5, 15, 20, 23, 42, 45]

    return 0;
}
```
3. `next_permutation(first_iterator, last_iterator)`: 對 vector 作動成下一個字典排序
4. `prev_permutation(first_iterator, last_iterator)`: 對 vector 作動成上一個字典排序
```Cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main(){
    int arr[] = {1,2,3,4,5,6,7};
    int n = sizeof(arr)/sizeof(arr[0]);
    vector<int> vec(arr, arr + n);              // [1,2,3,4,5,6,7]

    next_permutation(vec.begin(), vec.end());   // [1,2,3,4,5,7,6]
    next_permutation(vec.begin(), vec.end());   // [1,2,3,4,6,5,7]
    next_permutation(vec.begin(), vec.end());   // [1,2,3,4,6,7,5]
    next_permutation(vec.begin(), vec.end());   // [1,2,3,4,7,5,6]
    prev_permutation(vec.begin(), vec.end());   // [1,2,3,4,6,7,5]

    return 0;
}
```

5. `distance(first_iterator, last_iterator)`: 
```Cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include "print.cc"

using namespace std;

int main(){
    int arr[] = {5,10,15,20,20,23,42,45};
    int n = sizeof(arr)/sizeof(arr[0]);
    vector<int> vec(arr, arr + n);

    cout << distance(vec.begin(), max_element(vec.begin(), vec.end())) << endl;     // 7

    return 0;
}
```
### Array algorithms
1. `any_of(first_iterator, last_iterator, [](passing_value { return statement; })) ? if_true : if_false;`
2. `all(first_iterator, last_iterator, [](passing_value { return statement; })) ? if_true : if_false;`
3. `none_of(first_iterator, last_iterator, [](passing_value { return statement; })) ? if_true : if_false;`
```Cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){
    vector<int> vec1 {1,3,7,9,11,17,23};
    all_of(vec1.begin(), vec1.end(), [](int x) { return (x & 1) == 1;}) ? cout << "All odds\n" : cout << "Not all odds\n";

    vector<int> vec2 {1,3,6,8,9,11,13};
    any_of(vec2.begin(), vec2.end(), [](int x) { return (x & 1) == 0;}) ? cout << "There are at least one even\n" : cout << "There are no any even\n";

    none_of(vec1.begin(), vec1.end(), [](int x) { return (x & 1) == 0;}) ? cout << "There are no any even\n" : cout << "There are at least one even\n";

    return 0;
}
```
4. `copy_n(source_array, array_size, target_array)`
```Cpp
#include <iostream>
#include <algorithm>

using namespace std;

int main(){
    int arr[] = {1,2,3,4,5,6};
    int arr2[6];

    copy_n(arr, 6, arr2);

    for (int i : arr2){
        cout << i << " ";
    }

    return 0;
}
```
5. `iota(array_name, array_size, starting_number)`
```Cpp

```

### Partition operations

### Numeric algorithms

## 容器(Containers)
### Sequence Containers
#### vector
#### list
#### deque
#### arrays
#### forward_list(C++11)

### Container Adaptors
#### queue
#### priority_queue
#### stack

### Associative Containers
#### set
#### multiset
#### map
#### mutlimap

### Unordered Associative Containers
#### unordered_set(C++11)
#### unordered_multiset(C++11)
#### unordered_map(C++11)
#### unordered_multimap(C++11)

## 函式(Functions)
### Functors

## 迭代器(Iterators)
### Iterators

## Utility Library
### pair