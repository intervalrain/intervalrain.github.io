---
title: "[Java] Java 的中 HashMap.comparableClassFor(Object x) 的函式解讀"
date: 2022-02-23T01:36:40+08:00
tags: ["Java", "Programming", "Data Structure"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "認識泛型 generic type、類別 class"
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: false
math: false                  # KaTex or not
draft: false
hidemeta: false
comments: false
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

# HashMap.comparableClassFor(Object x) 的函式解讀
> ***原文敘述***  
> *Returns x's Class if it is of the form "class C implements Comparable<C>", else null.*

> ***我的翻譯***
> *當x的類別為Comparable的實作時，返回x的類別；否則返回 null。*

+ 藉由這個函式實例的解讀，可以了解一下類別、泛型的相關概念。

# Source Code
```Java
static Class<?> comparableClassFor(Object x) {
    if (x instanceof Comparable) {
        Class<?> c; Type[] ts, as; ParameterizedType p;
        if ((c = x.getClass()) == String.class) // bypass checks
            return c;
        if ((ts = c.getGenericInterfaces()) != null) {
            for (Type t : ts) {
                if ((t instanceof ParameterizedType) &&
                    ((p = (ParameterizedType) t).getRawType() ==
                        Comparable.class) &&
                    (as = p.getActualTypeArguments()) != null &&
                    as.length == 1 && as[0] == c) // type arg is c
                    return c;
            }
        }
    }
    return null;
}
```

## instanceof
+ insanceof 可理解成某類別的實作，無論是執行期時的類別，或是父類別，或是它實現的介面，或父類別實現的介面…，總之只要在繼承鏈上有這個類別就可以了。

## getClass()
+ 與instanceof相對應的是getClass()函式，無論該物件如果轉型，getClass()都會返回它執行時期的類別，可以簡單理解成實際類別，換言之也就是我們 new 出來物件時使用的類別。
+ 有一種例外情形是匿名物件，當匿名物件調用getClass()時，返回的是依賴它的物件在執行期的類別，並以1,2,3...的index區分。

## getGenericInterfaces()
+ getGenericInterfaces()方法返回的是該物件在執行期時直接實作的介面。必然是該類別自己實作的介面，繼承的則不可。

## getGenericSuperclass()和getSuperclass()
這兩個函式雖然沒有出現在 comparableClassFor(Object x)中，但也順帶一提。
+ getSuperclass()返回的是直接父類的類別，不包括泛型參數。
+ getGenericSuperclass()返回的是包括泛型參數在內的直接父類別。
+ 注意如果父類別聲明了泛型，但子類別繼承時沒有為父類別實作該泛型，這時候也是沒有泛型參數的

## ParameterizedType
+ ParameterizedType 是 Type 介面的子介面，表示參數化的類別，亦即實作了泛型參數的類型。
+ 注意如果直接用 bean 物件 instanceof ParameterizedType，结果都是 false。
+ Class 物件只能是 instanceof ParameterizedType，否則編譯會報錯。
+ 只有用 Type 物件 instanceof ParameterizedType 才能得到想要的比較结果。可以這麼理解：一個 Bean 類別不會是 ParameterizedType，只有代表這個Bean類的類型（Type）才可能是ParameterizedType。
+ 實現泛型參數，可以是給泛型傳入了一個真實的類別，或者傳入另一個新聲明的泛型參數，只聲明泛型而不實作，則 instanceof ParameterizedType 為 false。

## getRawType()
+ getRawType()方法返回聲明了這個類別的類或介面，也就是去掉了泛型参数部分的類別物件。

## getActualTypeArguments()
+ 與getRawType()相對應，getActualTypeArguments()以數組的形式返回泛型參數列表。
+ 當傳入的是真實類別時，印出來的是全類名
+ 當傳入的是另一個聲明的泛型參數時滿印出來的是代表該泛型參數的符號。

## getOwnerType()
+ ParameterizedType介面還有一個getOwnerType()函式，如果該類別是一个內部類別/介面，返回它的外部類別/介面。如果該類型不是內部類型不是内部類別/介面，返回null。

# comparableClassFor(Object x) 總結
```Java
static Class<?> comparableClassFor(Object x) {
    if (x instanceof Comparable) { // 判斷是否實作了 Comparable 介面
        Class<?> c; Type[] ts, as; ParameterizedType p;
        if ((c = x.getClass()) == String.class) // 如果是String類別，直接返回String.class
            return c;
        if ((ts = c.getGenericInterfaces()) != null) { // 檢查是否有直接實現的介面
            for (Type t : ts) {    // 遍歷介面
                if ((t instanceof ParameterizedType) &&      // 當介面實現了泛型
                    ((p = (ParameterizedType) t).getRawType() ==    // 取得介面不帶參數時的類別對象
                        Comparable.class) &&                        // 且為 Comparable
                    (as = p.getActualTypeArguments()) != null &&    // 取得該介面的泛型參數
                    as.length == 1 && as[0] == c) // type arg is c  // 只帶有一種泛型且是實作類別為其本身
                    return c;    // 返回該類別
            }
        }
    }
    return null;    // 皆否則回傳 null
}
```