---
title: "[C#] Large Object Heap"
keywords: ["C#", "LOH", "Large Object Heap", "OutOfMemoryException"]
description: "Introduction to Large Object Heap"
date: 2023-07-22T20:59:57+08:00
tags: ["C#"]
draft: false
Categories: "C#"
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

# LOH(Large Object Heap)

## GC
+ .NET 具有 GC(garbage collector)，使開發員不需要過多考慮記憶體控管，因為 GC 會自動移除「死掉的」物件，並將記憶體重排。
+ 這些小的物件會透過釋放死的物件，並移動集合中存活的物件，以確保沒有間隙。（事實上並非原地移動，而是將之全部複製到新的記憶體區塊，這樣可以簡化分配記憶體的過程，這樣意味著，空間都會出現在區塊的尾端，所以不需要進行掃描來找尋記憶體區塊來儲存新的物件。

## LOH
+ LOH(Large Object Heap) 指的是大型物件堆，也就是大小超過 85000 bytes 的物件，GC 會將之視為獨立的部分，GC 會優先處理其它的堆，原因是若要透過複製移動的方法來重新分配 LOH，它們需要兩倍的記憶體來進行，會使得 GC 花費大量的時間進行任務。
+ 取而代之，GC 不會移動 LOH，而是將之留在原地，使得空間變得碎片化(fragmented)。當移除 LOH 時，會將空間原地保留，當要放入新的物件時，若區塊的尾端沒有足夠的空間，則會在這些 LOH 之間的空洞找尋可用空間，在沒有足夠空間時，擴展堆。
+ 隨著時間堆移，即使不會發生 memory leakage，由於 LOH 之間的碎片空間會愈來愈小，不足以放置新的物件。在最糟的狀況下，這些碎片空間佔有的空間很大，但又不足以放置新的物件，且碎片的個數很多，這可能就會導致更多的產生 **OutOfMemoryException**。
![LOH](https://www.red-gate.com/simple-talk/wp-content/uploads/imported/674-image002.gif)

## 如何解決
+ 防止或減少使用大型物件的需求。
+ 定期停止或重啟受影響的應用程式。
+ 將大型物件重構成不同的數據結構，如 100000 個元素的數組，儲存成 10 個 10000 個元素的數組。
+ **System.Collections** 中也有一個 `Capacity` 的屬性來促進這種設計模式來避免大型物件的產生，有效的共享大型數據結構也有助於減少大型物件。

[Reference: Andrew Hunter - The Dangers of the Large Object Heap](https://www.red-gate.com/simple-talk/development/dotnet-development/the-dangers-of-the-large-object-heap/)  
[Reference: Microsoft - The large object heap on Windows systems](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/large-object-heap)
