---
title: "[IT] Design Patterns"
keywords: ["Design Patterns", "Software development", "設計模式"]
description: "簡介設計模式"
date: 2023-05-01T00:22:49+08:00
tags: ["IT", "Design Patterns"]
draft: false
Categories: IT
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

# 設計模式 Design Pattern
![gof](https://static.packt-cdn.com/products/9781782173656/graphics/image_01_006.jpg)
## 什麼是設計模式?
+ 設計模式是指在軟體設計中通常出現的問題的典型解決方案。它們就像是預先製作好的藍圖，您可以根據自己程式碼中出現的重複設計問題來進行自定義。  
+ 設計模式不是一個特定的程式碼，而是一個解決特定問題的一般概念。您可以按照模式的細節來實現適合自己程式的解決方案。值得注意的是，設計模式常與演算法混淆，因為這兩個概念都描述了解決某些已知問題的典型解決方案。模式是一個更高層次的解決方案描述。  
+ 模式通常包括模式意圖、動機、結構、程式碼示例等幾個方面，以便人們在多種情況下可以複製它們。模式目錄還列出了其他有用的細節，例如模式的適用性、實施步驟和與其他模式的關係。
## 誰發明了設計模式?
+ 設計模式不是晦澀難懂、高深複雜的概念，相反地，它們是物件導向設計中解決常見問題的典型解決方案。當一個解決方案在不同的項目中反復出現，某人最終會給它命名並詳細描述解決方案。這基本上是模式的發現方式。
+ 模式的概念最初是由Christopher Alexander在《模式語言：城鎮、建築、建設》中描述的。這本書描述了一種用於設計城市環境的“語言”。這種語言的單位是模式。它們可以描述窗戶應該有多高，建築物應該有多少層，社區中綠地的大小應該是多少等等。+ 這個想法被四位作者Erch Gamma、John Vlissides、Ralph Johnson和Richard Helm接受。在1994年，他們出版了《Design Patterns: Elements of + Reusable Object-Oriented Software》一書，將設計模式的概念應用於編程中。該書介紹了23個解決物件導向設計中各種問題的模式，並迅速成為暢銷書。由於書名過長，人們開始稱之為“四人幫的書(Gang of Four, GoF)”。
+ 此後，發現了許多其他物件導向模式。模式方法在其他編程領域也變得非常流行，因此現在還存在許多與物件導向設計無關的模式。
## 為什麼要學習設計模式?
+ 設計模式是解決軟體設計中常見問題的一套經過驗證的解決方案工具包。即使從未遇到這些問題，了解模式仍然有用，因為它可以使用物件導向設計原則解決各種問題。
+ 設計模式定義了一個共通的語言，使團隊之間可以使用它更有效地進行溝通。
## 設計模式的分類
![10pat](/IT/img/ten_patterns.jpg)
+ 設計模式可以根據其複雜性、細節程度和應用於整個系統的規模進行分類。它們有點像道路建設的類比：通過安裝交通信號燈或建造整個多層立交橋和地下通道來使十字路口更安全。
+ 最基本和低層次的模式通常被稱為 "idioms"。它們通常僅適用於單一程式語言。
+ 最通用和高層次的模式是架構模式(architectural patterns)。開發人員可以在幾乎任何語言中實現這些模式。與其他模式不同，它們可用於設計整個應用程序的架構。
+ 此外，所有模式都可以通過其意圖或目的進行分類。本文將涵蓋三個主要模式：
    + 創建型模式(creational)：提供了增加彈性和重複使用現有代碼的物件創建機制。
    + 結構型模式(structural)：解釋如何將物件和類組合成更大的結構，同時保持這些結構的靈活性和效率。
    + 行為型模式(behavioral)：負責處理物件之間的有效溝通和職責分配。
## SOLID 原則
+ 在進入本文之前，來認識一下 SOLID 原則：(詳細的內容可以參考YC的部落格)
    + [S = Single-responsibility principle (SRP) = 單一職責原則](https://medium.com/@ChunYeung/%E4%BD%BF%E4%BA%BA%E7%98%8B%E7%8B%82%E7%9A%84-solid-%E5%8E%9F%E5%89%87-%E5%96%AE%E4%B8%80%E8%81%B7%E8%B2%AC%E5%8E%9F%E5%89%87-single-responsibility-principle-c2c4bd9b4e79)
    + [O = Open–closed principle (OCP) = 開放封閉原則](https://medium.com/@ChunYeung/%E4%BD%BF%E4%BA%BA%E7%98%8B%E7%8B%82%E7%9A%84-solid-%E5%8E%9F%E5%89%87-%E9%96%8B%E6%94%BE%E5%B0%81%E9%96%89%E5%8E%9F%E5%89%87-open-closed-principle-f7eaf921eb9c)
    + [L = Liskov substitution principle (LSP) = 里氏替換原則](https://medium.com/@ChunYeung/%E4%BD%BF%E4%BA%BA%E7%98%8B%E7%8B%82%E7%9A%84-solid-%E5%8E%9F%E5%89%87-%E9%87%8C%E6%B0%8F%E6%9B%BF%E6%8F%9B%E5%8E%9F%E5%89%87-liskov-substitution-principle-e66659344aed)
        + [補充：jyt0532](https://www.jyt0532.com/2020/03/22/lsp/)
    + [I = Interface segregation principle (ISP) = 介面隔離原則](https://medium.com/@ChunYeung/%E4%BD%BF%E4%BA%BA%E7%98%8B%E7%8B%82%E7%9A%84-solid-%E5%8E%9F%E5%89%87-%E4%BB%8B%E9%9D%A2%E9%9A%94%E9%9B%A2%E5%8E%9F%E5%89%87-interface-segregation-principle-50f54473c79e)
    + [D = Dependency inversion principle (DIP) = 依賴反向原則](https://medium.com/@ChunYeung/%E4%BD%BF%E4%BA%BA%E7%98%8B%E7%8B%82%E7%9A%84-solid-%E5%8E%9F%E5%89%87-%E4%BE%9D%E8%B3%B4%E5%8F%8D%E5%90%91%E5%8E%9F%E5%89%87-dependency-inversion-principle-a74ca045d776)

## 正文
### Factory
+ **簡介**
    + 工廠模式（Factory Pattern）最常用的設計模式之一。 這種類型的設計模式屬於創建型模式，它提供了一種創建物件的最佳方式。
    + 在工廠模式中，我們在創建物件時不會對用戶端暴露創建邏輯，並且是通過使用一個共同的介面來指向新創建的物件。
+ **意圖**：
    + 定義一個創建物件的介面，讓其子類自己決定實例化哪一個工廠類，工廠模式使其創建過程延遲到子類進行。
+ **主要解決**：
    + 主要解決介面選擇的問題。
+ **何時使用**：
    + 我們明確地計劃不同條件下創建不同實例時。如何解決：讓其子類實現工廠介面，返回的也是一個抽象的產品。
+ **關鍵代碼**：
    + 創建過程在其子類執行。
+ **應用實例**： 
    1. 您需要一輛汽車，可以直接從工廠裡面提貨，而不用去管這輛汽車是怎麼做出來的，以及這個汽車裡面的具體實現。 
    2. Hibernate 換資料庫只需換方言和驅動就可以。
+ **優點**： 
    1. 一個調用者想創建一個物件，只要知道其名稱就可以了。
    2. 擴展性高，如果想增加一個產品，只要擴展一個工廠類就可以。 
    3. 遮罩產品的具體實現，調用者只關心產品的介面。

+ **缺點**：
    + 每次增加一個產品時，都需要增加一個具體類和對象實現工廠，使得系統中類的個數成倍增加，在一定程度上增加了系統的複雜度，同時也增加了系統具體類的依賴。 這並不是什麼好事。

+ **使用場景**： 
    1. 日誌記錄器：記錄可能記錄到本地硬碟、系統事件、遠端伺服器等，用戶可以選擇記錄日誌到什麼地方。 
    2. 資料庫訪問，當使用者不知道最後系統採用哪一類資料庫，以及資料庫可能有變化時。 
    3. 設計一個連接伺服器的框架，需要三個協定，“POP3”、“IMAP”、“HTTP”，可以把這三個作為產品類，共同實現一個介面。

+ **注意事項**：
    + 作為一種創建類模式，在任何需要生成複雜物件的地方，都可以使用工廠方法模式。 有一點需要注意的地方就是複雜對象適合使用工廠模式，而簡單物件，特別是只需要通過 new 就可以完成創建的物件，無需使用工廠模式。 如果使用工廠模式，就需要引入一個工廠類，會增加系統的複雜度。
![factory](https://www.runoob.com/wp-content/uploads/2014/08/AB6B814A-0B09-4863-93D6-1E22D6B07FF8.jpg)
    + [Design Pattern - Factory 程式碼參考](https://github.com/intervalrain/DesignPatternDemo/tree/main/Factory)
### Abstract Factory
+ **簡介**
    + 抽象工廠模式（Abstract Factory Pattern）是圍繞一個超級工廠創建其他工廠。該超級工廠又稱為其他工廠的工廠。這種類型的設計模式屬於創建型模式，它提供了一種創建物件的最佳方式。
    + 在抽象工廠模式中，介面是負責創建一個相關物件的工廠，不需要顯式指定它們的類別。每個生成的工廠都能按照工廠模式提供物件。
+ **意圖**：
    + 提供一個創建一系列相關或相互依賴對象的介面，而無需指定它們具體的類別。
+ **主要解決**：
    + 主要解決介面選擇的問題。
+ **何時使用**：
    + 系統的產品有多於一個的產品族，而系統只消費其中某一族的產品。
+ **如何解決**：
    + 在一個產品族裡面，定義多個產品。
+ **關鍵代碼**：
    + 在一個工廠里聚合多個同類產品。
+ **應用實例**：
    1. 家中的衣櫃是一個具體工廠，存放各式各樣的衣、褲，其中家中的衣櫃就是「衣櫃」這個虛擬工廠的其中一個實例，而衣櫃這個工廠又裝載了「衣服工廠」與「褲子工廠」，其各自裝載了「衣服」與「褲子」這兩項產品。
+ **優點**：
    + 當一個產品族中的多個對象被設計成一起工作時，它能保證客戶端始終只使用同一個產品族中的物件。
+ **缺點**：
    + 產品族擴展非常困難，要增加一個系列的某一產品，既要在抽象的 Creator 里加代碼，又要在具體的裡面加代碼。
+ **使用場景**：
    1. 換 Line 的聊天室 skin。
    2. 生成不同作業系統的程式。
+ **注意事項**：
    + 產品族難擴展，產品等級易擴展。
![abstractFactory](https://www.runoob.com/wp-content/uploads/2014/08/3E13CDD1-2CD2-4C66-BD33-DECBF172AE03.jpg)
    + [Design Pattern - Abstract Factory 程式碼參考](https://github.com/intervalrain/DesignPatternDemo/tree/main/AbstractFactory)
### Builder
### Prototype
### Facade
### Proxy
### Iterator
### Observer
### Mediator
### State