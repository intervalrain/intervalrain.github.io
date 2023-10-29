---
title: "[IT] 洋蔥架構 Onion Architecture"
keywords: ["Software Architecture"]
description: 
date: 2023-10-29T20:34:57+08:00
tags: ["Software Architectrue"]
draft: false
Categories: "IT"
author: "hgraca"
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
# 洋蔥架構
洋蔥架構是由 Jeffrey Palermo 在 2008 年提出的。在我看來，它是基於 Ports & Adapters 架構的構念，將領域(domain)放在應用程式的中心，將交付機制(UI)和系統使用的基礎設施(infrastructure, ex.ORM，搜索引擎，第三方API等)。差別是，它對內部進行了分層。

我們從分層架構學習到最基本的分層通常有：
+ Presentation 呈現層
+ Application 應用層
+ Domain 領域層
+ Persistence 持久層

而 Ports & Adapters 架構隱含了兩個同心層：
1. 外部：傳遞機制(delivery mechanisms)與基礎設施(infrastructure)
2. 內部：業務邏輯

Ports & Adapters 和 Onion Architecture 同時擁有一個概念，那就是通過編寫適配器(adapter)，將應用程式的核心與基礎設施隔離，以防止基礎設施滲透到應用程式核心中(意思是應用程式核心直接對基礎設施產生依賴)。這使得抽換應用程式使用的工具和交付機制變得更容易，提供了一些對技術、工具和供應商鎖定的保護。

這也賦予應用程式一種愉快的能力，即無需真實的基礎設施或交付機制就能運行，因為它們可以被模擬物件所替換，這易於進行程式碼的測試。

然而，洋蔥架構也告訴我們，在企業應用中，我們將不只有內部與外部這樣簡單的分層，在內部，也就是業務邏輯中，我們會增加一些我們從領域驅動設計(DDD)認識的一些層：
![onion](https://herbertograca.files.wordpress.com/2017/03/2008-onion-architecture5.png)

此外，它明確地闡述了 Ports & Adapters 架構中關於依賴方向的隱含概念：
+ 外層依賴於內層，
+ 內層對外層一無所知。

這意味著耦合的方向是朝向中心，為我們提供了一個獨立的物件模型(domain model)，其核心不依賴任何東西。我們有足夠的靈活性可以改變外層，而不影響內層，更重要的層面。它在架構層面上運用了依賴反轉原則。

+ 洋蔥架構的主要原則：
    + 應用程式是建立在一個獨立的物件模型周圍。
    + 內層定義介面，外層實現介面。
    + 耦合的方向是朝向中心。
    + 所有應用程式的核心代碼都可以獨立於基礎設施進行編譯和運行

此外，任何外層都可以直接呼叫任何內層，這不會破壞耦合方向，並避免創建僅包含無業務邏輯的 proxy methods，甚至是 proxy classes，僅為了符合某種分層方案。這也符合 Martin Fowler 所表達的。

> […] the layers above can use any layer beneath them, not just the layer immediately beneath. - ***Jeffrey Palermo 2008, The Onion Architecture: part 3***  
> [...] 上層的層次可以使用任何位於其下的層次，而不僅僅是直接下方的那一層。 - ***傑弗里‧巴勒莫 2008，洋蔥架構：第三部分***

# 結論
洋蔥架構是建立在 Ports & Adapters 架構的基礎上，根據一些領域驅動設計的概念，為應用程序的業務邏輯增加了一些內部分層。

旨在進一步區分了責任，提供了低耦合和高內聚，並同時提供了更好的**可測試性(testability)** 和 **可維護性(maintainability)**。