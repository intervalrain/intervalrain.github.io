---
title: "[IT] EBI 架構"
keywords: ["Software Architecture"]
description: 
date: 2023-10-22T23:54:36+08:00
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
EBI 架構全名是 Entity-Boundary-Interactor Architecture，第一次由 Robert C. Martin 在他乾淨架構(Clean Architecture)中的演講中提到。

然而，EBI 架構正式的發布是來自 Ivar Jacobson 在 1992 年所出版的 ***《物件導向的軟體工程：用例驅動方法(Object-Oriented Software Engineering: A use case driven approach)》***。當時，Jacobson 實際上稱之為 Entity-Interface-Control，爾後才進行更名，為了避免將 Interface 與程式語言中的 Interface 或 User Interface 混淆；也避免將 Control 與 MVC 中的 Controller 混淆。

![EBI](https://herbertograca.files.wordpress.com/2017/04/fig_7_12_entity_interface_control.jpg)

# Entity 實體
Entity objects 持有所有系統使用的數據且持有所有與數據耦合的行為。每個 Entity object 代表一個與問題領域相關的概念，同時具備身份(identity)與永久性(persistence)。Jacobson 告訴我們，Entity object 應該要包含那些會因 entity 自身變化而變化的邏輯，也就是說，如果它持有的數據結構改變，則對該數據的操作也將需要變化，因此它們應該位於 entity中。

值得注意的是，Jacobson在1992年就已經發出了一個警告：

> *Beginners may sometime only use entity object as data carriers and place all dynamic behaviour in control objects […]. This should, however be avoided. […] Instead, quite a lot of behaviour should be placed in the entity objects.* - ***Ivar Jacobson 1992, pp. 134***  
> *初學者有時可能只將實體物件用作數據載體，並將所有動態行為放在控制物件中[...]。然而，這樣的做法應該避免[...]。相反，應該將相當多的行為放在實體物件中。* - ***伊瓦爾‧雅各布森 1992, pp. 134***

這是對我們現在所知的「**貧血實體(anaemic enetities)**」的警告。

# Boundary 邊界
邊界物件模擬系統的介面。

> *[…] everything concerning the interface of the system is placed in an interface object* - ***Ivar Jacobson 1992, pp. 134***  
> *[...] 有關系統介面的所有事物都被放置在一個介面物件中* - ***伊瓦爾‧雅各布森 1992, pp. 134***

所有依賴於系統環境（工具和交付機制）的功能都應該存在於邊界物件中。

system 與 actor 的任何互動都會透過邊界物件進行。正如雅各布森所描述的，actor 可以是像客戶或管理員（操作員）這樣的人類使用者，但也可能是像警報器、打印機或第三方 API 這樣的非人類使用者。
![boundary](https://herbertograca.files.wordpress.com/2017/04/fig_7_14_boundaries.jpg)

反思這個邊界的概念，並看著上圖，並想像它有 6 個邊界而不是 4 個，它是不是與 13 年後(2005) 發表的 Ports & Adapters Architecture 有一曲同工之妙呢？

# Interactor 互動器
互動器物件將保有那些並非自然地綁定於其他類型物件的行為(behavior)。

此些行為通常包含對多個實體的操作，並在返回某些結果給邊界物件時告終。

> *Behaviour that remains after the Interface objects and Entity objects have obtained their parts will be placed in the control objects* - ***Ivar Jacobson 1992, pp. 134***  
> *在介面物件和實體物件獲得其部分之後仍然存在的行為將被放置在控制物件中* - ***伊瓦爾‧雅各布森 1992, pp. 134***

這意味著所有不符合邊界或實體的行為，將被放置在一個或多個控制物件中。

因此，Jacobson 不僅將控制物件視為協調用例的物件，也將其視為對用例有相關行為的物件，但並非邊界或實體。

以我的經驗，我會將 interactors 比擬為 Application Services(或 use cases)與 Domain Services(包含 domain behavior 但非 entities)。

這些 interactor objects 之所以重要，是因為如果我們不使用它們，我們將會把特定的使用案例邏輯放在 entities 中。然而，entities 在多個使用案例中被使用，因此具有通用性。將特定的使用案例邏輯放在 entities 中，使得其在多個邊界中可用，這可能導致它被當作通用邏輯來使用，我們可能最終會因為改變它而不慎改變了另一個邊界，增加其複雜性並增加破壞其他使用它的使用案例的機會。

# Why 3 object types?
當時，雅各布森表示，其他的物件導向方法論會將所有這些責任都放在 entities 本身，然而，他（及其合作者）更傾向於將這些責任分隔成三種物件類型，因為這樣可以使系統更能適應變化。

> *[…] all systems will change. Therefore stability will occur in the sense that all changes will be local, that is, affect (preferably) only one object in the system.*- ***Ivar Jacobson 1992, pp. 135***  
> *[…] 所有系統都將會變化。因此，穩定性將在某種程度上出現，即所有的變化都將是局部的，也就是說，它們（最好）只影響系統中的一個物件。*- ***Ivar Jacobson 1992, pp. 135***  

因此，目標是通過封裝責任來實現系統變化的局部性。如果我們深思熟慮，Jacobson 其實隱含地談到了**單一職責原則**，這個原則是在 10 年後由 Robert C. Martin 在他的《敏捷軟體開發，原則，模式，和實踐(Agile Software Development, Principles, Patterns, and Practices)》中發表的。

# 結論
在 MVC 模式中，模型代表整個後端，包括所有的實體、服務及其關係，EBI 模式將邊界視為與外界的一個完整連接，而不僅僅是一個視圖、控制器或介面（語言構造）。邊界代表整個呈現層，這在 MVC 中對應於視圖和控制器。EBI 中的實體代表實際持有數據及其相關行為的實體，而互動者物件則建立呈現層與實體之間的連接，它們是我所稱的應用服務和領域服務。

EBI 模式對於後端來說，就如同 MVC 對於前端一樣。它們並非彼此的替代品，而是相互補充。如果我們將它們結合成一個單一的模式，我們可以稱之為類似於View-Controller-Interactor-Entity(視圖-控制器-互動器-實體)的東西。