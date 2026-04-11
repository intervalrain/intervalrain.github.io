---
title: "[C#] Property getter/setter access separate 訪問權限分離"
author: "Rain Hu"
pubDatetime: 2023-02-28T22:18:25+08:00
description: "Separate getter/setter property access in C#"
tags: ["csharp", "c"]
---

## 1. getter/setter 的訪問權限分離
+ 在 C#1 中，getter 跟 setter 共用一個 access modifier，意思是 getter 與 setter 擁有同樣的訪問權限，這個顯然是不合理的。
```csharp
private string text;
public string Text
{
    get { return text; }
    set { text = value; }
}
```
+ 更常見的情境應該是 setter 的訪問權限比 getter 的訪問權限更小，這在 C#2 中可以透過下面例子的方式來達到：
```csharp
private string text;
public string Text
{
    get { return text; }
    private set { text = value; }
}
```