---
title: "[IT] Model1 & Model2"
keywords: ["Software Architecture"]
description: 
date: 2023-10-19T22:47:32+08:00
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
Java Server Pages (JSP) 是一種技術，這種腳本語言與 PHP、ASP，甚至 Python 相當，用於創建由 JVM 解釋的伺服器端頁面，並可以使用 Java 物件。

首次由 Sun Microsystems 於 1998 年發布的 JSP 規範，定義了兩種結構化應用程式的方式，使得呈現邏輯能與業務邏輯，甚至是在 HTTP 請求/回應範疇中的使用案例，進行解耦。

有些人認為這些"Model1"和"Model2"是首次嘗試將原本為桌面軟體開發環境而設計的 MVC 模式，適配到網路 HTTP 請求/回應範疇的嘗試。

# Model1
JSP 規範 v0.92 的首次提議，是將 JSP 作為唯一的呈現工具，其中包含所有的呈現和用例邏輯。
![model1](https://herbertograca.files.wordpress.com/2018/08/beans.jpg)
這種方法對當時的大多數使用情況可能已經足夠好，因為當時的網路大部分是由簡單的動態頁面組成，而不是我們今天所熟知的複雜的網路企業應用程式。

# Model2
關於如何使用 JSP 的第二個建議，當時是針對被視為複雜的網路應用程式而設計的。然而，請記住，如今的網路應用程式的規模和複雜度已經更高了。
![model2](https://herbertograca.files.wordpress.com/2018/08/scenario2.jpg)
在“Model2”中，一個 HTTP 請求會到達一個 servlet，該 servlet 會解釋 HTTP 請求，使用 Java 物件和 EJBs（repositories）執行一些用例邏輯，收集結果數據，並將該數據傳遞給一個 JSP，該 JSP 再渲染頁面，並發送回客戶端。在“Model2”中，JSPs 僅作為模板引擎使用。

在1999年，Govind Seshadri 發表了一篇文章，其中他將"Model2"對應到 MVC：
+ servelet 是 Controller，它控制應如何處理用戶的請求。
+ JSP 是 View，它決定了顯示給使用者的內容。
+ 在 MVC 和"Model2"中，Model 指的都是一整個領域模型(domain model)。

# 我的看法
這兩種方法至今只能說是堪用，但對今日的網路企業應用程式而言，我們需要更好的東西，因為這兩種模式都不遵守單一職責原則(Single Respoinsibility Pinciple, RSP)。

Model1 的問題很明顯：模板邏輯(templating logic)與用例邏輯(usecase logic)會混在一起。

至於 Model2，我認為視圖(view)與控制器(controller)都屬於呈現層(presentation layer)，儘管 Govind Seshadri 明確地說了，Model2 架構的所有處理邏輯集中在 controller servlet 中，儘管領域邏輯在外部，位於 Java objects 與 EJBs 中。

這意味著 Model2 控制器包含了用例邏輯(usecase logic)，但它應該要屬於應用層(application layer)，而非呈現層(presentation layer)。

例如，如果我們想要從一個事件觸發一個已存在的用例，我們將需要在事件監聽器中複製用例邏輯（已存在於控制器中），這是一個大忌，因為它導致維護變得更困難，並可能在整個應用程序中產生不一致性（bugs）。
