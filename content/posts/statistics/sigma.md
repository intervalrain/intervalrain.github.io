---
title: "[Statistics] a群體與b群體各別標準差求整體標準差"
keywords: ["Statistics"]
description: 
date: 2023-12-12T22:16:04+08:00
tags: ["Statistics"]
draft: false
Categories: "IT"
author: "hgraca"
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

# Given \\(\sigma_a\\) and \\(\sigma_b\\), Ask for \\(\sigma\\)

## 1. 簡化 \\(\sigma\\)
+ 將 \\(\sigma\\) 乘開
    + \\(\sigma = \sqrt{\frac{\sum{(x_i-\bar x)^2}}{n}}\\)
    + \\(\sigma = \sqrt{\frac{\sum{x_i^2-2\bar x\sum{x_i}+n\bar x^2}}{n}}\\)
+ 平均等於總和除以個數 \\(\frac{\sum x_i}{n}=\bar x\\)，故
    + \\(\sigma = \sqrt{\frac{\sum x_i^2}{n}-\frac{2\bar x\sum x_i}{n}+\frac{n\bar x^2}{n}}\\)
    + \\(\sigma = \sqrt{\frac{\sum x_i^2}{n}-2\bar x^2+\bar x^2}\\)
    + 得 \\(\boxed{\sigma = \sqrt{\frac{\sum x_i^2}{n}-\bar x^2}}-(1)\\)


## 2. 求個別平方和
+ 由\\((1)\\)式可推得各別的標準差為
    + \\(\boxed{\sigma_a = \sqrt{\frac{\sum x_{ai}^2}{n_a}-\bar x_a^2}}-(2)\\)
+ 且
    + \\(\boxed{n = n_a+n_b}-(3)\\)
    + \\(\boxed{\sum x_i^2=\sum x_{ai}^2+\sum x_{bi}^2}-(4)\\)
+ 欲求 \\(\sum x_{ai}^2\\)，我們將\\((2)\\)式展開
    + \\(\sigma_a^2 = \frac{\sum x_{ai}^2}{n_a}-\bar x_a^2\\)
    + \\(\sigma_a^2+\bar x_a^2= \frac{\sum x_{ai}^2}{n_a}\\)
    + 得\\(\boxed{\sum x_{ai}^2=n_a(\sigma_a^2+\bar x_a^2)}-(5)\\)

## 3. 求總體標準差
+ 由\\((1)\\)式展開
    + 得 \\(\boxed{\sigma = \sqrt{\frac{(\sum x_{ai}^2+\sum x_{bi}^2)}{n}-\bar x^2}}-(6)\\)
+ 將\\((5)\\)代入\\(\(6)\\)
    + \\(\boxed{\sigma=\sqrt{\frac{n_a(\sigma_a^2+\bar x_a^2)+n_b(\sigma_b^2+\bar x_n^2)}{n}-\bar x^2}}-(7)\\)
+ 其中 \\(\boxed{\bar x=\frac{n_a\bar x_a + n_b\bar x_b}{n}}-(8)\\)
+ 故我們可以從上式輾轉得通式：
    + \\(\boxed{\sigma=\sqrt{\frac{\sum(n_i(\sigma_i^2+\bar x_i^2))}{n}-\bar x^2}}-(9)\\)
    + 或寫成
    + \\(\boxed{\sigma=\sqrt{\frac{\sum(n_i(\sigma_i^2+\bar x_i^2))-\sum n_i\bar x_i}{n}}}-(9)\\)

## summary
+ 個數
    + \\(\boxed{n=n_a+n_b=\sum n_i}\\)
+ 平均數
    + \\(\boxed{\bar x=\frac{n_a\bar x_a+n_b\bar x_b}{n_a+n_b}=\frac{\sum{n_i\bar x_i}}{\sum{n_i}}}\\)
+ 標準差  
    + \\(\boxed{\sigma=\sqrt{\frac{n_{ai}(\sigma_{ai}^2+\bar x_{ai}^2)+n_{bi}(\sigma_{bi}^2+\bar x_{bi}^2)-(n_a\bar x_a+n_b\bar x_b)}{n_a+n_b}}=\sqrt{\frac{\sum(n_i(\sigma_i^2+\bar x_i^2))-\sum n_i\bar x_i}{\sum n_i}}}\\)

## 4. sql
+ 現有一 table 存有
+ `avg_value`
+ `std_value`
+ `site_count`
```sql
with stats as (
    select
        ...
        sum(site_count*avg_value)/sum(site_count) as avg_value,
        sqrt((sum(site_count*(square(std_value)+square(avg_value)))-sum(site_count*avg_value))/sum(site_count)) as std_value,
        sum(site_count) as site_count
    from data
    where ...
    group by ...
)
select * from stats
```