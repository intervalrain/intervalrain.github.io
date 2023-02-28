---
title: "[C#] Namespace Alias 命名空間別名"
keywords: ["C#", "namespace alias", "命名空間別名"]
description: "Namespace alias in C#"
date: 2023-02-28T22:51:08+08:00
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

## 1. 命名空間別名
+ 命名空間(namespace)的作用是允許在不同的命名空間下定義多個同名 class。
+ 使用命名空間別名(namespace alias)可以避免為了保證命名唯一而使用命名空間而導致的命名過度冗長。
```Cs
using System;
using WinForms = System.Windows.Forms;
using WebForms = System.Web.UI.WebControls;

class Program
{
    public static void Main()
    {
        Console.WriteLine(typeof(WinForms.Button));
        Console.WriteLine(typeof(WebForms.Button));
    }
}
```

## 2. 命名空間別名限定字符
+ 上例的程式碼存在一個潛在的問題，如果程式中同時引用了一個同名類別，如 `class WinForms`，那麼 `WinForms.Button` 就會被判斷成該類別的 `Button` 成員。
+ 為了避免上面的情形發生，在 C#2 引入了命名空間別名限定字符(`::`)，使用 `::` 代表前面接的一定是命名空間。
```Cs
public static void Main()
{
    Console.WriteLine(typeof(WinForms::Button));
    Console.WriteLine(typeof(WebForms::Button));
}
```

## 3. 全局命名空間別名
+ C#2 引入的全局命名空間別名，可以指示全局命名空間中的類別，也可以用於類別完全限定名的一個「根」命名空間。
```Cs
global using global::System.DateTime;
```

## 4. 外部別名
+ 假設有不同的程式提供了相同的命名空間，而命名空間又有相同的 class 名稱，則需要外部別名(extern)來處理。
```Cs
extern alias JsonNet;
extern alias JsonNetAlternative;

using JsonNet::Newtonsoft.Json.Linq;
using AltJObject = JsonNetAlternative::Newtonsoft.Json.Linq.JObject;

JObject obj = new JObject();       
AltJObject alt = new AltJObject(); 
```