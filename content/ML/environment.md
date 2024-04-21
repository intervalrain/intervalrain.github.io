---
title: "[ML] Start Tensorflow Environment with Conda"
keywords: ["Machine Learning", "tensorflow", "anaconda"]
description: 
date: 2023-10-11T20:48:34+08:00
tags: ["ML"]
draft: false
Categories: "ML"
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

# 環境建置
1. 安裝 Anaconda
2. 創建虛擬環境
```
conda create -n tensorflow
```
3. 進入虛擬環境 (macOS/Linux)
```
source activate tensorflow
```
4. 在環境內安裝 tensorflow
```
pip install tensorflow
```
5. 在環境內安裝 jupyter notebook
```
pip install jupyter notebook
```
6. 在環境內安裝 pandas
```
pip install pandas
```
7. 開啟 jupyter notebook
```
jupyter notebook
```

# For terminal user
1. 開始 Anaconda.Navigator
![conda](/ML/images/conda.png)
2. 在 Environments 中安裝指定模組 ex.`tensorflow`, `keras`
3. 在 terminal 中輸入 conda activate {環境名稱}
```
conda activate tensorflow
```
4. 開啟 python 
```
python
```
若成功便會顯示 python 安裝資訊
```
Python 3.11.5 (main, Sep 11 2023, 08:17:37) [Clang 14.0.6 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.
```
大功告成，接著嘗試訓練第一筆資料
