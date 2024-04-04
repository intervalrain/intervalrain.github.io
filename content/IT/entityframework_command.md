---
title: "[IT] EntityFramework Commands"
keywords: ["IT", "C#"]
description: "Some commands to trigger migration operations"
date: 2024-03-31T14:37:44+08:00
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

## 前置作業
+ 需安裝以下 Packages 
    + `Microsoft.EntityFrameworkCore`
    + `Microsoft.entityFrameworkCore.Design`
    + `Microsoft.EntityFrameworkCore.Tools`

+ 設置好 `[]DbContext`
    + 範例
    ```csharp
    public class AppDbContext : DbContext
    {
        public DbSet<Reminder> Reminders { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        public AppDbContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql("Host=localhost;Port=5432;Username=********;Password=********;Database=testdb");
        }
    }
    ```
{{< notice tip >}}
若是實作的 DbContext 沒有合適的建構子，是無法進行 migration 的。

如果 DbContext 採用依賴注入的方式，且程式的 entry 又不在同一個專案底下，則需要覆寫 **OnConfiguring()** 來提供 Database 的連線資訊。
{{< /notice >}}

+ 建構好對應的 Entity，需包含至少一個帶有 Id 的 property。
    + 由於我們要進行持久化(persistance)的物件通常是聚合根(aggregate root)，可透過繼承以下的[抽象物件 Entity](./#%E6%8A%BD%E8%B1%A1%E7%89%A9%E4%BB%B6-entity-%E5%AF%A6%E4%BD%9C)來統一 Id property。
    + 又聚合根通常又會作為 DomainEvent 的發起者，透過 EventBus 來進行推播。可參考 [EventBus Middleware 的實作](./#eventbus-middleware-%E7%9A%84%E5%AF%A6%E4%BD%9C%E7%94%A8%E4%BE%86%E5%B0%87%E8%81%9A%E5%90%88%E6%A0%B9%E7%9A%84-domainevents-%E9%80%B2%E8%A1%8C%E6%8E%A8%E6%92%AD)。
    

## migration 指令
### 進行 Migration 初始化
+ 以下指令會產生將 DbContext 遷移至 Database 的 migration codes。
+ `-p` 或是 `-project` 用以指定專案。
```zsh
dotnet ef migrations add InitialMigration -p src/CleanWebApi.Infrastructure
```

+ `--startup-project` 可以指定入口專案，可適用於將 connectionString 以 DependencyInjection 的方式注入於入口專案的情形。
```zsh
dotnet ef migrations add InitialCreate --startup-project src/CleanWebApi.Api --project src/CleanWebApi.Infrastructure
```

### 查詢 Migrations 清單
+ 以下指令可以查詢該專案中有哪些 migration。
```zsh
dotnet ef migrations list  -p src/CleanWebApi.Infrastructure
```

### 執行 Migration
+ 以下指令會執行 Migration，實際在 Database 產生對應的 tables。 
```zsh
dotnet ef database update InitialMigration -p src/CleanWebApi.Infrastructure
```

### 移除 Migration
+ 在 Database 已進行 Migration 的情況下無法執行，必要時需要先將 Database 清除。
```zsh
dotnet ef migrations remove -p src/CleanWebApi.Infrastructure
```

### 清除 Database
```zsh
dotnet ef database update 0 -p src/CleanWebApi.Infrastructure
```
{{< notice warning >}}
此指令會刪除 Database，若有重要資料，需先做好備份。
{{< /notice >}}


## 補充
### 抽象物件 Entity 實作
+ INotification 來自於 `MediatR` package，透過 Event-EventHandler 的方式來進行方法之間的解耦(decouple)。
```csharp
public interface IDomainEvent : INotification { }

public abstract class Entity
{
    public Guid Id { get; private init; }

    protected readonly List<IDomainEvent> _domainEvents = new();

    public Entity(Guid id)
    {
        Id = id;
    }

    public List<IDomainEvent> PopDomainEvents()
    {
        var copy = _domainEvents.ToList();
        _domainEvents.Clear();

        return copy;
    }

    protected Entity() { }
}
```

### EventBus Middleware 的實作，用來將聚合根的 DomainEvents 進行推播。

```csharp
public class EventualConsistencyMiddleware
{
    public const string DomainEventsKey = "DomainEventsKey";

    private readonly RequestDelegate _next; 

    public EventualConsistencyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IPublisher publisher, AppDbContext dbContext)
    {
        var transaction = await dbContext.Database.BeginTransactionAsync();
        context.Response.OnCompleted(async () =>
        {
            try
            {
                if (context.Items.TryGetValue(DomainEventsKey, out var value) && value is Queue<IDomainEvent> domainEvents)
                {
                    while (domainEvents.TryDequeue(out var @event))
                    {
                        await publisher.Publish(@event);
                    }
                }

                await transaction.CommitAsync();
            }
            catch (Exception)
            {
            }
            finally
            {
                await transaction.DisposeAsync();
            }
        });

        await _next(context);
    }
}
```