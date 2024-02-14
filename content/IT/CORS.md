---
title: "[IT] CORS 跨原始來源要求"
keywords: ["IT", "C#"]
description: 
date: 2024-01-19T00:41:51+08:00
tags: ["IT", "C#"]
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

## TL;DR
> CORS (Cross-Origin Resource Sharing)   
> 是一個支援安全跨源請求和資料傳輸的機制，用於在瀏覽器和伺服器之間進行跨源請求。

+ 這是一個 W3C 標準，可讓伺服器放寬相同原始來源原則。
+ 不是安全性功能，CORS 會放寬安全性。 允許 CORS 並不會增強 API 的安全性。[CORS 的運作方式](https://learn.microsoft.com/zh-tw/aspnet/core/security/cors?view=aspnetcore-8.0#how-cors)
+ 允許伺服器明確允許某些跨原始來源要求，同時拒絕其他要求。
+ 比舊版技術 (例如：[JSONP](https://learn.microsoft.com/zh-tw/dotnet/framework/wcf/samples/jsonp)) 更安全且更有彈性。

## 何謂相同原始來源
+ 如果兩個 URL 具有相同的配置、主機和連接埠，則其原始來源相同 ([RFC 6454](https://tools.ietf.org/html/rfc6454))。
    + 這兩個 URL 具有相同的原始來源：
        + `https://example.com/foo.html`
        + `https://example.com/bar.html`
    + 這些 URL 的原始來源與前兩個 URL 不同：
        + `https://example.net：不同的`網域
        + `https://www.example.com/foo.html`：不同的子網域
        + `http://example.com/foo.html`：不同的配置
        + `https://example.com:9000/foo.html`：不同的連接埠

## 如何啟動 CORS
有三種方式可以啟用 CORS：
+ 在中介軟體中，使用**具名原則**或**預設原則**。
+ 使用**端點路由**。
+ 使用 **[EnableCors]** 屬性。
搭配具名原則使用 [EnableCors] 屬性能夠以最精細的程度來控制對於支援 CORS 之端點的限制。

{{< notice warning >}}
必須以正確的順序呼叫 **UseCors**。例如，在使用 **UseResponseCaching** 時，必須先呼叫 **UseCors**，再呼叫 **UseResponseCaching**。
{{< /notice >}}

### 具有具名原則和中介軟體的 CORS
```csharp
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://example.com", "http://www.contoso.com");
                          // policy.WithOrigins("http://example.com", "http://www.contoso.com")
                          //       .AllowAnyHeader()
                          //       .AllowAnyMethod();       ### policyBuilder 可以鏈結 ###
                      });
});
// services.AddResponseCaching();
builder.Services.AddControllers();
var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
app.MapControllers();
app.Run();
```
上述 程式碼：
+ 將原則名稱設定為 `_myAllowSpecificOrigins`。原則名稱可以為任意值。
+ 呼叫 **UseCors** 擴充方法，並指定 `_myAllowSpecificOrigins` CORS 原則。`UseCors` 會新增 CORS 中介軟體。對 `UseCors` 的呼叫必須放在 `UseRouting` 之後、`UseAuthorization` 之前。
+ 使用 **Lambda 運算式**呼叫 `AddCors`。 Lambda 會採用 `CorsPolicyBuilder` 物件。本文稍後會說明**組態選項**，例如：`WithOrigins`。
+ 為所有控制器端點啟用 `_myAllowSpecificOrigins` CORS 原則。
+ 使**回應快取中介軟體**時，請先呼叫 `UseCors`，再呼叫 `UseResponseCaching`。

使用端點路由時，CORS 中介軟體必須設定為在呼叫 `UseRouting` 和 `UseEndpoints` 之間執行。  
`AddCors` 方法呼叫會將 CORS 服務新增至應用程式的服務容器：

{{< notice warning >}}
注意：指定的 URL 不得包含尾端斜線 (/)。 如果 URL 以 / 終止，則比較會傳回 false，而且不會傳回任何標頭。
{{< /notice >}}

+ UseCors 和 UseStaticFiles 順序
一般而言，會先呼叫 `UseStaticFiles`，再呼叫 `UseCors。` 使用 JavaScript 來擷取跨網站靜態檔案的應用程式必須先呼叫 `UseCors`，再呼叫 `UseStaticFiles`。

---

### 具有預設原則和中介軟體的 CORS
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://example.com", "http://www.contoso.com");
        });
});
builder.Services.AddControllers();
var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();
```
上述程式碼會將預設 CORS 原則套用至所有控制器端點。

---

### 使用端點路由啟用 CORS
使用端點路由時，可以使用一組 `RequiredCors` 擴充方法，逐個端點啟用 CORS：
```csharp
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://example.com", "http://www.contoso.com");
                      });
});

builder.Services.AddControllers();
builder.Services.AddRazorPages();
var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/echo",
        context => context.Response.WriteAsync("echo"))
        .RequireCors(MyAllowSpecificOrigins);

    endpoints.MapControllers()
             .RequireCors(MyAllowSpecificOrigins);

    endpoints.MapGet("/echo2",
        context => context.Response.WriteAsync("echo2"));

    endpoints.MapRazorPages();
});
app.Run();
```
在上述程式碼中：
+ `app.UseCors` 會啟用 CORS 中介軟體。 因為尚未設定預設原則，因此單獨的 `app.UseCors()` 不會啟用 CORS。
+ `/echo` 和控制器端點允許使用指定的原則進行跨原始來源要求。
+ `/echo2` 和 Razor Pages 端點不允許跨原始來源要求，因為未指定預設原則。
如果 CORS 是由端點路由透過 `RequireCors` 所啟用的，則 `[DisableCors]` 屬性無法停用 CORS。

---

### 使用屬性啟用 CORS
使用`[EnableCors]`屬性啟用 CORS，並將具名原則套用至只需要 CORS 的端點，這樣才能提供最精細的控制。
`[EnableCors]` 屬性提供全域套用 CORS 的替代方案。`[EnableCors]` 屬性會啟用所選端點的 CORS，而不是所有端點：
+ `[EnableCors]` 指定預設原則。
+ `[EnableCors("{Policy String}")]` 指定具名原則。

[EnableCors] 屬性可以套用至：
+ Razor Page PageModel
+ 控制器
+ 控制器動作方法
透過 `[EnableCors]` 屬性，可以將不同的原則套用至控制器、頁面模型或動作方法。 當 `[EnableCors]` 屬性套用至控制器、頁面模型或動作方法，並在中介軟體中啟用 CORS 時，兩個原則都會被套用。 不建議進行原則合併。 使用 `[EnableCors]` 屬性或中介軟體，而不是在同一個應用程式中。

下列程式碼會將不同的原則套用至每個方法：
```csharp
[Route("api/[controller]")]
[ApiController]
public class WidgetController : ControllerBase
{
    // GET api/values
    [EnableCors("AnotherPolicy")]
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
        return new string[] { "green widget", "red widget" };
    }

    // GET api/values/5
    [EnableCors("Policy1")]
    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
    {
        return id switch
        {
            1 => "green widget",
            2 => "red widget",
            _ => NotFound(),
        };
    }
}
```
下列程式碼會建立兩個 CORS 原則：
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Policy1",
        policy =>
        {
            policy.WithOrigins("http://example.com",
                                "http://www.contoso.com");
        });

    options.AddPolicy("AnotherPolicy",
        policy =>
        {
            policy.WithOrigins("http://www.contoso.com")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});
builder.Services.AddControllers();
var app = builder.Build();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();
```
如需對 CORS 要求限制進行最精細的控制：

搭配具名原則使用 `[EnableCors("MyPolicy")]`。
+ 不要定義預設原則。
+ 不要使用端點路由。
+ 下一節中的程式碼符合上述清單。

## 停用 CORS
如果 CORS 是由端點路由所啟用的，則 `[DisableCors]` 屬性無法停用 CORS。

下列程式碼會定義 CORS 原則 `"MyPolicy"`：
```csharp
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
        policy =>
        {
            policy.WithOrigins("http://example.com",
                                "http://www.contoso.com")
                    .WithMethods("PUT", "DELETE", "GET");
        });
});
builder.Services.AddControllers();
builder.Services.AddRazorPages();
var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.UseAuthorization();
app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
    endpoints.MapRazorPages();
});
app.Run();
```
下列程式碼會停用 `GetValues2` 動作的 CORS：

```csharp
[EnableCors("MyPolicy")]
[Route("api/[controller]")]
[ApiController]
public class ValuesController : ControllerBase
{
    // GET api/values
    [HttpGet]
    public IActionResult Get() =>
        ControllerContext.MyDisplayRouteInfo();

    // GET api/values/5
    [HttpGet("{id}")]
    public IActionResult Get(int id) =>
        ControllerContext.MyDisplayRouteInfo(id);

    // PUT api/values/5
    [HttpPut("{id}")]
    public IActionResult Put(int id) =>
        ControllerContext.MyDisplayRouteInfo(id);


    // GET: api/values/GetValues2
    [DisableCors]
    [HttpGet("{action}")]
    public IActionResult GetValues2() =>
        ControllerContext.MyDisplayRouteInfo();
}
```
上述程式碼：
+ 不會透過端點路由啟用 CORS。
+ 不會定義預設 CORS 原則。
+ 使用 [EnableCors("MyPolicy")] 來針對控制器啟用 `"MyPolicy"` CORS 原則。
+ 針對 `GetValues2` 方法停用 CORS。