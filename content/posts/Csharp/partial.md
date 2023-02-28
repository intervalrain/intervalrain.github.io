---
title: "[C#] Partial Type 局部類型"
keywords: ["C#", "paitial type", "partial class", "局部方法", "局部類別"]
description: "Introduction to partial class ans partial method in C#"
date: 2023-02-28T15:11:11+08:00
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

## 1. 用法
+ `partial` 關鍵字可用於 `class`、`interface`、`struct`，可將之拆開於不同的檔案撰寫。
+ 可以方便不同的工程師在不同的檔案中共同開發同一個 `class`、`interface`、`struct`。
```Cs
public partial class Util
{
    public static IEnumerable<int> GetFibonacci() { ... }
}

public partial class Util
{
    public static IEnumerable<int> GetPrime() { ... }
}
```
## 2. Partial Method 局部方法 
+ 可以在一個局部類別中只宣告方法，在另一個局部類別中可選擇實作或不實作，若不實作，編譯器會直接省略這個宣告而不編譯。
+ 局部方法預設是 `private` 的
+ 局部方法的返回值必須是 `void` 且不能使用 `out` 參數，但可以使用 `ref` 參數。
```Cs
partial class Demo
{
    public Demo()
    {
        OnConstruction();                               // 調用未實現的局部方法
    }
    public override string ToString()
    {
        string ret = "Original return value";
        CustomizeToString(ref ret);
        return ret;
    }
    partial void OnConstruction();                      // 宣告局部方法
    partial void CustomizeToString(ref string text);    // 宣告局部方法
}

partial class Demo
{
    partial void CustomizeToString(ref string text)     // 實作局部方法
    {
        text += " - Customized!";
    }
    
    public static void Main(string[] args)
    {
        Demo d = new Demo();
        Console.WriteLine(d.ToString());
    }
}
```
+ 注意到上例宣告了兩個局部方法 `OnStruction()` 與 `CustomizeToString(ref string text)`，但由於前者並沒有被實作，故編譯器會直接將它移除。
+ 利用上面的這個性質，我們可以搭配使用 IDE 的 auto generation 來生成 partial 類別的部分，這樣可以便於管理與組織檔案。