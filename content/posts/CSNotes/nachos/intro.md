---
title: "[nachos] 概述"
date: 2022-07-05T21:56:32+08:00
tags: ["OS", "CS"]
draft: false
Categories: CS
author: "Rain Hu"
showToc: true
TocOpen: true
math: true
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

# Nachos 概述

## 簡介
+ Nachos 是一個教學用的作業系統，建立在一個軟件模擬的通用虛擬機(virtual machine)，模擬 **MIPS R2/3000** 的指令集、主存、中斷系統、網路以及磁碟系統等作業系統所必須的硬體系統。
+ R2/3000 的指令集為 **RISC 指令集**，指令數目比較少，Nachos 模擬了其中的 63 條指令，許多現有的編譯器如 g++ 能直接將 C 或 C++ 源始碼編譯成該指令集的機械碼，省去編寫編譯器的工夫，所有讀者可以直接用 C/C++ 語言編寫該應用程式，使得在 Nachos 上開發大型的應用程式成為可能。
+ 使用並實現了作業系統中的一些新的概念。包括網路、執行緒、分散式應用。並且 Nachos 中以**執行緒(thread)**作為一個基本概念講述，取代原本進程(process) 在作業系統教學中的地位。
    + nachos 虛擬機使得網路的實現相當簡單，nachos 只是一個在宿主機上運行的一個進程。在同一個宿主機上可以運行多個 nachos 進程，各個進程間可以相互通訊，作為一個為互連網路的一個節點；進程之間通過 Socket 進行通訊，模擬一個全互連發路。
+ **確定性調試**比較方便。隨機因素使系統運行更加真實。因為作業系統的不確定性，所以在一個實際的系統中進行多執行緒調試是比較困難的。由於 Nachos 是在宿主機上運行的進程，它提供了確定性調試的手段。
    + 確定性調試就是在同樣的輸入順序、輸入參數的情況下，Nachos 運行的結果是完全一樣的。在多執行緒的調試中，可以將注意力集中在某一個實際問題上，而不受作業系統不確定性的干擾。
    + 另外，Nachos 採用了隨機因子來模擬真實作業系統的不確定性。
+ 簡單而易於擴展。Nachos 的目的不是展示一個成功的作業系統，而是提供一個框架使讀者可以發揮自己的創造性進行擴展。
    + 例如一個完整的類似於 UNIX 的文件系統是很複雜的，但是對於文件系統而言，無非是需要實現文件的邏輯地址到物理地址的映射以及實現文件 inode、打開文件結構、執行緒打開文件表等重要的數據結構以及維護它們之間的觀係。Nachos 具有以上所有這些內容，但是在很多方面做了一定的限制，比如只有一級索引結構限制了系統中最大文件的大小。讀者可對文件系統進行擴展，逐步消除這些限制。
+ **物件導向性**。Nachos 的主體是用 C++ 的一個子集來實現的。物件導向可以清楚地描述作業系統各個部分的介面(interface)。但 Nachos 並未用到物件導向的所有特徵，如繼承性、多態性等，使得其程式碼更容易理解與閱讀。
