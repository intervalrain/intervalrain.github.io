---
title: "[C++] STL: Vector 的使用與實作"
date: 2022-04-03T18:14:14+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "STL整理"
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
# vector 的介紹
+ vector 是**可變大小陣列的序列容器**，採用連續的儲存空間來儲存元素，意味著可以採用下標來對 vector 的元素進行存取，和陣列 array 一樣高效，但是又不像陣列的大小是固定的，vector 的大小可以被動態處理，隨著元素量而增加。
+ `#include <vector>`
# vector 的使用
## 建構式 constructor
```Cpp
vector<int> v1;                         // 不進行初始化
vector<int> v2 = {1,2,3};               // 像陣列一樣初始化
vector<int> v3(v2);                     // 利用vector初始化
vector<int> v4(v2.begin(), v2.end()-1); // 利用iterator初始化
vector<int> v5(3, 0);                   // 含有3個0的vector
```
+ 談一下特殊的二維vector，其實就是二維矩陣，寫法為  
```Cpp
vector<vector<int>> vv(3, vec<int>(5, 0));
// vv[0] = [0, 0, 0, 0, 0]
// vv[1] = [0, 0, 0, 0, 0]
// vv[2] = [0, 0, 0, 0, 0]
```
## 遍歷 traverse
+ 遍歷的方法有三種，分別是**iterator**，**for loop**，**[]**，其中**[]**下標運算子只有**string**和**vector**可以使用，因為他們的地址是連續的。
+ 三種方法均是可讀、可寫。
```Cpp
vector<int> v = {0, 9, 3, 1, 6, 3, 9, 4, 3, 3};

// 1. iterator
vector<int>::iterator it = v.begin();
while (it != v.end()){
    cout << *it << " ";
    it++;
}
cout << endl;

// 2. for loop
for (int e : v){
    cout << e << " ";
cout << endl;
}

// 3. []
for (size_t i = 0; i < v.size(); ++i){
    cout << v[i] << " ";
cout << endl;
}

```
## 資料的資刪查改
\\(
    \def\arraystrecth{1.4}\begin{array}{|l|l|}\hline
    \text{methods}&\text{description}\\\\\hline\hline
    \text{push\\_back}&\text{Add element at the end}\\\\\hline
    \text{pop\\_back}&\text{Delete last element}\\\\\hline
    \text{insert}&\text{Insert elements}\\\\\hline
    \text{erase}&\text{Erase elements}\\\\\hline
    \end{array}
\\)

```Cpp
#include <iostream>
#include <vector>

using namespace std;

int main(){
    vector<int> vec;
    vec.push_back(0);   [0]
    vec.push_back(1);   [0,1]
    vec.push_back(3);   [0,1,3]
    vec.push_back(4);   [0,1,3,4]
    vec.pop_back();     [0,1,3]
    vector<int>::iterator it = vec.begin();
    vec.insert(it + 2, 2); // 在下標為1的位置，插入2    [0,1,2,3]
    vec.erase(it);      [1,2,3]

    return 0;
}
```
## resize 和 reserve
```Cpp
int main(){
    cout << "size: " << v.size() << "\n";               // 0
    cout << "capacity: " << v.capacity()() << "\n";     // 0
    v.resize(30);
    cout << "size: " << v.size() << "\n";               // 30
    cout << "capacity: " << v.capacity()() << "\n";     // 30
    v.reservse(50);
    cout << "size: " << v.size() << "\n";               // 30
    cout << "capacity: " << v.capacity()() << "\n";     // 50
}
```
# vector 的實作
## member variables
```Cpp
template <class T>
class myVector{
private:
    size_t _size;       // 儲存現有 elements 的數目
    size_t _capacity;   // 此時陣列所有的最大容量
public:
    T* arr;             // 儲存 elements 的陣列指標
};
```

## 建構式 constructor
```Cpp
public:
    // 無引數的初始化
    myVector(){
        this->_size = 0;
        this->_capacity = DEFAULT_CAPACITY;
        this->arr = new int[this->_capacity];
    }
    
    // 指定容量的初始化
    myVector(int capacity){
        this->_size = 0;
        this->_capacity = capacity;
        this->arr = new int[this->capacity];
    }

    // 以另一個 myVector 初始化
    myVector(const myVector<T>& v):
        _size(v.size),
        _capacity(v._capacity)
    {
        this->reserve(v.capacity);
        for (size_t i = 0; i < v._size; ++i){
            this->push_back(v[i]);
        }
    }

    // 填滿 n 個 val 的初始化
    myVector(size_t n, T val):
        _size(n),
        _capacity(n)
    {
        this->arr = new int[this->_capacity];
        for (size_t i = 0; i < n; ++i){
            this->arr[i] = val;
        }
    }
```

## 解構式 destructor
```Cpp
public:
    ~myVector(){
        // 將原有的陣列丟棄
        delete[] this->arr;
    }
```
## 運算子多載 operator overload
```Cpp
public:
    // 令 myVector 可讀可寫
    T& operator[](size_t i){
        assert (i < this->_size);
        return this->arr[i];
    }
```
## 函式 Methods
```Cpp
public:
    // 回傳 vector 元素的數目
    size_t size(){
        return this->_size;
    }

    // 回傳當前 vector 的容量
    size_t capacity(){
        return this->_capacity;
    }

    // 回傳指向陣列的下標 0 位置
    T* begin(){
        return this->arr;
    }

    // 回傳指向陣列的最末位 + 1
    T* end(){
        return this->arr + this->_size;
    }

    const T* begin() const{
        return this->arr;
    }

    const T* end() const{
        return this->arr + this->_size;
    }
    
    // 回傳此 myVector 是否含有元素
    bool isEmpty(){
        return this->_size == 0;
    }
```
## reserve 和 resize
```Cpp
public:
    // force to resize with a n capacity
    void reserve(size_t n){
        if (n > this->_capacity){
            T* tmp = new T[n];
            if (arr != nullptr){
                for (size_t i = 0; i < this->_size; ++i){
                    tmp[i] = this->arr[i];
                }
                delete[] this->arr;
            }
            this->arr = tmp;
            _capacity = n;
        }
    }

    // expand the capacity while adding elements
    void resize(){
        this->_capacity *= 2;
        int* tmp = new int[this->_capacity];
        for (size_t i = 0; i < this->_size; ++i){
            tmp[i] = this->arr[i];
        }
        delete[] this->arr;
        this->arr = tmp;
    }
```
## 資料的增刪查改
```Cpp
public:

    // adding elements in the last of vector
    void push_back(T val){
        if (this->_capacity < this->_size + 1)
            resize();
        this->arr[this->_size] = val;
        this->_size++;
    }

    // remove elements in the last of vector
    T pop_back(){
        assert(!this->isEmpty());
        T tmp = *(this->end()-1);
        this->_size--;
        return tmp;
    }

    // insert element by the index.
    void insert(size_t i, T val){
        assert (i <= this->_size);
        if (this->_size + 1 > this->capacity()) resize();
        int* ptr = this->begin() + i;
        for (int* it = this->end(); it != ptr; --it)
            *it = *(it - 1);
        *ptr = val;
        this->_size++;
    }

    //erase element by the index
    T erase(size_t i){
        assert(i < this->_size);
        int* it = this->begin() + i;
        T tmp = *it;
        for (; it != this->end(); ++it){
            *it = *(it + 1);
        }
        this->_size--;
        return tmp;
    }
```
Reference: [有解無憂 UJ5U.com](https://www.uj5u.com/qita/301761.html?msclkid=2f73d19db33611ecb3cfc2c1fd433565)