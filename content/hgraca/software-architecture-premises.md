---
title: "[IT] 軟體架構前提 The Software Architecture Premises"
keywords: ["Software Architecture"]
description:
date: 2023-10-14T01:14:17+08:00
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

在這篇文章中，我將建立有關軟體架構的最初概念，這將有助於更好地理解接下來的文章。

# 沒有萬靈丹
無論你如何理解我在《軟體架構編年史》中所談論的內容，最重要的是要明白，並不存在萬能的解決方案。儘可能多學習不同的方法，理解每種方法的優點和缺點，以及它們解決的具體技術問題。

然後，在接受新的挑戰時，首先要理解業務和終端用戶的需求。只有在清楚理解這些需求之後，您才能理智地思考應該使用哪種架構風格和模式來更好地解決手頭的問題。

最後，做出你自己的選擇，也許實施其中一種已知的解決方案，或者創建你自己的設計來適應你特定的問題。

> *Some architectural styles are often portrayed as ‘silver bullet’ solutions for all forms of software. However, a good designer should select a style that matches the needs of the particular problem being solved.* - **Roy Fielding, 2000**  
> *有些架構風格常被描繪為所有軟體問題的「萬靈丹」解決方案。然而，一個優秀的設計師應該選擇一種與特定問題需求相匹配的風格。* - **羅伊·菲爾丁，2000**

# Terminology 術語
在軟體開發的世界裡，使用的術語充滿了模糊性，因此，在繼續之前，澄清我所使用的一些術語的意義是非常重要的。

## Functional 功能性的
這是任何一段程式碼、方法、類別、類別群組，它在應用程式中擔任純粹的技術角色。它與領域無關，僅代表應用程式中的技術能力。例如：
+ Layers
+ Factories
+ Repositories
+ Value Objects
+ Views
+ ViewModels

## Conceptual 概念性的
這是任何一段代碼、方法、類別、一組類別，都反映了應用程式中的領域概念。它與領域直接相關，代表了應用程式中的業務能力。例如：
+ User
+ Product
+ Stock Management
+ Product Variants
+ Checkout
+ Upsells

這種分離並不意味著一個程式碼單元不能以兩種方式（功能性和概念性）被引用。例如，一個 `Money` 類別可以代表一個 domain concept，也可以是一個 value object。

## Package 套件
任何一組按照某些規則理想地組合在一起的類別

## Module 模組
我使用的定義來自於《***實踐中的軟體架構（Software Architecture***）》一書，該書指出，一個模組是一個**功能性的套件**，它反映了應用程式中的**技術能力**。它是解耦的，可以被其他實現替換。對我來說，模組存在於一個較低的粒度級別，例如，「**安全模組**」或「**ORM**」，但也存在於像應用程式的**客戶端**和**伺服器**這樣的更高粒度級別。模組提供了功能性的內聚。

## Component 組件
我也採用了《***實踐中的軟體架構（Software Architecture***）》一書中給出的定義，其中作者將組件定義為反映**業務能力**的**概念性套件**。理想情況下，它也應與其他組件和模塊解耦。例如可以是 **User**、**Product** 或 **Checkout**。

然而，最重要的是要記住，理想情況下，它反映了 **Bounded Context**。組件提供了概念性的內聚。

## Application 應用程式
我將應用程式視為面向使用者的程式碼，也就是使用者介面（UI），它是建立在元件之上的。例如，我們可以有一組元件，我們在其上建立一個網路商店。然而，這個網路商店有一個由消費者用來瀏覽和購買產品的使用者介面（商店前台），並且它有另一個獨立的使用者介面，由商店管理員用來管理產品、庫存、付款提供商等（後台）。這些都是建立在相同業務元件之上的兩個獨立應用程式。

## System 系統
我將系統視為一組應用程式，這些程式以某種方式共同工作，以滿足各種企業需求，形成一個企業範圍的系統，即企業應用程式。這些應用程式可能建立在相同的組件之上，也可能不是。在前面的網路商店例子中，系統是整個網路商店，包括建立在相同業務組件之上的兩個應用程式（商店前台和管理員），但也包括其他第三方應用程式，如付款提供商或運輸提供商。

## Architecture 架構
有許多簡單的軟體架構定義，我認為擁有這些定義是好的，但我認為更容易理解的是，甚至更重要的是，定義架構的成果，它應該為項目提供什麼。
> *Software Architecture […] is the set of structures needed to reason about the system, which comprises software elements, relations among them, and properties of both.* - Clements et al, 2010  
*軟體架構[…]是用於推理系統所需的結構集合，其中包括軟體元素、它們之間的關係，以及兩者的屬性。* - Clement 等人，2010

這是我對架構的理解：
+ 所有與功能開發相關的技術決策，即框架(frameworks)、編碼標準(coding standards)、文檔(documentation)、流程(processes)等。
+ 這些技術決策很難在專案開發後期去做更動。
+ 是對系統的全局觀，對組件們的結構與關係的描述。
+ 它為變動提供緩衝，通常是為了延緩變更。
+ 提供良好的組件與模組的重用(reuse)機制。
+ 它為結果的一致性和流程的輕量化設立標準，如編碼標準、開發階段、持續交付和部署。
+ 這並非僅是一個人的責任，而是屬於該項目中不同功能團隊的一群經驗豐富的開發者的責任。

## Architect 架構師
他們是建築學的守護者和推廣者，可以是個人、也可以是團隊。他們是團隊/部門中最有經驗的開發者之一，且有分析高層次問題和解決方案的責任。在做出決策時，總是會被認為是有「質量」的。

值得注意的是，所有的開發者在某種程度上都會成為架構師，因為他們都需要理解架構，都會以某種方式貢獻於架構，最終，他們都有維護現有架構的責任。

## Ivory Tower Architect 象牙塔架構師
全能的**象牙塔架構師**是架構師的**反模式**，他承擔起決定所有與架構相關的問題。他剝奪了其他 stakeholder 對架構的貢獻，因為他既不開放，也不容易接受這些貢獻。

# 壞味道
## Rigidity 剛性
軟體的剛性就是指該軟體難以變更，因為一個變動將引發更多的變動需求。這就像是一個兔子洞：當我們認為快要完成時，卻發現還有更多的程式碼需要被修改，將我們拖入一個看不見盡頭的循環中。

## Fragility 脆弱性
當軟體被更改時，它將在預料之外、無關聯且無法預測的地方破裂。

## Immobility 不動性
當一個設計包含了可能在其他系統中有用的部分，但從原始系統中分離它們的努力和風險過大時，該設計就是不動的。

## Viscosity 黏度
在一個黏性系統中，做錯事要比做對事容易得多。這意味著，透過短路行為來實施變革，比正確地開發它要來得容易得多。 

如果執行單元測試和/或編譯需要大量時間，導致開發人員可能會繞過程序並在未執行所有自動化測試的情況下實施一個破解，那麼就會發生系統範圍的黏度。

## Needless repetition 不必要的重複
當必要的抽象化未能完成時，就會發生這種情況，原因可能是時間不足或經驗不足。程式碼可能並未直接被複製貼上，但相同的業務規則在多個地方被定義。

## Opacity 不透明度
這段程式碼的撰寫方式晦澀難懂，我們需要深入研究方法的實現才能理解其功能。

## Needless complexity 不必要的複雜性
在熱衷於避免其他六種問題的嘗試中，開發者引入了各種抽象和為可能的未來變化做的準備。優秀的軟體設計應該是輕量級的，靈活的，易於閱讀和理解，最重要的是易於變更，這樣你就不必試圖預測未來所有可能的變化。