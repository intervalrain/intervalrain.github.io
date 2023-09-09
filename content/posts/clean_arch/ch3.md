---
title: "[IT] Clean Architecture - 第3章 - 程式設計範式總覽"
keywords: ["Clean Architecture", "SOLID", "DDD", "Design Pattern"]
description:
date: 2023-09-07T22:07:54+08:00
tags: ["Clean Architectrue"]
draft: false
Categories: "IT"
author: "Rain Hu"
showToc: true
TocOpen: true
math: true
mermaid: true
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
---
![ch3](/posts/clean_arch/images/ch3.png)
# ch3. 程式設計範式總覽
　　這個概述章節中包含的三種範式(paradigm)是結構化編程、物件導向編程和函數式編程。

---
## 結構化程式設計(Structured Programming)
　　第一個被採用的範式(但不是第一個發明的)是結構化程式設計，由艾德斯格·韋伯·迪科斯特拉(Edsger Wybe Dijkstra)在1968年發現。迪科斯特拉指出，無節制的跳躍(goto語句)對程式結構是有害的。正如我們在接下來的章節中將看到的那樣，他用更為熟悉的`if`/`then`/`else`和`do`/`while`/`until`結構取代了這些跳躍。

　　一句話總結結構化程式設計:
> *結構化程式設計對直接控制權的轉移施加限制  
> Structured programming imposes discipline on direct transfer of control.*

## 物件導向程式設計(Object-Oriented Programming)
　　第二個採用的範式實際上是在1966年早兩年被奧利·約翰·達爾(Ole Johan Dahl)和克利斯登·奈加特(Kristen Nygaard)發現的。這兩位程式設計師注意到，在ALGOL語言中，函數呼叫的 stack frame 可以移動到 heap，從而使函數聲明的區域變數在函數返回後仍然存在。該函數成為一個類的構造函數，區域變數成為實例變數，嵌套函數則成為方法。這不可避免地導致了多態的發明，用以限制函數指針的使用。

　　一句話總結物件導向程式設計:
> *物件導向程式設計對間接控制權的轉移施加限制
> Object-oriented programming imposes discipline on indirect transfer of control.*

## 函數式程式設計
　　第三種範式，最近才開始被採用，卻是最早被發明的。事實上，它的發明早於程式設計本身。函數式程式設計是阿隆佐·邱奇(Alonzo Church)的工作的直接產物，他在1936年時發明了λ演算法(l-calculus)，當時圖靈也在研究同樣的問題。他的λ演算法是基於9158年由約翰·麥卡錫(John McCarthy)發明的LISP語言，λ演算法有一個最基本的概念是不可變性(immutability)，也就是說，變數的值不會改變。這意味著函數式程式設計並不會有賦值的敘述。事實上，大多數的函數式程式語言，有自己的方法去改變變數的值，但只有在非常嚴格的限制下可以使用。

　　一句話總結函數式程式設計:
> *函數式程式設計對賦值施加限制
> Functional programming imposes discipline upon assignment*

## 討論
　　注意到本章所介紹到的三個範式，都是在**限制**程式設計師的能力，而非增加新的能力。每個範式都在告訴我們**什麼不應該做，而不是應該做什麼**。

　　從另一角度來看，從結構化程式設計消除了`go to`語句，從物件導向程式設計消除了`function pointers`，從函數式程式設計消除了`assignment`。我們還有什麼可以消除的呢？

　　答案很可能是沒有。因此這三種範式很有可能是唯一的三種，至少是唯三**限制型**的範式，另一個證據是，在爾後的數十年間，也沒有再出現任何的範式。

## 結論
　　從範式的歷史，我們可以怎麼與架構做聯想呢？  
　　1. 我們利用多型的機制來跨越架構的邊界。  
　　2. 我們利用函數式程式設計來約束對數據的位置與訪問權限。  
　　3. 我們利用結構化程式設計作為模塊的演算法基礎。  
　　注意這三個與建築的三個重要關注點不謀而合：**功能**、**組件分離**、**數據管理**。
