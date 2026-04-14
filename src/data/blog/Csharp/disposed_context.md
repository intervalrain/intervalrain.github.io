---
title: "[C#] ObjectDisposedException：Disposed Context 的成因與解法"
author: "Rain Hu"
pubDatetime: 2026-04-13T16:00:00+08:00
description: "Common causes of ObjectDisposedException on DbContext in C# and how to fix them"
tags: ["csharp", "entity-framework", "dependency-injection", "async"]
---

# ObjectDisposedException：Disposed Context 的成因與解法

## 目錄

1. [什麼是 Disposed Context](#什麼是-disposed-context)
2. [常見成因分類](#常見成因分類)
3. [成因一：using 區塊外存取](#成因一using-區塊外存取)
4. [成因二：延遲執行 (Deferred Execution)](#成因二延遲執行-deferred-execution)
5. [成因三：Fire-and-Forget 異步呼叫](#成因三fire-and-forget-異步呼叫)
6. [成因四：DI 生命週期不匹配](#成因四di-生命週期不匹配)
7. [成因五：Lazy Loading 觸發](#成因五lazy-loading-觸發)
8. [成因六：手動 Dispose 後繼續使用](#成因六手動-dispose-後繼續使用)
9. [除錯技巧](#除錯技巧)
10. [總結](#總結)

---

## 什麼是 Disposed Context

在 C# 中使用 Entity Framework (Core) 時，最常遇到的例外之一就是：

```
System.ObjectDisposedException:
Cannot access a disposed context instance.
```

這代表你嘗試透過一個**已經被釋放**的 `DbContext` 來存取資料庫。`DbContext` 實作了 `IDisposable`，一旦 `Dispose()` 被呼叫，它所管理的資料庫連線與變更追蹤器都會被釋放，之後任何操作都會拋出例外。

---

## 常見成因分類

| 分類 | 成因 | 常見程度 |
|------|------|---------|
| 生命週期管理 | `using` 區塊外存取 | ★★★★★ |
| LINQ 延遲執行 | 回傳 `IQueryable` 後才列舉 | ★★★★☆ |
| 異步模式 | Fire-and-Forget | ★★★★☆ |
| DI 設定 | 生命週期不匹配 | ★★★☆☆ |
| ORM 行為 | Lazy Loading | ★★★☆☆ |
| 手動管理 | 過早 Dispose | ★★☆☆☆ |

---

## 成因一：using 區塊外存取

最直覺的錯誤——在 `using` 區塊結束後才使用 context。

### 錯誤範例

```csharp
public IQueryable<Order> GetOrders()
{
    using var context = new AppDbContext();
    return context.Orders.Where(o => o.IsActive); // 回傳 IQueryable，尚未執行查詢
}

// 呼叫端
var orders = GetOrders();
var list = orders.ToList(); // 💥 ObjectDisposedException — context 已被釋放
```

### 正確做法

在 `using` 區塊內就將查詢**具現化 (Materialize)**：

```csharp
public List<Order> GetOrders()
{
    using var context = new AppDbContext();
    return context.Orders.Where(o => o.IsActive).ToList(); // 立即執行
}
```

---

## 成因二：延遲執行 (Deferred Execution)

LINQ 的 `IQueryable` 和 `IEnumerable` 預設是**延遲執行**的，查詢在被列舉 (`foreach`、`.ToList()`、`.Count()`) 時才真正送出 SQL。

### 錯誤範例

```csharp
public class OrderService
{
    private readonly IServiceProvider _provider;

    public async Task<IEnumerable<Order>> GetActiveOrdersAsync()
    {
        using var scope = _provider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // 回傳 IQueryable — 查詢還沒執行
        return context.Orders.Where(o => o.IsActive);
    }
}

// Controller
var orders = await _service.GetActiveOrdersAsync();
foreach (var order in orders) // 💥 此時才列舉，但 scope 已 Dispose
{
    Console.WriteLine(order.Name);
}
```

### 正確做法

使用 `.ToListAsync()` 在 scope 存活期間完成查詢：

```csharp
public async Task<List<Order>> GetActiveOrdersAsync()
{
    using var scope = _provider.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    return await context.Orders
        .Where(o => o.IsActive)
        .ToListAsync(); // 立即執行並具現化
}
```

> **原則**：任何回傳查詢結果的方法，都應在 context 存活範圍內呼叫 `.ToList()` / `.ToListAsync()`。

---

## 成因三：Fire-and-Forget 異步呼叫

在 ASP.NET Core 中，`DbContext` 預設註冊為 **Scoped**，其生命週期綁定在 HTTP Request 上。當你把工作丟到背景執行，Request 結束時 context 就被釋放了。

### 錯誤範例

```csharp
[HttpPost]
public IActionResult PlaceOrder(OrderDto dto)
{
    // 不等待，直接回傳 — fire-and-forget
    _ = ProcessOrderAsync(dto);
    return Accepted();
}

private async Task ProcessOrderAsync(OrderDto dto)
{
    await Task.Delay(1000); // 模擬處理時間
    var order = new Order { Name = dto.Name };
    _context.Orders.Add(order);
    await _context.SaveChangesAsync(); // 💥 Request 已結束，context 已 Dispose
}
```

### 正確做法

使用 `IServiceScopeFactory` 建立獨立的 scope：

```csharp
[HttpPost]
public IActionResult PlaceOrder(
    OrderDto dto,
    [FromServices] IServiceScopeFactory scopeFactory)
{
    _ = Task.Run(async () =>
    {
        using var scope = scopeFactory.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await Task.Delay(1000);
        var order = new Order { Name = dto.Name };
        context.Orders.Add(order);
        await context.SaveChangesAsync(); // ✅ 使用獨立 scope 的 context
    });

    return Accepted();
}
```

> **更好的做法**：使用 Background Service (`IHostedService`) 或訊息佇列 (如 MassTransit、Hangfire) 處理背景工作。

---

## 成因四：DI 生命週期不匹配

當 **Singleton** 服務注入了 **Scoped** 的 `DbContext`，context 會在第一個 Request 結束後被釋放，但 Singleton 服務仍持有該參考。

### 錯誤範例

```csharp
// Startup.cs
services.AddDbContext<AppDbContext>(); // Scoped (預設)
services.AddSingleton<ICacheService, CacheService>(); // Singleton

// CacheService.cs
public class CacheService : ICacheService
{
    private readonly AppDbContext _context; // ❌ Singleton 持有 Scoped 實例

    public CacheService(AppDbContext context)
    {
        _context = context; // 第一個 Request 結束後，此 context 就被 Dispose
    }

    public async Task<List<Product>> GetProductsAsync()
    {
        return await _context.Products.ToListAsync(); // 💥 第二個 Request 時爆炸
    }
}
```

### 正確做法

**方法一**：改用 `IDbContextFactory`（推薦）

```csharp
services.AddDbContextFactory<AppDbContext>();
services.AddSingleton<ICacheService, CacheService>();

public class CacheService : ICacheService
{
    private readonly IDbContextFactory<AppDbContext> _factory;

    public CacheService(IDbContextFactory<AppDbContext> factory)
    {
        _factory = factory;
    }

    public async Task<List<Product>> GetProductsAsync()
    {
        using var context = await _factory.CreateDbContextAsync();
        return await context.Products.ToListAsync(); // ✅ 每次建立新的 context
    }
}
```

**方法二**：改用 `IServiceScopeFactory`

```csharp
public class CacheService : ICacheService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public CacheService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task<List<Product>> GetProductsAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        return await context.Products.ToListAsync();
    }
}
```

> **提示**：ASP.NET Core 在開發環境下會對 Singleton 注入 Scoped 服務拋出 `InvalidOperationException`（需啟用 `ValidateScopes`），但這個驗證在 Production 預設是關閉的。

---

## 成因五：Lazy Loading 觸發

當你在 context 生命週期外存取導覽屬性 (Navigation Property)，而 Lazy Loading 試圖透過已釋放的 context 載入資料。

### 錯誤範例

```csharp
public async Task<Order> GetOrderAsync(int id)
{
    using var context = new AppDbContext();
    return await context.Orders.FirstOrDefaultAsync(o => o.Id == id);
    // Order.Customer 尚未載入
}

// 呼叫端
var order = await GetOrderAsync(1);
var customerName = order.Customer.Name; // 💥 Lazy Loading 嘗試透過已釋放的 context 載入
```

### 正確做法

使用 **Eager Loading** 明確載入所需的關聯資料：

```csharp
public async Task<Order> GetOrderAsync(int id)
{
    using var context = new AppDbContext();
    return await context.Orders
        .Include(o => o.Customer) // Eager Loading
        .FirstOrDefaultAsync(o => o.Id == id);
}
```

或使用 **Projection** 直接投影成 DTO：

```csharp
public async Task<OrderDto> GetOrderAsync(int id)
{
    using var context = new AppDbContext();
    return await context.Orders
        .Where(o => o.Id == id)
        .Select(o => new OrderDto
        {
            Id = o.Id,
            CustomerName = o.Customer.Name // 在查詢中解析
        })
        .FirstOrDefaultAsync();
}
```

---

## 成因六：手動 Dispose 後繼續使用

在某些場景下，開發者可能手動呼叫 `Dispose()` 或在多執行緒環境中意外釋放 context。

### 錯誤範例

```csharp
public class OrderRepository
{
    private AppDbContext _context;

    public async Task<List<Order>> GetAllAsync()
    {
        return await _context.Orders.ToListAsync();
    }

    public void Cleanup()
    {
        _context.Dispose(); // 手動 Dispose
    }
}

// 使用端
var repo = new OrderRepository();
repo.Cleanup();
var orders = await repo.GetAllAsync(); // 💥 context 已被手動釋放
```

### 多執行緒場景

```csharp
// ❌ DbContext 不是 thread-safe 的
var tasks = orderIds.Select(id =>
    Task.Run(() => _context.Orders.FindAsync(id)) // 多執行緒共用同一個 context
);
await Task.WhenAll(tasks); // 💥 可能產生 Disposed 或 Concurrency 例外
```

### 正確做法

```csharp
// ✅ 每個 Task 使用獨立的 context
var tasks = orderIds.Select(async id =>
{
    using var context = await _factory.CreateDbContextAsync();
    return await context.Orders.FindAsync(id);
});
var results = await Task.WhenAll(tasks);
```

---

## 除錯技巧

### 1. 啟用 DI Scope 驗證

在 `Program.cs` 中啟用，讓 Singleton 注入 Scoped 的問題在啟動時就被偵測到：

```csharp
builder.Host.UseDefaultServiceProvider(options =>
{
    options.ValidateScopes = true;   // 驗證 Scope
    options.ValidateOnBuild = true;  // 建置時驗證
});
```

### 2. 檢查 DbContext 的生命週期

```csharp
// 在可疑的地方加入檢查
if (_context is IDisposable disposable)
{
    try
    {
        _ = _context.Database.ProviderName; // 測試 context 是否還活著
    }
    catch (ObjectDisposedException)
    {
        // 在這裡設中斷點，檢查 call stack
        throw;
    }
}
```

### 3. 追蹤 DbContext 建立與釋放

```csharp
services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(connectionString);
    options.LogTo(Console.WriteLine, LogLevel.Debug); // 記錄所有 EF Core 日誌
    options.EnableDetailedErrors();
    options.EnableSensitiveDataLogging(); // 開發環境使用
});
```

---

## 總結

| 成因 | 解法 |
|------|------|
| `using` 區塊外存取 | 在 scope 內 `.ToList()` 具現化 |
| 延遲執行 | 避免回傳 `IQueryable`，改回傳具現化集合 |
| Fire-and-Forget | 用 `IServiceScopeFactory` 建立獨立 scope |
| DI 生命週期不匹配 | 用 `IDbContextFactory` 或調整服務生命週期 |
| Lazy Loading | 使用 `Include()` 或 Projection |
| 手動 Dispose / 多執行緒 | 每個操作使用獨立的 context |

**核心原則**：`DbContext` 是短命的——在需要時建立，用完即釋放。確保所有資料庫操作都在 context 存活期間完成，不要讓 context 的參考逃逸到它的生命週期之外。
