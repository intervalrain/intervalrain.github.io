---
title: "[IT] 埠與適配器架構 Ports & Adapters Architecture aka 六邊形架構 Hexagonal Architecture"
keywords: ["Software Architecture"]
description: 
date: 2023-10-27T23:46:32+08:00
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
埠與適配器架構（又稱為六角架構）是由 Alistair Cockburn 所構想，並在 2005 年於他的部落格中寫下。這是他用一句話定義其目標的方式：
> *Allow an application to equally be driven by users, programs, automated test or batch scripts, and to be developed and tested in isolation from its eventual run-time devices and databases.* - ***Alistair Cockburn 2005, Ports and Adapters***  
> *允許一個應用程式能夠同等地由用戶、程式、自動化測試或批次腳本驅動，並且能夠在與其最終運行時間設備和數據庫隔離的情況下進行開發和測試。* - ***艾利斯特·科本 2005，端口與適配器***

我看過一些討論「Ports & Adapters 架構」的文章，其中大量提到了分層(layers)。然而，在原始的 Alistair Cockburn 的文章中，我並未讀到任何關於分層的內容。

Ports & Adapters 架構的思想是將我們的應用程式視為系統的中心產物，所有的輸入和輸出都通過一個端口進入/離開應用程式，該端口將應用程式與外部工具、技術和交付機制隔離。應用程式應該對誰/什麼正在發送輸入或接收其輸出一無所知。這旨在提供一些保護，以防止技術和業務需求的演變，促使產品在開發完成後不久就因為技術/供應商的封鎖而變得過時。

在這篇文章中，我們將深入探討以下主題：
# 傳統方法的問題
傳統的方法在前後兩端都可能帶來問題。

在前端方面，我們最終會有業務邏輯滲透到 UI 中（例如，當我們在控制器或視圖中放置用例邏輯，使其在其他 UI 中無法重用）或甚至是 UI 滲透到業務邏輯中（例如，由於我們在模板中需要一些邏輯，因此我們在我們的實體中創建方法）。

在後端方面，我們可能會有外部庫和技術滲透到業務邏輯中，因為我們可能會透過類型提示、子類別化，甚至在我們的業務邏輯內實例化庫類別來直接引用它們。

![port&adapter](https://herbertograca.files.wordpress.com/2017/03/hexagonal-arch-5-traditional2.png?w=415&h=313)

# 從分層架構演變而來
到了 2005 年，多虧了 [EBI](../ebi-architecture) 和 [DDD](../domain-driven-design)，我們已經知道**在系統中真正重要的是內部層**。這些層是所有業務邏輯之所在，它們是我們與競爭對手的真正差異，是應用程式中價值的核心。

![3-tier](https://herbertograca.files.wordpress.com/2017/03/hexagonal-arch-1-outer-layers-similarity.png?w=329&h=150)
Alistair Cockburn 意識到，**頂層和底層其實只是應用程式的入口與出口**，雖然它們實際上是不同的，但它們的目標非常相似，設計上也呈現出對稱性。因此，如果我們想要隔離我們的應用程式內部層，我們可以用類似的方式利用這些入口與出口來實現。

![entry/exit](https://herbertograca.files.wordpress.com/2017/03/hexagonal-arch-2-left-right6.png?w=339&h=273)
為了避開典型的分層圖表，我們將以左右來代表系統的兩面，而非上下。

雖然我們可以識別出應用程式的兩個對稱面，但**每一面都可能有多個進出點**。例如，API 和 UI 是我們應用程式左側的兩個不同進出點，而 ORM 和搜尋引擎則是我們應用程式右側的兩個不同進出點。為了表示我們的應用程式有多個進出點，我們將以多邊形來繪製我們的應用程式圖表。**這個圖表可以是任何有多個邊的多邊形**，但最終選擇了六邊形。因此，這就是「六邊形架構」的名稱由來。
![hexagonal](https://herbertograca.files.wordpress.com/2017/03/hexagonal-arch-3-hexagon2.png?w=375&h=342)

Ports & Adapters 架構透過使用一個抽象層，實現為一個端口和一個適配器，解決了前面提到的問題。

## 什麼是埠(port)？
埠是一個對消費者無差別的應用程式的出入口。在許多語言中，它是一個介面。例如，它可以是用於在搜索引擎中進行搜索介面。在我們的應用程式中，我們將使用這個介面作為進出點，而不需要了解實作的細節。

## 什麼是適配器(adapter)？
適配器，又稱轉接器，是一種能將介面轉換（適應）成另一種介面的類別。

例如，一個適配器實現了介面A並注入了介面B。當適配器被實例化時，它在其建構子中注入了一個實現介面B的物件。然後，這個適配器被注入到需要介面A的任何地方，並接收方法請求，將其轉換並代理給內部實現介面B的物件。

### 兩種不同類型的適配器
位於左側的適配器，代表著 UI，被稱為**主要(primary)或驅動(driving)適配器**，因為它們是開始對應用程式進行某些操作的元件。而位於右側的適配器，代表著與後端工具的連接，被稱為**次要(secondary)或被驅動(driven)適配器**，因為它們總是對主要適配器的操作做出反應。

埠/適配器的差異：
+ 在左側，適配器依賴於埠，並注入埠的具體實現，其中包含了用例。在這一側，**埠及其具體實現（即用例）都屬於應用程序內部**。
+ 在右側，適配器是埠的具體實現，並被注入到我們的業務邏輯中，儘管我們的業務邏輯只知道介面。在這一側，**埠屬於應用程序內部，但其具體實現屬於外部**，並且它包裹著一些外部工具。
![](https://herbertograca.files.wordpress.com/2017/03/hexagonal-arch-4-ports-adapters2.png)

# 有哪些好處？
利用此埠/適配器設計，將我們的應用程式置於系統的中心，使我們能夠將應用程式與實作細節（如短暫的技術、工具和交付機制）隔離，從而使測試變得更容易、更快，並創建可重用的概念驗證。

## 實施與技術隔離
+ **Context**
我們有一個應用程式，該程式使用SOLR作為搜索引擎，並使用開源庫來連接並執行搜索。

+ **傳統方法**
採用傳統的方法，我們將直接在我們的程式碼基礎中使用該函式庫類別，作為我們實作的類型提示、實例和/或父類別。

+ **埠與適配器方法**
使用埠和適配器，我們將創建一個介面，我們稱之為 `UserSearchInterface`，我們將在需要時在我們的程式碼中使用它作為類型提示。我們還將為 SOLR 創建適配器，該適配器將實現該介面，我們將其命名為 `UserSearchSolrAdapter`。這個實現是SOLR庫的包裝器，所以它將庫注入並使用它來實現介面中指定的方法。

+ **問題**
在某些時候，我們希望從SOLR切換到Elasticsearch。此外，對於相同的搜索，有時我們想使用SOLR，有時我們想使用Elasticsearch，這個決定是在運行時做出的。

如果我們採用傳統的方法，我們將必須尋找並替換SOLR庫的使用為Elasticsearch庫。然而，這並不是一個簡單的查找和替換：這些庫有不同的使用方式，不同的方法有不同的輸入和輸出，所以替換庫並不會是一個簡單的任務。而且，在運行時使用一個庫而不是另一個庫甚至是不可能的。

然而，如果我們使用了Ports & Adapters，我們只需要創建一個新的適配器，我們可以叫它UserSearchElasticsearchAdapter，並將它取代SOLR適配器，也許只需要在DIC中更改一個配置。為了在運行時注入不同的實現，我們可以使用工廠來決定注入哪個適配器。

## 交付機制的隔離
與前一個例子相似，假設我們有一個應用程式需要網頁 GUI、CLI 以及網頁 API。我們也有一些功能想要在所有三種使用者介面中都能使用，我們稱這個功能為`UserProfileUpdate`。

使用Ports & Adapters，我們會在應用服務方法中實現這個功能，並將其視為一個使用案例。這個服務將實現一個介面，指定方法、輸入和輸出。

每個UI版本都將有一個控制器（或控制台命令），該控制器將使用該介面來觸發所需的邏輯，並將注入服務的具體實現。在這裡，適配器實際上就是控制器（或CLI命令）。

我們可以完全改變 UI，並確知這不會影響業務邏輯。

## 測試
在前述的兩個例子中，採用埠和適配器架構使得測試變得更為容易。在第一個例子中，我們可以模擬或替換介面（端口），而不需要使用SOLR或Elasticsearch來測試我們的應用程式。

在第二個例子中，我們可以將所有的 UI 與我們的應用程式分開來測試，並且只需簡單地給我們的服務一些輸入並確認結果，就可以將我們的使用情境與 UI 分開來測試。

# 結論
在我看來，Ports & Adapters 架構只有一個目標：將業務邏輯與系統使用的交付機制和工具隔離。而它是通過使用一種常見的程式語言結構來實現的：介面。

在 UI（驅動適配器）方面，我們**創建了使用我們的應用程式介面，即控制器(controllers)的適配器。**

在基礎設施方面（驅動適配器），我們**創建了實現我們應用程式埠的適配器，即儲存庫(repositories)。**

然而，值得注意的是，這個相同的想法在13年前就已經發表過，儘管並未明確強調將工具和傳遞機制與應用程式的核心隔離的目標。

![conclusion](https://herbertograca.files.wordpress.com/2017/04/fig_7_14_boundaries.jpg?w=486&h=402)

系統與 actor 的任何互動都會透過邊界物件(boundary object)進行。正如Jacobson所描述的，actor可以是像客戶或管理員（操作員）這樣的人類使用者，但也可能是像警報器或打印機這樣的非人類“使用者”，這對應於Ports & Adapters Architecture的驅動適配器和被驅動適配器。