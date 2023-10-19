---
title: "[IT] 軟體架構編年史 The Software Architecture Chronicles"
keywords: ["Software Architecture"]
description: 
date: 2023-10-13T23:41:57+08:00
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
> 前言：這系列文章為翻譯自作者 [hgraca](https://herbertograca.com/2017/07/03/the-software-architecture-chronicles/)。

這篇文章是關於軟體架構系列文章的第一篇。在這些文章中，我將分享我所學習到的軟體架構知識，我如何看待它，以及我如何運用這些知識。

我這一系列的文章稱為「軟體架構編年史」，並非因為我自認為是一位偉大的作家，而是因為我覺得這個名字有點俗氣，又帶點趣味。

在這篇首篇文章中，我將會談論我為何要撰寫這一系列的文章，以及接下來將會有什麼內容。

# 認識歷史的重要性
> *Those who fail to learn History are doomed to repeat it.* - **George Santayana**, ***The Life of Reason***, **1905**  
> *未能學習歷史的人注定要重蹈覆轍。* - **喬治‧桑塔亞納**《***理性的生活***》，**1905**

我認為從歷史中學習是非常重要的，它能教導我們事情。在個人層面上，我們終究需要（也希望）能從錯誤中學習。從國家的角度來看，歷史幫助塑造我們的文化、創造群體的概念，因此有了「台灣人」的觀念，一種國家認同。同時，歷史也幫助我們從祖先的錯誤中學習，比如信仰那些有著怪異思想的人，如二戰…

對程式開發者而言，歷史有助於我們仰靠前人的經驗上，少走許多錯的道路，並讓我們「站在巨人的肩膀上」達到更高的境界！

在我成為更好的開發者路上，我閱讀了很多文章，觀看了許多演講，我盡我所能的站在巨人的肩膀上。

有一件事情使我感到困惑，那就是許多意見是基於意見之上的意見…這就像是以訛傳訛，我們最終得到是對於一篇論文、文章或書籍真正內容的扭曲理解。

因此，我開始在網路上搜尋原始的論文、文章和書籍，這些都是我認為對我的工作最重要的概念，並自己對它們進行思考。

這些文章是這種推理的結果，因為我試圖理解這些概念是如何產生的，以某種程度上的時間順序來看。

撰寫這些文章迫使我大量閱讀和思考所有議題，並幫助我理解當代在軟體開發中使用的技術。我希望這些文章能對更多開發者有所幫助。

然而，如果你讀到一些你不理解或是不認同的內容，請告訴我，我非常願意討論這些議題，並從討論中學習，也願意修正我錯誤的觀點。

# 文章列表
[1. 軟體架構前提 (Software Architecture Premises)](../software-architecture-premises)

[2. 程式語言的演進 (Programming Languages Evolution)](../programming-language-evolution)

[3. 架構風格 / 架構模式 / 設計模式 (Architectural Styles vs. Architectural Patterns vs. Design Patterns)]()

[4. 單體架構 (Monolithic Architecture)](../monolithic-architecture)

[5. 分層架構 (Layered Architecture)](../layered-architecture)

[6. MVC 及其變形](mvc-and-its-variants)  
+ [1979 - Model-View-Controller]()
+ [1987/2000 - PAC/Hierachical Model-View-Controller]()
+ [1996 - Model-View-Presenter]()
+ [1998 - "Model1" & "Model2"]()
+ [2005 - ModelView-ViewModel]()
+ [???? - Model-View-Presenter-ViewModel]()
+ [2008 - Resource-Method-Representation]()
+ [2014 - Action-Domain-Responder]()

[7. EBI 架構 (EBI Architecture)]()

[8. 包裝與命名空間 (Packaging & namespacing)]()

[9. 領域驅動設計 (Domain-Driven Design)]()

[10. 埠與適配器架構, aka 六邊形架構 (Ports & Adapter Architecture aka Hexagonal Architecture)]()

[11. 洋蔥架構 (Onion Architecture)]()

[12. 乾淨架構 (Clean Architecture)]()

[13. 事件驅動架構 (Event-Driven Architectrue)]()

[14. 從CQS到CQRS]()

[15. 面向服務的架構 (Service Oriented Architecture, SOA)]()

[16. 明確的架構 #01: DDD, 六角, 洋蔥, 乾淨, CQRS, ... 我如何將它們全部組合在一起]()

[17. 明確的架構 #02: 不僅僅是同心層次]()

[18. 明確的架構 #03: 在程式碼中反映架構和領域]()

[19. 明確的架構 #04: 記錄架構]()

[20. 發展項目: 從 MVP 到 p]()

[21. 4+1 架構視圖模型]()

[22. 架構品質]()

# 時間軸
這是我在閱讀了所有這些主題的文章和書籍後，排出的軟體開發演進時間軸。
+ 1950s
    + **Non-structed Programming**
+ 1960s
    + **Structed Programming**
    + **Layering: 1 tier** UI + 業務邏輯 + 資料儲存
    + ~1958 - Algol
+ 1970s
    + **Procedural/Functional Programming**
    + ~1970 - Pascal
    + ~1972 - C
    + 1979 - **Model-View-Controller**
+ 1980s
    + **Object Oriented Programming(OOP)**: 最初的想法出現在 1960 晚期
    + **Layering: 2 tier** UI / 業務邏輯 + 資料儲存
    + ~1980 - C++
    + **CORBA**(Common Object Request Broker Architecture) - 通用物件請求代理架構(儘管第一個穩定版本在1991年推出，但第一次使用是在1980s)
    + ~1986 - Erlang
    + ~1987 - Perl
    + 1987 - PAC aka **Hierachical Model-View-Controller**
    + 1988 - **LSP**(Liskov Subsitution Principle)
+ 1990s
    + **Layering: 3 tier** UI / 業務邏輯(用戶端為瀏覽器時還包含UI呈現邏輯) / 資料儲存
    + ~1991 - **Message Bus**
    + ~1991 - Python
    + 1992 - **Entity-Boundary-Interactor** Architecture aka EBC aka EIC
    + ~1993 - Ruby
    + ~1995 - Delphi, Java, JavaScript, PHP
    + 1996 - **Model-View-Presenter**
    + 1996 - **OCP, ISP, DIP**, REP, CRP, CCP, ADP
    + 1997 - SDP, SAP
    + ~1997 - **Aspect Oriented Programming(AOP)**
    + ~1997 - **Web Service**
    + ~1997 - **ESB** - Enterprise Service Bus(儘管創造此詞的書籍於2004出版，當該概念於之前已使用過)
+ 2000s
    + 2002 - **SRP**
    + 2003 - **Domain-Driven-Design**
    + 2005 - **Model-View-ViewModel**
    + 2005 - **Ports & Adapter Architecture** aka Hexagonal Architecture
    + 2006? - **CQRS & ES**(Command Query Responsibility Segregation & Event Sourcing)
    + 2008 - **Onion Architecture**
    + 2009 - **Microservices** (at Netflix)
+ 2010s
    + 2010 - **Data-Context-Interaction Architecture**
    + 2012 - **Clean Architecture**
    + 2014 - C4 Model

