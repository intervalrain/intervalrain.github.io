---
title: "[IT] Clean Architecture - 重點整理"
keywords: ["Clean Architecture", "SOLID", "DDD", "Design Pattern"]
description:
date: 2023-09-23T20:03:55+08:00
tags: ["Clean Architectrue"]
draft: false
Categories: "IT"
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
# 乾淨架構(Clean Architecture) 筆記
## 分層
+ 乾淨架構中從外而內依序為
    + Framework Layer
    + Interface Adapter Layer
    + Application Layer
    + Domain Layer

## Models
+ 一般來說會有四個 Models
    + View Model(給前端)
    + App Model(App Layer 隔離 Domain Layer 所用，aka DTO)
    + Domain Model
    + Data Model(for DBMS)

## Usecase
+ App Layer 中的 Usecase 做四件事：
    + 查
    + 改
    + 存
    + 推

## 單向依賴原則
+ 依賴的方向必為單向且為  
\\(\boxed{\text{Interface Adapter}} \rightarrow \boxed{\text{Application Layer}} \rightarrow \boxed{\text{Domain Layer}}\\)

## Repository
+ Application Layer 為了遵守單向依賴，與 ORM 解耦會做一次依賴反轉，翠取 Repository 介面。

## 套用乾淨架構的效益衡量
+ Model Mapping 的成本 vs. 
    1. 獨立出「領域模型」的價值
    2. 省下更換技術的成本(migration cost)

## 「領域層」的部分通常會結合 DDD