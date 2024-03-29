---
title: "[IT] 事件驅動架構 Event-Driven Architecture"
keywords: ["Software Architecture"]
description: 
date: 2023-10-31T23:25:09+08:00
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
利用事件來設計應用程式似乎是 80年代後期開始的一種做法，我們可以在使用事件在前端或後端任何地方使用事件，當按下一個按鈕，涉及某些數據變更，或是執行某些後端動作時。

# What/When/Why
就像類別(classes)一樣，組件(components)之間應該保持低耦合，但在內部應保持高內聚。當組件需要協作時，比如說組件A需要觸發組件B中的某些邏輯，自然的做法就是讓組件A調用組件B中一個物件的方法。然而，如果A知道B的存在，那麼它們就是耦合的，A依賴於B，這使得系統更難改變和維護，事件可以用來**防止耦合**。

如果我們有一個團隊只專注於組件B的工作，它可以改變組件B對組件A邏輯的反應，甚至不需要與負責組件A的團隊溝通。組件可以獨立進化：**我們的應用程式變得更有機(organic)**。

即使在同一個組件中，有時我們會需要執行程式碼作為一個行動的結果，但它並不需要立即執行，也就是說，當事件的結果互不影響的情境下，我們可以採用 **異步(async)** 的策略執行程式。

然而，這樣做也存在危險，如果我們不加選擇地使用事件，可能會使一個概念上高度內聚的邏輯被解耦。換句話說，本應在一起的程式碼被強行分開，變得很難追蹤、理解(類似`goto`語句)，最後使得它變成：speghetti code！

為了防止我們的程式碼變成一堆混亂的 speghetti code，我們應該清楚的限制事件的使用規則。根據我的經驗，有三種情況下應該使用事件：
1. 解耦元件。
2. 執行異步任務。
3. 追蹤狀態變更 (audit log)

## 1. 解耦元件
當元件A執行需要觸發元件B邏輯的動作時，我們可以選擇不直接呼叫它，而是將一個事件發送到事件調度器(dispatcher)中。元件B將會在調度器中監聽該特定事件，並在事件發生時作出反應。

這意味著A和B都將依賴於調度器和事件，但他們將對彼此一無所知，也就是說他們是解耦的。

理想情況下，調度器和事件都不應存在於任何組件中：

+ 調度器應該是一個與我們的應用程式完全獨立的庫，因此應該使用依賴性管理系統安裝在一個通用的位置。在PHP世界中，我們會使用 **Composer** 將之安裝在 *vendor* 的資料夾。(C# 可以參考我 [EventBus 的文章](../../it/eventbus/))
+ 這個事件雖然是我們應用程式的一部分，但應該存在於兩個組件之外，以保持它們對彼此一無所知。該事件在組件之間共享，並且是應用程式核心的一部分。事件是 DDD 所稱的 **共享核心(Shared Kernel)** 的一部分。這樣，兩個組件將依賴於共享核心，但將對彼此保持不知情。然而，在單體應用程式中，為了方便，可以將其放置在觸發事件的組件中。

> **Shared Kernel**  
> **共享核心**  
> *[…] Designate with an explicit boundary some subset of the domain model that the teams agree to share. Keep this kernel small. […] This explicitly shared stuff has special status, and shouldn’t be changed without consultation with the other team.* - ***Eric Evans 2014, Domain-Driven Design Reference***  
> *[…] 指定一個團隊同意共享的領域模型的子集，並明確劃定其範疇。保持這個核心部分的規模小。[…] 這些明確共享的內容具有特殊的地位，不應在未與其他團隊諮詢的情況下進行更改。* - ***艾瑞克·埃文斯 2014，領域驅動設計參考資料***
## 2. 執行異步任務
有時候，我們有一段邏輯需要執行，但可能需要花費相當長的時間來執行，我們並不希望讓使用者等待它完成。在這種情況下，我們希望將其設定為異步任務，並立即向使用者返回一條消息，告知他的請求將在稍後異步執行。

例如，您可以同步地在網店下訂單，但發送電子郵件通知用戶可以異步完成。

在這種情況下，我們可以做的是觸發一個將被排隊的事件，並將其留在隊列中，直到有工作人員可以接手並在系統有資源時執行它。

在這些情況下，相關邏輯是否在同一個有界上下文中並不真正重要，因為無論如何：邏輯都是解耦的。

## 3. 追蹤狀態變更(audit log)
在傳統的數據儲存方式中，我們利用一些實體(entities)來保存數據。當這些實體中的數據發生變化時，我們只需要更新 DB 表格的一行，以反映這個變化。

問題是，我們並未記錄發生了什麼事與何時發生。

我們可以將經歷變更的事件儲存在 audit log 的結構中。

更仔細的內容會在底下的 ***[Event Sourcing](../event-driven-architecture/#event-sourcing-%E4%BA%8B%E4%BB%B6%E6%BA%90%E8%99%95%E7%90%86)*** 說明。

# Listeners V.S. Subscribers
在實施事件驅動架構時，常見的討論是應該使用事件監聽器(listeners)還是事件訂閱者(subscribers)：
1. 事件監聽器(Event Listeners)只對一種事件作出反應，並可以有多種方法對其作出反應。因此，我們應該根據事件名稱來命名監聽器，例如，如果我們有一個`UserRegisteredEvent`，我們將有一個`UserRegisteredEventListener`，這將使我們能夠輕易知道，即使不看文件內容，該監聽器正在監聽哪個事件。對事件的方法（反應）應該反映該方法實際上的作用，例如`notifyNewUserAboutHisAccount()`和`notifyAdminThatNewUserHasRegistered()`。這應該是大多數情況下的常規做法，因為它使監聽器保持小巧並專注於對特定事件的反應。此外，如果我們有一個組件化的架構，每個組件(如果需要)都會有自己的監聽器來監聽可能從多個位置觸發的事件。

2. 事件訂閱者(Event Subscribers)會對多個事件作出反應，並有多種方法對它們作出反應。訂閱者的命名較為困難，因為它不能隨意命名，然而，訂閱者仍應遵守單一責任原則，因此訂閱者的名稱需要反映其單一的意圖。使用事件訂閱者應該是一種較少見的方法，尤其是在組件中，因為它很容易打破單一責任原則。一個事件訂閱者的好用例是管理交易(transaction)，更具體地說，我們可以有一個名為`RequestTransactionSubscriber`的事件訂閱者，對`RequestReceivedEvent`、`ResponseSentEvent`和`KernelExceptionEvent`等事件作出反應，並分別在它們的方法中綁定開始(start)、提交(commit)和回滾交易(rollback)，例如`startTransaction()`、`finishTransaction()`和`rollbackTransaction()`。這將是一個對多個事件作出反應，但仍專注於管理請求交易的單一責任的訂閱者。

# Patterns 模式
Martin Fowler 提出三種不同的事件模式：

+ Event Notification 活動通知
+ Event-Carried State Transfer 事件攜帶狀態轉移
+ Event-Sourcing 事件源

所有這些模式都擁有相同的關鍵概念：
1. 事件傳達了某事已經發生(它們在某事之後發生)。
2. 事件會被推播到任何正在監聽的程式碼（多個程式碼單元可以對事件作出反應）。

## 活動通知 Event Notification 
假設我們有一個應用程式核心，其中的組件都有明確的定義。理想情況下，這些組件彼此完全解耦，但是，它們的某些功能需要在其他組件中執行一些邏輯。

如我們之前所描述的，最典型的情況：當組件A執行需要觸發組件B邏輯的邏輯時，並不直接呼叫它，而是觸發一個事件並將其發送到事件分派器。組件B將在分派器中監聽該特定事件，並在事件發生時採取行動。

值得注意的是，這種模式的一個特點是事件攜帶的數據極少。它只攜帶足夠的數據讓監聽者知道發生了什麼事情並執行他們的代碼，通常只有實體ID和可能的事件創建日期和時間。

### 優點
+ 如果事件被排隊，即使由於錯誤而無法立即執行次要邏輯，原始組件也可以執行其邏輯（由於它們已在佇例中，因此可以在修復錯誤後稍後執行），這樣可以提高韌性。
+ 降低延遲，如果事件已經在佇列中，使用者就無需等待該邏輯被執行。
+ 團隊可以獨立地發展各個組件，使他們的工作更為輕鬆、快速，少出問題，且更具有機性；
### 缺點
+ 如果沒有準則地使用，它有可能將程式碼變成 speghetti code。

## 事件攜帶狀態轉移 Event-Carried State Transfer 
讓我們再次考慮前面的一個例子，一個應用程式核心有明確定義的組件。這次，對於他們的某些功能，他們需要**從其他組件獲取數據**。獲取這些數據的最自然方式是向其他組件詢問，但這意味著查詢的組件將知道被查詢的組件之間會有耦合。

分享這些數據的另一種方式是使用在擁有數據的組件更改它時觸發的事件，該事件將攜帶數據的全新版本。對該數據感興趣的組件將會監聽這些事件，並通過儲存該數據的本地副本來對它們做出反應。這樣，當他們需要該外部數據時，他們將在本地擁有它，不需要向其他組件查詢它。

### 優點
+ 更強的韌性，因為即使被查詢的組件變得無法使用（無論是因為有錯誤或遠程服務器無法連接），查詢組件仍能正常運作。
+ 降低延遲，因為無需進行遠程呼叫（當查詢的組件是遠程的）來訪問數據。
+ 我們不必擔心被查詢組件的負載，以滿足所有查詢組件（尤其是遠程組件）的查詢。

### 缺點
+ 將會有多份的副本。
+ 查詢組件的複雜性較高，因為它需要維護外部數據的本地副本的邏輯。

也許如果兩個組件在同一個進程(progress)中執行，這種模式就不必要了，因為這樣可以使組件之間的通信更快，但即便如此，為了解耦、維護性或微服務架構，我們仍可將這些組件解耦作為微服務的準備。這完全取決於我們目前、或未來的需求，以及我們希望/需要解耦到何種程度。

## 事件源處理 Event Sourcing
讓我們假設一個實體在其初始狀態。作為一個實體，它有自己的 id，它是應用程式正在模擬現實世界中的特定事物。在其生命週期中，實體數據會變化，傳統上，實體的當前狀態僅作為一行數據儲存在 DB 中。

### 交易記錄 Transaction log 
這在大多數情況下都是可以的，但如果我們需要知道實體是如何達到那種狀態的（即我們想知道我們銀行帳戶的借記和貸記）該怎麼辦？但這是不可能的，因為我們只儲存了當前的狀態！

我們使用事件源，而不是儲存實體狀態，我們專注於儲存實體狀態的**變化**並從這些變化中**計算實體狀態**。每一個狀態變化都是一個事件，儲存在事件流中（即在關聯式數據庫管理系統的表中）。當我們需要一個實體的當前狀態時，我們會從事件流中的所有事件計算出來。

> *The event store becomes the principal source of truth, and the system state is purely derived from it. For programmers, the best example of this is a version-control system. The log of all the commits is the event store and the working copy of the source tree is the system state.* - ***Greg Young 2010, CQRS Documents***  
> *事件儲存庫成為了主要的真實來源，而系統狀態完全由其衍生。對於程式設計師來說，最好的例子就是版本控制系統。所有提交的日誌就是事件儲存庫，而源碼樹的工作副本就是系統狀態。* - ***葛瑞格·楊 2010，CQRS 文件***

### 刪除 Deletions 
如果我們有一個狀態變更（事件）是錯誤的，我們不能簡單地刪除該事件，因為這將改變狀態變更的歷史，並且這將違反進行事件源的整個理念。相反，我們在事件流中創建一個事件，該事件反轉我們希望刪除的事件。這個過程被稱為反轉交易，不僅將實體帶回到所需的狀態，而且還留下一條痕跡，顯示該對象在某個時間點曾處於該狀態。

> *There are also architectural benefits to not deleting data. The storage system becomes an additive only architecture, it is well known that append-only architectures distribute more easily than updating architectures because there are far fewer locks to deal with.* - ***Greg Young 2010, CQRS Documents***  
> *不刪除數據也有其架構上的好處。儲存系統變成了一種「只增不減(append-only)」的架構，眾所周知，「只增不減」的架構比「更新(update)」的架構更容易分發，因為要處理的鎖(lock)遠少得多。* - ***葛瑞格·楊 2010，CQRS 文件***

### 快照 Snapshots 
然而，當我們在事件流中有許多事件時，計算實體狀態將會耗費大量資源，並且效能不佳。為了解決這個問題，我們將在每X數量的事件後創建該時點的實體狀態快照。這樣，當我們需要實體狀態時，我們只需要計算到最後一個快照為止。甚至，我們可以保持一個永久更新的實體狀態快照，這樣我們就能兼得兩全其美。
![snapshots](https://herbertograca.files.wordpress.com/2017/07/2006-2-event-sourcing.png)
2006 - 2 - Event Sourcing

### 預測 Projections 
在事件源中，我們也有預測的概念，這是從特定時刻到特定時刻的事件流的計算。這意味著快照，或者實體的當前狀態，符合預測的定義。但在預測概念中最有價值的想法是，我們可以分析實體在特定時間段的行為(behavior)，這使我們能夠對未來做出有根據的猜測（例如，如果在過去的5年中，一個實體在八月份的活動增加，那麼下一個八月份可能會發生同樣的情況），這對於業務來說可能是一項極其有價值的能力。

### 優點與缺點
事件源可以對商業和開發過程都非常有用：
+ 我們查詢這些事件，對於業務和開發都很有用，以理解用戶和系統行為（除錯）;
+ 我們也可以利用事件日誌來重建過去的狀態，這對業務和開發都非常有用
+ 自動調整狀態以應對追溯變更，對商業來說非常有利
+ 透過在重播時注入假設事件來探索替代歷史，對商業來說真是太棒了。

但並非所有事情都是好消息，請注意隱藏的問題：

### 外部更新 External updates 
當我們的活動在外部系統中觸發更新時，我們不希望在重播活動以創建投影時重新觸發那些活動。在這個時候，我們可以簡單地在「重播模式」下禁用外部更新，也許可以將該邏輯封裝在一個閘道(gateway)中。
另一種解決方案，取決於實際問題，可能是將更新至外部系統的資訊進行緩衝，並在一定的時間後執行，當可以安全地假設事件不會被重播時。

### 外部查詢 External Queries 
當我們的活動使用查詢到外部系統，例如獲取股票債券評級，我們在重播事件以創建預創時會發生什麼？我們可能希望獲得與首次運行事件時（可能是幾年前）使用的相同評級。因此，遠程應用程式可以給我們這些值，或者我們需要將它們儲存在我們的系統中，以便我們可以模擬遠程查詢，再次，通過在閘道中封裝該邏輯。

### 程式碼變更 Code Changes 
Martin Fowler 提出了三種類型的程式碼變更：
+ 新功能
+ 錯誤修復
+ 時間邏輯

真正的問題來自於重播應該在不同時間點使用不同業務邏輯規則的事件，例如，去年的稅收計算與今年的不同。通常，可以使用條件邏輯，但這會變得混亂，所以建議使用策略模式代替。

所以，我建議要謹慎，並且我儘可能地遵循以下規則：

1. 保持事件的簡單，只知道狀態的變化，而不知道如何做出決定。這樣我們可以安全地重播任何事件，並期望即使業務規則在此期間已經改變，結果仍然相同（儘管我們需要保留舊的業務規則，以便在重播過去的事件時應用它們）。
2. 與外部系統的互動不應依賴這些事件，這樣我們可以安全地重播事件，而不會有重新觸發外部邏輯的危險，我們也不需要確保來自外部系統的回應與原始播放事件時相同。

當然，就像其他任何模式一樣，我們不需要在所有地方都使用它，我們應該在它有意義的地方，它能為我們帶來優勢並解決比它創造的問題更多的問題的地方使用它。

# 結論
再次提醒，本文主要在說明封裝、低耦合和高內聚。

事件可以為程式碼庫的維護性、性能和成長帶來巨大的好處，但是，透過事件源，也可以提高系統數據的可靠性和所能提供的信息。

然而，這條路徑有其自身的危險，因為概念和技術的複雜性都在增加，而任何一方的誤用都可能導致災難性的結果。