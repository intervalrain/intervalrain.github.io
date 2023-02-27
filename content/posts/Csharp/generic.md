---
title: "[C#] Generic 泛型"
keywords: ["C#", "Generic", "泛型"]
description: "Introduction to Generic in C#"
date: 2023-02-22T21:39:56+08:00
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

## 1. 數組到泛型集合
+ 數組缺少初始化時大小的彈性
```Cs
string[] names = new string[4];     // 需指定大小
```
+ 普通對象集合缺少類型安全
```Cs
    ArrayList names = new ArrayList();
    names.AddRange(new object[]
    {
        "Rose",
        "Jack",
        new int?(5)     // 可合法進行編譯, 因為符合 object
    });
    foreach (string name in names) Console.WriteLine(name); 
    // 缺少型別檢查, 在執行隱性類型轉換(int? 轉 string)時會出錯
```
+ 專用對象集合缺少撰寫程式碼的靈活性(如無法以靜態方式寫通用方法)、且維護成本較高
```Cs
    StringCollection names = new StringCollection();
    names.AddRange(new string[]
    {
        "Rose",
        "Jack",
        "Gozilla"
    });
    static void printNames(StringCollection names) 
    {
        foreach (string name in names) Console.WriteLine(name);
    }
```
+ 泛型可以解決以上問題
    1. 在初始化時不須先設定大小
    2. 在添加錯誤型別的元素，在編譯時期就會報錯
    3. 兼容各種類型，省去撰寫與維護的成本
```Cs
List<string> names = new List<string>{
    "Rose",
    "Jack",
    "Gozilla"
};
static void printList(List<T> list) {
    foreach (T item in list) Console.WriteLine(item);
}
```

## 2. 靜態方法取代建構式
+ 由於在泛型函式調用時，會進行類型推斷，故可以透過靜態方法簡化建構式，可以省去指定泛型類型：
```Cs
// 靜態泛型函式
public static Tuple<T1, T2> CreateTuple(T1 item1, T2 item2) 
{
    return new Tuple<T1, T2>(item1, item2);
}
// 泛型建構式   
var tuple1 = new Tuple<string, int>("Jack", 18);
var tuple2 = CreateTuple("Jack", 18);   // 由於類型推斷, 省去寫泛型型別
```

## 3. 類型約束
+ 類型約束可用來限制類型實參的類別：
```Cs
public static void SortList<T>(List<T> items) where T : IComparable<T>
{
    // 因為限定 T 需要繼承 IComparable, 所以可以叫用其 CompareTo 方法
    items.Sort((x,y) => x.CompareTo(y));
}
```

## 4. 泛型類型的初始化與狀態
+ `List<int>` 與 `List<string>` 雖油桐一個泛型類型 `List<T>` 限定，但在執行期會被當作兩個不同的類型
    + 範例1. 用 typeof 測試
        ```Cs
        public static void PrintType<T>()
        {
            Console.WriteLine($"typeof(T) = {typeof(T)}");
            Console.WriteLine($"typeof(List<T>) = {typeof(List<T>)}");
        }
        public static void Main()
        {
            PrintType<string>();
            PrintType<int>();
        }  
        // typeof(T) = System.String
        // typeof(List<T>) = System.Collections.Generic.List`1[System.String]
        // typeof(T) = System.Int32
        // typeof(List<T>) = System.Collections.Generic.List`1[System.Int32]  
        ```
    + 範例2. 檢查靜態域
        ```Cs
        class GenericCounter<T>
        {
            private static int value;
            static GenericCounter()
            {
                Console.WriteLine($"Initializing counter for {typeof(T)}");
            }
            public static void Increment()
            {
                value++;
            }
            public static void Display()
            {
                Console.WriteLine($"Counter for {typeof(T)}: {value}");
            }
        }
        public static void Main()
        {
            GenericCounter<string>.Increment();
            GenericCounter<string>.Increment();
            GenericCounter<string>.Display();
            GenericCounter<int>.Display();
            GenericCounter<int>.Increment();
            GenericCounter<int>.Display();
        }
        // Initializing counter for System.String
        // Counter for System.String: 2
        // Initializing counter for System.Int32
        // Counter for System.Int32: 0
        // Counter for System.Int32: 1
        ```

