---
title: "[IT] C# Depth Ch.1 與時俱進的語言"
date: 2023-01-17T22:27:58+08:00
tags: ["C#", "IT"]
draft: false
Categories: IT
description: "Introduction to yield return in C#"
author: "Rain Hu"
showToc: true
TocOpen: true
math: true
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
# 與時俱進的語言
## System Class
### 1. 泛型(genric)
+ 可更清楚的描述序列中每個元素的類型。  

*C#1 示例*
```Csharp
public class Bookshelf
{
    public IEnumerable Books { get { ... } }
}
```
*C#2 示例：泛型*
```Csharp
public class Bookshelf
{
	public IEnumerable<Book> Books { get { ... } }
}
```
---
### 2. 可空值類型(nullable value type)
+ 可有效的表示未定的變量值，以擺脫魔數(用`-1`當集合索引，用 `MinValue` 或 `MaxValue` 做為初始值)。  

*示例*
```Csharp
string? a = null;
Console.WriteLine(a ?? "null");		// null
a = "abc";
Console.WriteLine(a ?? "null");		// abc
```
---
### 3. 匿名類型(anonymous type)、隱式局部變數(var)
+ 兩者皆可解決靜態類型語言的缺陷：程式碼冗長。  

*示例1: 匿名類型(anonymous type)*
```Csharp
var book = new 
{
	Title = "Harry Potter",
	Author = "J.K. Rowling"
}
string title = book.Title;
string author = book.Author;
```
+ 若已經調用了建構式的話，就無需顯式的宣該告變數的類型了。  

*示例2: 隱式類型(implicit typing)*
```Csharp
Dictionary<string, string> map1 = new Dictionary<string, string>();
var map2 = new Dictionary<string, string>();
```
---
### 4. 簡潔化
*示例1:委托*
```Csharp
button.Click += new EventHandler(HandleButtonClick);			// C#1
button.Click += HandleButtonClick;								// C#2 方法組轉換+匿名方法
button.Click += delegate { MessageBox.Show("Clicked!") };		// C#2 委托
button.Click += (sender, args) => MessageBox.Show("Clicked!");	// C#3 lamnda 表達式

void HandleButtonClick(object sender, EventArgs args)
{
	MessageBox.Show("Clicked!");
}
```
*示例2:自動實現*  
下面兩段 code 可以經由自動實現視為相同
```Csharp
private string name;
public string Name
{
	get { return name; }
	set { name = value; }
}
```
```Csharp
public string Name { get; set; }
```
*示例3:表達式主體成員*  
下面兩段 code 可以經由表達式主體成員(expression-bodied member)視為相同
```Csharp
public int Count { get { return list.Count; } }
public IEnumerator<string> GetEnumerator()
{
	return list.GetEnumerator();
}
```
```Csharp
public int Count => list.Count;
public IEnumerator GetEnumerator => list.GetEnumerator();
```

*示例4:字串處理:內插內串字面量(interpolated string literal)*
```Csharp
throw new KeyNotFoundException("No calendar system for Id " + id + " exists");				// 字串拼接
throw new KeyNotFoundException(string.Format("No calendar system for Id {0} exists", id));	// 字串格式化
throw new KeyNotFoundException($"No calendar system for Id {id} exists");					// 內插字串字面量
```

*示例5: 利用LINQ進行數據訪問*
```Csharp
var offers = 
	from product in db.Products
	where product.SalePrice <= product.Price / 2
	orderby product.SalePrice
	select new {
		producdt.Id, 
		product.Description, 
		product.SalePrice, 
		priduct.Price
	};
```

*示例6: 非同步*
```Csharp
private async Task UpdateStatus()
{
	Task<Weather> weatherTask = GetWeatherAsync();
	Task<EmailStatus> emailTask = GetEmailStatusAsync();

	Weather weather = await weatherTask;
	EmailStatus emai = await emailTask;

	weatherLabel.Text = weather.Description;
	inboxLabel.Text = email.InboxCount.ToString();
}
```