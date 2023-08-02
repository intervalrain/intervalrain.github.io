---
title: "[ML] 01. 機器學習基本概念簡介"
keywords: ["ML", "Linear Model", "Piecewise Linear Curve", "sigmoid", "ReLU", "Batch", "Epoch"]
description: "什麼是機器學習，機器學習任務，監督式學習的運作流程"
date: 2023-08-02T23:56:25+08:00
tags: ["ML"]
draft: false
Categories: ML
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
# 前言
<!-- {{< img "/posts/ML/lhy/1_1.png" 500 >}} -->
<!-- ![1_1](/posts/ML/lhy/1_1.png) -->
{{< togb "什麼是機器學習" >}}
+ 機器學習(Machine Learning)，就是利用機器的力量幫忙找出函式。
    + Input 可以是 
        + vector
        + matrix
        + sequence
    + Output 可以是
        + **Regression**
        + **Classification**
        + **Structed Learning**(令機器產生有結構的東西 eg. text, image)
{{< togb "示意圖" >}}
![1_1](/posts/ML/lhy/1_1.png)
{{< toge >}}
{{< toge >}}
{{< togb "什麼是深度學習" >}}
+ 深度學習(Deep Learning)，就是利用神經網路(neural network)的方式來產生函數。
{{< toge >}}

# 機器如何學習
## 1. 基本原理(訓練三步驟)
![1_2](/posts/ML/lhy/1_2.png)

{{< togb "Step 1: 使用合適的 Model" >}}
+ \\(y=f(\text{\red{data}})\\)
    + Function with unknown parameters
    + **Model**: \\(\boxed{y=b+wx_1}\\)
        + \\(w: \text{weight}\\)
        + \\(b: \text{bias}\\)
        + \\(x: \text{feature}\\)
{{< toge >}}

{{< togb "Step 2: 定義 Loss function" >}}
+ Define loss from training data
    + 以 Model 的參數 \\(w,b\\) 來計算 Loss
    + 物理意義：Loss 愈大代表參數愈不好，Loss 愈小代表參數愈好。
+ 計算方法：求估計的值與實際的值(label)之間的差距
    + Loss function: \\(\boxed{L=\frac{1}{N}\sum_ne_n}\\)
    + MAE (mean absolute error): \\(e=|y-\hat{y}|\\)
    + MSE (mean square error): \\(e=(y-\hat{y})^2\\)
    + Cross-entropy: 計算**機率分布**之間的差距
+ ***Error Surface***: 根據不同的參數，計算出 loss 所畫出來的等高線圖。
    ![1_3](/posts/ML/lhy/1_3.png)
{{< toge >}}
{{< togb "Step 3: Optimization" >}}
+ 找到 loss 最小的參數組合 \\((w,b)\\)
+ 方法：**Gradient Descent**
    + \\(\boxed{w' = w - \red{\eta}\frac{\partial L}{\partial w}|_{w=w^0,b=b^0}}\\)
    + \\(\boxed{b' = b - \red{\eta}\frac{\partial L}{\partial b}|_{w=w^0,b=b^0}}\\)
    + \\(\red{\eta}\\): **學習率 learning rate**, 決定 gradient descent 的一步有多大步
![1_4](/posts/ML/lhy/1_4.png)
{{< toge >}}
## 2. Linear Model
+ \\(\boxed{f\leftarrow y=b+\sum_{j=1}^{n}{w_jx_j}}\\)
    + 不只考慮前一天的觀看人數 \\(x_1\\)，也考慮前二~七天 \\(x_2, x_3, ... , x_7\\)。
    + 當參數變多時，命中率可望有效提升。

## 3. Piecewise Linear Curves(Sigmoid)
+ \\(\text{Sigmoid Function:} \boxed{y=\red{c}\frac{1}{1+e^{-(\green{b}+\blue{w}x_1)}}}=\boxed{\red{c}\text{ sigmoid}(\green{b}+\blue{w}x_1)}\\)
+ 將 \\(w_ix_i\\) 替換成 \\(c_i\text{ sigmoid}(b_i+w_ix_i)\\)
    + 特徵為1時，\\(\boxed{y=b+\sum_i{c_i\text{ sigmoid}(b_i+ w_ix_1)}}\\)
    + 特徵>1時，\\(\boxed{y=b+\sum_i{c_i\text{ sigmoid}(b_i+\sum_j w_{ij}x_j)}}\\)
+ 意義：一條曲線可以由多個鋸齒狀的線段(hard sigmoid)的總合，我們可以用 sigmoid 函數來逼近 hard sigmoid。事實上，sigmoid 的個數就是神經網路中一層 neuron 的 node 數，至於使用幾個 sigmoid 是 hyper parameter。
![1_5](/posts/ML/lhy/1_5.png)
{{< togb "可將公式轉成矩陣計算+激勵函數的形式：" >}}
![1_6](/posts/ML/lhy/1_6.png)
![1_7](/posts/ML/lhy/1_7.png)
![1_8](/posts/ML/lhy/1_8.png)
{{< toge >}}
+ 以線性代數方式表示：\\(\boxed{y=b+c^T\sigma(b_i+Wx)}\\)
    + 將 \\(b\\)、\\(b_i\\)、\\(W\\)、\\(c^T\\) 等所有參數統稱為 \\(\theta\\)
    + 故 Loss 可表示成 \\(L(\theta)\\)
    + 重覆 gradient descent 的方法，更新(update) 參數。
    + 梯度 gradient，\\(g=\\)
    \\(\begin{bmatrix}\frac{\partial L}{\partial \theta_1}|_{\theta=\theta^0}\\\\\frac{\partial L}{\partial \theta_2}| _{\theta=\theta^0}\\\\\vdots\end{bmatrix}=\nabla L(\theta^0)\\)
    + 更新(update)計算：\\(\begin{bmatrix}\theta_1^1\\\\\theta_2^1\\\\\vdots\end{bmatrix}\leftarrow\begin{bmatrix}\theta_1^0\\\\\theta_2^0\\\\\vdots\end{bmatrix}-\begin{bmatrix}\eta \frac{\partial L}{\partial \theta_1}|_{\theta=\theta^0}\\\\\eta\frac{\partial L}{\partial\theta_2}| _{\theta=\theta^0}\\\\\vdots\end{bmatrix}\\)
    + 或寫成 \\(\theta^1\leftarrow \theta^0-\eta g\\)
    {{< togb "batch training" >}}
    ![1_9](/posts/ML/lhy/1_9.png)
    {{< toge >}}
    + 將樣本依批次(batch)進行更新，當所有的 batches 都跑過一遍，稱為一個 **epoch**
    
## 4. ReLU
+ 用 hard sigmoid 的方式來表示。
    + 其每一個 hard sigmoid 由兩個 **Rectified Linear Unit(ReLU)** 組成，
    + 每一個 ReLU 寫成：\\(\boxed{\red{c}\text{ max}(0,\green{b}+\blue{w}x_1)}\\)
    + 故 Model 可以寫成：\\(\boxed{y=b+\sum_{\red{2}i}\text{max}(0,b_i+\sum_j{w_{ij}x_j})}\\)
    + 其中我們選用來逼近的函式，稱為 **Activation function**。
# 深度學習
+ Neural Network
    + \\(\boxed{y=b+c^T\sigma(b_i+Wx)}\\)
    + Multiple hidden layers -> Deep learning
![1_10](/posts/ML/lhy/1_10.png)