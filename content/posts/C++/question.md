---
title: "[C++] 易錯題目收集"
keywords: ["C++", "interview"]
description: "網路上 C++ 易錯的題目收集"
date: 2022-04-17T17:34:39+08:00
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

# C++ 易錯題目收集
## 1. bit-format expression
```Cpp
#include <bits/stdc++.h>
using namespace std;
int main(){
    unsigned int x = -1;
    int y = ~0;
    if (x==y)
        cout << "same";
    else
        cout << "not same";
    return 0;
}
```
+ 結果
```
same
```
+ 解析
    + `unsigned int x = -1` 相當於`11111111`
    + `y = ~0` 也相當於`11111111`
---
## 2. 如何使 C(n,3) 正確且 n 的有效值最大?
+ 結果
```
return n*(n-1)/2*(n-2)/3;
```
+ 解析
    + n*(n-1)必為基偶相乘
    + n*(n-1)*(n-2)必為3的倍數
    + 故此題的作法可避免因整數除法而造成的小數位消去
---
## 3. register在C++中的用法
```Cpp
#include <bits/stdc++.h>
using namespace std;
int main(){
    register int i = 10;
    int *ptr = &i;
    cout << *ptr;
    return 0;
}
```
+ 選項
    + Prints 10 on all compilers
    + Prints 0 on all compilers
    + May generate Compilation Error
    + May generate Runtime Error
+ 結果
```
May generate Compilation Error
```
+ 解析
    + register關鍵字用來分配變數儲存於CPU的register，以達到快速存取。所以對其提取有可能造成編譯錯誤，因為指標指向的位址不在在RAM上。
    + 在大部分的C++編譯器，不推薦使用register關鍵字，因為沒有任何意義，儘管他會被默認成auto關鍵字，使得C++編譯器可能可能適用。
---
## 4. 有趣的 for loop 問題
```Cpp
int fun(){
    static int num = 16;
    return num--;
}
int main(){
    for(fun(); fun(); fun())
        cout << fun();
    return 0;
}
```
+ 結果
```
14 11 8 5 2
```
+ 解析
    + main()中的 for-loop 可以寫成等效的 while-loop 如下
    ```Cpp
    int main(){
        int num = 16;
        num--;                          // num = 15
        while (num-- != 0){             // 先判斷後遞減 15 !=0, num = 14
            cout << (num--) << " ";     // 先印出後遞減印出 14, num = 13
            num--;                      // 遞減後回到while, num = 12
        }
        return 0;
    }
    ```
    1. `static int num = 16` 設定初值為 16，並遞減，故 num = 15
    2. 判斷 num 是否為真，後遞減。15 != 0，遞減使 num = 14，進入迴圈
    3. 印出 num = 14 後，遞減，num = 13
    4. 迴圈結束前作遞減，num = 12，重新回到 step2
---
## 5. const 與 volatile
```
Pick the correct statemewnt for const and volatile keywords.
```
+ 選項
    + const is the opposite of volatile and vice versa
    + const and volatile can't be used for struct and union
    + const and volatile can't be used for enum
    + const and volatile can't be used for typedef
    + const and volatile are independent i.e. it's possible that a variable is defined as both const and volatile
+ 結果
```
const and volatile are independent i.e. it's possible that a variable is defined as both const and volatile
```
+ 解析
    + const 是確保變數不會變修改，使其值變成唯讀。
    + volatile 通常用在具有**最佳化**或**多執行緒**相關的變數或物件，volatile用來阻止編譯器因誤認某段程式碼無法被程式碼本身所改變，而造成的過度優化。**volatile會使得每次存取這個變數或物件時，都會直接從變數位址中取得資料**，避免可能使用暫存器中的值，在變數可能被其他程式更新的狀況下，產生錯誤的值。
---
## 6. operator priority
```Cpp
int main(){
    cout << (1 << 2 + 3 << 4);
    return 0
}
```
+ 結果
```
512
```
+ 解析
    + `+`優先於`<<`
    + 故此段敘述等效於 `cout << (1 << (2 + 3) << 4);`
    + `cout << (1 << 5 << 4);`
    + `cout << (32 << 4);`
    + `cout << 512;`
---
## 7. floating constant
```
Suppose a C++ program has floating constant 1.414, what's the best way to convert this as "float" data type?
```
+ 選項
    + `(float)1.414`
    + `float(1.414)`
    + `1.414f` or `1.414F`
    + 1.414 itself of "float" data type i.e. nothing else required
+ 結果
```
`1.414f` or `1.414F`
```
+ 解析
    + floating constant 被預設為 double 資料型態，故利用`f`或`F`的suffix，即可將之轉為 float 資料型態。
---
## 8. array pointer
```Cpp
int main(){
    int arr[5];
    // Assume base address of arr is 2000 and size of integer is 32 bit
    printf(%u %u, arr+1, &arr+1);
    return 0;
}
```
+ 結果
```
2004 2020
```
+ 解析
    + array 的名稱會傳回第一個元素的地址(除了使用 sizeof)。
    + 對 array 加 1 會加上 sizeof(type)。
    + &array 代表整個 array 的地址，加 1 回加上 sizeof(while array)。
---
## 9. initialize array
```Cpp
int main(){
    int a[][] = {{1,2},{3,4}};
    int i, j;
    for (int i = 0; i < 2; i++){
        for (int j = 0; j < 2; j++){
            printf("%d ", a[i][j]);
        }
    }
    return 0;
}
```
+ 結果
```
Compilation Error
```
+ 解析
    + Array 在記憶體中是以**row-major**的型式儲存的。
    + 儘管 array 是多維陣列，他都是被儲存成單一線性的區塊
    + 下列 assign 的方式是合法的，(第一個可被省略)
    ```Cpp
    int a[] = {...};
    int a[][10] = {{...}, ...};
    int a[][5][10] = {{{...},...},...};
    ```
---