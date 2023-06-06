---
title: "[DXP] 使用 Visual Studio 對 Spotfire 開發進行環境設置"
keywords: ["spotfire", "dxp", "config"]
description: "spotfire 開發環境設置"
date: 2023-06-06T20:58:59+08:00
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

## 在 Visual Studio 中創建 Extension
1. 在 Visual Studio 中，選擇「**Tools** > **Options**」，並在「**Projects and Solutions** > **Locations**」下，將「**User project templates location**」設定為 Spotfire SDK 中「**Templates**」資料夾的路徑。
![pic1](https://docs.tibco.com/pub/sfire_dev/area/doc/html/devdoc/images/vs_first_extension.png)
2. 在 Visual Studio 中，選擇 「**File** > **New** > **Project**」，然後選擇 **TIBCO Spotfire Extension_VS** 或 **TIBCO Spotfire Extension Net6_VS** 範本。請注意，TIBCO Spotfire Extension Net6_VS 範本是一個 SDK-style 專案，它允許您同時為多個平台進行構建。這是本範例中使用的範本。為了使預定義的後置構建步驟正常工作，**新專案的位置必須在 SDK 中的 MyExtensions 文件夾中**（或者在同一級別的其他文件夾中）。如果需要將專案儲存於其他位置，則必須在本文之後進行更多的建置步驟。請參閱「[Customizing the environment and advanced information](https://docs.tibco.com/pub/sfire_dev/area/doc/html/devdoc/topics/creating_an_extension_using_only_visual_studio.html?scroll=GUID-625B17C7-3B83-4C4A-A562-83B4B010DCC8)」。  
並選取「**Place solution and project in the same directory**」核取方塊。
![pic2](https://docs.tibco.com/pub/sfire_dev/area/doc/html/devdoc/images/vs_myextensions_location.png)
3. 透過選擇「**Build** > **Build Solution**」來編譯新建立的專案。這將會產生一個新的子資料夾 `MyExtensions\Build`，其中會儲放所有建置產物。
    + 編譯後的二進制文件與 SDK 二進制文件會儲存在 `Build\bin\` 中。例如，`Build\bin\net6.0` 或 `Build\bin\AnyCPU\Debug`。
    + 一個或多個 Spotfire 套件檔案 (.spk) 儲存在 Build 資料夾中。
    + 套件檔案的未打包版本儲存在 `Build\Modules\<Extension-name>_<Version number>`中。例如，TIBCO Spotfire_Extension_Net6_VS-Windows_1.0.6320.3907。這樣與下載的 Spotfire 的擴充方式一致，更易於 debug。
4. 為了能夠除錯擴充功能，需在 Visual Studio 中手動進行以下配置：
    + 在 **Solution Explorer** 中選擇擴充功能專案。
    + 選擇「**View** > **Property Pages**」。
    + 在 Debug 頁面上，點擊「Open debug launch profiles UI」，然後在「Launch Profiles」對話框中執行以下操作：
        + 點擊「**Create a new profile**」，並選擇「**Executable**」。
        + 在「**Executable**」下，指向電腦中的 `Spotfire.Dxp.exe`。它可以是安裝的版本、某些中間測試版本或類似版本。例如，`C:\Users\{username}\AppData\Local\TIBCO\Spotfire\12.0.0\Spotfire.Dxp.exe`。
        + 在 CLI 下，輸入 `/loadallmodules /addmodulefolder:<SDK 中模組資料夾的路徑>`，舉例：
        ```
        /loadallmodules /addmodulefolder:C:\SpotfireSDK\SDK\MyExtensions\Build\Modules`。
        ```
5. 為了驗證擴展功能已經載入，請在 Visual Studio 中選擇新的 Debug 檔案，並運行它以確保 Spotfire 已啟動。
![pic3](https://docs.tibco.com/pub/sfire_dev/area/doc/html/devdoc/images/choosing_debug_profile_vs_project.png)
6. 在 Spotfire 中，請前往「**Help** > **Support Diagnostics and Logging**」，向下捲動已載入檔案的清單，以確認擴充功能已載入。
![pic4](https://docs.tibco.com/pub/sfire_dev/area/doc/html/devdoc/images/spotfire_support_and_diagnostics.png)
7. 使用標準管理使用者介面「**Deployments & Packages**」，將儲存在 Build 資料夾中的套件檔案部署到 Spotfire 伺服器。