---
title: "[.NET] User Secret CLI"
keywords: ["IT", "C#", "user secret"]
description: "How to set user secret using dotnet"
date: 2025-03-23T16:00:02+08:00
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
# .NET User Secrets 使用指南

## 安裝與設定
```bash
dotnet tool install --global dotnet-user-secrets
```

## 常用指令
```bash
# 初始化 user secrets (在專案資料夾中執行)
dotnet user-secrets init

# 設定 secret
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=myserver;Database=mydb;User Id=myuser;Password=mypassword;"

# 設定多層級值
dotnet user-secrets set "Logging:LogLevel:Default" "Information"

# 查看所有 secrets
dotnet user-secrets list

# 移除特定 secret
dotnet user-secrets remove "ConnectionStrings:DefaultConnection"

# 清除所有 secrets
dotnet user-secrets clear
```

## 在程式碼中使用 ConnectionString 範例
```csharp
// Program.cs 或 Startup.cs
var builder = WebApplication.CreateBuilder(args);

// 自動讀取 user secrets (開發環境)
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

// 在需要的地方使用 ConnectionString
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 範例: 註冊 DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
```
