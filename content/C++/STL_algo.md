---
title: "[C++] The C++ Standard Template Library(STL) - Algorithm"
keywords: ["C++", "algorithm", "STL"]
description: "C++ 中 STL 中的 algorithm lib 的函式與範例"
date: 2022-04-06T16:04:36+08:00
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

# 演算法(Algorithms)
## Non-Manupulating Algorithms
### 1. sort()
+ sort(first_iterator, last_iterator)
+ 對 vector 作排序
### 2. reverse()
+ `reverse(first_iterator, last_iterator)`
+ 反轉 vector 的排序
### 3. *max_element()
+ `*max_element(first_iterator, last_iterator)`
+ 找出 vector 的最大值
### 4. *min_element()
+ *min_element(first_iterator, last_iterator)`
+ 找出 vector 的最小值
### 5. accumulate
+ `accumulate(first_iterator, last_iterator, initial value of sum)`
+ 計算 vector 的總和
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

### 6. count()
+ `count(first_iterator, last_iterator, x)`
+ 計算 vector 中 x 的數量
### 7. find()
+ `find(fist_iterator, last_iterator, x)`
+ 回傳 vector 中第一個符合的 iterator，若無則傳回 v.end()。
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
### 8. binary_search()
+ `binary_search(first_iterator, last_iterator, x)`
+ 測試 x 是否存在已排序的 vector 中
### 9. lower_bound()
+ `lower_bound(first_iterator, last_iterator, x)`
+ 傳回指向不大於 x 的元素的 iterator
### 10. upper_bound()
+ `upper_bound(first_iterator, last_iterator, x)`
+ 傳回指向大於 x 的元素的 iterator

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
## Manipulating Algorithms
### 1. vec.erase()
+ `arr.erase(position_to_be_deleted)`
+ 移除指定位置的元素
### 2. vec.erase(unique())
+ `arr.erase(unique(arr.begin(), arr.end()), arr.end())`
+ 移除已排序的 vector 中重複的元素

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
### 3. next_permutation()
+ `next_permutation(first_iterator, last_iterator)`
+ 對 vector 作動成下一個字典排序
### 4. prev_permutation()
+ `prev_permutation(first_iterator, last_iterator)`
+ 對 vector 作動成上一個字典排序
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

### 5. distance()
+ `distance(first_iterator, last_iterator)`

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
    // == max_element(vec.begin(), vec.end()) - vec.begin();

    return 0;
}
```
## Array algorithms
### 1. any_of()
+ `any_of(first_iterator, last_iterator, [](passing_value { return statement; })) ? if_true : if_false;`
+ vector 中是否有**任何**元素滿足條件
### 2. all_of()
+ `all(first_iterator, last_iterator, [](passing_value { return statement; })) ? if_true : if_false;`
+ vector 中是否有**全部**元素滿足條件
### 3 none_of()
+ `none_of(first_iterator, last_iterator, [](passing_value { return statement; })) ? if_true : if_false;`
+ vector 中是否**沒有**元素滿足條件
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
### 4. copy_n()
+ `copy_n(source_array, array_size, target_array)`
+ 複製陣列
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
### 5. iota()
+ `iota(array_name, array_size, starting_number)`
+ 逐一增加並寫入指定大小的陣列
```Cpp
// C++ code to demonstrate working of iota()
#include<iostream>
#include<numeric> // for iota()
using namespace std;
int main(){
	// Initializing array with 0 values
	int ar[6] = {0};

	// Using iota() to assign values
	iota(ar, ar+6, 20);

	// Displaying the new array
	cout << "The new array after assigning values is : ";
	for (int i=0; i<6 ; i++)
	cout << ar[i] << " ";

	return 0;

}

```

## Partition operations
+ C++ 在標準模板資料庫(STL)中有一個 class 可以來做 partition 的演算法。
+ Partition 就是用來將容器裡面的元素依指定的條件做分隔。
### 1. partition()
+ `partition(begin, end, conditon)`
+ 依照指定條件做分隔。
### 2. is_partition()
+ `is_partitioned(begin, end, condition`
+ 判斷元素是否依照條件分開。
```Cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main(){
    vector<int> vec = {2,1,5,6,8,7};

    is_partitioned(vec.begin(), vec.end(), [](int x){
        return x % 2 == 0;
    }) ?
    cout << "Vector is partitioned":
    cout << "Vector is not partitioned";
    cout << endl;
    
    partition(vec.begin(), vec.end(), [](int x){
        return x % 2 == 0;
    }) ?
    
    cout << "The partitioned vector is : ";
    for (int &x : vec) cout << x << " ";

    return 0;
}
```

### 3. stable_partition()
+ `stable_partition(begin, end, condition)`
+ 依指定條件作分隔，同時保留元素的相對位置。
### 4. partition_point()
+ `partition_point(begin, end, condition)`
+ 返回指向分隔位置的迭代器，也就是在 [begin, end] 範圍內的第一個元素。
+ This function returns an iterator pointing to the partition point of container i.e. the first element in the partitioned range [beg,end) for which condition is not true. The container should already be partitioned for this function to work.
```Cpp
// C++ code to demonstrate the working of
// stable_partition() and partition_point()
#include<iostream>
#include<algorithm> // for partition algorithm
#include<vector> // for vector
using namespace std;
int main()
{
	// Initializing vector
	vector<int> vect = { 2, 1, 5, 6, 8, 7 };
	
	// partitioning vector using stable_partition()
	// in sorted order
	stable_partition(vect.begin(), vect.end(), [](int x)
	{
		return x%2 == 0;	
	});
	
	// Displaying partitioned Vector
	cout << "The partitioned vector is : ";
	for (int &x : vect) cout << x << " ";
	cout << endl;
	
	// Declaring iterator
	vector<int>::iterator it1;
	
	// using partition_point() to get ending position of partition
	auto it = partition_point(vect.begin(), vect.end(), [](int x)
	{
		return x%2==0;
	});
	
	// Displaying partitioned Vector
	cout << "The vector elements returning true for condition are : ";
	for ( it1= vect.begin(); it1!=it; it1++)
	cout << *it1 << " ";
	cout << endl;
	
	return 0;
	
}

```

### 5. partition_copy()
+ `partition_copy(begin, end, begin1, begin2, condition)`
+ This function copies the partitioned elements in the different containers mentioned in its arguments. It takes 5 arguments. Beginning and ending position of container, beginning position of new container where elements have to be copied (elements returning true for condition), beginning position of new container where other elements have to be copied (elements returning false for condition) and the condition. Resizing new containers is necessary for this function.
```Cpp
// C++ code to demonstrate the working of
// partition_copy()
#include<iostream>
#include<algorithm> // for partition algorithm
#include<vector> // for vector
using namespace std;
int main()
{
	// Initializing vector
	vector<int> vect = { 2, 1, 5, 6, 8, 7 };
	
	// Declaring vector1
	vector<int> vect1;
	
	// Declaring vector1
	vector<int> vect2;
	
	// Resizing vectors to suitable size using count_if() and resize()
	int n = count_if (vect.begin(), vect.end(), [](int x)
	{
		return x%2==0;
		
	} );
	vect1.resize(n);
	vect2.resize(vect.size()-n);
	
	// Using partition_copy() to copy partitions
	partition_copy(vect.begin(), vect.end(), vect1.begin(),
									vect2.begin(), [](int x)
	{
		return x%2==0;
	});
	
	
	// Displaying partitioned Vector
	cout << "The elements that return true for condition are : ";
	for (int &x : vect1)
			cout << x << " ";
	cout << endl;
	
	// Displaying partitioned Vector
	cout << "The elements that return false for condition are : ";
	for (int &x : vect2)
			cout << x << " ";
	cout << endl;
	
	return 0;
}

```

## Numeric algorithms
### 1. apply()
+ `apply([](int x){return operation;})`
+ 對陣列所有元素做運算
### 2. arr.sum()
+ `arr.sum()`
+ 計算陣列所有元素的總合
```Cpp
// C++ code to demonstrate the working of
// apply() and sum()
#include<iostream>
#include<valarray> // for valarray functions
using namespace std;
int main()
{
	// Initializing valarray
	valarray<int> varr = { 10, 2, 20, 1, 30 };
	
	// Declaring new valarray
	valarray<int> varr1 ;
	
	// Using apply() to increment all elements by 5
	varr1 = varr.apply([](int x){return x=x+5;});
	
	// Displaying new elements value
	cout << "The new valarray with manipulated values is : ";
	for (int &x: varr1) cout << x << " ";
	cout << endl;
	
	// Displaying sum of both old and new valarray
	cout << "The sum of old valarray is : ";
	cout << varr.sum() << endl;
	cout << "The sum of new valarray is : ";
	cout << varr1.sum() << endl;

	return 0;
	
}
```
### 3. arr.min()
+ `arr.min()`
+ 傳回陣列中最小的元素
### 4. arr.max()
+ `arr.max()`
+ 傳回陣列中最大的元素
```Cpp
// C++ code to demonstrate the working of
// max() and min()
#include<iostream>
#include<valarray> // for valarray functions
using namespace std;
int main()
{
	// Initializing valarray
	valarray<int> varr = { 10, 2, 20, 1, 30 };
	
	// Displaying largest element of valarray
	cout << "The largest element of valarray is : ";
	cout << varr.max() << endl;
	
	// Displaying smallest element of valarray
	cout << "The smallest element of valarray is : ";
	cout << varr.min() << endl;

	return 0;
	
}

```
### 5. arr.shift()
+ `arr.shift(int n)`
+ 對陣列做 n 個位的移動，正為向右移，負為向左移，缺位補零。
### 6. cshift()
+ `arr.cshift(int n)`
+ 對陣列做 n 個位的移動，正為向右移，負為向左移，缺位使用循環補位。
```Cpp
// C++ code to demonstrate the working of
// shift() and cshift()
#include<iostream>
#include<valarray> // for valarray functions
using namespace std;
int main()
{
	// Initializing valarray
	valarray<int> varr = { 10, 2, 20, 1, 30 };
	
	// Declaring new valarray
	valarray<int> varr1;
	
	// using shift() to shift elements to left
	// shifts valarray by 2 position
	varr1 = varr.shift(2);
	
	// Displaying elements of valarray after shifting
	cout << "The new valarray after shifting is : ";
	for ( int&x : varr1) cout << x << " ";
	cout << endl;
	
	// using cshift() to circulary shift elements to right
	// rotates valarray by 3 position
	varr1 = varr.cshift(-3);
	
	// Displaying elements of valarray after circular shifting
	cout << "The new valarray after circular shifting is : ";
	for ( int&x : varr1) cout << x << " ";
	cout << endl;

	return 0;
	
}

```
### 7. arr1.swap(arr2)
+ arr1.swap(arr2)
+ 陣列做交換

```Cpp
// C++ code to demonstrate the working of
// swap()
#include<iostream>
#include<valarray> // for valarray functions
using namespace std;
int main(){
// Initializing 1st valarray
	valarray<int> varr1 = {1, 2, 3, 4};
	
	// Initializing 2nd valarray
	valarray<int> varr2 = {2, 4, 6, 8};
	
	// Displaying valarrays before swapping
	cout << "The contents of 1st valarray "
			"before swapping are : ";
	for (int &x : varr1)
		cout << x << " ";
	cout << endl;
	cout << "The contents of 2nd valarray "
			"before swapping are : ";
	for (int &x : varr2)
		cout << x << " ";
	cout << endl;
	
	// Use of swap() to swap the valarrays
	varr1.swap(varr2);
	
	// Displaying valarrays after swapping
	cout << "The contents of 1st valarray "
			"after swapping are : ";
	for (int &x : varr1)
		cout << x << " ";
	cout << endl;
	
	cout << "The contents of 2nd valarray "
			"after swapping are : ";
	for (int &x : varr2)
		cout << x << " ";
	cout << endl;

	return 0;	
}
```

+ 你可能會想繼續閱讀…
    + [容器(Containers)](/c++/stl_container)
	+ [函式(Functions)](/c++/stl_function)
	+ [迭代器(Iterators)](/c++/stl_iterator)
	+ [Utility Library](/c++/stl_util)