---
title: "[IT] C# Depth Ch.2 C# 2"
date: 2023-01-20T10:10:46+08:00
tags: ["C#", "IT"]
draft: false
Categories: IT
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
cover:
    image: "/images/cover.jpg"
    alt: "Oh! You closed up the window, so you cannot see raining"
    relative: false
    hidden: false
---
# C# 2
## 一、泛型
+ 使用泛型(generic type)可以在編寫在編譯時類型安全的通用程式碼，無須事先知道要使用的具體類型。
*示例1: array類型: 大小需預先設定，若要添加需要重新分配*
```Csharp
public static void Main(string[] args)
{
    PrintNames(GenerateNames());
}
public static void PrintNames(string[] names)
{
    foreach (string name in names)
    {
        Console.WriteLine(name);
    }
}
public static string[] GenerateNames()
{
    string[] names = new string[4];
    names[0] = "Mike";
    names[1] = "Rain";
    names[2] = "Jessica";
    names[3] = "Billy";

    return names;
}
```
*示例2: ArrayList類型: ArrayList.Add是Object的方法，但如果塞入不適合的參數類型，可能會引發InvalidCastException*
```Csharp
public static void Main(string[] args)
{
    PrintNames(GenerateNames());
}
public static void PrintNames(ArrayList names)
{
    foreach (object name in names)
    {
        Console.WriteLine(name);
    }
}
public static ArrayList GenerateNames()
{
    ArrayList names = new ArrayList();
    names.Add("Mike");
    names.Add("Rain");
    names.Add("Jessica");
    names.Add("Billy");

    return names;
}
```
*示例3: StringCollection專用類型: 解決前述兩個問題，但也限制了返回值。*
```Csharp
public static void Main(string[] args)
{
    PrintNames(GenerateNames());
}
public static void PrintNames(StringCollection names)
{
    foreach (string name in names)
    {
        Console.WriteLine(name);
    }
}
public static StringCollection GenerateNames()
{
    StringCollection names = new StringCollection();
    names.Add("Mike");
    names.Add("Rain");
    names.Add("Jessica");
    names.Add("Billy");

    return names;
}
```
*示例4: List<T>泛型*
```Csharp
public static void Main(string[] args)
{
    PrintNames(GenerateNames());
}
public static void PrintNames(List<string> names)
{
    foreach (string name in names)
    {
        Console.WriteLine(name);
    }
}
public static List<string> GenerateNames()
{
    var names = new List<string>
    {
        "Mike",
        "Rain",
        "Jessica",
        "Billy"
    };
    return names;
}
```
+ 泛型可以解決：
    + 與 `Array` 不同，不需在創建前先知道集合的大小。
    + 與 `ArrayList` 不同，在對外提供的 API 中，一切表示元素類型之處皆用 `T` 來代指。如果向集合添加了錯的元素，在編譯即會報錯。
    + 與 `StringCollection` 不同，`List<T>` 可兼容所有類型，省去了實現其它類型的程式碼與處理返回值等的問題。
### 1. 形參與實參 Parameter and Argument
+ 宣告函數時用於描述函數輸入類別的參數稱為形參(parameter)。
+ 函數調用時實際傳遞給函數的參數稱為實參(argument)。
+ 泛型及兩個參數概念：**類型形參(Type parameter)**和**類型實參(type argument)**，相當於把形參和實參的思想套用在表示類型訊息上。
```Csharp
// Type parameter
public class List<T> ... { }
// Type argument
List<string> list = new List<string>();
```
+ 同樣，當宣告有繼承母類別或是介面時，泛型形參也可以作為母類別或介面的泛型實參。
```Csharp
public class List<T> : IEnumerable<T>
```
### 2. 泛型類型與泛型方法的度(arity)
+ 泛型類型或泛型方法可以宣告多個類型形參。
```Csharp
public class Dictionary<TKey, TValue>
```
+ 泛型度(arity)是泛型宣告中類型形參的數量，非泛型的宣告可視為泛型度為 0。
+ 泛型度不同的同名接口，就屬於不同的類型。如`IEnumerable<T>` 與 `IEnumerable`，但不能僅透過類型形參名稱重載方法。
+ 也不能出現重複的類型形參名稱；但同名類型實參是許可的。
```Csharp
public void Method() {}         // arity = 0
public void Method<T>()) {}     // arity = 1
public void Method<T1,T2>() {}  // arity = 2
public void Method<Tone, Ttwo>() {} // 編譯錯誤, 不能僅透過類型形參名稱重載方法
public void Method<T,T,T>(){}     // 編譯錯誤, 重複的類型形參名稱

var dict = new Dictoinary<string,string>(); // 同名類型實參是允許的
```
### 3. 泛型的適用範圍
+ `enum` 不能宣告為泛型
+ `class`, `struct`, `interface`, `delegate` 都可以被宣告成泛型類型。
    + 但 class member 中，有些看似是泛型其實不然，原則是：判斷一個宣告是否為泛型宣告取決於它是否引入新的類型形參。  
    ```Csharp
    public class ValidatingList<TItem>
    {
        // 實際上 TItem 用作 List<T> 的類型實參，TItem 由 Validating 的宣告來引入類型形參。
        private readonly List<TItem> items = new LIst<TItem>();
    }
    ```
### 4. 方法類型實參的類型推斷
+ 方法類型在以下情境時，可以省略類型實參，編譯器可以自動推斷實際的類型：
```Csharp
public static List<T> CopyList<T>(List<T> input) { ... }

public static void Main()
{
    List<int> nums = new List<int>{ 1,2,3,5,8,13 };
    List<int> copyList1 = CopyList<int>(nums);
    List<int> copyList2 = CopyList(nums);       // 省略類型實參
}
```
+ 利用方法類型實參的自動推斷，我們可以靜用靜態方法重載建構式，以簡化建構式。
```Csharp
public static void Main()
{
    var tuple1 = new Tuple<int,int>(3,7);
    var tuple2 = CreateTuple(4,2);
}   

public static Tuple<T1,T2> CreateTuple<T1,T2>(T1 x, T2 y) 
{
    return new Tuple<T1,T2>(x, y);
}
```

### 5. 類型約束
### 6. default 與 typeof
### 7. 泛型類型初始化與狀態
## 二、可空值類型
## 三、委托
## 四、迭代器
## 五、其它的小特性