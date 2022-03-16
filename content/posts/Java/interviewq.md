---
title: "[Java] 面試常見問題"
date: 2022-03-16T02:45:45+08:00
tags: ["Java", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, Operating System, CS50
description: "針對Java常見面試考題整理，持續更新。" 
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
hidemeta: false
comments: false
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
### 1. 請說明 Final, Finally, Finalize 三者不同?
+ Final:
    + 一種修飾關鍵字。
    + 加在**變數**前，使變數成為常數。
    + 加在**方法**前，使方法無法被覆寫(override)。
    + 加在**類別**前，使類別不能被繼承(extend)。
+ Finally:
    + 例外處理關鍵字，Try-Catch-Finally
    + 功能為**保證一定執行**，用意是做資源釋放。
+ Finalize: 
    + 是Object類別的方法，故所有物件都一定有此方法。
    + 當物件要銷毀前會執行的方法，此外可以透過 `System.gc()` 呼叫資源回收。


### 2. 請說明 String 字串中 == 與 .equals() 哪裡不同?
+ ==:
    + 比較儲存的值，基本型別(primitives)是儲存在 Stack 中，因此值會相同，字串是儲存在 String Pool 中，故 Stack 中存的是**址**。
    + 使用 `==` 比較字串時，其實是比較他們的**址**。
+ equals():
    + 是 String 覆寫後的 equals 方法，比較值。

+ 補充：
    + Java 的字串有 String Pool 機制，當宣告一個新的字串時，Java 會先去 String Pool 中尋找是否有相同的字串，有則共用，無則新增。
        + 若使用 `String s1 = "Hello World";` 來宣告，則會透過字串池。
        + 若使用 `String s2 = new String("Hello World")` 來宣告，則字串會存在 Heap 中，與上者的址不同。

### 3. 使用 "abc".equals(s) 比較好還是 s.equals("abc")?
+ 等效。
+ 前者不會出現 NullPointerException。

### 4. Arrays 與 ArrayList 的差異?
+ Arrays 可包含原始(primitive)及物件(object)，ArrayList只允許物件。
+ Arrays 大小固定，ArrayList 可動態調整。
+ ArrayList 提供許多方法，如 removeAll、iterator等。

### 5. stack 與 heap 的區別?
+ stack: 可被預測生命週期的變數或函數資訊都放在 stack，例如：區域變數(local variable)、物件或陣列的返回位址(function/method return address)等資訊。
+ heap: 動態配置的記憶體空間，放置被 new 出來的物件以及內含的成員變數。

### 6. Arrays 與 String 的大小
+ Arrays 有 length 這個屬性。
+ String 有 legnth() 這個方法。

### 7. throw 與 throws 的區別
+ throws: throws 關鍵字通常被應用在聲明方法時，放在方法的大括號前，用來拋出異常，多個異常可以使用逗號隔開。後續使用者要調用方法時必須要拋出異常或者使用 try-catch 語句處理異常。
+ throw: throw 關鍵字通常用在設計方法時，預先宣告可能會產生的例外，後續方法使用者需要使用 try-catch 處理例外，或者使用 throws 關鍵字再拋出例外。
+ 補充：
  + throw 用於方法內，throws 用於方法的聲明。
  + throw 用於方法內拋出異常，throws 用於方法聲明上拋出異常。
  + throw 後面只能有一個異常，throws 可以聲明多個異常。

