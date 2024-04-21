---
title: "[C#] IEnumerable & IEnumerator 迭代器"
keywords: ["C#", "IEnumerable", "IEnumerator", "迭代器"]
description: "Introduction to Iterator in C#, including IEnumerator and IEnumerable"
date: 2023-02-27T11:50:20+08:00
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
## 1. 簡介
+ 迭代器包含了以下四種類型
    + `IEnumerable`
    + `IEnumerable<T>`
    + `IEnumerator`
    + `IEnumerator<T>`
+ 根據迭代器的返回類型，每個迭代器都有一個 `yield type`。
    + `IEnuerable` 返回 `object`
    + `IEnuerable<string>` 返回 `string`
+ 基本的語法為：
```Cs
public static IEnumerable<int> GetFibonacciSeries(int end)
{
    int cnt = 0;
    int prev = 0;
    int curr = 1;
    while (true)
    {
        if (cnt == end) yield break;
        cnt++;
        int tmp = curr + prev;
        yield return curr;
        prev = curr;   
        curr = tmp;
    }
}
public static void Main(string[] args)
{
    
    foreach(int val in GetFibonacciSeries(10))
    {
        Console.WriteLine(val);
    }
}    
```

## 2. 延遲執行
+ 雖然同樣的程式可以用 `List<T>` 的方式重新寫成下面的程式碼，其列印結果也會一樣，但在執行期卻會有很大的差異。
```Cs
public static List<int> GetFibonacciSeriesList(int end)
{
    int cnt = 0;
    int prev = 0;
    int curr = 1;
    List<int> res = new List<int>();
    while (true)
    {
        if (cnt == end) break;
        cnt++;
        int tmp = curr + prev;
        res.Add(curr);
        prev = curr;
        curr = tmp;
    }
    return res;
}
public static void Main(string[] args)
{
    foreach(int val in GetFibonacciSeriesList(10))
    {
        Console.WriteLine(val);
    }
}    
```
+ 延遲執行屬於 lambda 演算的一部分，目的是「**只在需要獲取計算結果時執行程式**」。
```Cs
public static void Main(string[] args)
{
    // 調用迭代器的方法，從 IEnumerable<T> 取得 IEnumerator<T>
    using (var reader = GetFibonacciSeries(10).GetEnumerator())
    {
        while (reader.MoveNext())
        {
            int val = reader.Current;
            Console.WriteLine(val);
        }
    }
} 
```
+ 以上兩段程式碼兩段程式碼在執行期的差別為：
    + 前者在執行到 `foreach(int val in GetFibonacciSeriesList(10))` 時，會先將 `GetFibonacciSeriesList(10)` 執行完取得 `List<int>` 之後才開始 `for loop`。
    + 後者在執行到 `MoveNext()` 時，程式碼才真正被執行。
+ 執行 `yield` 語句時，程式碼會停止執行：
    + 拋出 exception
    + 方法執行完畢
    + 遇到 yield break
    + 執行到 yield return，迭代器準備返回值。
+ 那麼延遲執行有什麼好處呢？
    + 不必預先創建一個 `List<int>`，在 List 本身很大的情況下，可以節省空間。
    + 試想今天的數列是無窮無盡的(如上例的 fibonacci 數列)，使用 `List<int>` 就顯得太冗餘了。
    + 使用迭代器可以達到 Design Pattern 中的**關注點分離**(Iteration/Process 分離)，也就是說，在叫用迭代器時，只需關心有沒有辦法迭代到下一個元素。
    + 程式只需完成需求即可退出，大大的增加效率。
        + 試想今天需要向資料庫拿去十筆最新的資料，若不用延遲執行的話，需要將整筆資料庫的資料用某種資料結構儲存下來，再 for-loop 取出十筆。
        + 若使用延遲執行，取得十筆資料就立即退出，可以大大減少執行時間。

## 3. finally 的處理
+ 觀察下面的程式碼，並對照輸出結果，可以發現，只有出現一次的 `In finally block`。
    + 只有在執行了 `IEnumerator<T>.Dispose()` 方法時，才會調用 finally 的區塊。
    + 而每次的 `IEnumerator<T>.MoveNext()` 都會使程式停止在 `yield return`。
+ 不管是用 `using` 搭配 `IEnumerable.GetEnumerator()`，或是使用 `foreach(var val in Iterator())` 回傳的結果都是只有出現一次的 `In finally block`，代表後者隱含了一條 `using` 的語句。
```Cs
public static IEnumerable<string> Iterator()
{
    try 
    {
        Console.WriteLine("Before first yield");
        yield return "first";
        Console.WriteLine("Between yields");
        yield return "second";
        Console.WriteLine("After yields");    
    }
    finally
    {
        Console.WriteLine("In finally block");
    }
    
}
public static void Main(string[] args)
{
    using (var reader = Iterator().GetEnumerator())
    {
        while (reader.MoveNext())
        {
            string val = reader.Current;
            Console.WriteLine(val);
        }
    }
}   
// Before first yield
// first
// Between yields
// second
// After yields
// In finally block
```
+ 更多詳細的介紹詳見 [[C#] Yield Return](/csharp/yield/)