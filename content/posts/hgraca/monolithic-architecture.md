---
title: "[IT] 單體架構 Monolithic Architecture"
keywords: ["Software Architecture"]
description: 
date: 2023-10-15T12:06:51+08:00
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

建立一個單體系統一直以來都是預設的架構風格，最初軟體開發剛萌芽時，每個應用程式只有一個檔案，然後才出現了包含多個檔案的應用程式，並且直到1990年代我們才開始看到由其他應用程式組成的應用程式（儘管第一次的實驗是在1980年代進行的）。

單體結構自身也在演進，當應用程式開始使用多個檔案進行建構時，因為這些應用程式相對簡單，所以對每個檔案的職責與檔案之間的關係並沒有太多的思考。但隨著應用程式變得越來越大且越來越複雜，我們便開始需要思考要創建哪些檔案以及如何關聯它。

# 模組化軟體開發 Modular Software Development
模組化程式設計是在 1960 年代晚期和 1970年代 所提出的解決方案。它是從類別演變到對粒度更大程式碼單元進行明確定義(explicit definition)，程式語言以不同程度的明確性(explicitness)實現了模組化。

例如，JAVA 具有 `default` 和 `public` 的類別級別可見性，其中 `default` 級別意味著一個類別只在其套件（模組）中可見，而 `public` 則意味著該類別在其套件（模組）內外都可見，這讓我們可以定義哪些類別可以當作套件被客戶端使用。

# 組件化軟體開發 Componentized Software Development
另一種模組化的風格是組件。如我在之前的文章中所解釋的，組件是以領域概念為基礎創建的模塊。理想情況下，它們是可以用來創建複合應用的獨立「應用程式」。這種風格的一個常見例子是 pipes 和 filters 架構，這在 Unix 系統中被廣泛使用，並允許我們做像 `ps -ef | grep php` 這樣的操作。另一個例子是使用微服務作為複合應用的組件，如 Netflix。

這種程式碼組織方式也已經存在很長時間了，可以追溯到1960年代末，就像模組化軟體開發一樣。

# 現代的單體架構
現今，擁有單體架構風格簡單來說就是所有的應用程式碼都被**部署(deployed)** 並在單一**節點(node)** 上作為單一進程運行。我們假設它正在使用模組和組件，儘管事實上往往並非如此。

理解這裡的關鍵詞「部署」和「節點」至關重要。關於第一個詞，部署，這意味著無論程式碼在物理上儲存在一個或多個儲存庫的任何地方，重要的是它在運行時是如何組織的。關於第二個關鍵詞，節點，這意味著即使我們將應用程式部署到多個服務器，就像在水平擴展的情況下，它仍然是一個單體。

在單一節點伺服器中，單體中的所有模組都被組裝到同一記憶體 image 中，並在單一節點上作為單一進程運行。通訊是通過同一 heap 和 stack 進行標準程式調用。正是這種單一記憶體 image 使得應用程序變得單體化。如果你在不同的進程中運行模組，那麼你正在進行 IPC。因為模組落入不同的進程邊界，你將開始面臨分散式計算的挑戰，這就進入了微服務領域。

這種風格，儘管聲名狼藉，但即使對於大型應用程式也能運作得相當好。只有當我們需要以下情況時，它才不再足夠好：

+ 不同領域組件的**獨立可擴展性(Independent scalability)**。
+ 需要用**不同的程式語言**撰寫不同的組件或模組；
+ **獨立部署能力(Independent deployability)**，或許是因為我們的釋出速率超過了單一程式碼庫的部署管道所能處理的範圍，導致一個版本的部署變慢，因為它需要等待其他版本的部署，甚至導致部署佇列的增長速度超過了它的消耗速度。

在那個時候，我們需要將我們的單體系統分離成不同的應用程式，並採用SOA架構風格（關於這點將在後續的文章中詳述）。

# 反模式：大泥球/義大利麵條式架構 Anti-pattern: Big Ball of Mud / Spaghetti Architecture

所謂的「泥球」，又稱為「義大利麵條式架構」，就是這種風格的反模式，其中套件的結構和關係並不明確，結構的內聚力和封裝性幾乎不存在，依賴性沒有遵循任何規則，並且很難理解子系統，以進行變更和重構。該系統是不透明的，黏稠的，脆弱的，且僵硬的：一個大泥球！