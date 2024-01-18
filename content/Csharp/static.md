---
title: "[C#] static class 靜態類別"
keywords: ["C#", "static class", "靜態類別"]
description: "Introduction to static class in C#"
date: 2023-02-28T21:08:01+08:00
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

## 1. 介紹
+ 靜態類別指的是使用 `static` 修飾類別，可以用於裝載一個全部由**靜態方法**組成的工具類別。
+ 雖然宣告一個僅包含靜態方法的非靜態類別完成是合法的，但是加註 `static` 關鍵字可以表明該類別的用途，並且防之該類別被當作變數類型或是類型實參使用。
```Cs
public static class Util
{
    public static string getCOL(string str, char del, int col)
    {
        string[] arr = str.Split('_');
        int n = arr.Length;
        try 
        {
            return arr[col-1];
        }
        catch
        {
            string text = $"Index out of bound.\nIndex should be between 1 and {n}";
            throw new Exception(text);
        }
    }
}
```

+ 另外，擴充方法(extension method) 也只能在非嵌套、非泛型類的靜態類別中宣告。