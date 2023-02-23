---
title: "[C#] Nullable 可空值類型"
keywords: ["C#", "Nullable", "可空值"]
description:
date: 2023-02-23T21:40:03+08:00
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
## 1. 簡寫
+ 以後綴 `?` 之前接在類型名稱後面，也就是 `T?` 可以視同為 `Nullable<T>`
+ 舉例來說，下列四個變數類型名稱完全等價：
    + `Nullable<int>`
    + `Nullable<int32>`
    + `int?`
    + `int32`
## 2. 定義
+ Nullable 的核心程式碼為:
```Cs
public struct Nullable<T> where struct  // 類型約束為非空值類型
{
    private readonly T value;
    private readonly bool hasValue;

    public Nullable(T value)
    {
        this.value = value;
        this.hasValue = true;
    }
    public bool HasValue { get { return hasValue; } }
    public T Value
    {
        get
        {
            if (!hasValue)
            {
                threw new InvalidOperationException();
            }
            return value;
        }
    }
}
```
+ 由於 Nullable 的空值定義為 `hasValue == false`, 故以下兩者為等價
    + `int? x = new int?();`
    + `int? x = null;`
## 3. 轉換
+ 允許 T 到 Nullable<T> 的隱式轉換
```Cs
int x = 5;
int? y = x;
```
+ 允許 Nullable<T> 到 T 的顯式轉換
```Cs
int? x = 5;
int y = (int)x;
```
+ 通過填充 null 值擴展已有功能的過程稱為 **提升 lifting**。
+ C# 允許對非可空類型 `T` 做運算子重載，但 `Nullable<T>` 同時也會重載相同的運算子，稱為 **提升運算子 lifting operator**。
    + 可重載的運算子包含：
        + 一元運算子： `+`, `++`, `-`, `--`, `!`, `~`, `true`, `false`
        + 二元運算子： `+`, `-`, `*`, `/`, `%`, `&`, `|`, `^`, `>>`, `<<`
        + 等價運算子： `==`, `!=`
        + 關係運算子： `<`, `>`, `<=`, `>=`
    + 提升運算子的規則：
        + `true` 和 `false` 運算子不能被提升。
        + `T` 必須是**非可空值**，其運算子才能被提升。
        + 對於等價運算子和關係運算子，原運算子的返回類型必須是 `bool` 類型
        + 對於 `Nullable<bool>` 的 `&` 與 `|` 運算子有單獨定義
    + 提升運算子範例：
    ```Cs
    int? nullInt = null;
    int? five = 5;
    int? four = 4;

    Console.WriteLine(-nullInt);            // null
    Console.WriteLine(-five);               // -5
    Console.WriteLine(five + nullInt);      // null
    Console.WriteLine(five + four);         // 4
    Console.WriteLine(four & nullInt);      // null
    Console.WriteLine(four & five);         // 4
    Console.WriteLine(nullInt == nullInt);  // true
    Console.WriteLine(five == five);        // true
    Console.WriteLine(five == nullInt);     // false
    Console.WriteLine(five == four);        // false
    Console.WriteLine(four < five);         // true
    Console.WriteLine(nullInt < five);      // false
    Console.WriteLine(four < nullInt);      // false
    Console.WriteLine(nullInt < nullInt);   // false
    Console.WriteLine(nullInt <= nullInt);  // false
    ```

    + 可空值邏輯真值表：
    |x|y|x&y|x\|y|x^y|!x|
    |---|---|---|---|---|---|
    |true|true|true|true|false|false|
    |true|false|false|true|true|false|
    |true|null|null|**true**|null|false|
    |false|true|false|true|true|true|
    |false|false|false|false|false|true|
    |false|null|**false**|null|null|true|
    |null|true|null|**true**|null|null|
    |null|false|**false**|null|null|null|
    |null|null|null|null|null|null|


+ 注意 C# 2中，比較操作的結果不能為 null
+ 在 SQL 中，比較中的兩者中若有一者為 null 則結果不能預期

## 4. as 運算子
+ 在 C# 2，`as` 除了可用於物件，也可用於可空值類型。
+ 當原始引用的類型不匹配，或為 null 時，返回 null 值：
```Cs
public static void Main()
{
    object[] obj = new object[]{
        null,
        "3",
        '3',
        3,
        5.5
    };
    foreach (var o in obj) print(o);
}
public static void print(object o)
{
    int? num = o as int?;
    Console.WriteLine(num.HasValue ? num : "something");
}
// something
// something
// something
// 3
// something
```

## 5. ?? 運算子
+ 當 `??` 前非 null 時依原本的值代入，若為 `null` 則以 `??` 後的值代入。
```Cs
int a = 5;
int? b = 10;
int? c = null;

Console.WriteLine("a + b = {0}", a + (b ?? 0));     // 15
Console.WriteLine("a + b = {0}", a + (c ?? 0));     // 5
```

## 6. ?. 運算子
+ 當 `?.` 前為非 null 時，繼續往下做，可連續
```Cs
List<int> a = null;
List<int> b = default;
List<int> c = new List<int>{ 1,3,5,7,9 };

Console.WriteLine(a?.Count);    //
Console.WriteLine(b?.Count);    //
Console.WriteLine(c?.Count);    // 5
```