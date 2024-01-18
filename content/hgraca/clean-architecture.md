---
title: "[IT] 乾淨架構 Clean Architecture"
keywords: ["Software Architecture"]
description: 
date: 2023-10-29T21:11:58+08:00
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
Robert C. Martin (aka Uncle Bob) 在 2012 年在他的[部落格](https://blog.cleancoder.com/uncle-bob/2011/11/22/Clean-Architecture.html)上發表了他對於**乾淨架構**的想法，並在幾個會議上進行了關於乾淨架構的演講。

乾淨架構套用了許多為人熟知的概念、規則和模式，並解釋如何將它們組合在一起，以提出一種標準化的應用程式建構方式。

# 站在 EBI, Ports & Adapters 與洋蔥架構的肩膀上
乾淨架構背後的核心目標與 Ports & Adapters(六邊形)和洋蔥架構的目標是相同的：
+ 工具的獨立性。
+ 交付機制的獨立性。
+ 獨立測試的可行性。

在發布有關乾淨架構的文章中，這是用來解釋整體概念的一張圖：
![clean_arch](https://herbertograca.files.wordpress.com/2017/04/cleanarchitecture-5c6d7ec787d447a81b708b73abba1680.jpg)

正如 Uncle Bob 在他的文章中所說，上面這張圖嘗試將最新的架構思想整合成一個可行的概念。

讓我們將乾淨架構的圖表與用來解釋六角架構和洋蔥架構的圖表進行比較，看看它們在哪些地方相符：
|||
|--|--|
|{{< img "https://herbertograca.files.wordpress.com/2017/04/hexagonal_original.gif" 360 >}}|{{< img "https://herbertograca.files.wordpress.com/2017/04/4ioq9.png" 360 >}}|
 
## 工具和交付機制的外部化
六角形架構專注於將工具和交付機制從應用程式中外部化，使用介面(ports))和適配器(adapters)。這也是洋蔥架構的核心價值之一，如圖所見，UI、基礎設施和測試都在圖表的最外層。乾淨的架構具有完全相同的特性，將 UI、Web、DB 等都放在最外層。最後，所有應用程式核心程式碼都是與框架、庫獨立的。

## 依賴方向
在六角架構中，我們並沒有任何明確的指示告訴我們依賴性的方向。然而，我們可以輕易地推斷出來：應用程式有一個埠(或介面)，必須由一個適配器來實現或使用。因此，適配器依賴於介面，它依賴於位於中心的應用程式。外部的東西依賴於內部的東西，依賴性的方向是朝向中心。在洋蔥架構圖中，我們也沒有任何明確的指示告訴我們依賴性的方向，然而，在他的第二篇文章中，Jeffrey Palermo 非常清楚地說明所有的依賴性都是朝向中心。乾淨架構則是非常明確地指出依賴性方向是朝向中心。他們都在架構層面引入了依賴反轉原則。內圈中的任何東西都不能知道外圈中的任何東西。此外，當我們跨越邊界傳遞數據時，它總是以對內圈來說最方便的形式存在。

## 分層
六角形架構圖只顯示了兩層：應用程式的內部和外部。然而，洋蔥架構則將 DDD 中 application layer 融入其中：application service 持有用例邏輯(use case logic)；domain service 封裝不屬於實體或價值對象的領域邏輯。與洋蔥架構相比，乾淨架構保留了 application layer(use case)和 entities layer，但似乎忽略了 domain service layer。然而，閱讀 Uncle Bob 的文章後，我們意識到他認為一個 entity 不僅是 DDD 意義上的 entity，而且是任何 domain object：「一個實體可以是一個帶有方法的物件，或者可以是一組數據結構和函數。」實際上，他合併了這兩個最內層的層級以簡化圖表。

## 獨立測試性
在所有三種架構風格中，他們遵循的規則為應用程式和領域邏輯提供了隔離。這意味著在所有情況下，我們都可以簡單地模擬外部工具和傳遞機制，並在隔離中測試應用程式程式碼，而無需使用任何數據庫或 HTTP request。

如我們所見，乾淨架構結合了六角架構和洋蔥架構的規則。到目前為止，乾淨架構並未增加任何新元素。然而，在乾淨架構圖的右下角，我們可以看到一個小的額外圖表...

# 站在 MVC 和 EBI 的肩膀上
在乾淨架構右下角的這個圖表解釋了控制流程的運作方式，Robert C. Martin 在部落格上的文章與演講中對這個主題進行了更深入的閘述：
![control_flow](https://herbertograca.files.wordpress.com/2017/04/cleanarchitecturedesign.png)
在上圖中，左側是 MVC 的視圖和控制器。黑色雙線內/之間的東西代表 MVC 中的模型。該模型也代表 EBI 架構(我們可以清楚地看到 bounary, interactor 和 entities)，六角形架構中的**Application**，洋蔥架構中的**Application Core**，以及上述乾淨架構圖中的**Entities**和**Use Cases**層。

根據控制流程，我們有一個 HTTP request 會到達控制器。然後，控制器將會：
1. 解析請求(request)。
2. 根據相關數據創建一個 Request Model。
3. 在 Interactor 中執行方法(該方法是透過 Interactor 的介面，即 Bounary，注入到 Controller 中)，並將 Request Model 傳遞給它。
4. Interactor：
    1. 使用 Entity Gateway 的實作(透過 Entity Gateway 介面注入到 Interactor 中) 來找到相關 Entities。
    2. 協調 Entities 間的互動。
    3. 根據動作的結果創建一個 Response Model。
    4. 將 Response Model 回傳給 Presenter。
    5. 將 Presenter 回傳給 Controller。
5. 使用 Presenter 來產生 ViewModel。
6. 將 ViewModel 綁定到 View 上。
7. 將 View 返回給 Client。

在此我與 Uncle Bob 的作法有些許不同，特別是在 Presenter 的使用，我寧願讓 Interactor 以某種 DTO 的形式返回數據，而不是注入一個被數據填充的物件。

我通常做的是 MVP 的實作，其中 Controller 負責接收並回應客戶端。

# 結論
我不會說乾淨架構是革命性的，因為它實際上並未帶來任何新的突破性概念或模式。

然而，乾淨架構的出現仍是至關重要的。
+ 它提醒了我們一些被遺忘的概念、規則和模式。
+ 它闡明了有用且重要的概念、規則和模式。
+ 它告訴我們，所有這些概念、規則和模式如何結合在一起，為我們提供了一種標準化的方式來構建複雜的應用程式，並且考慮到可維護性。
