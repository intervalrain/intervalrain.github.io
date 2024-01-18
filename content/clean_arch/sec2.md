---
title: "[IT] Clean Architecture - 第二部分 從基礎構件開始: 程式設計範式(Paradigms)"
keywords: ["Clean Architecture", "SOLID", "DDD", "Design Pattern"]
description:
date: 2023-09-05T21:43:11+08:00
tags: ["Clean Architectrue"]
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
　　軟體架構始於程式碼，因此我們將從程式碼的角度開始討論架構，看看自從程式碼被寫下以來我們所學到的內容。

　　1938年，艾倫·圖靈(Alan Turing)奠定了計算機編程的基礎。他並不是第一個構想可編程機器的人，但他是第一個理解程式即數據(programs are simply data)的人。到了1945年，圖靈已經在真正的電腦上用我們現在能夠認出的程式碼編寫真正的程式了。這些程式使用了循環(loops)、分支(branches)、賦值(assignment)、子程序(subroutines)、堆棧(stacks)和其他熟悉的結構。但，圖靈的語言是二進制的。

　　自從那些日子以來，程式設計界發生了許多革命。其中一個我們都非常熟悉的革命就是語言的革命。首先，在1940年代末期，出現了組合語言(assemblers)。這些「語言」解放了程式設計師將他們的程式轉換成二進制的苦差。1951年，格雷斯·霍珀(Grace Hopper)發明了第一個編譯器 A0。事實上，她創造了「編譯器(compiler)」這個詞彙。Fortran 在1953年被發明出來。接著，一股源源不斷的新程式語言湧入 - COBOL、PL/1、SNOBOL、C、Pascal、C++、Java等等，無窮無盡。

　　另一個可能更重要的革命是在程式設計範式方面。範式是編程的方式，與語言相對無關。範式指導了開發人員應該使用哪些程式結構，以及何時使用它們。

　　迄今為止，已經有三種這樣的範式，也不太可能再有其它的範式，原因後述。