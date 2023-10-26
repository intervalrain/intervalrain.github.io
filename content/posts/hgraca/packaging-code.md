---
title: "[IT] 套件與命名空間 packaging & namespacing"
keywords: ["Software Architecture"]
description: 
date: 2023-10-23T23:14:14+08:00
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

系統的架構是該系統的高層視圖、大局觀，以粗略的筆觸描繪的系統設計。架構決策是系統中的結構性決策，影響整個程式庫的決策，也是定義其他所有元素將在其上建立的決策。

架構決定系統的許多元素，包含：
+ 組件 Components
+ 組件之間的關係 Relationships between components
+ 指導組件與組件間關係如何設計與如何演化 Principles guiding the design and evolution of components and relationships

換句話說，這些是隨著系統演進更難改變的設計決策，它們是支撐功能開發的基礎。

# 義大利麵架構 Spaghetti Architecture
有些專案，結構隨機，既不反映架構，也不反映領域。如果我問「我應該把這個 value object 放在哪裡？」結果得到「把它放在 src 資料夾的某個地方」這樣的回答；如果我問「執行這個邏輯的 service 在哪裡？」卻得到「用你的 IDE 進行搜索」這樣的回答。這意味著專案沒有經過組織，這樣鬆散的結構就稱為義大利麵架構(Spaghetti Architecture)。

這是一個大問題，因為這意味著沒有套件模組化，高階的程式碼關係和流程並沒有可以遵循的邏輯結構，導致模組之間高度耦合且低內聚，實際上可能代表根本沒有模組，應該屬於模組的程式碼散佈在整個程式碼庫中。

# 可維護的程式碼庫
擁有一個可維護的程式庫意味著我們可以變更最少的程式碼來實現最大的概念變更。換句話說，當我們需要對一個程式碼單元進行變更時，我們應該盡可能少地對其他程式碼單元進行變更。

這樣帶來的優點有：
+ 程式碼的修改變得簡單，因為它們對較少的程式碼產生影響。
+ 程式碼的修改會更快，因為需要修改的程式碼較少。
+ 因為修改的程式碼變少，出現錯誤的可能性也更低。

**封裝(encapsulation)**、**低耦合(low coupling)**和**高內聚(high cohesion)**是使程式碼隔離的核心原則，使得我們能夠擁有可維護的程式碼基礎。

## 封裝 Encapsulation
這是隱藏類別的內部訊息與實作的過程。

也就是說，它對外隱藏了實作的方式，使得一個類別的內部結構可以自由變更，而不會影響使用這個特定類別的其他類別。

## 低耦合 Low coupling
耦合是指一個程式碼單元與另一個程式碼單元的關係。如果對一個模組的更改將導致對另一個模組的更改，則該模組被認為與另一個模組高度耦合。而如果一個模組獨立於任何其他模組，則該模組被認為是低耦合的。這可以通過擁有一個穩定的介面來實現，有效地隱藏了對其他模組的實現。

### 低耦合的好處
+ 可維護性(maintainability) - 變更僅限於單一模組
+ 可測試性(testability) - 可以將單元測試涉及的模塊限制到最小
+ 可讀性(readability) - 需要分析的類別被保持在最小範圍內

## 高內聚 High Cohesion
內聚性是指一個模塊的功能之間的緊密相關程度的衡量。低內聚是指模組間具有許多不相關的職責；高內聚是指模組間有類似的概念。

### 高內聚的好處
+ 可讀性(readability) - 相關的功能都包含在單一模塊中
+ 可維護性(maintainability) - bug 通常會被限制在單一模組中
+ 重用性(reusability) - 專注於類別的功能，不被無用的功能污染

# 結構上的影響
前述的原則通常與類別相關，然而，它們對於類別群組也同樣適用。類別群組在一般情況下被稱為套件(package)，但如果它們具有純粹的功能性目標(例如 ORM)，我們可以更具體地稱呼它們為模組(module)；如果它們具有領域目標(例如 AccountManagement)，我們可以稱呼它們為組件(components)。這與 Bass, Clements 和 Kazman 在他們的書《實踐軟體架構(Software Architecture in Practice)》中解釋的定義是一致的。

我們應該擁有低耦合和高內聚的套件，因為這將使我們能夠：
+ 更改一個套件而不影響其他套件，這有助於減少錯誤的出現。
+ 更改一個套件而無需更改其他套件，這有助於提高交付速度。
+ 擁有專門針對特定套件的團隊，這使得變更更快速、更少出錯，並且設計更佳
+ 團隊可以在減少相互依賴和衝突的情況下進行發展，從而提高生產力。
+ 對組件間的關係有更好的聯繫，這將使我們能夠更好地對整個應用程式建模，提高系統的品質。

# 概念封裝 Conceptual encapsulation
我認為，以一種既反映架構又反映領域的方式來組織我們的項目，將大大提高我們的程式碼的可維護性。實際上，我甚至敢斷言，這是唯一的方式(當我們處理中大型企業應用時)。

在一個組織良好的程式碼庫中，特定的程式碼單元只會有一個可能的位置存在。我們可能甚至不知道那個位置在哪裡，但只會有一條邏輯路徑引導我們找到它。

> ***套件的定義***  
> By grouping classes into packages we can reason about the design at a higher level of abstraction. The goal is to partition the classes in your application according to some criteria, and then allocate those partitions to packages. The relationships between those packages expresses the high level organization of the application. - ***Robert C. Martin 1996, Granularity pp. 3***  
> 透過將類別分組到套件中，我們可以在更高層次的抽象化中理解設計。目標是根據某些標準將您的應用程式中的類別進行分區，然後將這些分區分配到套件中。這些套件之間的關係表達了應用程式的高層次的組織。 - ***羅伯特 C. 馬丁 1996年, 《細緻度》pp. 3***

我們需要致力於定義概念上相關的程式碼套件。這些套件很重要，因為它們定義了概念上相關的程式碼單元，這些單元應該與其他套件隔離，並且定義了幾個套件之間的關係。

這是為了：
+ 理解程式碼單元之間的關係。
+ 維護程式碼之間的邏輯關係。
+ 擁有低耦合和高內聚的程式碼套件。
+ 重構程式碼套件時，對應用程式產生最小的影響。
+ 改變程式碼套件的實作時，對應用程式有最小的影響。

# 封裝原則 Packagin Principles
我們可以透過遵循 Robert C. Martin 於 1996 年和 1997 年發布的封裝原則來實現這一點，主要包括 CCP(Common Closure Principle), CRP(Common Reuse Principle) 和 SDP（Stable Dependencies Principle) 等原則。
## 封裝原則 by Robert C. Martin:
### Package Cohesion Principles 套件內聚原則
+ **REP – The Release Reuse Equivalency Principle**  
REP - 釋放重用等效原則  
*The granule of reuse is the granule of release  
重複使用的顆粒，就是釋放的顆粒*

+ **CCP – The Common Closure Principle**  
CCP – 共同封閉原則  
*Classes that change together are packaged together  
一起變動的類別會一起打包*

+ **CRP – The Common Reuse Principle**  
CRP - 共享重用原則  
*Classes that are used together are packaged together  
一起使用的類別會一起打包*
### Package Coupling Principles 套件耦合原則
+ **ADP – The Acyclic Dependencies Principle**  
ADP - 非循環依賴原則  
*The dependency graph of packages must have no cycles  
套件的依賴關係圖必須沒有循環*

+ **SDP – The Stable Dependencies Principle**
SDP - 穩定依賴原則  
*Depend in the direction of stability  
依賴於穩定的方向*

+ **SAP – The Stable Abstractions Principle**
SAP - 穩定抽象原則  
*Abstractness increases with stability  
抽象性隨穩定性增加*

要正確使用 SDP，我們應該定義程式碼的概念單元（組件）和組件的層(layers)，這樣我們就知道哪些組件應該了解(依賴)其他組件。

然而，如果那些元件的邊界不明確，我們最終會混淆應該互不知曉的程式碼單元，將它們耦合起來，讓它們變成混亂的程式碼，最終變成無法維護的程式碼。

為了明確劃定這些邊界，我們需要將概念上相關的類別組合到套件中，就像我們將概念上相關的方法組合到類別中一樣。在套件的層級上，我們只能使用具有概念性名稱的資料夾來實現，這些名稱在領域中有一定的意義(例如：用戶管理、訂單、付款，...)。只有在結構的最後一層，也就是其葉子節點，我們才能根據需要將類別按功能角色分開(例如：entity, factory, repository, ...)。

要設計出良好解耦的組件，對以下事項進行反思會有所幫助：

> *“if I would want to remove this business concept, by deleting its component root folder would all of the business concept code be removed and would the remaining application not break?”  
> “如果我想要移除這個商業概念，通過刪除其組件根資料夾，是否所有的商業概念代碼都會被移除，並且剩餘的應用程式不會出現故障？”*

如果答案是肯定的，那麼我們就有一個解耦合得很好的組件。

例如，在 Command Bus Architecture 中，command 和 handler 是無法分割的，他們在概念上和功能上都緊密相連，因此如果我們需要移除該邏輯，我們將一併移除它們。如果他們位於同一個位置，我們只需移除一個資料夾（我們試圖解決的問題並非關於刪除代碼，而是關於擁有解耦和內聚的程式碼，但這樣思考有助於理解）。因此，為了遵循 CCP 和 CRP，command 應該與其 handler 在同一個資料夾中。

任何程式碼單元都應只存在於一個邏輯位置，即使是項目中的新手或初級開發人員也能明顯看出。這將避免不一致性、丟失的程式碼、重複的程式碼和開發人員的挫折感。如果我們需要尋找程式碼，因為我們不知道它應該在哪裡，和/或如果很難理解我們正在處理的程式碼相關的程式碼...那麼我們就有一個糟糕的項目結構，或者更糟，一個糟糕的架構。

# Screaming Architecture
"Screaming Architecture" 是由 Robert C. Martin 提出的，基本上，它認為項目應該非常清楚地告訴我們系統的主要領域是什麼。因此，源資料夾中首先出現的資料夾應該與領域概念相關，即頂級的有界上下文（例如：病人，醫生，預約等）。它們不應該關於系統使用的工具（例如：Doctrine, MySQL, Symfony, Redis等），也不應該關於系統的功能部分（例如，repositories, views, controllers），也不應該關於交付機制（http, consoles, ...）。

> *Your architectures should tell readers about the system, not about the frameworks you used in your system. If you are building a health-care system, then when new programmers look at the source repository, their first impression should be: “Oh, this is a heath-care system”. - ***Robert C. Martin 2011, Screaming Architecture***  
> 您的架構應該向讀者介紹系統，而不是您在系統中使用的框架。如果您正在建立一個醫療保健系統，那麼當新的程式設計師查看源代碼庫時，他們的第一印象應該是：“哦，這是一個醫療保健系統”。* - ***羅伯特·C·馬丁 2011，尖叫的架構***

這實際上是一種更簡單的思考方式，他在 15 年前發表的封裝原則，我在上面已經陳述過了。這種包裝風格也被稱為 "Package by feature"。