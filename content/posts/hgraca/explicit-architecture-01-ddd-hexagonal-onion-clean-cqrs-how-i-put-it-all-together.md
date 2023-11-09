---
title: "[IT] DDD, Hexagonal, Onion, Clean, CQRS 大整合"
keywords: ["Software Architecture"]
description: 
date: 2023-11-06T23:38:13+08:00
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

本文是介紹我如何將 DDD, Hexagonal, Onion, Clean, CQRS Architecture 等架構概念整合在一起，我將它命名為 **Explicit Architecture**。上述的概念基本上都是通過了市場的試驗，並在許多高要求的平台上被應用。

# 系統的基本組件
首先回顧 **[EBI](../ebi-architecture)** 與 **[Ports & Adapter](../ports-adapters-architecture)** 架構。這兩種架構都明確區分了哪些程式碼是應用程式的內部，哪些是外部，以及哪些是連接內部和外部的程式碼。

Ports & Adapters 明確地定義出了系統的三個部分：
+ **使用者介面** (User Interface, UI)
+ **商業邏輯**(business logic)、**應用程式核心**(application core)
+ **基礎設施**(Infrastructure)，如 DB、搜尋引擎或第三方API等工具。
![ea1](https://herbertograca.files.wordpress.com/2018/11/000-explicit-architecture-svg.png?w=1024&h=700)

我們真正應該關心的是應用程式的核心，這是讓我們的程式碼能夠完成其應有功能的程式碼。它可能會使用多種 UI（網頁、手機、CLI、API 等等），但實際執行工作的程式碼是相同的，並位於應用程式的核心，觸發它的 UI 實際上並不重要。

一個典型的應用程式流程從 UI 的程式碼開始，經過應用程式核心到基礎設施程式碼，再回到應用程式核心，最後將回應傳遞給 UI。

![ea2](https://herbertograca.files.wordpress.com/2018/11/010-explicit-architecture-svg.png?w=1024&h=700)

# 工具 Tools
工具指的是那些遠離我們系統核心程式碼，但為我們應用程式所用的工具，例如，DB、搜尋引擎、網頁伺服器或 CLI 控制台（儘管後兩者也是交付機制）。
![ea3](https://herbertograca.files.wordpress.com/2018/11/020-explicit-architecture-svg.png?w=1024&h=700)

雖然將 CLI 與 DB 分類在一起可能有些奇怪，儘管它們有不同的目的，但實際上它們都是應用程式使用的工具。關鍵的區別在於，CLI 和網頁服務器用於告訴我們的應用程式做些什麼，而 DB 則由我們的應用程式告訴它做些什麼。這是一個非常重要的區別，因為它對我們如何建構連接這些工具與應用程式核心的程式碼有著強烈的影響。

# 將工具和傳遞機制連接到應用程式核心
連接工具與應用程式核心的程式碼單元被稱為適配器（Ports & Adapters Architecture），適配器實現了將業務邏輯與特定工具進行通訊。

告知我們應用程式應該做什麼事的適配器稱為 **Primary 或 Driving Adapters**；  
被我們應用程式告知應該做什麼事的適配器稱為 **Secondary or Driven Adapters**。

## 埠 Ports
然而，這些適配器並非隨機創建的，它們是為了適應應用程式核心的一個非常特定的入口點，也就是埠。埠不過是一種規範，說明工具如何使用應用程式核心，或者說明它如何被應用程式核心使用。在大多數語言中，以其最簡單的形式，這種規範，或埠，即是一個介面(interface)，但實際上可能由多個介面和 DTO 組成。

需要注意的是，埠(介面)屬於業務邏輯內部，而適配器則屬於外部。要讓這種模式正常運作，最重要的是要根據應用核心的需求來創建埠，而不僅僅是模仿工具的 API。

## 主要適配器 Primary or Driving Adapters
主要或驅動適配器包裹在一個埠上，並使用它來指示應用程式核心該做什麼。他們將來自傳遞機制的任何內容轉換為應用程式核心中的方法調用。
![ea4](https://herbertograca.files.wordpress.com/2018/11/030-explicit-architecture-svg.png?w=1024&h=700)
換句話說，我們的驅動適配器是控制器或控制台命令，它們在建構子中注入了一些物件，這些物件的類別實現了控制器或控制台命令所需的介面（埠）。

在一個更具體的例子中，埠可以是控制器所需的服務介面或儲存庫介面。然後，將服務、儲存庫或查詢的具體實現注入並在控制器中使用。

或者，一個埠可以是命令總線或查詢總線介面，在這種情況下，命令或查詢總線的具體實現將被注入到控制器中，然後控制器構建一個命令或查詢並將其傳遞給相關的總線。

## 次級適配器 Secondary or Driven Adapters
與 Driver Adapters 不同的是，Driven Adapters 實現了一個埠、一個介面，然後被注入到應用核心中，無論該埠在何處被需要（類型提示）。Driven Adapter 是包裹在埠周圍的。
![ea5](https://herbertograca.files.wordpress.com/2018/11/040-explicit-architecture-svg.png?w=1024&h=700)

例如，假設我們有一個需要持久化數據的初級應用程式。因此，我們創建了一個符合其需求的持久化介面，該介面有一個用於保存數據陣列的方法，以及一個根據ID刪除表中行的方法。從那時起，無論我們的應用程式何時需要保存或刪除數據，我們都會在其構造器中需要一個實現我們定義的持久化介面的物件。

現在我們將創建一個專門針對 MySQL 的適配器，該適配器將實現該介面，它將具有保存陣列和在表中刪除一行的方法，我們將在需要持久化介面的任何地方注入它。

如果我們在某一點決定更換 DB vendor，比如說改用 PostgreSQL 或 MongoDB，我們只需要創建一個實現持久性介面並專門針對 PostgreSQL 的新適配器，並將新適配器取代舊的適配器即可。

## 控制反轉 Inversion of control
# 應用核心組織
## 應用層 Application Layer
## 領域層 Domain Layer
### 領域服務 Domain Service
### 領域模型 Domain Model
# 組件 Components
## 解耦組件
### 觸發其它組件中的邏輯
### 從其它組件獲取數據
#### 組件間共享的數據儲存
#### 根據組件分離的數據儲存
# 控制流程