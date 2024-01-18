---
title: "[DXP] 在 spotfire 中創建自定義視覺化工具"
keywords: ["spotfire", "dxp", "custom visualization", "visual"]
description: "在 spotfire 中創建自定義的視覺化工具"
date: 2023-08-14T22:54:55+08:00
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
+ Spotifre 的視覺化工具(visualization)是可以被擴展的。已在 Spotfire 環境中部署的自定義視覺化工具將會出現在相同的位置並以相同的方式運作，就像 Spotfire 原生的視覺化工具一樣：它們可以從視覺化選單(visualization menu)、繪圖文本選單(plot context menus)、工具列中被訪問，並且可以與其它繪圖(plots)共享數據集(data sets)、標記(marking)和篩選(filtering)。

## 需要擴充的點
可視化框架的擴充點包括：
+ `CustomVisual`, `CustomVisualization` - custom visuals 的基礎類別，custom visualization 是 custom visual 的子類別，具有一此額外的功能。
+ `CustomVisualFactory` - custom visualizations 的工廠基類(Factory base)，用於創建自定義可視化工具的實例。
+ `CustomVisualView` - CustomVisual 視圖的基類。

## 實作
### 建立模型
模型部分繼承自 `CustomVisual` 或 `CustomVisualization`。 `CustomVisualization` 是 `CustomVisual` 的子類別，並添加了指定 data table 和 marking 的功能。能夠指定當前 data table 和當前 marking 使視覺化能夠參與主細節情境。它還使框架能夠在 marking 記錄上實現命令並在狀態欄中顯示有關 filtering 和 marking 的行數的訊息。

CustomVisualization 的 model資料可以來源自一個或一個以上的 data tables；而 CustomVisual 則是可以在 Page 中實作原生的 Text Area 和其它各種控制面板。

The model achieves this dual requirement by overriding two virtual methods defined by CustomVisual:
視覺化工具應該要能自行渲染，它應該要能感知到外觀變化並能通知環境產生對應動作。模型透該 overrides 兩個虛擬方法(virtual methods)來實現這兩個需求：

+ 覆寫 `RenderCore` 方法以執行繪圖。
+ 覆寫 `GetRenderTriggerCore` 以定義何時需要重新繪製視覺區。

以下範例展示了一個最簡單的 visualization。它有兩個屬性(PropertyName)，代表資料表(data table)和標記(marking)。範例會繪製一個字串，說明在資料表中被標記的行數。
```Cs
[Serializable]
[PersistenceVersion(1, 0)]
public class MyVisualization : CustomVisualization
{
    public new abstract class PropertyNames : CustomVisualization.PropertyNames
    {
        public static readonly PropertyName DataTableReference = CreatePropertyName("DataTableReference");
        public static readonly PropertyName MarkingReference = CreatePropertyName("MarkingReference");
    }

    private readonly UndoableCrossReferenceProperty<DataTable> dataTableReference;
    private readonly UndoableCrossReferenceProperty<DataMarkingSelection> markingReference;

    internal MyVisualization()
    {
        CreateProperty(PropertyNames.DataTableReference, out this.dataTableReference, null);
        CreateProperty(PropertyNames.MarkingReference, out this.markingReference, null);
    }

    public DataTable DataTableReference
    {
        get { return this.dataTableReference.Value; }
        set { this.dataTableReference.Value = value; }
    }

    public DataMarkingSelection MarkingReference
    {
        get { return this.markingReference.Value; }
        set { this.markingReference.Value = value; }
    }

    protected override void RenderCore(RenderArgs renderArgs)
    {
        // Clear our drawing surface.
        renderArgs.Graphics.FillRectangle(Brushes.White, renderArgs.Bounds);
        
        // Draw a string showing the number of marked rows.
        if (this.DataTableReference != null && this.MarkingReference != null)
        {
            int markedRowsCount = this.MarkingReference.GetSelection(this.DataTableReference).IncludedRowCount;
            string message = string.Format(
                "{0} marked rows in table {1}",
                markedRowsCount,
                this.DataTableReference.Name);

            renderArgs.Graphics.DrawString(message,
                SystemFonts.DefaultFont,
                Brushes.Black,
                renderArgs.Bounds);
        }
    }

    protected override Trigger GetRenderTriggerCore()
    {
        // Return a trigger that fires when the data table or marking properties change
        // or when the content of the marking changes.
        return Trigger.CreateCompositeTrigger(
            Trigger.CreatePropertyTrigger(
                this, PropertyNames.DataTableReference, PropertyNames.MarkingReference
            ),
            Trigger.CreateMutablePropertyTrigger<DataMarkingSelection>(
                this, PropertyNames.MarkingReference, DataMarkingSelection.PropertyNames.Selection
            )
        );
    }

    protected override DataTable GetActiveDataTableReference()
    {
        return this.dataTableReference.Value;
    }

    protected override Trigger GetActiveDataTableReferenceTriggerCore()
    {
        return Trigger.CreatePropertyTrigger(this, PropertyNames.DataTableReference);
    }

    protected override DataMarkingSelection GetActiveMarkingReferenceCore()
    {
        return this.markingReference.Value;
    }

    protected override Trigger GetActiveMarkingReferenceTriggerCore()
    {
        return Trigger.CreatePropertyTrigger(this, PropertyNames.MarkingReference);
    }

    private MyVisualization(SerializationInfo info, StreamingContext context)
        : base(info, context)
    {
        DeserializeProperty(info, context, PropertyNames.DataTableReference, out this.dataTableReference);
        DeserializeProperty(info, context, PropertyNames.MarkingReference, out this.markingReference);
    }

    protected override void GetObjectData(SerializationInfo info, StreamingContext context)
    {
        base.GetObjectData(info, context);

        SerializeProperty(info, context, this.dataTableReference);
        SerializeProperty(info, context, this.markingReference);
    }
}
```

### 建立工廠
為了創建可視化工具，必須為其指定自定義工廠(custom factory)。該工廠負責創建和初始配置。還包含一些 metadata 如 UI commands 和 type identifier。
```Cs
public sealed class MyCustomIdentifiers : CustomTypeIdentifiers
{
    public static readonly CustomTypeIdentifier MyVisualizationIdentifier =
        CreateTypeIdentifier(
            "Acme.MyVisualization",    // Name
            "My Visualization",        // Display name
            "This is a description");  // Description
}
 
internal sealed class MyVisualizationFactory : CustomVisualFactory<MyVisualization>
{
    internal MyVisualizationFactory()
        : base(
        MyCustomIdentifiers.MyVisualizationIdentifier,    
        VisualCategory.Visualization,                  
        Properties.Resources.MyVisualizationImage,     
        null)                                          
    {
    }
 
    protected override void AutoConfigureCore(MyVisualization visualization)
    {
        // Find good default values for properties.
        DataManager dataManager = visualization.Context.GetService<DataManager>();
        visualization.DataTableReference = dataManager.Tables.DefaultTableReference;
        visualization.MarkingReference = dataManager.Markings.DefaultMarkingReference;
    }
}
```
可視化工廠是從 CustomVisualFactory 衍生而來的。請注意，自定義工廠類別並不會實例化可視化。實例化可視化是透過可視化的無參數建構函式由工廠基底類別來完成的。建構函式不必是公開的；但事實上，它不應該是公開的，因為讓 API 使用者建立可視化，然後將其插入到文件中是不合理的。

當視覺化已經被創建並插入到文件節點層次結構中時，框架會在工廠上調用兩個虛擬方法：
+ `InitializeCore`：它設置與數據無直接關係的屬性。
+ `AutoConfigureCore`：它使用適當的默認值為數據相關屬性（例如數據表、標記和列）配置視覺化。在上面的例子中，只有AutoConfigureCore方法被覆蓋。

### 註冊 Visualization
最後，視覺化工廠必須在框架中註冊。透過 overrides Add-in 中的 `RegisterVisuals` 完成。
```Cs
public sealed class MyVisualizationAddIn : AddIn
{
    protected override void RegisterVisuals(AddIn.VisualRegistrar registrar)
    {
        registrar.Register(new MyVisualizationFactory());
    }
}
```
現在，可以在 TIBCO Spotfire 中創建 visualization 了。然而，無法以任何方式配置視覺化或與之互動。為了進行這樣的操作，必須為之一個視圖(view)。

### 建立視圖
自訂視覺化檢視 API 是在 Spotfire 應用程式中建立自訂視覺化的統一 API。隨著 TIBCO Spotfire 7.5 中修改的架構，帶來了代碼共享的好處。現在建議只使用基於 Web 的方法，而不是在 TIBCO Spotfire Analyst 和 TIBCO Spotfire Consumer 和 Business Author 中維護一個自訂代碼。基於 Web 的自訂視覺化將嵌入 TIBCO Spotfire Analyst 中，就像任何內部視覺化一樣。

如果希望任何先前創建的自定義視覺化與新的 API 配合使用，則需要進行轉換。有關更多信息，請參閱[將自定義 Web 視覺化轉換為 CustomVisualView API](https://community.tibco.com/s/article/convert-custom-web-visualization-customvisualview-api-tibco-spotfire-75)。

一個自訂的視圖類別是從基礎類別 CustomVisualView 繼承而來。在 AddIn 類別中，該視圖在 RegisterViews 方法中註冊，例如：
```Cs
protected override void RegisterViews(ViewRegistrar registrar)
{
      base.RegisterViews(registrar);
      registrar.Register(typeof(CustomVisualView), typeof(MyVisual), typeof(MyVisualView));
}
```

### 初始化 Visualization
CustomVisualView 的一個實例可以被視為一個嵌入式 Web 伺服器，通常會提供一個 HTML 檔案，以及一些資源，例如 JavaScript 檔案、圖片等。
為了初始化視覺化，要 override `GetResourceCore` 方法：
```Cs
protected override HttpContent GetResourceCore(string path, NameValueCollection query, MyVisual snapshotNode)
{
    if (string.IsNullOrEmpty(path))
    {
        path = "MyVisual.html";
    }

    var bytes = GetEmbeddedResource("SpotfireDeveloper.CustomVisualsExample.webroot." + path);
    return new HttpContent("text/html", bytes);
}
```
從技術上講，當最終用戶創建自定義類型的可視化時，內部將發生的是一個“嵌入式 Web 客戶端”（一個 iFrame HTML 元素）將出現在當前頁面上，並且該 Web 客戶端將使用 URL "/" 進行 HTTP 請求。該請求將被路由到調用上面的 GetResourceCore 方法。在上面的示例中，將檢索 MyVisual.html。該 HTML 文件可能反過來加載任何資源：
```html
<script src=”http://code.jquery.com/jquery-1.11.2.min.js”></script>
```
```html
<script src=”myscript.js”></script>
```

請求 myscript.js 是使用相對路徑指定的，因此它將由被覆蓋的 `GetResourceCore` 方法處理。在上面的示例中，查找 webroot 文件夾中 JavaScript 文件的位置並嵌入該文件。但是，JavaScript 文件可以以任何方式獲取。例如，在調試的情況下，從硬編碼的路徑獲取文件可能很有用，以避免重建項目。

### 客戶導向互動
您的自訂視覺化可以被視為分為客戶端和服務器端，其中客戶端是“視圖”，服務器端是“模型”。
提供了一些工具來簡化與伺服器的通訊。

### 讀取資料
當「SpotfireLoaded」事件被觸發時，客戶端和伺服器之間的通訊通道就會開啟。在這個例子中，Spotfire.read 函數會從伺服器取回資料。
```JavaScript
$(window).on("SpotfireLoaded", function()
    {
        Spotfire.read("GetData", {"argument": "value"}, function(data)
        {
            if (data)
            {
                // typically re-render the visualization, but this example
                // just displays the returned value
                alert(data);
            }
        });
    });
```

Spotfire.read 函數需要三個參數：

+ 一個方法識別符(method identifier)。
+ 一個參數物件(argument object)
+ 一個 callback
在伺服器端，讀取呼叫由ReadCore方法處理：
```Cs
protected override string ReadCore(string method, string args, MyVisual snapshotNode)
{
    if (method.Equals("GetData", StringComparison.OrdinalIgnoreCase))
    {
        // typically retrieve some data from the document, 
        // but this example just echoes the input argument
        return args;
    }
        
    return base.ReadCore(method, args, snapshotNode);
}
```
請注意，當讀取數據時，服務代碼會在後台線程上執行。這允許多個同時讀取操作。

### 寫入數據
當客戶需要修改文件時，例如標記數據時，請使用：
```JavaScript
Spotfire.modify("Mark", {'rectangle': someObject});
```
在伺服器端，修改呼叫由 `ModifyCore` 方法處理：
```Cs
protected override void ModifyCore(string method, string args, MyVisual liveNode)
{
    if ("Mark".Equals(method, StringComparison.Ordinal))
    { 
        liveNode.MarkArea(/* … */);
    }
}
```

請注意，文件的修改是在主線程上執行的，因此修改文件是安全的。

### 伺服器驅動的互動
從伺服器端，可以觸發客戶端的事件處理程序，例如：
```Cs
protected override void OnUpdateRequiredCore()
{
    this.InvokeClientEventHandler("render", null);
}
```
如需更多資訊，請參閱 [OnUpdateRequiredCore](https://docs.tibco.com/pub/doc_remote/sfire_dev/area/doc/api/TIB_sfire-analyst_api/?topic=html/M_Spotfire_Dxp_Application_Extension_CustomVisualView_OnUpdateRequiredCore.htm&_ga=2.219012633.123850125.1692024818-1463462807.1662359000)。
當客戶端必須更新時，此代碼將運行，通過觸發"渲染"事件。
在客戶端：
```JavaScript
var render = function(data)
{                
    // Typically call Spotfire.read(...)
    // data will be the argument from the server invocation - null in this example
};

Spotfire.addEventHandler("render", render);
```


### 匯出時呈現自訂視覺效果。
在使用 7.10 中引入的新匯出框架進行匯出時，有一些事情需要考慮，以使自訂視覺效果呈現得漂亮。在[此處](https://community.tibco.com/s/article/making-tibco-spotfire-custom-visuals-render-nicely-when-exporting)了解更多。