---
title: "在 GitHub Pages 中渲染 LaTex 公式"
date: 2022-02-22T01:38:30+08:00
tags: ["JavaScript", "Programming",]
draft: true
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "如何讓 GitHub Pages 中支援 Latex 語法" 
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
canonicalURL: "https://intervalrain.github.io/"
disableHLJS: true
disableShare: true
disableHLJS: false
hideSummary: false
searchHidden: true
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

# 0. 前言
+ 以往寫筆記通常是使用 [Notion](https://www.notion.so/)，簡單的 Markdown 語法搭配支援 LaTex，使得在撰寫學習筆記時，可以達到快速且美觀的呈現。  
+ 雖說 GitHub Pages 支援了 Markdown 的語法，但卻不支援 LaTex，這使得想將筆記從 Notion 移轉到 GitHub Pages，成為一個小缺點。

# 1. 解決方法
+ 利用 MathJax，在靜態頁面掛載 JavaScript 程式碼。  
+ 其在官網的描述是：
> ***Beautilful math in all browsers*** *A JavaScript display engine for mathematics that works in all browsers. No more setup for readers. It just works.*

## Step 1. 挑選一個常駐的靜態頁面
+ 常駐的靜態頁面可以是 `\layouts\partials\header.html` 或是 `\layouts\partials\footer.html`
+ 開啟頁面之後，在 `<head>` 與 `</head>` 之間加入下一步驟內的 JavaScript 程式碼。

## Step 2. 加入 JavaScript 程式碼
```JavaScript
<head>
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({ TeX: { equationNumbers: { autoNumber: "all" } } });
    </script>

    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({tex2jax: {
             inlineMath: [ ['$','$'], ["\\(","\\)"] ],
             processEscapes: true
           }
         });
    </script>

    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript">
    </script>
</head>
```
上面的腳本實現了：
  1. 整行公式自動編號
  2. 將兩個美元符號中間的內容看作行內數學公式(inline math equation)，可在 $ 頻繁出現的文章禁用此腳本
  3. 從 mathjax 官網掛載腳本

## Step 3. 開始撰寫 LaTex

+ 在 $ \$ $符號與 \$ 符號間開始創作
+ LaTex 的語法可以參考[https://www.cs.pu.edu.tw/~wckuo/doc/latex123/node11.html](https://www.cs.pu.edu.tw/~wckuo/doc/latex123/node11.html)


[參考來源：https://bend1031.github.io/2019/08/10/%E5%9C%A8GitHub-Pages%E4%B8%AD%E6%B8%B2%E6%9F%93-LaTex-%E5%85%AC%E5%BC%8F/](https://bend1031.github.io/2019/08/10/%E5%9C%A8GitHub-Pages%E4%B8%AD%E6%B8%B2%E6%9F%93-LaTex-%E5%85%AC%E5%BC%8F/)