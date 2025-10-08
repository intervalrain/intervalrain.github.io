---
title: "[Vim] 常見 Vim Commands"
date: 2025-10-08T11:34:35+08:00
tags: ["Vim", "CLI"]
draft: false
Categories: programming
description: "My favorites Vim commands"
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

# Vim Cmds

## Mode Change
1. 進入編輯模式: `i`, `a`, `o`, `R`(取代)
2. 存檔: `:w` + `Enter`
3. 存檔且離開: `:wq` + `Enter`
4. 回到一般模式: `Esc`

## Function Keys
1. 離開: `:q!` + `Enter`
2. 回到當前行的最前/後: `0`, `$`
3. 移動 n 格/列: `數字` + `↑` || `↓` || `→` || `←` || `Enter`(向下) || `Space`(向右)
4. 移動到第幾行: `數字` + `g`
5. 到首行: `[[`
6. 到末行: `]]`
7. 上一頁/下一頁: `fn` + `↑` || `↓`  

## Search and Replace
1. 查找: `/`(downward) || `?`(upward)
2. 移動到下一個: `n`, `N`
3. 預覽且取代: `/word` + `Enter` + `ciw`(change inner word) + `{內容}` + `Esc` + loop(`n`, `.`)

## Delete
1. del 跟 backspace: `x`, `X`
2. 刪除 n 個字: `數字` + `x` 
3. 刪除整行: `dd`
4. 刪除 n 行: `數字` + `dd`

## Copy & Paste
1. 複製當行: `yy`
2. 先 `v` 移動，再 `y`
3. 貼上: `p`

## Redo
1. 復原前一動: `u`
2. 重做上一動: `Ctrl` + `r`
3. 重複上一動: `.` 
