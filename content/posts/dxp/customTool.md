---
title: "[DXP] 在 spotfire 中創建自定義工具"
keywords: ["spotfire", "dxp", "custom tool"]
description: "在 spotfire 中創建自定義工具"
date: 2023-06-06T22:38:08+08:00
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

## 簡介
+ Custom Tool 是一種通用 Spotfire 擴充類型，用於在特定**文本**中(spotfire app, docuemnt, visual, ...)執行某些動作，且可顯示或隱藏於菜單中。

---

## 概要
+ 開發者需新建一個類別，並繼承並實作 `CustomTool` 類別。然後這個類別會在 `AddIn` 類別的 `RegisterTools` 方法中註冊。此時，也可以使用`CustomMenuGroup` 類別指定將工具放置在自訂菜單組中。
+ 在創建 CustomTool 類別時，工具**文本**被指定為類型參數，例如對於 Document 需使用使用 `CustomTool<Document>`，對於 Page 需使用`CustomTool<Page>`。
+ 可以將提示添加到工具中。提示對話框可以添加到 Windows 客戶端和 Web 客戶端。
+ 在實作 custom tool 時，需注意到以下的特性：
    + **Tools 是靜態的(static)**：工具只有一個實例，該實例從調用 `Execute()` 方法的文本引數中接收其文本的處理。
    + **Tools 是無狀態的(stateless)**：一個狀態只能從一個繼承自 `DocumentNode` 類別並附加到文件模型的實例中保存在文件中。使用 `CustomNode` 類別和 `Document.CustomNodes` 屬性。
    + **Tools 只執行一個動作。**：通常，該動作需要在一個 undo stack 上產生一個 undo state。因此，所有更改文檔狀態的工具都應該被包裝在其 Transaction 中。

---

## Tools 文本
### 1. Application
```C#
public sealed class MyApplicationTool : CustomTool<AnalysisApplication>
```
+ AnalysisApplication tools 可從「**Tools**」選單中取得，在啟動 Spotfire 後即可啟用。

### 2. Document
```C#
public sealed class MyDocumentTool : CustomTool<Document>
```
+ Document tools 可從「**工具**」選單中取得，在文件開啟時啟用。

### 3. Page
```C#
public sealed class MyPageTool : CustomTool<Page>
```
+ Page tools 可從頁面文本選單中使用，但 web client 無法使用。

### 4. Visual
```C#
public sealed class MyVisualTool : CustomTool<VisualContent>
```
+ VisualContent 文本為頁面上的所有視覺工具提供了一個工具。還有針對特定可視化類型應用的視覺工具的子文本：
    + Visualization: 所有可視區，不包括繪圖區(plot area)。
    + BarChart: 僅限長條圖。
    + BoxPlot: 僅限箱形圖。
    + CombinationChart: 僅限組合圖表。
    + CrossTablePlot: 僅限交叉圖表。
    + GraphicalTable: 僅限圖形表格繪圖。
    + KPIChart: 僅限KPI圖表。
    + LineChart: 僅限折線圖。
    + MapChart: 僅限地圖圖表。
    + ParallelCoordinatePlot
    + PieChart: 僅限圓餅圖。
    + ScatterPlot: 僅限散佈圖。
    + ScatterPlot3D: 僅限3D散佈圖。
    + SummaryTable: 僅限摘要表格。
    + TablePlot: 僅限表格繪圖。
    + TextArea: 僅限文字區域。
    + WaterfallChart: 僅限瀑布圖表。
+ 通過覆寫 `IsVisibleCore` 方法，可以將多個子文本結合起來，從而隱藏除了有明確定的子文本以外的工具。例如，擁有一個僅對散點圖和條形圖可用的工具，並在有標記(marking)時啟用。
### 5. TablePlot
TablePlotColumn
```C#
public sealed class MyTablePlotColumnTool : CustomTool<TablePlotColumnContext>
```
+ 當右鍵點擊列標題時，可在文本菜單中找到。
---
TablePlotCell
```C#
public sealed class MyTablePlotCellTool : CustomTool<TablePlotCellContext>
```
+ 在表格中右鍵點擊單元格時顯示的文本菜單選單中可用。
---
TablePlotCopyCellValue
```C#
public sealed class MyTablePlotCopyCellValueTool : CustomTool<TablePlotCopyCellValueContext>
```
+ 在表格中右鍵點擊單元格時，可以在文本菜單的「Copy Cell」子菜單中找到。根據右鍵點擊的儲存格內容，且沒有添加任何擴展功能，子菜單標題可能包含以下一個或多個項目：
    + Value: 當所點擊的儲存格包含文字時可用。文字會被放置在剪貼簿上。
    + Link: 當列渲染器為所點擊的儲存格提供了連結時可用。
    + Image: 當渲染器為單元格提供了圖像時可用。放置在剪貼板上的圖像與表格中看到的圖像相同。

+ TablePlotCopyCellValue 在 web client 無法使用。

### 6. Map Chart Coordinates Context
```C#
public sealed class MyMapChartCoordinatesTool : CustomTool<MapChartCoordinatesContext>
```
+ 當使用者在地圖圖表上按右鍵時，具有 MapChartCoordinatesContext 的自訂工具將自動被呼叫。座標可在上下文物件的屬性中取得。

### 7. Filter
```C#
public sealed class MyFilterTool : CustomTool<FilterBase>
```
+ FilterBase 文本使篩選器面板中的所有篩選器工具可用。還有針對特定篩選器類型應用的篩選器工具的子文本：
    + CheckboxFilter
    + ItemFilter
    + ListBoxFilter
    + RadioButtonFilter
    + RangeFilte
    + TextFilter
    + HierarchyFilter
    + ColumnFilter: 所有 filter 類型，但不包括層次篩選。
    + SingleValueColumnFilter: 選擇一個值的 filter 類型，即 ItemFilter 和 RadioButtonFilter.

## Grouping Tools、註冊
+ Tools 可以按它們出現的位置分類：
    + 未指定 menu group，它將出現在「工具」菜單中。
    + 指定 menu group，因此它將出現在「工具」選單中的自訂工具群組中。
+ 為了防止意外或未經管理的從其他專案添加工具，只有在相同的 Spotfire 擴充專案中實現的工具才能在菜單子組中分組。通過將工具收集在一個 `AddIn` 中，創建該組，然後在註冊它們時將其傳遞給要包含在該組中的工具。使用 `AddIn.ToolRegistrar.Register` 方法註冊工具：
```C#
public sealed class CustomToolAddIn : AddIn
{
    protected override void RegisterTools(ToolRegistrar registrar)
    {
        base.RegisterTools(registrar);
 
        CustomMenuGroup menuGroup = new CustomMenuGroup("My menu sub group");
 
        registrar.Register(new MyTool(), menuGroup);
    }
    ...
}
```
+ 自訂頂層選單
![pic2](https://community.tibco.com/servlet/rtaImage?eid=ka54z0000004XLz&feoid=00N4z000003259m&refid=0EM4z000003V2dI)
```C#
[ApiVersion("10.10.0")]
public static MenuCategory CreateCustom(params string[] path);
```
範例：
```C#
MenuCategory.CreateCustom("First", "Second");
```
+ First 作為最上層的菜單標題， Second 為子菜單
或在實作 customTool 時指定
```C#
public MyTool()
    : base(menuText, requiredLicense, MenuCategory.CreateCustom("First", "Second")) {}
```
---
## Custom Tool 建構子
+ CustomTool 類別的建構式有一個必要的字串參數 `menuText`，該字串會顯示在選單和工具提示中。可以使用 `GetMenuTextCore` 覆寫此文字，以獲取適應 Web Client 端本地化設置的文字。建構函式的可選參數包括運行該工具所需的許可證 `requiredLicense`、選單類別 `menuCategory` 和要顯示在選單中的自訂圖示 `image`。
```C#
protected CustomTool(string menuText, LicensedFunction requiredLicense, MenuCategory menuCategory, Image image)
```
### ExecuteCore
+ 工具邏輯是透過覆寫 `ExecuteCore` 或 `ExecuteAndPromptCore` 方法來實現的，當工具需要提示使用者輸入時，後者會被使用。
```C#
protected virtual void ExecuteCore(TContext context);
protected virtual IEnumerable<Object> ExecuteAndPromptCore(TContext context);
```
+ 文本參數將使工具能夠訪問文件、頁面、視覺或其他對象，具體取決於工具操作的文本。
+ `ExecuteAnPromptCore` 方法的簽名需要額外解釋：注意它應該返回可枚舉物件(enumerable objects)。這是通過 yield 構造實現的，以返回用作提示模型的任何對象。使用 `AddIn.RegisterViews` 為工具使用的任何提示模型註冊相應的提示視圖。
+ 如果該工具使用提示，則需要覆寫 `GetSupportsPromptingCore` 以返回 `true`。
+ Web Client 中的 Tools: 
    + 預期 Web Client 端中的工具支援提示，並且必須實現 `ExecuteAndPromptCore` (`ExecuteCore` 永遠不會被框架呼叫)。但是，可以使用以下解決方法在 `ExecuteAndPromptCore` 中實現不提示的 Web 客戶端工具，該方法調用 `ExecuteCore` 並返回沒有提示模型：
    ```C#
    protected override IEnumerable<object> ExecuteAndPromptCore(Visualization context)
    {
        this.ExecuteCore(context);
        yield break;
    }
    ```

### IsEnabledCore
+ 有兩種方法可以覆寫，以指定何時應該顯示工具，以及何時應該啟用工具。
    + `IsEnabledCore` 回傳一個布林值，以指定該工具是否應該在選單中啟用。
    ```C#
    protected override bool IsEnabledCore(TContext context)
    ```
    + `IsVisibleCore` 回傳一個布林值，指定該工具是否應該在選單中顯示。
    ```C#
    protected override bool IsVisibleCore(TContext context)
    ```

+ 範例1: 將當下的頁籤移至最後。
```C#
public sealed class PageTool : CustomTool<Page>
{
    public PageTool()
        : base(Properties.Resources.PageToolTitle) {}

    protected override void ExecuteCore(Page page)
    {
        Document document = page.Context.GetAncestor<Document>();
        int index = document.Pages.IndexOf(page);
        document.Pages.Move(index, document.Pages.Count - 1);
    }

    protected override bool IsEnabledCore(Page page)
    {
        Document document = page.Context.GetAncestor<Document>();
        int index = document.Pages.IndexOf(page);
        return index >= 0 && index < document.Pages.Count - 1;
    }
}
```

+ 範例2: 將 visualization 中標記的值寫出來。
```C#
public sealed class PlotTool : CustomTool<VisualContent>
{
    public PlotTool()
        : base(Properties.Resources.PlotToolTitle) {}

    protected override void ExecuteCore(VisualContent context)
    {
        Visualization plot = (Visualization)context;
        DataManager dataManager = context.Context.GetSertvice<DataManager>();

        DataTable dataTable = plot.Data.DataTableReference;
        DataColumn firstColumn = dataManager.Tables[dataTable.Id].Columns[0];

        IndexSet markedRows = dataManager.Markings.DefaultMarkingReference.GetSelection(dataTable).AsIndexSet();
        var cursor = DataValueCursor.Create(firstColumn);
        foreach (var row in dataTable.GetRows(markedRows, cursor))
        {
            Trace.WriteLine(cursor.CurrentDataValue.ValidValue);
        }
    }

    protected override bool IsEnabledCore(VisualContent context)
    {
        Visualization plot = context as Visualization;

        DataManager dataManager = context.Context.GetService<DataManager>();
        DataMarkingSelection marking = dataManager.Markings.DefaultMarkingReference;

        if (plot.Data.DataReference == null)
        {
            return false;
        }
        else
        {
            RowSelection selectedRows = marking.GetSelection(plot.Data.DataTableReference);
            return !selectedRows.IsEmpty;
        }
    }

    protected override bool IsVisibleCore(VisualContent context)
    {
        return context is BarChart || context is ScatterPlot;
    }
}
```

範例3: 在 Spotfire 表格中右鍵點擊顯示圖像的儲存格，選擇「複製儲存格 > 圖像」，將圖像按比例縮放後添加到剪貼簿中。此範例實現了一個工具，可將全尺寸圖像複製到剪貼簿中。它可以從通用的 Spotfire 圖像複製工具相同的位置訪問：
![pic4](https://community.tibco.com/servlet/rtaImage?eid=ka54z0000004Zgk&feoid=00N4z000003259m&refid=0EM4z000003V3di)
```C#
public sealed class CopyCellValueTool : CustomTool<CopyCellValueContext>
{
    public CopyCellValueTool() : base("Image (fullsize)") {}

    protected override void ExecuteCore(CopyCellValueContext context)
    {
        BinaryLargeObject blob = context.DataValue.Value as BinaryLargeObject;
        if (blob != null)
        {
            try
            {
                Image img = Image.FromStream(blob.GetByteStream());
                Clipboard.Clear();
                Clipboard.SetImage(img);
            }
            catch (ArgumentException)
            {
                // Unable to convert to image, ignore
            }
        }
    }

    protected override bool IsVisibleCore(CopyCellValueContext context)
    {
        return context.DataType != null &&
            context.ContentType != null &&
            !context.DataType.IsSimple &&
            context.ContentType.StartsWith("image/", true, CultureInfo.InvariantCulture);
    }
 
    protected override bool IsEnabledCore(CopyCellValueContext context)
    {
        return context.DataValue != null && context.DataValue.IsValid;
    }
}
```

範例4: 將「顯示儲存格資訊」項目添加到儲存格內容選單中。該工具會顯示一個訊息方塊，顯示所選儲存格的欄位名稱和儲存格值。
```C#
public sealed class TablePlotCellContextExampleTool : CustomTool<TablePlotCellContext>
{
    public TablePlotCellContextExampleTool() : base(Properties.Resources.TablePlotCellToolTitle) {}
 
    protected override void ExecuteCore(TablePlotCellContext tablePlotCellContext)
    {
        string dataValue = tablePlotCellContext.DataValue.Value.ToString();
 
        string info = string.Format(
            System.Threading.Thread.CurrentThread.CurrentCulture,
            Properties.Resources.TablePlotCellToolInfo,
            new object[] { tablePlotCellContext.TableColumn.Name,
                           dataValue });
 
        System.Windows.Forms.MessageBox.Show(info, Properties.Resources.TablePlotCellToolTitle);
    }
 
    protected override bool IsEnabledCore(TablePlotCellContext context)
    {
        return context.DataValue != null && context.DataValue.IsValid;
    }
}
```