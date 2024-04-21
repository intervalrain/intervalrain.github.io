---
title: "[ML] introduction"
date: 2022-06-19T18:18:52+08:00
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

# 什麼是 AI & ML & DL
> 人工智慧是我們想要達成的目標，而機器學習是想要達成目標的手段，希望機器通過學習的方式，變得跟人一樣聰明。
> 而深度學習就是機器學習的其中一種方法。
+ 人工智慧(Aritificial Intelligence, AI) → 目標
    + 機器學習(Machine Learning, ML) → 手段
        + 深度學習(Deep Learning, DL)
        + …
![history](/ML/L0/history.png)

## 在機器學習出現之前 
> 生物的行為取決於兩件事，一個是後天學習的結果，一個是天生的本能。
+ Hand-crafted rules: 人類為機器設定好的天生本能
    + 僵化，無法超越創造者
    + 需要大量人力，不適合小企業
![AIinsde](/ML/L0/AIinside.jpeg)

# 機器學習
+ 寫程式讓機器可以學習 → 尋找關聯資料的函式
    + 舉例：語音辨識、影像辨識、Alpha Go、對話機器人
+ 框架(Framework)
    + 設定一定量的函數
    + 餵入數據
    + 評估函數的好壞  
    + 找出最好的函數  
    \\(\begin{array}{rc}
    \text{step1}&\boxed{\text{Define a set of function}}\\\\
    &\downarrow\\\\
    \text{step2}&\boxed{\text{Evaluate goodness of function}}\\\\
    &\downarrow\\\\
    \text{step3}&\boxed{\text{Pick the best function}}\end{array}\\)
    ![frameword](/ML/L0/framework.png)
        + 告訴機器 input 和正確的 output 這就叫作 **supervised learning**。

# 機器學習相關的技術
![terminology](/ML/L0/terminology.png)
## 任務(Task)
### 迴歸(Regression)
+ Regression 指的是函數的輸出為 **scalar(數值)**，如 PM2.5。
### 分類(Classification)
+ Classification 指的是函數的輸出為 **東西的類別**。
    + 當分類為 Yes or No，則為 Binary Classificatino，如垃圾郵件。
    + 當分類是多個選項的，則為 Multi-Classification，如新聞分類。
### 結構性學習(Structured Learning)
+ 讓機器的輸出具有結構性。
    + 如語音辨識，聲音訊號為輸入，句子為輸出。
    + 如影像辨識，圖片是輸入，人名是輸出。
## 方法(Method)
> 選不同的 function set 就是選不同的 model。
+ Model
    + Linear Model
    + Non-linear model
        + Deep learning
        + SVM, decision tree, K-NN ...
## 場景(Scenario)
### 監督式學習
+ Supervised Learning
+ 需要 inputs 與對應的 outputs(**label**)
+ 大量的資料需求
### 半監督式學習
+ Semi-supervised Learning
+ 同時有 Labelled data 與 Unlabelled data
+ 可減少資料的需求量。
![semi-supervised](/ML/L0/semi-supervised.png)
### 遷移學習
+ Transfer Leanring
+ 有大量的 Labelled data 與 Unlabelled data
+ 其中包含有關聯的與無關聯的。
![transferlearning](/ML/L0/transferlearning.png)
### 無監督學習
+ Unsuperviesd Learning
+ 只有大量的 inputs 而沒有 outputs
+ 或大量的 outputs 而沒有 inputs
![unsupervised](/ML/L0/unsupervised.png)
### 強化學習
+ 沒有告訴機器正確的答案，機器有的只是一個分數，就是它做得好或不好。
+ Alpha Go 是 Supervised learning + Reinforcement learning (先人工餵棋譜，再讓機器人互相下棋)
> 利用 reinforcement learning 來訓練聊天機器人，把機器人發到客服電話，讓機器人自己應對客人，若客人的反應勃然大怒，則機器會學到剛才應對的方式是錯的，讓機器自己去檢討哪個步驟做的不好。
# 我們為何要學機器學習?
> 好的 AI 需要好的 AI 訓練師，AI 訓練師討選合適的 model、loss function，不同 model、loss function 適合解決不同的問題。
> 有些模型的最佳化比較困難，例如深度學習，此時可能就需要有經驗的 AI 訓練師來處理。