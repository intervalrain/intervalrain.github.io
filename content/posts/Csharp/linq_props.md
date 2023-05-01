---
title: "[C#] C#3、LINQ 及相關特性"
keywords: ["C#", "Linq"]
description: "Introduction to LINQ in C#"
date: 2023-05-01T14:10:48+08:00
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

## 1. 屬性的自動實現
+ 在 C#3 以前，每個屬性需要手動實現，也就是需要手動為屬性添加 get 訪問器與 set 訪問器，如：
```Csharp
private string name;
public string Name
{
    get { return name; }
    set { name = value; }
}
```
+ 在 C#3 以後，可以透過自動實現的方式撰寫：
    + 其中命名為 `name` 的變數由編譯器自動創建並為其賦予名稱。
```Csharp
public string Name { get; set; }
```
+ 但在 C#3 時，不能宣告 `readonly` 的自動屬性，且不能在宣告時賦予初始值，在 C#6 做了修正。在 C#3 只能透過訪問子分離來模擬 `readonly`：
```Csharp
public string Name { get; private set; }
```

## 2. 隱式類型(var)
+ 靜態類型 vs. 動態類型：
    + 靜態類型是面向編譯的的語言，故所有類型由編譯器決定，在**編譯期**就會完成綁定。
    + 動態類型則是延遲綁定的時間，在**執行期**才進行類型綁定。
+ 顯式類型 vs. 隱式類型：
    + 顯式類型代表在程式碼表達式便給出具體的類型訊息。
    + 隱式類型則允許了類型推斷，透過上下文判斷出類型．
    
+ C#3 開始支援隱式類型的寫法，關鍵字是 `var`。
    ```Csharp
    var name = "Rainhu";
    // string name = "Rainhu"
    ```
    + 隱式類型的宣告有幾個限制：
        1. 變數必須在宣告時就初始化。
        2. 用於初始化的表達式必須已具備某個類型。
        3. 只能用於局部變數
        ```Csharp
        var x;
        x = 10;         // 違反1

        var y = null;   // 違反2
        ```
    + 特別注意到：**C# 是在編譯期就完成隱式類型的綁定**
+ 隱式類型因為其方便性，但很容易造成濫用，其適用的情形大致如下：
    1. 變數為匿名類型，不能為其指定類型。 
    2. 變數的型別過長，並且初始化表達式就足以用來推斷。
    3. 變數的精確類型不重要，並可以透過初始化表達式來推斷。
    ```Csharp
    Dictionary<string, List<decimal>> mapping = new Dictionary<string List<decimal>>();
    var mapping = new Dictionary<string, List<decimal>>();
    ```
+ 隱式類型的數組
    ```Csharp
    int[] arr = new int[10];
    int[] arr1 = { 1, 2, 3, 4, 5 };
    int[] arr2 = new int[] { 1, 2, 3, 4, 5 };

    int[] arr3;
    arr3 = {1, 2, 3, 4, 5}      // 非法
    arr3 = new[] { 1, 2, 3, 4, 5 }; 
    ```
+ 物件與集合的初始化
    + 以電子商務系統為例
    ```Csharp
    public class Order
    {
        private readonly List<OrderItem> items = new List<OrderItem>();
        public string OrderId { get; set; }
        public Customer Customer { get; set; }
        public List<OrderItem> Items { get { return items; }}
        public void Add(OrderItem item)
        {
            items.Add(item);
        }
    }
    public class Customer
    {
        public string Name { get; set; }
        public string Address { get; set; }
    }
    public class OrderItem
    {
        public string ItemId { get; set; }
        public int Quantity { get; set; }
    }
    ```
    + 若不使用物件初始化器與集合初始化器便會像：
    ```Csharp
    var customer = new Customer();
    customer.Name = "Mike";
    customer.Address = "Japan";

    var item1 = new OrderItem();
    item.ItedId = "item12345";
    item.Quantity = 1;
    
    var item2 = new OrderItem();
    item.ItedId = "item54321";
    item.Quantity = 2;

    var order = new Order();
    order.OrderId = "order12345";
    order.Customer = customer;
    order.Items.Add(item1);
    order.Items.Add(item2);
    ```
    + 若使用物件初始化器與集合初始化器，便可大大增加可讀性，並且在接下來的 LINQ 上有大大的好處：
    ```Csharp
    var order = new Order
    {
        OrderId = "order12345",
        Customer = new Customer { Name = "Mike", Address = "Japan" },
        Items = 
        {
            new OrderItem { ItemId = "item12345", Quantity = 1 },
            new OrderItem { ItemId = "item54321", Quantity = 2 }
        }
    }
    ```

## 3. 匿名類型
+ 前面說到隱式類型，好像是可有可無的存在，但在匿名類型，就是一個只能用隱式類型來宣告的情況了。
    + 匿名類型的宣告：
    ```Csharp
    var procuct
    {
        Name = "CD Pro-2",
        Price = 50000
    }
    string name = product.Name;
    int price = product.Price;
    ```
    + 搭配隱式類型數組的匿名類型宣告：
    ```Csharp
    var products = new[]
    {
        new { Name = "CD Pro-2", Price = 50000 },
        new { Name = "iDream", Price = 100000 },
        new { Name = "Forsung TV", Price = 150000 }
    }
    ```
## 4. lambda 表達式
### 基本語法
+ lambda 表達式的基本語法為：`參數列表 => 主體`
    + 與之前的匿名方法類似，只是將 `delegate` 換成了 `=>`
    ```Csharp
    Action<string> action = (string msg) =>
    {
        Console.WriteLine(msg);
    };
    action("hello world!");
    ```
    + 但在主體包含的內容很短時，可以簡化成：
    ```Csharp
    Action<string> action = (string msg) => Console.WriteLine(msg);
    ```
    + 參數列表若可以經由類型推斷，那麼可以進一步簡化成：
    ```Csharp
    Action<string> action = (msg) => Console.WriteLine(msg);
    ```
    + 參數列表只有一個參數，括號也可以省略：
    ```Csharp
    Action<string> action = msg => Console.WriteLine(msg);
    ```
### 捕獲變數
+ 對開發者而言，lambda 表達式除了可以使用自於的參數列表外，還可以捕捉靜態變數、物件實例、`this`變數、方法參數或局部變數，後者全部都為捕獲變數，而根據不同的作用域，編譯器會為其編譯成相對應的 IL code。
    + 在此提供一個以生成類來實現的例子：
    ```Csharp
    public Action<string> CreateAction(string methodParameter)
    {
        string methodLocal = "method Local";
        string uncaptured = "uncaptured";

        Action<string> action = lambdaParameter =>
        {
            string lambdaLocal = "lambda local";
            Console.WriteLine("Instance field: {0}", instanceField);
            Console.WriteLine("Method Parameter: {0}", methodParameter);
            Console.WriteLine("Method Local: {0}", methodLocal);
            Console.WriteLine("Lambda parameter: {0}", lambdaParameter);
            Console.WriteLine("Lambda local: {0}", lambdaLocal);
        };
        methodLocal = "modified method local";
        return action;
    }
    ```
    + 經轉譯後的程式碼
    ```Csharp
    private class LambdaContext
    {
        public CapturedVariable original;
        public string methodParameter;
        public string methodLocal;
        public void Method(string lambdaParamter)
        {
            string lambdaLocal = "lambda local";
            Console.WriteLine("Instance field: {0}", instanceField);
            Console.WriteLine("Method Parameter: {0}", methodParameter);
            Console.WriteLine("Method Local: {0}", methodLocal);
            Console.WriteLine("Lambda parameter: {0}", lambdaParameter);
            Console.WriteLine("Lambda local: {0}", lambdaLocal);
        }
    }
    public Action<string> CreateAction(string methodParameter)
    {
        LambdaContext context = new LambdaContext();
        context.original = this;
        context.methodParameter = methodParameter;
        context.methodLocal = "method Local";
        string uncaptured = "uncaptured local";

        Action<string> action = context.Method;
        context.methodLocal = "modified method local";
        return action;
    }
    ```

## 5. 擴展方法 Extension Method
+ 擴展方法是一種靜態方法，可以對其第一個參數的類型物件以物件的方式進行調用：
    ```Csharp
    SampleClass.Method(x,y);
    x.Method(y);
    ```
+ 宣告方式：
    ```Csharp
    using System;
    namespace Battle.Extensions
    {
        public static class BattleExtensions
        {
            public static void Attack(this Warrior Alpha, Warrior Delta)
            {
                Battle.Attack(Alpha, Delta);
            }
        }
    }
    ```
    + 調用方式
    ```Csharp
    Warrior Alpha = new Warrior
    {
        Name = "Alpha",
        Level = 5,
        Attack = 10,
        HP = 20
    };
    Warrior Delta = new Warrior
    {
        Name = "Delta",
        Level = 5
        Attack = 8,
        HP = 25
    };
    // 原始版本
    Battle.Attack(Alpha, Delta);
    // 擴充方法版本
    Alpha.Attack(Delta);
    ```
+ 編譯器唯一需要做的是為擴展方法及其所在類添加`[Extension]`特性。該特性在命名空間`System.Runtime.CompileServices`下。本質上是一個標記，標記擴充方法。
## 6. LINQ 查詢
+ 接著我們可以透過 lambda 表達式與擴充方法來進行鏈式調用：
    ```Csharp
    Warrior Alpha = { Name = "Alpha", Level = 5, Attack = 10, HP = 20 };
    Warrior Beta =  { Name = "Beta",  Level = 3, Attack =  6, HP = 12 };
    Warrior Gamma = { Name = "Gamma", Level = 5, Attack = 12, HP = 18 };
    Warrior Delta = { Name = "Delta", Level = 5, Attack =  8, HP = 25 };
    Warrior[] warriors = { Alpha, Beta, Gamma, Delta };
    IEnumerable<string> query = warriors
        .Where(warrior => warrior.Level >= 5)
        .OrderBy(warrior => warrio.Name)
        .Select(warrior => warrior.Name.ToUpper());   
        // ["ALPHA", "DELTA", "GAMMA"]
    ```
    + 若沒有使用 `IEnumerable` 的擴充方法，會長這樣，可讀性整個就下降了：
    ```Csharp
    Warrior[] warriors = { Alpha, Beta, Gamma, Delta };
    IEnumerable<string> query = 
        Enumerable.Select(
            Enumerable.OrderBy(
                Enumerable.Where(warriors, warrior => warrior.Level >= 5),
                warrior => warrior.Name,
            ),
            warrior => warrior.Name.ToUpper());
    ```
    + LINQ 還可以使用**查詢表達式**：
    ```Csharp
    IEnumerale<string> query = from warrior in warriors
                               where warrior.Level >= 5
                               orderby warrior.Name
                               select warrior.Name.ToUpper();
    ```
    + 甚至可以利用 `let` 引入新的變數
    ```Csharp
    IEnumerale<string> query = from warrior in warriors
                               let name = warrior.Name
                               where warrior.Level >= 5
                               orderby name
                               select name.ToUpper();
    ```