---
title: "[DXP] Spotfire Developer SDK"
keywords: ["spotfire", "dxp", "sdk"]
description: "spotfire sdk 介紹"
date: 2023-06-22T21:43:13+08:00
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

# Spotfire SDK 
+ SDK，全名 Software Development Kit，中譯軟體開發套件，可以想成 Spotfire 提供給開發者一個以 Spotfire 工具分析為基底的開發框架，提供了各式套件以供各種開發需求。包含了 Extension Template, Development assemblies, example projects, package builder application...
![sdk](https://docs.tibco.com/pub/sfire_dev/area/doc/html/devdoc/images/sdkfolders.png) 
## Binaries
+ 包含了在 Windows 或 Linux 上使用 Spotifre 平台建立 Solution 時所參考的 .NET 套件。由於兩個平台具有不同的 .NET 需求，因此 Binaries 中包含了兩種 OS 各一組檔案，其中還包含了相關的 IntelliSense 檔案。
---

## Examples
+ 提供一系列廣泛的 Solutions，用於解決常見的開發場景。可根據不同的技術特性分為：
### COM Automation
+ 描述使用 COM 進行應用程式間通訊的方法。
+ 微軟的基於 COM 組件的軟體架構，讓應用程式將其內部功能公開為 COM 物件，使開發者可以編寫一些腳本，進行一些自動化任務，稱為 Automation 或 OLE Automation。
![COM](https://i.pcmag.com/imagery/encyclopedia-terms/com-automation-comauto.fit_lim.size_512x.gif)
### Extensions
+ 擴充套件：提供了一組完整的 .NET 專案，為解決 Spotifre 客戶端的特定任務。這些擴充套件足夠簡單，可以作為一些開發者的靈感或程式碼的來源。
+ 所有範例擴充功能都包含在 Visual Studio Solution 的 Spotfire.Developer.Extensions.sln 中，所有包含 c# 程式碼的自定義工具(Custom Tool)範例都包含在 Solutions `CustomerToolExample.sln` 和 `CustomToolExampleVS.sln` 中。這些 Solutions 中的範例提供了一種簡單的方式來開始進行開發，並且都可以直接在 Relase Mode 下進行編譯。Window 與 Linux 兩個系統都會自動進行建置。
+ 所有 C# 擴充範例都包含一個 `.pkdesc` 檔，可使用 **Package Builder** 來進行包裝不同的 Packages。
+ C# 擴充範例中包含兩個發行描述檔 `DistributionDescription-windows.xml` 和 `DistributionDescription-linux.xml` 用來描述兩個平台各自包含了哪些範例。
+ 兩個 .bat 檔和 `BuildPackages-window.bat` 和 `BuildPackge-linux.bat` 包含了 Package Builder 用來建置 Windows 與 Linux Packages 的邏輯。它們會呼叫適用的範例的 `.pkdesc` 檔，並用提供的 `description.xml` 檔案來建立包含範例工具套件的發行檔案。
+ 在官方的 SDK 中包含了四個完整的 .NET 範例專案可建構於 Linux 與 Window 上：
    + `SpotfireDeveloper.CalculationMothodExample`
    + `SpotifreDeveloper.CustomToolExample`
    + `SpotfireDeveloper.CustomToolExampleForms`
    + `SpotfireDeveloper.CustomToolExampleWeb`
+ 以上所有的專案，都包含了兩個 `csproj` 文件，且都已經被轉換成 SDK-style。一個是用來進行 .NET 的編譯，另一個用來與 PackageBuilder-Console 進行整合，以自動整合 Package。
+ 除了專案以外，另外還包含了 `SpotfireDeveloper.ApiExamples`，提拱了源始碼，說明如何進行日常任務的自動化，例如配置可視化(Visualizations)，處理篩選(Filter)和定期更新數據(Refresh data)。
### Integration
+ 提供了如何在 Spotfire Server 呼叫 REST/SOAP 方法的範例。([REST與SOAP的差異](https://aws.amazon.com/tw/compare/the-difference-between-soap-rest/))
![REST/SOAP](https://www.upwork.com/mc/documents/SOAP-vs-REST.png)
### JavaScript
+ 為 Web 端的使用者端供了混合 JavaScript Api 的 Solution。
---

## Package Builder
+ 提供一個框架，用於開發、除錯、打包及部署擴充到 Spotfire 上。它是一個用於添加自定義功能到 Spotfire 平台上的重要工具。同時具備 UI-based 與 Console 兩種版本供使用。(Linux 只有 Console 版)
![pkg builder](https://docs.tibco.com/pub/sfire_dev/area/doc/html/devdoc/images/packagebuilder_launch_80pc.png)
1. 點擊 **[Manage]**
2. 點擊 **[Add]**，並在 **Add Configuration** 對話視窗中，輸入 **Configuration name**。
3. 點擊 **[File]** \> **[Add TIBCO Spotfire Distribution]** 以新增 Spotfire 執行檔，以進行擴充功能的除錯。
4. 前往安裝 TIBCO Spotfire® Analyst 的 **[Modules]** 資料夾，點擊選擇資料夾，可自行指定何者作為 Spotfire Distribution。
![pgk builder2](https://docs.tibco.com/pub/sfire_dev/area/doc/html/devdoc/images/pb-dist.png)
---

## Starter
+ 包含了一個特殊的 `Spotfire.Dxp.exe`，與擴充的 Package Builder 應用程式整合，它被用於擴充專案的開發與除錯。
+ 還包含一個特殊的 `Spotfire.Dxp.exe.config`，由 Package Builder 在設計時進行配置，以反映開發擴充時使用的配置，以涵蓋所有支持的 Spotfire 版本的開發。
---

## Template
+ Spotfire 擴充專案範本是在 Visual Studio® 中用來建立新的 Spotfire 擴充專案的工具。它處理實作細節，讓開發者專注於新增功能。有多個版本的範本可用，取決於您打算為哪個平台開發您的擴充（Windows 或 Linux），以及在開發期間如何工作（使用 Package Builder 或僅使用 Visual Studio）。
+ 在 Linux 上運行的專案檔案必須是所謂的「SDK-style 專案」，請參閱 https://docs.microsoft.com/zh-tw/dotnet/core/project-sdk/overview。
+ 也可以使用 SDK-style 來建立 Windows 專案。因此，模板專案設置為使用 csproj 檔案中的屬性 `<TargetFrameworks>net48;net6.0</TargetFrameworks>` 自動建立兩種 .NET 版本。
+ 為了實現自動參照正確版本的 Spotfire 二進位檔，在 csproj 檔中定義 MSBuild property 中的 `TargetFramework` 以定義參照位址。例如：
```cmd
<Reference Include="Spotfire.Dxp.Application">
<HintPath>../../../Binaries/$(TargetFramework)/Spotfire.Dxp.Application.dll</HintPath>
<Private>false</Private>
</Reference>
```

---

## VisualStudioMacros
+ 該 SDK 包含一個 Visual Studio macro，簡化 document nodes 的開發。它基於定義 Custom Spotfire Document Nodes 的私有域(private fields)