---
title: "[IT] React + .Net"
keywords: ["IT", "C#", "react", "typescript"]
description: 
date: 2024-06-11T22:00:23+08:00
tags: ["IT", "C#", "react"]
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

# React + .Net

## 一、環境設置 Setup

### 1. 行前準備 Prerequisites
+ 安裝 Node.js 和 npm
```bash
node -v
npm -v
```
+ 安裝 .NET SDK
```
dotnet --version
```

+ 用 vs code 下載 `ES7+ React/Redux/React-Native snippets`
因為 `rafce` 很好用, 相當於, typescript 則是 `tsrafce`
```js
import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index
```


### 2. 創建 React
+ 安裝 react
```bash
npm install create-react-app
```

+ 創建新的 react app (typescript)
    + `--template typescript` 可指定使用 typescript
```bash
npx create-react-app {project} --template typescript
cd {project}
```

+ 必要時可能要初始化一個新的 react 項目，確保版本是匹配的。
```bash
yarnpkg add --exact react-dom react-scripts
```

### 3. 基本結構
1. 函數式元件(Functional Component):
```tsx
const Card: React.FC<Props> = ({
    companyName,
    ticker,
    price
}: Props): JSX.Element => { ... }
```
+ `Card` 是一個函數式元件，使用 TypeScript 和 React。
+ `React.FC<Props>` 指定這個元件是接受 `Props` 作為參數的 React 函數式元件
+ `({ companyName, ticker, price })` 是從 `Props` 解構的屬性，這些屬性將會被傳入元件

2. JSX 標籤:
```tsx
return (
    <div className='card'>...</div>
)
```
+ 這是元件返回的 JSX，它描述了元件應該如何渲染。

### 4. State
```tsx
import React, { useState } from 'react'

type Props = {}

const Button: React.FC<Props> = (props: Props): JSX.Element => {
    const [count, setCount] = useState<number>(0);

    const onClick = (e: any) => {
        setCount(count + 1);
        console.log(e);
    }
    return (
        <div>
            <button onClick={(e) => onClick(e)}>Click me</button>
            <p>You clicked {count} times</p>
        </div>
    )
}

export default Button
```
1. 引入 React 和 useState Hook:
```tsx
import React, { useState } from 'react'
```
+ 從 React 包中引入 `useState` Hook，用於函數式元件中添加狀態。

2. 使用 `useState` Hook 定義狀態
```tsx
const [count, setCount] = useState<number>(0);
```
+ 定義一個名為 `count` 的狀態變量，初始值為 0。
+ `setCount` 是用來更新 `count` 的函數。
+ `useState<number>(0)` 指定 `count` 的類型為 `number`。

3. 定義 `onClick` 事件處理函數:
```tsx
const onClick = (e: any) => {
    setCount(count + 1);
    console.log(e);
}
```
+ `onClick` 是一個事件處理函數，接受一個事件參數 `e`。
+ 每當按鈕被點擊時， `count` 會加 1，並且會在控制台輸出事件 `e`。
+ `any` 也可被寫成 `MounthEvent` 或 `SyntheticEvent`。