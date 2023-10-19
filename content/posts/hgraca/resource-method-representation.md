---
title: "[IT] Resource-Method-Representation(RMR) 架構"
keywords: ["Software Architecture"]
description: 
date: 2023-10-19T22:17:59+08:00
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

MVC 於 1979 年在桌面應用程式與 CLI 使用者介面的背景下出現，這意味著如果資料庫因使用者以外的某些因素發生變化，則使用者介面將自動更改。同樣的模式後來在具有 GUI 的桌面應用程式上也完全可用。

然而，其在網路應用程式中的使用一直都是一種調適，因為大多數的網路應用程式並不會因為伺服器端的變更而改變使用者介面，使用者介面總是會呼叫伺服器端要求更新畫面。

我之前已經談過 MVC 模式的變體，這篇文章將討論另一種變體：**Resource-Method-Representation**。

我覺得有必要談論這個議題，是因為我曾對它產生誤解，認為它與 ADR 模式一樣，而我很快就會寫到這一點。

# 2008 – Resource-Method-Representation(RMR)
RMR 模式是由 Paul James 在 2008 年創建的，它將 MVC 模式適配到 REST APIs 的情境中。

## Resource 資源
The idea is that the Entities are modelled as REST resources (the first R in the pattern name), with its only public methods mapping to an HTTP method:
這個概念是將實體模型化為 REST resources 資源（RMR中的第一個R），與其唯一的公開方法映射到一個 HTTP 方法：
```php
<?php
// taken from http://www.peej.co.uk/articles/rmr-architecture.html

class Resource {
    private resourceData = [];
    method constructor(request, dataSource) {
        // load data from data source
    }
    method get(request) {
        return new Response(200, getRepresentation(request.url, resourceData));
    }
    method put(request) {
        return new Response(405);
    }
    method post(request) {
        return new Response(405);
    }
    method delete(request) {
        return new Response(405);
    }
}
```
## Method 方法
當向 API 發出請求時，該請求會被路由到這些業務物件之一，即資源，並且在此資源上被調用的方法對應於請求的 HTTP 方法。然後，這個業務物件上的方法負責返回一個完整的 *http* 響應，包括其狀態碼和 headers 信息。

## Representation 表現
Representation 是 API 選擇或客戶端請求的資源表示形式，例如 JSON、XML 等。這種表示法是由方法創建並在有任何內容需要發送回來時發送回客戶端的響應內容。

---

## 我的看法
MVC 模式是一種呈現模式，它是一種將模型(model)、領域(domain)與用戶介面(UI)分開的一種方式，這就是 MVC 的主要目標，過去如此，現在亦然。

然而，RMR 想做的不只這些。它告訴我們如何設計我們的業務物件(business objects)，我們的領域實體(domain entities)。更重要的是，它告訴我們我們的領域實體應該反映出交付機制：HTTP 方法。

這意味著這不僅僅是一種呈現模式，它也是一種架構模式，因為它影響到應用程式的所有層級。這也意味著使用這種模式建立的應用程式並非以領域為中心，而是以 HTTP 為中心。我們的實體最終會有反映交付機制的方法，而非領域行為。

我認為這種模式或許可以成功地建立一些小型 API，但我不認為它可以用於企業應用程式，因為企業等級的應用程式需要領域驅動設計(domain driven design)的方法，因此需要以領域作為中心的軟體開發策略。

此外，我完全同意 Anthony Ferrara 的說法：

> *Not to mention that it couples itself to HTTP so tightly that to try to map it to a CLI or GUI interface would be quite difficult.* - ***Anthony Ferrara 2014, Alternatives To MVC***  
> *試圖將其映射到 CLI 或 GUI 介面將會相當困難，況且它與 HTTP 緊密耦合。* - ***Anthony Ferrara 2014，MVC的替代方案***