---
title: "[IT] 初始 react project (TailwindCSS & TypeScript & Context)"
keywords: ["IT", "react", "TypeScript", "TailwindCSS"]
description: 
date: 2024-11-28T16:33:39+08:00
tags: ["IT", "react", "TypeScript", "TailwindCSS"]
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

1. 建立專案
```bash
npx create-react-app [project-name] --template typescript
cd [project-name]
```

2. 安裝 TailwindCSS 及其相依套件：
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. 設定 tailwind.config.js：

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. 在 src/index.css 中加入 Tailwind directives：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```