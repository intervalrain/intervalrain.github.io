---
title: "[ML] 選擇 loss function/ optimizer/ metrics"
keywords: ["ML", "optimizer"]
description: "Optimizer"
tags: ["ML"]
date: 2024-02-14T15:39:25+08:00
draft: false
Categories: DL     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
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

### 建構模型
+ `Dense(units, activation)`
+ units 為 output_size，keras 已經處理好自動計算 input_size 的部分。
+ activation function
    + `relu`: Rectified Linear Unit, ReLU
    + `softmax`: 對陣列中所有元素做自然對數取值後，在做 normalize，目的是放大最大權重的元素，並且將所有值換成 0~1 的值，意義類似機率。
```
model.keras.Sequential([
    Dense(32, activation="relu"),
    Dense(64, activation="relu"),
    Dense(32, activation="relu"),
    Dense(10, activation="softmax"),
])
```

### 編譯
+ 損失函數(目標函數) loss function
    + CategoricalCrossentropy
    + SparseCategoricalCrossentropy
    + BinaryCrossentropy
    + MeanSquareError
    + KLDivergence
    + CosineSimilarity
    + ...
+ 優化器 optimizer
    + SGD (可搭配 momemtum)
    + RMSprop
    + Adam
    + Adagrad
    + ...
+ 評量指標 metrics
    + CategoricalAccuracy
    + SparseCategoricalAccuracy
    + BinaryAccuracy
    + AUC
    + Precision
    + Recall
    + ...

以下範例兩種型式都可以。其中物件的用法可以使用客製化的條件。
```
model.compile(optimizer="rmsprop",
              loss="mean_square_error",
              metics=["accuracy"])

model.compile(optimizer=keras.optimizers.RMSprop(learning_rate=1e-4),
              loss=keras.meanSquaredError(),
              metrics=[keras.metrics.BinaryAccuracy])
```

### 洗牌
+ 收集完資料之後，我們目的並非只在**訓練資料**上取得良好的模型，而是要取得在**大部分狀況下**都表現良好的模型。
+ 故我們需要將收集完的資料分成**訓練集**與**驗證集**。
+ 以下透過 `np.random.permutation()` ，與 `slice` 來對資料做抽樣。
```
indices_permutation = np.random.permutation(len(data))
shuffled_inputs = data[indices_permutation]
shuffled_targets = labels[indices_permutation]

num_validation_samples = int(0.3 * len(data))
val_inputs = shuffled_inputs[:num_validation_samples]
val_targets = shuffled_targets[:num_validation_samples]
training_inputs = shuffled_inputs[num_validation_samples:]
training_targets = shuffled_targets[num_validation_samples:]

model.fit(
    training_inputs,
    training_targets,
    epochs=5,
    batch_size=16,
    validation_data=(val_inputs, val_targets)
)
```