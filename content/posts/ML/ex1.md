---
title: "[ML] sample1 - 手寫數字辨識"
keywords: ["Software Architecture"]
description: 
date: 2023-10-28T14:11:35+08:00
tags: ["Software Architectrue"]
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
# MNIST
NIST(National Insitute of Standards and Technology) 是美國國家標準與技術研究院，MNIST 是由 NIST 所提供的一組經典的機器學習測資，可以想成是深度學習中的「Hello World!」，它由 60000張 訓練圖片與 10000 張測試圖片所組成，為手寫數字的灰階圖片，大小為 28 * 28 像素，分類 0 到 9 共 10 個數字。

+ 可透過 keras 模組直接取得資料
```python
>>> from tensorflow.keras.datasets import mnist
```
+ 輸入 `mnist.load_data()` 可取得 mnist 資料集，回傳值為 2*2 的 tuple of ndarray。
```python
>>> (train_images, train_labels), (test_images, test_labels) = mnist.load_data()
```
+ tuple 裡面裝載的是 NumPy 的 ndarray 物件，我們可以利用
    + `o.shape` 來取得 ndarray 的屬性
    + `len(o)` 來取得陣列的個數
```python
>>> train_images.shape
(60000, 28, 28)                             # 3 軸陣列，其大小為 60000 * 28 * 28
>>> test_images.shape
(10000, 28, 28)                             # 3 軸陣列，其大小為 10000 * 28 * 28
>>> len(train_labels), len(test_labels)
(60000, 10000)                              # 訓練集與測試集各有 60000 與 10000 筆 labels
>>> train_labels
array([5, 0, 4, ..., 5, 6, 8], dtype=uint8) # train_labels 裝 60000 筆資料對應的解答(0-9 的數字)
```
+ 我們可以利用 `matlabplot` 把圖片印出來看看
```python
plt.matshow(train_images[0], cmap = plt.get_cmap('gray'))
plt.show()
```
{{< img "/posts/ML/images/mnist_0.png" 360 >}}

# 用 Dense 層建構神經網路
首先我們需要建立神經網路架構，層(layer)是組成神經網路的基本元件，一個層就是一個資料處理的模組。具體而言，每一層都會從資料中萃取出特定的轉換或表示法，經過數層的資料萃取(data distillation)後，將資料「過瀘」成最後特定的轉換或表達(representation)。

我們將會使用兩個密集層[^1](Dense Layers)緊密連接。`Dense()` 函式中的第一個參數代表層的寬度，亦即神經元單元的個數，第二個參數代表使用的 activation function，是在模型中使用的數學方程式(可參考 [這篇文章lhy](../lhy01))。
```python
from tensorflow import keras
from tensorflow.keras import layers
model = keras.Sequential([
    layers.Dense(512, activation='relu'),
    layers.Dense(10, activation='softmax')
])
```
[^1]: 密集層又稱全連接神經層(fully connected)，代表前一層的單元會將訊號傳給後一層的**所有**單元。
# 編譯神經網路，並指定 optimizer, loss, metrics
為了讓神經網路進行訓練，我們還需要準備 3 個元件才可能進行編譯：
+ 損失函數(loss function): 用以衡量神經網路在訓練資料上的表現，以及引導網路朝正確的方向修正。
+ 優化器(optimizer): 神經網路根據訓練資料及損失函數值來自行更新權重滿數的機制。
+ 評量指標(metrics): 我們關心的議題，例如 MNIST 資料集，我們關心的是辨識數字的**準確度**。
```python
model.compile(optimizer='rmsprop',
             loss='sparse_categorical_crossentropy',
             metrics=['accuracy'])
```

# 預處理
我們需要把 (60000, 28, 28) 且灰階像素為 [0, 255] 的陣列轉換成 (60000, 28*28) 且灰階像素為 [0, 1] 的陣列，我們會使用到兩個 NumPy 的函式：
+ `reshape()`: 將 3 軸陣列轉成 2 軸陣列
+ `astype()`: 用於轉型
```python
train_images = train_images.reshape(60000, 28*28)
train_images = train_iamges.astype('float32')/255
test_images = test_images.reshape(10000, 28*28)
test_images = test_images.astype('float32')/255
```

# 訓練模型
+ 使用 `fit()` 函式進行模型訓練，其中我們可以指定 `epoch` 的數量，與 `batch_size`。
```python
>>> model.fit(train_images, train_labels, epochs=10, batch_size=256)
```
我們可以從 terminal 上看到模型迭代的狀況：
+ loss 代表損失值，accuracy 代表準確度。
```python
Epoch 1/10
235/235 [==============================] - 1s 2ms/step - loss: 0.3111 - accuracy: 0.9099
Epoch 2/10
235/235 [==============================] - 1s 2ms/step - loss: 0.1309 - accuracy: 0.9617
Epoch 3/10
235/235 [==============================] - 1s 2ms/step - loss: 0.0862 - accuracy: 0.9744
Epoch 4/10
235/235 [==============================] - 1s 2ms/step - loss: 0.0626 - accuracy: 0.9817
Epoch 5/10
235/235 [==============================] - 1s 2ms/step - loss: 0.0476 - accuracy: 0.9864
Epoch 6/10
235/235 [==============================] - 1s 2ms/step - loss: 0.0363 - accuracy: 0.9893
Epoch 7/10
235/235 [==============================] - 1s 2ms/step - loss: 0.0288 - accuracy: 0.9917
Epoch 8/10
235/235 [==============================] - 1s 2ms/step - loss: 0.0221 - accuracy: 0.9940
Epoch 9/10
235/235 [==============================] - 1s 2ms/step - loss: 0.0175 - accuracy: 0.9952
Epoch 10/10
235/235 [==============================] - 1s 2ms/step - loss: 0.0138 - accuracy: 0.9966
```
# 預測
模型訓練好後，我們要將測試集的資料拿來做預測，我們會使用到函式 `predict`。
+ `predict()` 會接受測資，並回傳一組陣列，以本例來說會回傳一組 (10000, 10) 的陣列，第一個值代表第幾筆資料，第二個值代表對應到 0-9 數字的機率。
```python
>>> pred = model.predict(test_images)
>>> pred.shape
(10000, 10)
>>> pred[0]
array([8.2497134e-11,   # 數字為 0 的機率
       4.1868242e-11,   # 數字為 1 的機率 
       3.5524021e-08,   # 數字為 2 的機率 
       2.0555583e-05,   # 數字為 3 的機率
       3.8774672e-13,   # 數字為 4 的機率 
       8.9763769e-10,   # 數字為 5 的機率 
       2.1514412e-16,   # 數字為 6 的機率 
       9.9997938e-01,   # 數字為 7 的機率
       2.2517939e-09,   # 數字為 8 的機率 
       8.8137547e-08    # 數字為 9 的機率
       ], dtype=float32)
```
![mnist_1](/posts/ML/images/mnist_1.png)

+ 我們可以用 NumPy 提供的函式來找出所有測試集對應到最大機率的索引值：
+ `argmax()` 可以回傳陣列中的最大值，指定 axis 可以指定對哪一軸進行搜尋。
```python
>>> pred[0].argmax()
7
>>> ans = pred.argmax(axis=1)
array([7, 2, 1, ..., 4, 5, 6])
>>> test_labels
array([7, 2, 1, ..., 4, 5, 6], dtype=uint8)
```
# 評估
最後，我們想要知道我們模型的準確度，我們可以使用函式 `evaluate`，並放入我們的測資與解答。
+ 結果顯示，我們的準確度為 0.9810，與我們測試集的準確度 0.9966，中間存在的差距為過度配適(overfitting)，這會在未來在專題進行討論。
```python
>>> test_loss, test_acc = model.evaluate(test_images, test_labels)
313/313 [==============================] - 0s 411us/step - loss: 0.0676 - accuracy: 0.9810
```