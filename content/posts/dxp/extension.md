---
title: "[DXP] Spotfire Extension 擴充程式"
keywords: ["spotfire", "dxp", "extension", "擴充"]
description: "spotfire sdk 介紹"
date: 2023-06-23T03:03:52+08:00
tags: ["spotfire", "dxp"]
draft: false
Categories: "spotfire"
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

# Spotfire Extension
> Spotfire Extension 是添加到平台的最小功能單元。它是在 Visual Studio® 中開發的，並包含在 Spotfire 外掛中，使版本控制、授權、部署和加載成為可能。本主題描述了開發 Extension 時需要的關鍵概念，以添加自定義功能到 Spotfire 平台。
## Add-in
+ Extensions 以 `add-in` 的方式載入 Spotifre 中。Spotfire 處理版本控制、部署及為擴充功能註冊。Spotfire extension 的設計燈南規定每個 add-in 都必須包含一個繼承 `AddIn Class` 的類別。Add-in 基本上是由在從 SDK 模板創建專案時提供的資訊所定義的。Add-in project 可以包含一或多個 extensions，故專案也可以輕鬆的透過添加其它擴充來建立新的版本。
+ 每個擴充功能都是由一組類別實現的，通常是透過 `override base class` 來定義擴充類別，並透過覆寫特定擴充類別的方法 `Register[ExtensionType]()`，宣告式地進行 add-in 的註冊。每個這樣的方法都會傳遞一個 registrar，允許 add-in 在適當的 registry 進行註冊。例如在註冊新的工具(tool)時，必須要 override 方法 `RegisterTools(ToolRegister)`。在授權擴充功能時也會使用類似的方法。
+ 如果一個模組有有效的模組定義檔案，則被定義為適合在 Spotfire 中載入。它通過定義 `AddIn` 類別的完全限定類型名稱和組件名稱來向應用程式聲明這個外掛程式。它還聲明了一個唯一的專案GUID和 assembly 的強名稱(string name)。這些組合唯一地識別了專案和外掛程式。因此，Extension assembly 必須使用強名稱金鑰(string name key)文件（.snk）簽名。擴展專案模板包含一個默認金鑰。可以用自己的金鑰文件替換此金鑰文件，但如果這樣做，請務必相應地修改模組定義檔案。


## Extesnion Type
+ IronPython 提供一種輕量的方式，便可在分析本身中添加複雜的行為，無需透過開發工具與部署機制，便可快速的創建小型的應用程序。而當需要創建自定義的功能時，就需要用到 C# 的擴充機制。
![extension type](https://supportinfo.tibco.com/stca/comm/How-to-choose-between-using-IronPython-scripting-and-creating-a-C-Extension-when-developing-for-TIBCO-Spotfire-3.png)
### Custom Tool
+ Custom Tool 用於擴充在 Spotfire 中特定文本(context) 上的操作。文本可以是 Spotfire 應用程式(application)本身、檔案庫(document)、或是每個特定的可視化類型(visualization)。
+ 包含 `Custom Tool`、`Custom Export Tool`、`Custom Share Tool`
### Custom Panel
+ Custom Panel 是通用 UI 組件，用於視覺化文本資訊、添加控制項或其它特定的功能。
### Custom Visualization
+ Custom Visualization 可用來擴充 Spotfire 的 Visualization Set，使之可以從 Visualization 選單中、繪圖文本(plot context)清單上、工具列中被選擇，並與其它繪圖工具一樣享有數據集、標記(marking)、與篩選(filtering )功能。
### Custom Value Renderer
+ Custom Value Renderer 用來呈現表格視覺化列中的值。最常見的情況是將數據值轉成圖像，在表格中呈現。
### Custom Data Source
+ Custom Data Source 用來匯入任何自訂的外部資料來源。
### Custom Data Function
+ Custom Data Function 用自定義的公式將文件中的資料進行計算後輸出到文件的其它位置。
### Custom Data Tranformation
+ Custom Data Transformation 在資料讀取和建立表格之間添加了一層，提供在匯入資料前修改資料的方法。資料轉換將一個規則或函數應用於檢索到的資料，以準備進行分析。
### Custom Data Writer
+ Custom Data Writer 用於匯出自定義格式的檔案。
### Custom Expression Functions
+ Custom Expression Functions 可以擴展在自定義表達式和計算列中使用的表達式語言。可以是基於行、列或聚合方法。
### Custom Fitting Model
+ Custom Fitting Model 由 Visualization 的座標和參數計算出值，以繪值對應的參考點或曲線。
### Custom Virtual Column
+ Custom Virtual Column 根據一個或多個現有的列和文件屬性創建新的欄。
### Custom Preference
+ Custom Preference 偏好設定，也稱作 Configuration Sets。
### Custom License
+ Custom License 可用於自訂授權。
### Custom Node
+ Custom Node 可以添加項目到 spotfire document model 中，並序列化到 dxp 文件中。
### Custom Application Event Handler
+ Custom Application Event Handler 可用來監控並回應應用程式事件。