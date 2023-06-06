---
title: "[DXP] 在 spotfire 中創建自定義任務"
keywords: ["spotfire", "dxp", "task"]
description: "在 spotfire 中創建自定義任務"
date: 2023-06-06T21:36:12+08:00
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

### 簡介
+ Spotfire Automation Services 提供一個平台和工具，用於在無使用者操作與 UI 的情況下自動地執行 TIBCO Spotfire。
+ 適用情境如「定期發送報告」、「在某些事件發生時保存嵌入在 Spotfire 文件中的截圖」，以及在許多其他需要基於Spotfire文件進行自動化操作的情況下使用。
+ 自動化服務 API 使自訂任務變得可能，且可與內建任務一起使用，執行自動化工作。

### Spotfire 用語
|名詞|解釋|
|---|---|
|Task| Task 是用於創建複雜工作的基礎模塊。自動化服務附帶了許多預定義的 Tasks，例如應用書籤或發送電子郵件或乃至其它可擴充的 Tasks。|
|Job| 排程好待執行的 Tasks 組合成一個 Job，Job 又被儲存於 Job File 中。|
|Job File| Job File 是一個可讀的 XML，用於定義 Job。|
|Job Builder| Job Builder 是一個在 Spotfire 專業版中運行的應用程式，提供了一個易於使用的界面，用於創建和編輯工作。|
|Job Sender| ClientJobSender 是一個工具，可將作業發送到 Spotfire Server 以進行執行。使用 ClientJobSender 設置定期或事件驅動的作業執行。|
### 架構
![pic1](https://supportinfo.tibco.com/stca/comm/Create-an-Automation-Services-Custom-Task-in-TIBCO-Spotfire-1.png)
+ Job 通常是在 Job Builder 或 ClientJobSender 中創建並保存為 XML 的 Job File，然後被送至 Spotfire 伺服器以執行，或是使用 ClientJobSender 工具發送到 Spotfire 伺服器以進行執行。
+ 對於每個以 XML 格式發送到 Spotfire Server 以執行的工作，Automation Services 會啟動一個 **node**。接著內部工作執行程序會逐一執行任務，直到任務失敗或所有任務成功完成時退出。
### Job File 格式
+ 工作檔案的 XML 格式設計為易於理解和修改。雖沒有正式的格式規範，但可讀性仍是挺高的。
+ 以下是一個「從 Analytics Server Library 開啟分析文件並將圖像匯出到預定位置」的 Job 範例：
```xml
<as:Job xmlns:as="urn:tibco:spotfire.dxp.automation">
  <as:Tasks>
    <OpenAnalysisFromLibrary xmlns="urn:tibco:spotfire.dxp.automation.tasks">
      <as:Title>Open Analysis from Library</as:Title>
      <AnalysisPath>/Users/Username/Baseball stats</AnalysisPath>
    </OpenAnalysisFromLibrary>
    <ExportImage xmlns="urn:tibco:spotfire.dxp.automation.tasks">
      <as:Title>Export Image</as:Title>
      <VisualizationId>292a90c6-0e03-47fe-961e-a528a14e9735</VisualizationId>
      <DestinationPath>C:inetpubwwwrootMyWebServerImage.png</DestinationPath>
      <Width>640</Width>
      <Height>480</Height>
    </ExportImage>
  </as:Tasks>
</as:Job>
```
### 自動化 Task 範例
+ 一個 Task 需繼承 `Task` 母類別。
+ 一個 `Task` 類別必須擁有一個無參建構式，並呼叫 base 建構式，並傳入標題和描述。如果相同的任務名稱已經在使用中，可以選擇性地使用 XmlRoot 命名空間來避免命名衝突。為自訂任務使用自訂命名空間。
```C#
// 自定義任務的命名空間
[XmlRoot("urn:spotfiredeveloper.automationservicesexample")]
public sealed class ApplyBookmark : Task
{
    // 建立一個無參建構式，並呼叫 base 建構式，同時傳入標題與描述
    public ApplyBookmark()
        : base(Properties.Resources.ApplyBookmarkTitle, Properties.Resources.ApplyBookmarkDescription)
    {
    }

    // 一些 public 的 properties 可供 UI 存取
    [Description("The GUID of the bookmark to apply")]
    public Guid BookmarkId { get; set; }
}
```
+ 當任務被執行時，會執行 `ExecuteCore` 方法。
```C#
protected override TaskExecutionStatus ExecuteCore(TaskExecutionContext context)
{
    // 沒有文件被讀取
    if (context.Application.Document == null)
    {
        return new TaskExecutionStatus(false, Properties.Resources.NoAnalysisLoaded);
    }

    // 檢查書籤是否存在於新書籤中
    var manager = context.Application.GetService<BookmarkManager>();
    if (manager != null)
    {
        Bookmark bookmark;
        if (manager.TryGetBookmark(this.BookmarkId, out bookmark))
        {
            // 套用書籤
            manager.Apply(bookmark);
            return new TaskExecutionStatus(true);
        }
    }

    // 檢查書籤是否存在於舊書籤中
    foreach (var bookmark in context.Application.Document.Bookmarks)
    {
        if (bookmark.Id == this.BookmarkId)
        {
            // 套用書籤
            bookmark.Apply();
            return new TaskExecutionStatus(true);
        }
    }

    // 找不到書籤，報錯
    Console.WriteLine("Error in execution of job {0}. The bookmark {1} was not found.", context.Id, this.BookmarkId);
    return new TaskExecutionStatus(false, Common.Format(Properties.Resources.BookmarkNotAvaliable, this.BookmarkId));
}
```

### 註冊
+ 最後，工作任務必須被註冊在單獨的 `RegisterTasksAddin` 類別中
```
public sealed class TasksAddIn : RegisterTasksAddIn
{
    public override void RegisterTasks(TaskRegistrar registrar)
    {
        registrar.Register(new ApplyBookmark());
    }
}
```