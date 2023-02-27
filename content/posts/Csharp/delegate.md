---
title: "[C#] Delegate 委派"
keywords: ["C#", "Delegate", "委派"]
description: "Introduction to Delegate in C#"
date: 2023-02-26T19:24:56+08:00
tags: ["C#"]
draft: false
Categories: C#
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

## 1. 委派語法
+ 委派 (Delegate) 類似於 C/C++ 中的函式指針，是可存有對某個方法的引用的一種引用類型變數。
+ 宣告語法：`delegate <return type> <delegate-name> <parameter list>`
```Cs
// 宣告一個委派，裝載 void function(string)
public delegate void PrintString(string text);
public static void Main(string[] args)
{
    // 新增一個委派事件，指向 ToUpperCase
    PrintString e = new PrintString(ToUpperCase);
    string text = "Hello World!";
    e.Invoke(text);
    // HELLO WORLD!

    // 將另一個事件加到委派中，指向 ToLowerCase   
    e += ToLowerCase;
    e.Invoke(text);
    // HELLO WORLD!
    // hello world!
    
    // 將委派中的 ToUpperCase 取消掉
    e -= ToUpperCase;
    e.Invoke(text);
    // hello world!
}
public static void ToUpperCase(string text) {
    Console.WriteLine(text.ToUpper());
}
public static void ToLowerCase(string text) => Console.WriteLine(text.ToLower());
```

## 2. 簡化事件註冊
+ 假設想為一個按鍵註冊事件：
```Cs
// 定義 EventHandler 為可以接收物件與傳參的委派
public delegate void EventHandler(object sender, EventArgs e);

// 定義傳參可以儲存的內容
public class HandleClickEventArgs : EventArgs
{
    public string Message;
}
// 創建一個按鍵並為其創建一個可以註冊事件的委派
public class Button
{
    public string name;
    public Button(string _name)
    {
        name = _name;
    }
    // 在物件內部定義一個委派存放事件
    private event EventHandler Click;
    public notify()
    {
        // 執行委派
        // Handler.Invoke(this, e);
        Handler(this, e);
    }
}
// 註冊事件的傳參需與委派的傳參一致
private static void Click(object sender, EventArgs e)
{
    Console.WriteLine(
        sender.GetType() + " " + 
        (e as HandleClickEventArgs)?.Message
    );
}
public void static Main(string[] args)
{
    EventArgs = new HandleClikEventArgs()
    {
        Message = "is clicked!"
    };
        Button button = new Button("TV Remote Button");
        button.Click += new EventHandler(Click);
        button.Click += Click;
        button.Click += delegate
        {
            Console.WriteLine("Check! Check!");
        };
        button.Click += (sender, e) => Console.WriteLine(
            (sender as Button)?.name + " " +
            (e as HandleClickEventArgs)?.Message
        );
        button.notify(e);
    // Button is clicked!
    // Button is clicked!
    // Check! Check!
    // TV Remote Button is clicked!
}
```
+ 注意到 `Button` 內有一個委派被定義為 `delegate void function(object sender, EventArgs e)`，並被命名為 `Click`，故我們會向它註冊事件。
    + 在 C#1 中，完整的寫法是：
        + `button.Click += new EventHandler(Click);`
    + 在 C#2，透過 Method group conversion 可將其簡化成(條件是兩者的傳參要相同)：
        + `button.Click += Click;`
    + 如果方法較簡單也可以透過匿名方法(anonymous method)註冊：
        + 需要傳參時：
            + `button.Click += delegate(object sender, EventArgs e) { Console.WriteLine("Click!"); };`
        + 不需要傳參時：
            + `button.Click += delegate { Console.WriteLine("Click!"); };`
    + 在 C#3 中，可以透過 Lambda 表達式來創建。
        + `button.Click += (sender, e) => Console.WriteLine("Click!");`
