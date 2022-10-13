---
title: "[C++] 如何產生 random 值"
date: 2022-4-14T00:26:23+08:00
tags: ["C++", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "How to generate a random value"                     
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
# rand() 函數
+ 在 C/C++ 中可以使用 `rand()` 這個函數，產生最簡單的亂數：
+ 需引用 `<stdlib.h>` 函式庫
+ 在呼叫 `rand()` 前需要先使用`srand()`設定初始的亂數種子，增加「亂度」。(實際上產生的亂數是有規則的，以示例為例，是以時間做為種子，故是有可能被預測的)
+ 其產生的亂數是一個介於 0 到 RAND_MAX(INT_MAX)的整數。
+ C 與 C++ 幾乎一樣，只差在表頭檔的使用。
## C-style
```C
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(){
    srand(time(NULL));      // random seed
    int x = rand();

    printf("x = %d\n", x);
    return 0;
}
```
## Cpp-style
```Cpp
#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main(){
    srand(time(NULL));
    int x = rand();

    cout << "x = " << x << endl;
    cout << "x is between 0 and " << RAND_MAX << endl;

    return 0;
}
```
## 亂數種子
+ 由於電腦實際上並沒有辦法自己產生「真正的亂數」，只能透過複雜的數學演算法模擬出類似亂數的數值資料，而在模擬亂數時，需要設定一個亂數種子，電腦會根據這個亂數種子來計算出一連串的亂數，相同的亂數種子就會產生相同的亂數序列，所以如果要讓產生的亂數每次都不同，就要設定不同的亂數種子。
+ 上例中使用的亂數種子是時間，因為時間每分每秒都在變化，所以每次產生的亂數都會不同，如果是用於數值模擬的話，

### 固定亂數種子
+ 由於電腦實際上並沒有辦法自己產生「真正的亂數」，只能透過複雜的數學演算法模擬出類似亂數的數值資料，而在模擬亂數時，需要設定一個亂數種子，電腦會根據這個亂數種子來計算出一連串的亂數，相同的亂數種子就會產生相同的亂數序列，所以如果要讓產生的亂數每次都不同，就要設定不同的亂數種子。若是做數值模擬的話，通常會讓模擬結果具有可重復性(repeatability)，方便除錯與驗證，這種狀況就可以將亂數種子固定不變，以確保每次的結果都相同。

## [0, 1) 浮點數亂數
+ [0, 1) 代表 0 <= x < 1
+ 若要產生 0 到 1 之間的浮點數亂數，可以這樣寫：
```Cpp
#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main(){
    srand(time(NULL));
    double x = (double)rand()/(RAND_MAX + 1.0);

    cout << "x = " << x << endl;

    return 0;
}
```

## [a, b)特定範圍浮點數亂數
+ [a, b) 表 a <= x < b
```Cpp
#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main(){
    srand(time(NULL));
    double x = (double)rand()/(RAND_MAX + 1.0);

    cout << "x = " << x << endl;

    return 0;
}
```

## [a, b)特定範圍整數亂數
```Cpp
#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main(){
    srand(time(NULL));

    int a = 1;    // min
    int b = 100;  // max

    int x = rand() % (b - a + 1) + a;

    cout << "x = " << x << endl;

    return 0;
}
```
+ 上面這種使用餘數運算（%）的方式只是比較方便的寫法，事實上使用餘數運算所產生的整數亂數在理論上不是標準的均勻分布。
+ 我們以一個簡單的例子來解釋，假設 RAND_MAX 的值為 10，而我們要產生介於 3 到 5 之間的整數亂數（亦即 min = 3、max = 5），以下是所有的可能性對照表：
    + \\(\def\arraystretch{1.4}\begin{array}{c|l|c}
        轉換後的整數亂數&\text{rand()}函數產生的亂數&出現機率\\\\\hline
        3&0,3,6,9&4/11\\\\\hline
        4&1,4,7,10&4/11\\\\\hline
        5&2,5,8&3/11
    \end{array}\\)
+ `rand()` 函數所產生的每一個整數其出現的機率是均等的，但是經過於數運算的轉換之後，因為 RAND_MAX 通常不會被整除，所以轉換之後的整數亂數出現機率就存在有細微的偏差，以這個例子來說，3、4、5 三個數字出現的機率比是 4:4:3。

+ 另外有些人會先產生固定範圍的浮點數亂數，再將浮點數轉型為整數，例如產生 [3, 6) 的浮點數亂數，然後轉型為 [3, 5] 的整數亂數，其實這種方式跟餘數運算一樣會有每個整數出現機率不均等的問題，簡單來說就是現在有 11 個球要放進 3 個籃子裡，不管怎麼放，每個籃子的球都不可能一樣多。

## 均勻分布亂數(uniform distribution)

```Cpp
#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int randint(int n){
    if ((n - 1) == RAND_MAX)
        return rand();
    long end = RAND_MAX / n;
    assert (end > 0L);
    end *= n;
    int r;
    while ((r = rand()) >= end);

    return r % n;
}

int main(){
    int x = randint(5);
    cout << x << endl;
}
```
## 使用 randint 函數產生特定範圍整數亂數：
```Cpp
int x = randint(max - min + 1) + min;
```
+ 這種作法就好像要把 11 個球要放進 3 個籃子裡，而最後多出來的 2 顆球就直接丟掉，確保每個籃子都一樣只有 3 顆，這樣大家的機率就可以相等了。

+ 這種使用截斷分布（truncated distribution）來校正機率的方式雖然在理論上是正確的，但是 rand 函數是使用 LCG（Linear Congruential Generator）來產生亂數的，他的優點只是快速、方便而已，但它本身所產生的亂數品質沒有非常好，再怎麼校正效果都有限，若需要高品質的亂數，請改用 C++11 標準的 <random> 函式庫。