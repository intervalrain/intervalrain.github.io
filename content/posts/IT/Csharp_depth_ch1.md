---
title: "[IT] C# Depth Ch.1 背景介紹"
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
# C#背景介紹
> 在使用過 `C#` 與 `Java` 兩種語言之後會發現，`Java` 為了跨平台的特性，鮮少修改 VM 規格，相較 `.NET` 為了語法簡潔，編譯器往往會做出讓步，也因此 `C#` 比起 `Java` 多了許多語法糖。如 `delegate` 等，在這邊預留一些內容到下一次寫，今天專注於 `yield return` 與 `IEnumerable`。

## 起源
### 為何需要 `IEnumerable`?
> **1. 目標**：依序印出 1 ~ 100 的數字  

一般來說，若要做到以上的目標，只需要用到簡單的 `for_loop` 即可。
```C#
static void Main(string[] args)
{
    for (int i = 1; i <= 100; i++) 
    {
        Console.Write("{0} ", i);
    }
}
```
+ `IEnumerable` 是什麼？要做什麼用？
    + `IEnumerator` 是一種列舉器，它是特化用來專門處理 `iteration` 的工具。  
    + 在 `Design Patterns` 中有一種設計模式叫作 `Iterator`，它的目的就是要在：  
**不需要知道物件的內部細節，即可依序存取內含的每一個元素。**
    + `IEnumerator` 物件的實作：
        ```C#
        public class Enumerator1 : IEnumerator<int>
        {
            private int _start;
            private int _end;
            private int _curr;
            
            public Enumerator1(int start, int end)
            {
                _start = start;
                _end = end;
                this.Reset();
            }
            public int Current
            {
                get { return this._curr; }
            }
            public void Dispose()
            {
            }
            object System.Collections.IEnumerator.Current
            {
                get { return this._curr; }
            }
            
            public bool MoveNext()
            {
                this._curr++;
                return !(this._curr > this._end);
            }
            public void Reset()
            {
                this._curr = this._start;
            }
        }
        ```
    + 於是，我們若要遍歷這個物件的內容，只需要：
        ```C#
        static void Main(string[] args)
        {
            Enumerator1 e = new Enumerator1(1, 100);
            do 
            {
                Console.Write("{0} ", e.Current);
            } while (e.MoveNext());
        }
        ```
### Ieration/Process 分離
+ 當我們今天不想管 collection 裡每一個物件是怎麼擺的，用什麼結構裝、用什麼邏輯或演算法處理的，只想要依序將安排好的元素拿出來。也就是說，我們想把物件遍歷的(iteration) 與拿到它後要做什麼事(process) 分開，那麼就可以用到 `Iterator Pattern`。
> **2. 目標**：依序印出 1 ~ 100 中的質數  

使用一般的 `for_loop` 來實現的話會是：
```C#
    static void Main(string[] args)
    {
        for (int i = 1; i <= 100; i++) {
            if (isPrime(i)) Console.Write("{0} ", i);
        }
    }
    static bool isPrime(int num) 
    {
        if (num <= 1) return false;
        for (int i = 2; i <= Math.Sqrt(num); i++) 
        {
            if (num % i == 0) return false;
        }
        return true;
    }
```
會發現，`Iteration` 與 `Process` 已經混在一起。  
那用 `IEnumerator` 來實作呢?
```C#
class Test
{
    public class PrimeEnumerator : IEnumerator<int>
    {
        private int _start;
        private int _end;
        private int _curr;
        private List<int> list;
        
        public PrimeEnumerator(int start, int end)
        {
            _start = start;
            _end = end;
            this.init();
            this.Reset();
        }
        private void init()
        {
            list = new List<int>();
            bool[] arr = new bool[_end+1];
            for (int i = 2; i <= _end; i++) 
            {
                arr[i] = true;
            }
            for (int i = 2; i <= _end; i++)
            {
                if (!arr[i]) continue;
                for (int j = 2*i; j <= _end; j += i)
                {
                    arr[j] = false;
                }
            }
            for (int i = _start; i <= _end; i++)
            {
                if (arr[i])
                {
                    list.Add(i);
                }
            }
        }
        public int Current
        {
            get { return this.list[this._curr]; }
        }
        public void Dispose()
        {
        }
        object System.Collections.IEnumerator.Current
        {
            get { return this.list[this._curr]; }
        }
        
        public bool MoveNext()
        {
            this._curr++;
            return !(this._curr+1 > this.list.Count);
        }
        public void Reset()
        {
            this._curr = 0;
        }
    }
}
```
則要遍歷這個物件，跟原本的程式完全一樣：
```C#
    static void Main(string[] args)
    {
        PrimeEnumerator e = new PrimeEnumerator(1, 100);
        do {
            Console.Write("{0} ", e.Current);
        } while (e.MoveNext());
    }
```
### IEnumerable 實作
+ 但是若要作到 Process 與 Iteration 分離，每次都要 Implement IEnumerator，那也太累了吧，於是就有了 `IEnumerable` 這個語法糖：
```C#
class PrimeArray
{
    static bool isPrime(int num) 
    {
        if (num <= 1) return false;
        for (int i = 2; i <= Math.Sqrt(num); i++) 
        {
            if (num % i == 0) return false;
        }
        return true;
    }
    static IEnumerable<int> PrimeEnumerable(int _start, int _end)
    {
        for (int i = _start; i <= _end; i++)
        {
            if (!isPrime(i)) continue;
            yield return i;
        }
    }
    static void Main(string[] args)
    {
        foreach (int i in PrimeEnumerable(1, 100))
        {
            Console.Write("{0} ", i);
        }
    }    
}
```
用以上的寫法，`Iterator Patterns` 變得非常的精簡，但是使用 `yeild` 使得違背了原本 `function call/return` 的概念。但其實如果反組譯其程式碼可以發現，`yield return`的寫法，其實就是編譯器在編譯的時候，電腦幫你實作了一個 `IEnumerator`，故事實上就是 `C#` 送你的一個語法糖。