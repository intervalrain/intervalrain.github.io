---
title: "[C#] 打包 nuget"
date: 2025-04-08T16:17:30+08:00
tags: ["C#"]
draft: false
Categories: programming
description: "將專案打包成 nuget"
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

# NuGet 打包與引用指南

## 概述

本文檔詳細說明了如何創建 NuGet 包並將其添加到專案中的步驟流程。NuGet 是 .NET 生態系統中的包管理器，可以簡化函式庫的分發和引用過程。

## 打包 .NET 專案為 NuGet 包

### 生成 NuGet 包 (.nupkg)

要將您的 .NET 專案打包成 NuGet 包，請在專案根目錄中執行以下命令：

```bash
dotnet pack -c Release
```

這個命令會編譯專案並創建發佈配置的 NuGet 包。生成的 `.nupkg` 檔案通常位於 `bin/Release` 目錄中。

參數說明：
- `-c Release`：以 Release 配置模式進行打包，這會優化程式碼並移除除錯資訊

### 查找生成的 NuGet 包

打包完成後，可以使用以下命令查找所有生成的 `.nupkg` 檔案：

```bash
ls **/*.nupkg
```

這個命令會遞迴地搜索當前目錄及其子目錄中的所有 `.nupkg` 檔案並列出它們。

## 使用本地 NuGet 包

### 複製 NuGet 包到本地倉庫

要將生成的 NuGet 包複製到本地 NuGet 倉庫中，可以使用以下命令：

```bash
cp **/*.nupkg /Users/rainhu/advantech/mynuget/
```

這會將所有找到的 `.nupkg` 檔案複製到指定的本地目錄 `/Users/rainhu/advantech/mynuget/`。

### 配置本地 NuGet 來源

要使用本地 NuGet 包，您需要將本地目錄添加為 NuGet 來源。在您的專案中，可以通過以下方式配置：

1. 創建或編輯 `nuget.config` 檔案：

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="NuGet" value="https://api.nuget.org/v3/index.json" />
    <add key="LocalSource" value="/Users/rainhu/advantech/mynuget" />
  </packageSources>
</configuration>
```

2. 或使用命令列添加來源：

```bash
dotnet nuget add source /Users/rainhu/advantech/mynuget -n LocalSource
```

## 引用 NuGet 包

### 添加包引用

添加 NuGet 包引用到您的專案有多種方式：

#### 使用 Visual Studio：

1. 右鍵點擊專案
2. 選擇「管理 NuGet 包」
3. 在「瀏覽」標籤頁中搜索包名稱
4. 點擊「安裝」

#### 使用命令列：

```bash
dotnet add package YourPackageName
```

如果需要指定版本：

```bash
dotnet add package YourPackageName --version 1.0.0
```

如果需要從特定來源添加：

```bash
dotnet add package YourPackageName --source /Users/rainhu/advantech/mynuget
```

#### 直接編輯專案檔案 (.csproj)：

```xml
<ItemGroup>
    <PackageReference Include="YourPackageName" Version="1.0.0" />
</ItemGroup>
```

## ABP Framework 特有注意事項

當在 ABP Framework 專案中使用 NuGet 包時，請注意以下幾點：

1. 模組依賴：確保您的 NuGet 包中的 ABP 模組正確定義了依賴關係

2. 版本相容性：確保您的 NuGet 包使用的 ABP 版本與主專案相容

3. 在應用程式啟動模組中註冊模組：

```csharp
[DependsOn(
    typeof(YourPackageModule)
)]
public class YourAppModule : AbpModule
{
    // ...
}
```

## 進階打包配置

要更好地控制 NuGet 包的內容和元數據，可以在專案檔案 (.csproj) 中添加以下屬性：

```xml
<PropertyGroup>
    <PackageId>YourCompany.YourPackage</PackageId>
    <Version>1.0.0</Version>
    <Authors>Your Name</Authors>
    <Company>Your Company</Company>
    <Description>Description of your package</Description>
    <PackageTags>tag1;tag2;tag3</PackageTags>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    <PackageProjectUrl>https://github.com/yourusername/yourproject</PackageProjectUrl>
    <RepositoryUrl>https://github.com/yourusername/yourproject.git</RepositoryUrl>
    <RepositoryType>git</RepositoryType>
</PropertyGroup>
```

## 故障排除

1. **包無法找到**：確保本地 NuGet 來源路徑正確且已添加到 NuGet 配置中

2. **版本衝突**：檢查專案依賴項的版本相容性

3. **引用錯誤**：確保包被正確安裝，並且命名空間被正確引用

4. **打包失敗**：檢查專案檔案中的 NuGet 元數據是否正確

## 總結

本文檔詳細介紹了如何打包 .NET 專案為 NuGet 包，並將其添加到專案中。遵循這些步驟，您可以輕鬆地創建和分發您的函式庫，從而提高開發效率和程式碼重用性。
