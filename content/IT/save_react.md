---
title: "[IT] 拯救 react"
keywords: ["IT", "react", "js"]
description: 
date: 2024-08-16T01:44:44+08:00
tags: ["IT", "react"]
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

1. 安裝個離線版
```
npm i - g create-react-app-offline
```

2. 改用 `crao` 初始化
```
crao -n my-app
```

3. 如果 node_modules 沒有安裝正常
```
rm -rf node_modules
```

4. 重裝 node_modules
```
npm install
```

5. 重啟 react
```
npm start
```