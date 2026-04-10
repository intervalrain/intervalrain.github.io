---
title: "[IT] 用 C# 建置 Clean Architecture 專案"
author: "Rain Hu"
pubDatetime: 2024-03-09T13:59:22+08:00
description: ""
category: "IT"
tags: ["C#", "Clean Architecture"]
math: true
mermaid: true
---
# Configure C# Solution step by step
+ 開啟 Terminal
+ 新增解決方案 `dontet new sln -o MySln`
+ 移至方案目錄 `cd MySln`
+ 根據解決方案 hierarchy 建構專案
    + `dotnet new webapi -o MySln.Api`
    + `dotnet new classlib -o MySln.Application`
    + `dotnet new classlib -o MySln.Domain`
    + `dotnet new classlib -o MySln.Infrastructure`
    + `dotnet new classlib -o MySln.Contracts`
+ 將所有專案加進解決方案
    ```shell
    for proj in $(ls -r **/*.csproj)
        dotnet sln add $proj
    ```
+ 建立專案之間的 dependency
    + `dotnet add MySln.Api reference MySln.Application MySln.Infrastructure MySln.Contracts`
    + `dotnet add MySln.Infrastructure reference MySln.Application`
    + `dotnet add MySln.Application reference MySln.Domain`
    