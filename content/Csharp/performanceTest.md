---
title: "[CS] Sample cost for performance test"
keywords: ["C#", "performance", "Diagnostics", "Stopwatch"]
description:
date: 2023-05-16T21:26:24+08:00
tags: ["C#"]
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
---
### Sample code for stop watch
```Csharp
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Data.Common;
using System.Diagnostics;
using System.Drawing;
using System.Text;
using System.Threading.Tasks;

namespace Rainspace.PlayGround
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            System.Console.WriteLine("==============Accumulate1==============");
            System.Console.WriteLine("Result: " + Accumulate(0, 100, 0));
            sw.Stop();
            System.Console.WriteLine("Time cost: " + (sw.ElapsedTicks/1.0e6).ToString() + "ms");
            sw.Reset();
            sw.Start();
            System.Console.WriteLine("==============Accumulate2==============");
            System.Console.WriteLine("Result: " + Accumulate(0, 100, 0));
            sw.Stop();
            System.Console.WriteLine("Time cost: " + (sw.ElapsedTicks/1.0e6).ToString() + "ms");
        }
        public static int Accumulate(int begin, int end, int sum = 0)
        {
            int res = sum;
            if (end < begin) return Accumulate(end, begin, sum);
            for (int i = begin; i < end; i++) 
            {
                res += i;
            }
            return res;
        }
        public static int Accumulate2(int begin, int end, int sum = 0)
        {
            int res = (begin + end) * (end - begin) / 2;
            return res + sum;
        }
    }
}
```