---
title: "[Device]Mismatch Introduction"
date: 2022-03-05T21:40:03+08:00
tags: ["Semiconductor"]
draft: false
Categories: Semiconductor     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "Device mismatch intro."                     
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
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

# Mismatch 的重要性
+ Mismatch 就是當元件的結構設計相同，且尺寸相等，發生性質差異的一種行為。
+ 當尺寸漸縮，變異(viriability)的程度會愈來愈大。
+ 變異(viriability)變大會影響到類比邏輯應用的表現。

## Variability/Fluctuation 變異度/誤差定義
+ 元件的單體量測值到整體的 Stardard Target 或 Median 的差距。
+ 可分為**系統誤差**與**隨機誤差**。

### Systematic variability 系統誤差 (Global)
+ 外質特性(extrinsic)
+ 可以透過製程改良或控制來改善
  + W2W: 裝置穩定度 equipment stability
  + Wafer level: 裝置均勻度 equipment uniformity、黃光穩定度 Litho. stability
  + Die level: 黃光均勻度 Litho. uniformity、溫度均勻度 temp. non-uniformity
    + pattern density like poly gate density might impact temperature uniformity
  + Layout-Dependent: 光學偏移效應 Optical proximity effect、機械應力 Mechanical stress

### Random variability 隨機誤差 (Local/Mismatch)
+ 本質特性(intrinsic)
+ 較難被改善
+ 沒有空間相關性
+ 尺寸漸縮，比例可能被放大
  + 微擾動: 參雜 dopant, LER, ...
    + random dopant fluctuation(RDF): dopant diffuse randomly 
    + gate dieletric roughness
    + line edge roughness(LER)
    + grain irregularity

## 統計手法
### 常態分佈
+ 大部分的元件特性都呈常態分布(normal distribution)
+ 中央極限定理 Advanced Central Limit Therem: 相互獨立的隨機變數, 其均值以常態分佈為極限
+ Sum of normally distributed random variables: 常態分佈的線性組合依然是常態分布
+ 可簡單透過 median 與 sigma 來描述一組數據, 並用來預測數據
+ 常態分布的函數式為 \\(f(x)=\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-u)^2}{2\sigma^2}}\\)

### 分析手法
+ 透過刪減 outlier 使 rawdata 盡量接近常態分布 (刪除 3倍 sigma 以外的 outlier，重複 6 次)
+ 通常 Full mapping 量測(66pts) 會有 0~2 點的 outliers
+ 數學公式: A = B + C 且 B 與 C 為不相依的變數時 \\((\sigma_A)^2=(\sigma_B)^2+(\sigma_C)^2\\)
$$(\sigma_{total})^2=(\sigma_{global})^2+(\sigma_{local})^2$$
+ Total: 
  + \\(\sigma(\text{Vt1,Vt2,...Vtn})\\) in wafer
+ Global:  
  + \\((\sigma_{total})^2=(\sigma_{global})^2+(\sigma_{local})^2\\)
  + \\(\text{Median(Vt1,Vt2,...Vtn)}\\)
  + \\(\sigma(\text{Med1,Med2,...Medn})\\)
+ Local:
  + \\(\sigma(\text{Vt1,Vt2,...Vtn})\\) in die
  + local = \\(\sqrt{\frac{\sum\sigma_i}{n}})\\)
  + mismatch = \\(\sigma(\Delta\text{Vt1},\Delta\text{Vt2},...\Delta\text{Vtn})\\)

### Mismatch量測
+ 量測 Full mapping data
+ 將同個 die 裡面的 device pair(the same W & L) 計算差值
  + \\(\Delta\text{Vt}=Vt1-Vt2\\)
  + \\(\Delta\text{Ion}=\frac{2\times(\text{Ion}_1-\text{Ion}_2)}{\text{Ion}_1+\text{Ion}_2}\\)
+ Normalization
  + 同一組 device pair 內，去除 outlier，使數據接近常態分佈
  + 因為 mismatch 受 sacle 影響，故須對 scale 做正常化 1/sqrt(WL)，Standard variation of mismatch is proportional to inverse of square root of area.
+ Draw \\(\Delta\text{Vt}-\frac{1}{\sqrt{W/L}}\\)圖
  + 斜率即為 Mismatch


