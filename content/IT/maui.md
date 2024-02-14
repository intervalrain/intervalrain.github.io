---
title: "[IT] .NET Maui"
keywords: ["IT", "C#", ".net", "maui"]
description: 
date: 2024-01-28T13:30:34+08:00
tags: ["IT", "C#", ".net", "maui"]
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

# .NET Maui
+ .NET Maui 是一個跨平台的桌面與手機應用開發框架，它支援 iOS、Android、macOS、Windows。
+ 不同於 Xamarin，.NET Maui 只需要一個專案便可以導向不同的平台。
{{< img "/IT/img/maui.jpg" 300 >}}
---
## 架構
{{< img "/IT/img/maui_hierarchy.jpg" 300 >}}
+ 一個 .NET Maui 專案底下，預設會有幾個資料夾與檔案，其關係如下圖：
    + `/Platforms` 底下的各個資料夾為不同平台的入口，不同的平台各有一個 `Program.cs`。
    + 各個 `Program.cs` 內又會透過注入該 namespace 底下的 `AppDelegate` ，將入口指向 `MauiProgram` 的 `CreateMauiApp()`，就此將不同平台路由到 `MauiProgram.cs` 這個統一的入口。
```Csharp
public class Program
{
    static void Main(string[] args)
    {
        UIApplication.Main(args, null, typeof(AppDelegate));
    }
}

[Register("AppDelegate")]
public class AppDelegate : MauiUIApplicationDelegate
{
    protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
}
```
+ 關係如下圖：
{{<mermaid>}}
graph TD;
  iOS-->MauiProgram.cs;
  Android-->MauiProgram.cs;
  Windows-->MauiProgram.cs;
  macOS-->MauiProgram.cs;
  MauiProgram.cs-->App;
  App-->AppShell;
  AppShell-.->Page1;
  AppShell-.->Page2;
  AppShell-.->Page3;
  AppShell-.->Page4;
{{</mermaid>}}

```Csharp
public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
            });
        return builder.Build();
    }
}
public partial class App : Application
{
    public App()
    {
        InitializeComponent();
        MainPage = new AppShell();
    }
}
```
+ 從上面兩段程式 `MauiProgram.cs` 與 `App.xaml.cs` 可以看出，這個統一的進入點會開啟 App，並將 `AppShell` 作為 MainPage 開放。

---
## Router
+ 在此可以發現 `AppShell` 作為一個 Controller 的功能，用來引導頁面的路由。
+ 我們可以透過 `RegisterRoute` 來注冊要顯示的頁面。
```Csharp
public partial class AppShell : Shell
{
    public AppShell()
    {
        InitializeComponent();

        Routing.RegisterRoute(nameof(Page1), typeof(Page1));
        Routing.RegisterRoute(nameof(Page2), typeof(Page2));
        Routing.RegisterRoute(nameof(Page3), typeof(Page3));
    }
}
```

---
## xaml
+ 上述的頁面可以透過新增 `xaml` 檔來建立：
+ 以下為一個 `xaml` 檔的 sample
    + `x:class="MoneyTrack.AppShell"` 表示該檔案的路徑為 `MoneyTrack.AppShell`
    + `mlns` 關鍵字很像是 `using`：
        + `xmlns:views="clr-namespace:MoneyTrack.Views"`: 代表將 `MoneyTrack.Views` 這個路徑命名成 `views`。
    + ShellContent 內代表是首頁要導引至的頁面，如下例會導向 `view:MoneyTackPage`
```html
<?xml version="1.0" encoding="UTF-8" ?>
<Shell
    x:Class="MoneyTrack.AppShell"
    xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    xmlns:local="clr-namespace:MoneyTrack"
    xmlns:views="clr-namespace:MoneyTrack.Views"
    Shell.FlyoutBehavior="Disabled"
    Title="MoneyTrack">

    <ShellContent
        Title="Home"
        ContentTemplate="{DataTemplate views:MoneyTackPage}"
        Route="MoneyTackPage" />

</Shell>


```
```html
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MoneyTrack.Views.ContactsPage"
             Title="Contacts">
    <VerticalStackLayout Spacing="5">
        <Label 
            Text="Welcome to .NET MAUI!"
            VerticalOptions="Center" 
            HorizontalOptions="Center" />
        <Button x:Name="btn1" Clicked="btn1_Clicked" Text="click1"></Button>
        <Button x:Name="btn2" Clicked="btn2_Clicked" Text="click2"></Button>
    </VerticalStackLayout>
</ContentPage>

```
## Shell
+ 接著我們可以透過 `Shell` 來控制面版上要顯示的頁面：
```Csharp
public void btnPage1_Clicked()
{
    Shell.Current.GoToAsync(nameof(Page1));
}
```

## GoToAsync
+ Shell 本身是一個 View，也是一個 Layout
+ `GoToAsync` 可以用來切換頁面
```Csharp
void btnPage1_Clicked(object sender, EvertArgs e)
{
    Shell.Current.GoToAsync($"{nameof(Page1)}");  // 前往 Page1
}

void btnCancel_Clicked(object sender, EvertArgs e)
{
    Shell.Current.GoToAsync($"//{nameof(MainPage)}");  // 回到 MainPage
}

void btnCancel_Clicked(object sender, EvertArgs e)
{
    Shell.Current.GoToAsync($"..");  // 回到上一頁
}
```

## QueryProperty
+ 透過 `QueryPropertyAttribute` 可以達到如 http method 裡的 get 的方法。
+ 以下範例等同於實現 `page1?Id=1`，在路由到 page1 的同時，將 property: Id 賦值。
```Csharp
[QueryProperty(nameof(PageId), "Id")]
public partial class Page1 : ContentPage
{
	public EditContactPage()
	{
		InitializeComponent();
	}
    public string ContactId
    {
        set
        {
            lblName.Text = Id;
        }
    }
}

```