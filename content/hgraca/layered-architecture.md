---
title: "[IT] 分層架構 Layered Architecture"
keywords: ["Software Architecture"]
description: 
date: 2023-10-17T21:44:07+08:00
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

分層是一種常見於系統中做法，用於分隔或組織程式碼，根據程式碼在系統中的角色或職責。

> *In an object-oriented program, UI, database, and other support code often gets written directly into the business objects. Additional business logic is embedded in the behaviour of UI widgets and database scripts. This happens because it is the easiest way to make things work, in the short run.*  
> *When the domain-related code is diffused through such a large amount of other code, it becomes extremely difficult to see and to reason about. Superficial changes to the UI can actually change business logic. To change a business rule may require meticulous tracing of UI code, database code, or other program elements. Implementing coherent, model-driven objects becomes impractical. Automated testing is awkward. With all the technologies and logic involved in each activity, a program must be kept very simple or it becomes impossible to understand.* - ***Eric Evans 2014, Domain-Driven-Design***  
> *在物件導向的程式中，使用者介面、資料庫和其他輔助程式碼常常直接被寫入商業物件中，額外的商業邏輯被嵌入在使用者介面和資料庫腳本，因為這是最簡單且最快速使事情可以運作的方式，導致這種情況時常發生。*  
> *當與領域相關的程式碼在更大量的程式碼中擴散，程式碼便開始變得困難且難以理解，UI 的變更可能導致業務邏輯的改變，同樣地，業務邏輯的更動需要密切地追縱 UI、資料庫與組其它組件的程式碼。實作內聚且以模型驅動的物件變得不可行、自動化測試變得笨拙，由於每個動作都涉及到所有的技術和邏輯，程式必須保持簡單，否則就會難以理解。* - ***艾瑞克‧埃文斯 2014, 領域驅動設計*** 

# 分層的意義
在一個分層系統中，每一層：
+ 取決於該層底下有哪些層。  
Depends on the layers beneath it.
+ 獨立於該層以上的層，意指對哪些層使用該層是未知的。  
Is independent of the layers on top of it, having no knowledge of the layers using it.

在分層架構中，可以用嚴格的方式定義：該層只能訪問其底下的層；或以更靈活的方式定義：該層可以訪問其下的任何層。馬丁‧福勒(Marting Fowler)和我自己的經驗都告訴我，第二種情況在實作中似乎效果更好，因為它避免了在中介層(intermediary layers)中創建代理方法(proxy methods)，甚至完整的代理類別(proxy classes)，並可能退化為 Lasagna Architecture 的反模式（下面有更多關於它的信息）。

> *Sometimes the layers are arranged so that the domain layer completely hides the data source from the presentation. More often, however, the presentation accesses the data store directly. While this is less pure, it tends to work better in practice*. - ***Fowler 2002, Patterns of Enterprise Application Architecture***  
> *有時候，各層會被安排得使得領域層完全隱藏了資料來源，使其對於呈現層來說是不可見的。然而，更常見的情況是，呈現層會直接存取資料儲存庫。雖然這種方式較不純粹，但在實際操作中，這種方式往往效果更佳。* - ***Fowler 2002，企業應用架構模式***

優點如下：
+ 我們只需要理解我們正在操作的該層，與該層底下的各個層。
We only need to understand the layers beneath the one we are working on.

+ 每一層都可以被等效的實作所替換，而不會對其他層產生影響。  
Each layer is replaceable by an equivalent implementation, with no impact on the other layers.

+ 分層是標準化的理想選擇。  
Layers are optimal candidates for standardisation.

+ 一個層可以被多個不同的高級層級使用。  
A layer can be used by several different higher-level layers.

缺點如下：
+ 層並不能封裝所有事物（一個添加到 UI 的欄位，很可能也需要添加到資料庫中）。  
Layers can not encapsulate everything (a field that is added to the UI, most likely also needs to be added to the DB).

+ 額外的層次可能會損害性能，尤其是在不同的階層中。  
Extra layers can harm performance, especially if in different tiers.

# 60年代與70年代
雖然軟體開發始於50年代，但我們今日所知的，可以被交付、部署且供非開發者自己使用的應用程式的軟體開發模式，實際上是誕生於60年代和70年代。

然而，60年代與70年代的應用程式仍與今日的形式大相逕庭，當時並沒有 GUI（該技術是80年代末或90年代初才出現），所有的應用程式只能透過 CLI 操作，並在一個只會傳送使用者輸入內容的簡單終端機上顯示。而這些應用程式，很可能都是在同一台電腦上使用的。
![1-tier](https://herbertograca.files.wordpress.com/2017/07/1960s-70s-layered-architecture-1-tier.png)

這些應用程式相當簡單，因此並未考慮到分層的設計，且它們被部署並在一台電腦上使用，實質上它們是單層(one-tier)的應用程式，雖然在某些時候，這種簡單的客戶端可以是遠端的。然而這些應用程式雖簡單，但它們並不具有可擴展性，例如，如果我們需要將軟體更新到新版本，我們將必須在每台已安裝該應用程式的電腦上進行更新。

# 80年代與90年代
在1980年代，企業應用程式開始活躍起來，我們開始看到在公司中有多個使用者在桌機上透過網路使用這些應用程式。

在這個時候，主要有三層：

+ **User Interface (Presentation)**：無論是網頁、命令列介面，或是原生桌面應用程式，都屬於使用者介面。
    + 即：**一個原生Windows應用程式**作為客戶端，由共同用戶在桌機上透過伺服器通訊。客戶端負責應用程式的流程與用戶輸入驗證。
+ **Business logic (Domain)**：這是應用程式存在的原因所在的邏輯。
    + 即：**一個應用伺服器**，它將包含業務邏輯並從本地客戶端接收請求，對其進行操作並將數據持久化到數據儲存庫中；
+ **Data source**：資料持久性機制（資料庫），或與其他應用程式的通訊。
    + 即：**一個資料庫伺服器**，將被應用伺服器用於數據的持久化。
![2-tier](https://herbertograca.files.wordpress.com/2017/07/1980s-90s-layered-architecture.png)

隨著使用情境的轉變，分層開始成為一種實踐，儘管它直到1990年代（Fowler 2002）才開始因**客戶端/服務器(client/server)** 系統的興起而普遍。這實際上是一種兩層(two-tier)應用程式，其中客戶端將是用作應用程序介面的豐富客戶端應用程序，而服務器將具有業務邏輯和數據源。

這種架構模式解決了**可擴展性問題**，因為多個用戶可以獨立使用該應用程式，我們只需要另一台桌面電腦，將客戶端應用程式安裝在其中即可。然而，如果我們有幾百個，甚至只有幾十個客戶，並且我們想要更新應用程式，那將是一項高度複雜的操作，因為我們必須一個接一個地更新客戶端。

# 90 年代中期之後

大約在1995年至2005年間，隨著向雲端環境的普遍轉變，應用程式使用者的增加，應用程式的複雜性和基礎設施的複雜性的提高，我們最終看到了分層方案的演變，其中一個典型的實施可能是：

+ 一個**本地的瀏覽器應用程式**，渲染並運行 UI，向伺服器應用程式發送請求；
+ 一個**應用伺服器**，包含了呈現層、應用層、領域層，以及持久層；
+ 一個**資料庫伺服器**，將被應用伺服器用於數據的持久化。
![3-tier](https://herbertograca.files.wordpress.com/2017/07/2010s-layered-architecture.png)

這是一種三層(3-tier)架構模式，也被稱為n層架構。這是一種**可擴展**的解決方案，並解決了**更新客戶端**的問題，因為用戶介面存在並在伺服器上編譯，儘管它是在客戶端瀏覽器上渲染和運行的。

# 2000 年以後

在2003年，Eric Evans發布了他的標誌性書籍《領域驅動設計：解決軟體核心的複雜性》。在該書中發布的許多關鍵概念中，也包含了對軟體系統分層的視野：
![ddd](https://herbertograca.files.wordpress.com/2017/04/ddd_layers.png?w=328&h=314)

+ User Interface 使用者介面
負責繪製用戶與應用程式互動的螢幕，並將用戶的輸入轉換為應用程式命令。值得注意的是，“用戶”可以是人，但也可以是其他應用程式，這完全對應於Ivar Jacobson的EBI架構中的邊界對象（稍後將在另一篇文章中詳述）。

+ Application Layer 應用層
協調領域對象以執行用戶所需的任務。它不包含業務邏輯。這與Ivar Jacobson的EBIArchitecture中的互動者相關，只是Jacobson的互動者是與UI或實體無關的任何對象。

+ Domain Layer 領域層
這是包含所有業務邏輯、實體、事件以及任何其他包含業務邏輯的對象類型的層。顯然，它與EBI的實體對象類型有關。這是系統的核心；

+ Infrastructure 基礎建設
支援上層的技術能力，即持久性或訊息傳遞。


# 反模式：千層麵架構 Anti-pattern: Lasagna Architecture 

「**Lasagna Architecture**」通常被用來指稱分層架構的反模式。當以下情況發生時：

+ 我們決定採用嚴格的分層方法，其中每一層只知道其下的那一層。在這種情況下，我們將**創建代理方法，甚至代理類別**，只是為了通過中間層，而不是直接使用我們需要的層。
+ 我們在追求創建完美系統的強烈欲望中，將項目引向**過度抽象化**；
+ 微小的**更新會對應用程式的所有區域產生深遠影響**，例如，整理單一層面可能是一項龐大的工作，風險巨大而回報微小。
+ 我們最終會有**太多的層(layers)**，這增加了整體系統的複雜性
+ 我們最終會有**過多的層級(tiers)**，這既增加了整體系統的複雜性，也損害了整體系統的性能
+ 我們明確地**按照其層次(layers)**（即用戶界面，領域，數據庫）來組織我們的單體系統，而不是按照其子領域/組件（即產品，付款，結帳）來組織，這破壞了領域概念的模塊化和封裝。

# Conclusion 結論
分層架構是另一種提供關注點分離、封裝和解耦的方式，通過將程式碼單元按照其在應用程式中的功能角色進行分組。

然而，就像生活中的大部分事物一樣，過度反而會適得其反！所以，經驗法則是：**只使用我們需要的層次，我們需要的階層**，而不多做任何事！我們不能為了追求不存在的建築聖杯而忘我。真正存在的是需求，以及最適合該需求的最佳選擇。這也是 **Lean** 的一部分，順帶一提。

此外，值得注意的是，這種自上而下的分層方法已經過時。在現代軟體開發中，我們不應再採用這種方式，有新的且更好的方式來思考應用程式的層次。我將在接下來的文章中討論這些。