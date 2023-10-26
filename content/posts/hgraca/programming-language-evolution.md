---
title: "[IT] 程式語言的演進 Programming Language Evolution"
keywords: ["Software Architecture"]
description:
date: 2023-10-14T02:09:18+08:00
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
程式設計語言本身並非架構的產物，但如果我不寫關於它，我會覺得《軟體架構編年史》似乎缺少了些什麼。

那麼，讓我們快速回顧一下程式語言的歷史，它的演變，並檢查我們可以從中學到什麼。我在文章中加入了一些日期，僅作為參考，它們應被視為大致的估計，重要的是演變的順序和他們試圖解決的問題。

# 1950s - Non-structured Programming

Assembly ~1951 

軟體開發曾是一項非常晦澀的活動，只在世界上少數地方進行。當時流行的語言是組合語言，它使用了非常低階的操作，如 `add`, `sub`, `goto`，並直接操作記憶體地址。建立一個簡單的應用程式既緩慢又困難。要創建一個簡單的 `if` 語句，我們需要幾行程式碼，對於一個迴圈，則需要超過幾行的程式碼...稍後才出現了將程式碼分組和重用的可能性，所以當時的編碼風格非常線性，程式碼的重用僅限於在檔案內或檔案間複製和貼上程式碼。

# 1960s – Structured Programming

Algol ~1958, Fortran 

結構化程式設計出現了，引入了 code blocks 概念，控制結構 `if`, `then`, `else`, `case`, `for`, `while`, `do`, ...，和子程序的構造。然後，我們可以創建更有趣的程式流程，更重要的是，我們可以將程式碼指令分組並重用它，儘管有一些限制，例如子程序總是對同一全域變數進行操作。但就在這個時候，**重用性 (reusability)** 的概念開始被使用。

# 1970s – Procedural & Functional Programming

Pascal ~1970, C ~1972

程序和函數式程式設計在1970年代開始活躍起來。到了這個時候，我們終於有了：

+ **程序(Procedures)**：一組不返回數據的指令
+ **函式(Functions)**：一組會回傳資料的指令集
+ **資料結構(Data structures)**：記錄，類似於關聯式陣列
+ **模組(Modules)**：可以被導入到其他程式碼檔案的程式碼檔案。

在1970年代，「Spaghetti code」這個詞也被創造出來，這是在Edsger W. Dijkstra於1968年寫給「計算機機構通訊」(CACM)的信中提出的，該信的標題為「Go To Statement Considered Harmful」。

在1970年代晚期，事件導向程式設計(Event Oriented Programming)的初步概念首次浮現，而Trygve Reenskaug則撰寫了他關於MVC（使用事件）的論文。

有了這些改進，因此我們有更好的**重用性(reusability)**，因為子程序（程序和函式），我們可以使用不同的數據執行相同的邏輯。我們也可以通過將相關數據分組到複雜的數據結構中來模擬**領域概念(domain concepts)**。最後，我們在**解耦(decoupling)和模組化(modularity)**方面邁出了第一步，我們可以創建在其他程式碼文件和事件中可重用的程式碼，以將客戶端程式碼與正在執行的邏輯解耦。

# 1980s – Object Oriented Programming

Simula ~1965, Smalltalk-71 ~1971, C++ ~1980, Erlang ~1986, Perl ~1987,
Python ~1991, Ruby ~1993, Delphi, Java, Javascript, PHP ~1995

關於物件導向程式設計（OOP）的理論與思想早在1960年代就已經開始，並在1960年代首次實施：Simula。

然而，正是在1980年代，當前的程式設計範疇的使用變得普遍化：物件導向程式設計，具有 Visibility levels, methods (messages), objects, classes，以及稍後的 packages。這就等同於說增加了**封裝(encapsulation)**和**模塊化(modularity)**：
+ **Visibility levels** 讓我們能夠控制哪些程式碼可以存取特定的數據集。
+ **Classes** 讓我們能夠定義/模擬領域概念。
+ **Objects** 讓我們能擁有同一領域概念的不同實例。
+ **Packages** 讓我們可以將一起代表某個領域或功能概念並共同完成某些任務的類別群組化。
+ **Methods**，功能上代表程序和函式，但從概念上應被視為可以發送給特定類型物件的 messages(commands)。

# 1990s – Subject & Aspect Oriented Programming

在1990年代，主題導向程式設計和切面導向程式設計浮出水面。

**主題導向程式設計**要求對物件有不同的表示方式，這取決於誰在「觀察」它。例如，當一個人看到一棵樹時，他可能會看到木頭，而一隻鳥可能會看到食物和庇護所。將這種情況轉化為程式設計，這意味著物件的屬性和行為可以有所不同，這取決於誰向物件發送消息（誰觸發了物件上的一種方法）。

**切面導向程式設計**試圖通過在「編譯」時間注入額外的程式碼，將交叉關注點與實際的業務邏輯完全分離。例如，一個切面可以是一個方法名稱。交叉關注點可以是，例如，日誌記錄。使用AOP，我們可以簡單地配置系統以注入執行日誌記錄的代碼到符合特定模式的所有方法中，例如，「記錄所有以 `find` 開頭的方法的調用」。（TYPO3是一個使用AOP的CMS的例子）


# Beyond OOP 超越物件導向程式設計
在導向物件程式設計（OOP）建立之後，我們的主要關注點已經轉向為網路程式設計做調整，進化現有的語言，創建專門用於網頁開發的新語言，開發框架，調整工具和架構以適應現今大量的請求和數據。

有些嘗試去演進程式語言，如主題導向程式設計（物件的行為會因觸發該行為的主題而有所不同），或是切面導向程式設計（在編譯時注入程式碼），但實質上，程式語言的範疇並未有太大的變化，我們仍然在大多數情況下使用物件導向程式設計。儘管近來函數式語言似乎已經開始獲得一些採納（也許是一種炒作？）。

# Conclusion 結論
我想要表達的觀點是，在軟體開發歷史的最初幾十年裡，程式語言的演進是為了提供重用性，但也是為了讓軟體做好變更的準備（無論是改變功能、重構或完全替換一部分的程式碼），它們朝著**模組化（低耦合）** 和 **封裝（高內聚）** 的方向演進。

如我們將在我接下來的文章中看到，架構繼續在演進，儘管在更高的抽象層次上。