---
title: "[IT] ApiController Atrribute"
keywords: ["IT", "C#", "ApiController", "mvc"]
description: 
date: 2024-06-09T20:27:03+08:00
tags: ["IT", "C#", "mvc"]
draft: false
Categories: "IT"
author: "Rain Hu"
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
# ApiController Atrribute
> 當我在 API 專案中建立新的 controller 時，它會自帶一個 [ApiController] 屬性的控制器類別，而這個標籤的作用為何呢？
```csharp
[ApiController]
public class TestController : ControllerBase
{
}
```

## 1. 自動 HTTP 400 回應
+ 它會自動產生一個行為過濾器(action filter)，當 `ModelState.IsValid` 為 `false` 時，自動回傳 400 Response。

## 2. 綁定來源參數推斷
+ 可以更改模型綁定的約定，例如，`[FromBody]` 是針對複雜類型參數推斷的。

## 3. Multi/form-data 請求推理
+ 對於標示 `[FromForm]` 的參數，推斷 Content-Type 為 `multipart/form-data`。

## 4. 屬性路由要求
+ 強制要求所有操作都必須通過屬性路由。

{{< notice info >}}
+ 使用 ApiController 的情況
    + 數據服務：如果你要提供 JSON 或 XML 格式的數據服務給前端或其他應用程式。
    + RESTful API：當你需要創建 RESTful API 來處理資源（Create, Read, Update, Delete）。
+ 不使用 ApiController 的情況
    + 傳統 MVC 應用：如果你只是要處理 HTTP 請求並返回 HTML 視圖給用戶端。
{{< /notice >}}