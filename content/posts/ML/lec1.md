---
title: "[ML] 機器學習與統計學"
date: 2022-11-07T18:18:52+08:00
tags: ["Programming", "Machine Learning"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Introduction to Machine Learning"                     
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
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
# Introduction to ML

## 統計學與機器學習差在哪裡? 
  + 同: 將資料(data)轉為資訊(info)
  + 異: 有無強烈的人為事先假設
  
+ 統計學
  + 統計學是在資料分析的基礎上，研究如何測定、收集、整理、歸納和分析反映資料，以便給出正確訊息的科學。
+ 機器學習
  + 機器學習演算法是一類從資料中自動分析獲得規律，並利用規律對未知資料進行預測的演算法。
  \\(\begin{array}{lll}
  \text{Item} & \text{Statistics} & \text{Machine Learning}\\\\\hline
  \text{特性} & \text{伴隨事前假設，依賴明確規則，以模型定義資料關聯性，重視模型解釋性} & \text{幾乎無視前假設，不依賴明確規則，相信經驗}\\\\
  & \text{事前假設(人)}\rightarrow\text{模型估計(機器)} & \text{特徵萃取(機器)}\rightarrow\text{網路建構(機器)} \\\\\hline
  \text{優點} & \text{模型可解釋} & \text{不須事先假設或了解資料關聯性}\\\\
  & \text{推論有強烈理論根據} & \text{可抓取資料的所有(幾乎)複雜特徵}\\\\
  & \text{符合事前假設前提下，可做更多的推論}\\\\
  & \text{符合事前假設前提下，不需大量資料} \\\\\hline
  \text{缺點} & \text{所有推論接基於事前假設，常難以驗證假設的正確性} & \text{模型難以解釋(黑盒子)}\\\\
  & \text{難以抓取資料中過於複雜的特徵} & \text{推論無強烈理論根據} \\\\\hline
  \text{專家} & \text{統計背景} & \text{資訊背景及統計背景} \\\\\hline
  \end{array}\\)

## 結論
+ 統計模型的重點是有合理的事前假設
  + 在有合理假設之情況下，統計模型能發揮效力(即使資料量少)
+ 機器學習的重點是大量有代表性的資料
  + 在有大量有效資料之情況下，機器學習能發揮效力(即使人類對資料間的關聯之了解並不多)
+ 何時使用統計方法? 何時使用機器學習?
  + 資料關聯性清楚，容易給予合適的模型假設時，建議使用統計模型
  + 資料無明確規則(如影像及語音辨識)，且資料量夠多時，建議使用機器學習方法(可以佐以人為提示)

## 統計與機器學習類似的專有名詞
\\(\begin{array}{ll}
\text{Statistics} & \text{Machine Learning}
\text{response, dependent variable} & \text{label} \\\\\hline
\text{covariate, explanatory variable, independent variable} & \text{feature} \\\\\hline
\text{model} & \text{network} \\\\\hline
\text{parameter, coefficient} & \text{weight} \\\\\hline
\text{fitting} & \text{learning} \\\\\hline
\text{refression, classification} & \text{supervised learning} \\\\\hline
\text{density estimation, cluster} & \text{unsupervised learning} \\\\\hline
\end{array}\\)
