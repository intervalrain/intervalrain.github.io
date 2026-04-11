---
title: "[C++] Custom Comparator"
author: "Rain Hu"
pubDatetime: 2022-06-11T10:07:49+08:00
description: "C++ 中陣列與優先佇列的自定義排序使用方法"
category: "Programming"
tags: ["C++"]
math: true
---

# C++ Custom Comparator
## sort(iter, iter, comp)
### Lambda function
```C++
int main(){
    auto comp = [](int a, int b){ return a < b; }
    vector<int> = {3,6,7,2,1,9,5,4,8};
    sort(vec.begin(), vec.end(), comp); // 1,2,3,4,5,6,7,8,9
}
```
### Usual boolean function
```C++
bool comp(const int& a, const int& b){
    return a < b;
}
int main(){
    vector<int> = {3,6,7,2,1,9,5,4,8};
    sort(vec.begin(), vec.end(), comp); // 1,2,3,4,5,6,7,8,9
}
```
### Old solution using struct/class with () operator
```C++
struct cmp {
    bool operator() (int a, int b) const {
        return a < b;
    }
};
int main(){
    vector<int> = {3,6,7,2,1,9,5,4,8};
    sort(vec.begin(), vec.end(), comp()); // 1,2,3,4,5,6,7,8,9
}
```

## priority_queue(element, container, comp)
### Modern C++20 Solution(lambda)
+ We can use lambda function as comparator. 
+ As usual, comparator should return boolean value, indicating whether the element passed as first argument is considered to go before the second in the specific strict weak ordering it defines.
```C++
int main(){
    auto comp = [](int a, int b){ return a < b; }

    vector<int> vec = {3,6,7,2,1,9,5,4,8};
    priority_queue<int, vector<int, decltype(comp)> pq;
    for (int num : vec) pq.push(num);
    while (!pq.empty()) {
        cout << pq.top() << " ";    // 9,8,7,6,5,4,3,2,1
        pq.pop();
    }
    cout << endl;
}
```

### Modern C++11 Solution(lambda)
+ Before C++20 we need to **pass lambda function as argument to set constructor**.
```C++
int main(){
    auto comp = [](int a, int b){ return a < b; }

    vector<int> vec = {3,6,7,2,1,9,5,4,8};
    priority_queue<int, vector<int, decltype(comp)> pq(comp);
    for (int num : vec) pq.push(num);
    while (!pq.empty()) {
        cout << pq.top() << " ";    // 9,8,7,6,5,4,3,2,1
        pq.pop();
    }
    cout << endl;
}
```

### Usual function
+ Make comparator as usual boolean function
```C++
bool comp(int a, int b){
    return a < b;
}

int main(){
    vector<int> vec = {3,6,7,2,1,9,5,4,8};
    priority_queue<int, vector<int, decltype(&comp)> pq(comp);
    // priority_queue<int, vector<int, decltype(comp)*> pq(comp);
    // in C++20, constructor can be ignored the same as lambda function.
    for (int num : vec) pq.push(num);
    while (!pq.empty()) {
        cout << pq.top() << " ";    // 9,8,7,6,5,4,3,2,1
        pq.pop();
    }
    cout << endl;
}
```
### Old solution using struct/class with () operator
```C++
struct cmp {
    bool operator() (int a, int b) const {
        return a < b;
    }
};
int main(){
    vector<int> = {3,6,7,2,1,9,5,4,8};
    priority_queue<int, vector<int>, comp> pq(vec.begin(), vec.end());

    while (!pq.empty()) {
        cout << pq.top() << " ";    // 9,8,7,6,5,4,3,2,1
        pq.pop();
    }
    cout << endl;
}
```

### Alternative solution: create struct/class from boolean function

```C++
bool comp(int a, int b){ return a < b; }
#include <type_traits>
using Cmp = integral_constant<decltype(&comp), &comp>;

int main(){
    vector<int> = {3,6,7,2,1,9,5,4,8};
    priority_queue<int, vector<int, decltype(&comp)> pq(comp);
    for (int num : vec) pq.push(num);
    while (!pq.empty()) {
        cout << pq.top() << " ";    // 9,8,7,6,5,4,3,2,1
        pq.pop();
    }
    cout << endl;
}
```