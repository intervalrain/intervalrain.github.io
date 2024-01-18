---
title: "[ML] 簡單實作測試"
keywords: ["Machine Learning", "python"]
description:
date: 2023-04-30T00:35:59+08:00
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

## 線性迴歸建模

### 載入資料
```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib as mlp

url = "sample.csv"
data = pd.read_csv(url)

x = data["x-axis"]
y = data["y-axis"]
```

### 畫圖
```python
def plot(x, y, w, b):
    line = w * x + b
    plt.plot(x, line, color="red", label="prediction")
    plt.scatter(x, y, color="blue", label="data", marker="x")
    plt.title("Title")
    plt.xlabel("x Axis")
    plt.ylabel("y Axis")
    plt.xlim([0,12])
    plt.ylim([20,140])
    plt.show()
plot(x, y, 10, 20)
```

### 定義 cost function
```python
def cost_function(x, y, w, b):
    y2 = w * x + b
    cost = (y - y2) ** 2
    return cost.mean()
cost_function(x, y, 10, 20)
```
+ 假設在 b = 20 的情形下，找 w 的最小值
```python
w_arr = []
costs = []
for w in range(-100, 101):
    w2 = 10 + w/100
    cost = cost_function(x, y, w2, 20)
    w_arr.append(w2)
    costs.append(cost)
import matplotlib.pyplot as plt
plt.title("cost function - when b = 20)
plt.xlabel("w")
plt.ylabel("cost function")
plt.plot(w_arr, costs)
plt.show()
```

### 利用 numpy 計算矩陣
```python
import numpy as np
ws = np.arange(-100, 101)
bs = np.arange(-100, 101)
costs = np.zeros((201, 201))
i = 0
for w in ws:
    j = 0
    for b in bs:
        cost = cost_function(x, y, w, b)
        costs[i,j] = cost
        j = j+1
    i = i+1
print(costs)
```

### 畫 3d 圖
```python
ax = plt.axes(projection="3d")
ax.xaxis.set_pane_color((1,1,1))
ax.yaxis.set_pane_color((1,1,1))
ax.zaxis.set_pane_color((1,1,1))

plt.figure(figsize=(7,7))
ax.view_init(30, -110)
b_grid, w_grid = np.meshgrid(bs, ws)
ax.plot_surface(w_grid, b_grid, costs, cmap="Spectral_r", alpha=0.7)
ax.plot_wireframe(w_grid, b_grid, costs, alpha=0.1)
ax.set_title("loss function")
ax.set_xlabel("w")
ax.set_ylabel("b")
ax.set_zlabel("loss")

w_index, b_index = np.where(costs == np.min(costs))
ax.scatter(ws[w_index], bs[b_index], costs[w_index, b_index], color="red", s=40)
plt.show()
```

### 計算梯度
+ \\(\text{cost} = (\text{y}_\text{pred}-\text{y})^2\\\\
\text{cost} = (\text{y}-(\text{w}\times\text{x}+\text{b}))^2\\\\
\text{m} _\text{w} = -2\times\text{x}(\text{y-wx-b})\\\\
\text{m} _\text{b} = -2\times(\text{y-wx-b})\\\\
\\)
```python
def compute_gradient(x, y, w, b):
    w_gradient = 2*x*(w*x+b-y).mean()
    b_gradient = 2*(w*x+b-y).mean()
    return w_gradient, b_gradient
```

### 利用梯度下降計算 cost 最小值
+ \\(\text{w}_2=\text{w}-\text{m} _\text{w} \times \text{learning\\_rate}\\)
+ \\(\text{b}_2=\text{b}-\text{m} _\text{b} \times \text{learning\\_rate}\\)
```python
learning_rate = 0.001
for i in range(10):
    w_gradient, b_gradient = compute_gradient(x, y, w, b)
    w = w - w_gradient * learning_rate
    b = b - b_gradient * learning_rate
    cost = cost_function(x, y, w, b)
    print(f"Iteration {i} : Cost {cost}, w: {w}, b: {b}")
```

### gradient_descent 函式
```python
def gradient_descent(x, y, w_init, b_init, learning_rate, cost_function, gradient_function, run_iteration):
    c_hist = []
    w_hist = []
    b_hist = []
    w = w_init
    b = b_init
    for i in range(run_iteration):
        w_gradient, b_gradient = gradient_function(x, y, w, b)
        w = w - w_gradient * learning_rate
        b = b - b_gradient * learning_rate
        cost = cost_function(x, y, w, b)
        w_hist.append(w)
        b_hist.append(b)
        c_hist.append(cost)
    return w, b, w_hist, b_hist, c_hist
```

## 多特徵的預測
```python
from sklearn.model_selection import train_test_split

scaler = StandardScaler()
scaler.fit(x_train)
x_train = scaler.transform(x_train)
x_test = scaler.transform(x_test)

x_real = np.array([[5.3, 2, 1, 0], [7,2, 0, 0, 1]])
x_real = scaler.transfrom(x_real)
y_real = (w_final*x_real).sum(axis=1) + b_final
y_real
```

### 「特徵縮放」加速 gradient descent
+ w1*x1+w2*x2+w3*x3+w4*x4+b
+ 因分布範圍不同，調整參數，最好令每一個乘積都相當
+ 相當於是標準化：\\(\frac{\text{x-平均值}}{標準差}\\)
```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
scaler.fit(x_train)
x_train = scaler.transform(x_train)
x_test = scaler.transform(x_test)
```

## 邏輯迴歸 Logistic Regression
### Sigmoid Function
+ 當模性呈現 0-1 關係(邏輯迴歸)時可用
+ \\(\text{Sigmoid Function}=\frac{1}{1+e^{-z}}\\)

```python
def sigmoid(z):
    return 1/(1+np.exp(-z))
```
```python
w = np.array([1,2,3,4])
b = 1
z = (w*x_train).sum(axis=1) + b
sigmoid(z)
```