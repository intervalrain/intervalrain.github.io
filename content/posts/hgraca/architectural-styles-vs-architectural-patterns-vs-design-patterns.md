---
title: "[IT] 架構風格 vs. 架構模式 vs. 設計模式 Architectural Styles vs. Architectural Patterns vs. Design Patterns"
keywords: ["Software Architecture"]
description: 
date: 2023-10-14T14:29:21+08:00
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

在上一篇文章中，我介紹了程式語言的演進，以及它告訴我們的事情：軟體發展的驅勢是走向更多的**模組化(modularity)**與**封裝(encapsulation)**。

在接下來的文章，我會開始介紹架構風格與架構模式的演進。首先，我們要先知道什麼是架構風格，什麼是架構模式。

在軟體開發中的眾多術語中，定義往往不夠明確，卻不同人都有自己不同的解釋。MSDN 認為架構風格(architectural styles)與架構模式(architectural patterns)是同一碼子事，但我個人更傾向於 George Fairbanks 與 Michael Keeling 在 stack overflow 中與維基百科中的解釋。其關鍵的差異在於**範疇(scope)**。

同時，我們也需要強調這個觀念：架構風格、架構模式和設計模式並非互斥，它們相輔相成，每一種都能帶給我們一些啟示。然而，如同常情，我們只應在需要時才使用它們。

# Architectural Styles 架構風格
架構風格非常大方向的告訴我們該如何組織我們的程式碼，它有著高層次的粒度。它定義了層的概念，尤其應用程式的高階模組。它告訴我們模組與層之間是怎麼交互作用的、它們的關係等等。架構風格的例子：
+ Component-based
+ Monolithic application
+ Layered
+ Pipes and filters
+ Event-driven
+ Publish-subscribe
+ Plug-ins
+ Client-server
+ Service-oriented

一種建架構格可以透過各種方式實現，包括特定的技術環境、特定的政策、框架或實踐方法。

# Architectural Patterns 架構模式
模式是一種對反覆出現的問題的反覆解決方案。在架構模式的情況下，他們解決與架構風格相關的問題。例如，「我們該有哪些類別，它們該如何互動，以實現具有特定層次的系統」，又或者「我們的服務導向架構將擁有哪些高級模組，以及他們將如何溝通」，或者「我們的客戶端-伺服器架構將擁有多少層」。

架構模式對程式碼庫有著廣泛的影響，通常會橫向（即如何在一層內結構化程式碼）或縱向（即如何從外層處理請求到內層並返回）影響整個應用程式。架構模式的例子：
+ Three-tier 三層架構
+ Microkernel 微核心
+ Model-View-Controller 模型-視圖-控制器
+ Model-View-ViewModel 模型-視圖-視圖模型

# Design Patterns 設計模式
設計模式與架構模式在範疇上有所不同，它們更為局部化，對程式碼庫的影響較小，它們只影響程式碼的特定部分，例如：
+ 如何在我們只知道在運行時需要實例化什麼類型的情況下實例化一個對象（可能是一個工廠類別？）
+ 如何讓一個物件根據其狀態（可能是一個狀態機，或者是策略模式？）表現出不同的行為？

# Conclusion 結論
如我在這篇文章的開頭所提到的，一切都關於**範疇(scope)**：
+ 架構風格是在最高抽象層次上的應用設計。
+ 架構模式是實現架構風格的一種方式。
+ 設計模式是解決局部問題的一種方式。

此外，一種模式可能既可以作為架構模式，也可以作為設計模式使用，這再次取決於我們在特定項目中使用它的範疇。