---
title: "[ghpage] 在 GitHub Pages 中渲染 KaTex 公式"
date: 2022-02-22T01:38:30+08:00
tags: ["JavaScript", "Programming",]
draft: true
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "如何讓 GitHub Pages 中支援 Latex 語法" 
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: false
draft: false
math: false
hidemeta: false
comments: false
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

# 0. 前言
+ 以往寫筆記通常是使用 [Notion](https://www.notion.so/)，簡單的 Markdown 語法搭配支援 LaTex，使得在撰寫學習筆記時，可以達到快速且美觀的呈現。  
+ 雖說 GitHub Pages 支援了 Markdown 的語法，但卻不支援 LaTex，這使得想將筆記從 Notion 移轉到 GitHub Pages，成為一個小缺點。
+ 而此處介紹的是在網頁上顯示較為輕便的 [KaTex](https://katex.org/docs/autorender.html)。

# 1. 解決方法
+ 利用 KaTex，在靜態頁面掛載 JavaScript 程式碼。  
+ 其在官網的描述是：
> ***Beautilful math in all browsers*** *A JavaScript display engine for mathematics that works in all browsers. No more setup for readers. It just works.*

## Step 1. 創建一個可常駐的靜態頁面
+ 在 \layouts\partials\ 下創建一個叫作 `math.html` 的頁面。
  + 注意是 global 的 layouts 文件夾中不是 hugo themes 中的文件夾
+ 開啟頁面之後，在 `<head>` 與 `</head>` 之間加入下一步驟內的 JavaScript 程式碼。

## Step 2. 將 JavaScript 程式碼貼入 math.html
```JavaScript
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css" integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.js" integrity="sha384-GxNFqL3r9uRJQhR+47eDxuPoNE7yLftQM8LcxzgS4HT73tp970WS/wV5p8UzCOmb" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/contrib/auto-render.min.js" integrity="sha384-vZTG03m+2yp6N6BNi5iM4rW4oIwk5DfcNdFfxkk9ZWpDriOkXX8voJBFrAO7MpVl" crossorigin="anonymous"
    onload="renderMathInElement(document.body);"></script>
```
+ 上面的程式碼是將 KaTex 的渲染程式碼寫到 math.html 中。


## Step 3. 將 Hugo theme 中的 header.html 複製出來
+ 同樣將 header.html 複製到 global 下的 \layout\partials，並貼入
```
{{- /* Head custom content area start */ -}}
{{- /*     Insert any custom code (web-analytics, resources, etc.) - it will appear in the <head></head> section of every page. */ -}}
{{- /*     Can be overwritten by partial with the same name in the global layouts. */ -}}
{{ if or .Params.math .Site.Params.math }}
{{ partial "math.html" . }}
{{ end }}
{{- /* Head custom content area end */ -}}
```
+ 上面的程式碼的功能將 math.html 嵌進 header.html 中，並以 config.yml 中的 .param.math 指令來控制。

## Step 4. 開始撰寫 KaTex
+ 一開始先將標頭的定義區將 `math: true`，即可開啟該頁面的 KaTex 渲染功能。
+ 在 \\\\( 符號與 \\\\) 符號間進行 inline equation 插入。
+ 或在 \$ \$ 符號與 \$ \$ 間進行 block equation 的插入。
+ LaTex 的語法可以參考[https://www.cs.pu.edu.tw/~wckuo/doc/latex123/node11.html](https://www.cs.pu.edu.tw/~wckuo/doc/latex123/node11.html)

參考來源：
+ [https://bend1031.github.io/](https://bend1031.github.io/2019/08/10/%E5%9C%A8GitHub-Pages%E4%B8%AD%E6%B8%B2%E6%9F%93-LaTex-%E5%85%AC%E5%BC%8F/)
+ https://teddygood.github.io/posts/blog/katex/