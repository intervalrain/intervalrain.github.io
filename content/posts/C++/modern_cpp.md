---
title: "[C++] 現代 C++ 教程 : 高速上手 C++11/14/17/20 繁中"
keywords: ["C++", "modern C++", "11/14/17/20"]
description:
date: 2023-07-10T00:58:23+08:00
tags: ["C++"]
draft: true
Categories: C++
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
![book](https://github.com/changkun/modern-cpp-tutorial/raw/master/assets/cover-2nd.png)
# 序言
## 本文目的
---
本文號稱『高速上手』，從內容上對二十一世紀二十年代之前產生 C++ 的相關特性做了非常相對全面的介紹，讀者可以自行根據下面的目錄選取感興趣的內容進行學習，快速熟悉需要了解的內容。這些特性不不需要全部掌握，只需針對自己的使用需求和特定的應用場景，學習、查閱最適合自己的新特性即可。  

同時，本文在介紹這些特性的過程中，盡可能簡單明瞭的介紹了這些特性產生的歷史背景和技術需求，這為理解這些特性、運用這些特性提供了很大的幫助。  

此外，筆者希望讀者在閱讀本文後，能夠努力在新項目中直接使用現代 C++ ，並努力將舊項目逐步遷移到現代 C++。也算是筆者為推進現代 C++ 的普及貢獻了一些綿薄之力。
## 目標讀者
---
1. 本文假設讀者已經熟悉了傳統 C++，至少在閱讀傳統 C++ 代碼上不具備任何困難。換句話說，那些長期使用傳統 C++ 進行編碼的人、渴望在短時間內迅速了解現代 C++ 特性的人非常適合閱讀本文；
2. 這本文在某種程度上介紹了一些現代 C++ 的黑魔法，但這些魔法畢竟有限，不適合希望進階學習現代 C++ 的讀者，本文的定位是現代 C++ 的快速入門。當然，希望進階學習的讀者可以使用本文來回顧並檢驗自己對現代 C++ 的熟悉程度


## 相關代碼
---
本文每章中都出現了大量的程式碼，如果你在跟隨本文介紹特性的思路編寫自己的程式碼遇到問題時，不妨讀一讀隨書附上的原始碼，你可以在[這裡](https://github.com/changkun/modern-cpp-tutorial/blob/master/code)找到書中介紹過的全部的原始碼，所有程式碼按章節組織，資料夾名稱為章節序號

## 隨書習題
---
本文每章最後還加入了少量難度極小的習題，僅用於檢驗你是否能混合運用當前章節中的知識點。你可以在[這裡](https://github.com/changkun/modern-cpp-tutorial/blob/master/exercises)找到習題的答案，文件夾名稱為章節序號。

## 本文網站
---
本文由 Rain Hu 在 CharGPT 的幫助下，進行的翻譯，原著為[歐長坤](https://github.com/changkun)的開源項目所得，原網站為：[https://github.com/changkun/modern-cpp-tutorial/blob/master/README-zh-cn.md](https://github.com/changkun/modern-cpp-tutorial/blob/master/README-zh-cn.md)

# 第 1 章 邁向現代 C++
---
**編譯環境**：本文將使用 `clang++` 作為唯一使用的編譯器，同時總是在程式碼中使用 `-std=c++2a` 編譯標誌。
```Cpp
> clang++ -v
Apple LLVM version 10.0.1 (clang-1001.0.46.4)
Target: x86_64-apple-darwin18.6.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
```
## 1.1 被棄用的特性
---
在學習現代 C++ 之前，我們先了解一下從 C++11 開始，被棄用的主要特性：
> 注意：棄用並非徹底不能用，只是用於暗示工程師這些特性將從未來的標準中消失，應該盡量避免使用。但是，已棄用的特性依然是標準庫的一部分，並且出於兼容性的考慮，大部分的特性其實會『永久』保留。

- **不再允許將字符串字面值常量賦值給一個 `char *` 。如果需要用字符串字面值常量賦值和初始化一個 `char *` ，應該使用 `const char *` 或者 `auto`。**

```cpp
char *str = "hello world!"; // 將出現棄用警告
```

- **C++98 異常說明、 `unexpected_handler`、`set_unexpected()` 等相關特性被棄用，應該使用 `noexcept`。**
- **`auto_ptr` 被棄用，應使用 `unique_ptr`。**
- **`register` 關鍵字被棄用，可以使用但不再具備任何實際含義。**
- **`bool` 類型的 `++` 操作被棄用。**
- **如果一個則有建構函數，為其生成拷貝構造函數和拷貝賦值運算符的特性被棄用了。**
- **C 語言風格的類型轉換被棄用（即在變量前使用 `(convert_type)`），應該使用 `static_cast`、`reinterpret_cast`、`const_cast` 來進行類型轉換。**
- **特别地，在最新的 C++17 標準中棄用了一些可以使用的 C 標準庫，例如 `<ccomplex>`、`<cstdalign>`、`<cstdbool>` 与 `<ctgmath>` 等**
- ……等等

還有一些其他諸如參數綁定（C++11 提供了 `std::bind` 和 `std::function` ）、 `export` 等特性也均被棄用。前面提到的這些特性**如果你從未使用或者聽說過，也請不要嘗試去了解他們，應該向新標準靠攏**，直接學習新特性。畢竟，技術是向前發展的

## 1.2 與 C 的相容性

由於一些無法控制的原因和歷史因素，我們不得不在C++中使用一些C語言代碼（甚至是古老的C語言代碼），例如Linux系統調用。在現代C++出現之前，當大多數人談到「C和C++的區別是什麼」時，除了提到面向對象的類特性和泛型編程的模板特性外，很少有其他觀點，甚至直接回答「差不多」的也很多。圖1.2中的韋恩圖大致上回答了C和C++相關的兼容情況。

![圖 1.2: C 和 C++ 互相兼容情况](https://github.com/changkun/modern-cpp-tutorial/raw/master/assets/figures/comparison.png)

从现在开始，你的脑子里应该树立『**C++ 不是 C 的一个超集**』这个观念（而且从一开始就不是，后面的[进一步阅读的参考文献](#进一步阅读的参考文献)中给出了 C++98 和 C99 之间的区别）。在编写 C++ 时，也应该尽可能的避免使用诸如 `void*` 之类的程序风格。而在不得不使用 C 时，应该注意使用 `extern "C"` 这种特性，将 C 语言的代码与 C++代码进行分离编译，再统一链接这种做法，例如：
從現在開始，你的腦子裡應該樹立『**C++ 不是 C 的一個超集**』這個觀念（而且從一開始就不是，後面的[進一步閱讀的參考文獻](#進一步閱讀的參考文獻)中給出了 C++98 和 C99 之間的區別）。在編寫 C++ 時，也應該盡可能避免使用諸如 `void*` 之類的程式風格。而在不得不使用 C 時，應該注意使用 `extern "C"` 這種特性，將 C 語言的程式碼與 C++ 程式碼進行分離編譯，再統一連結這種做法，例如：

```cpp
// foo.h
#ifdef __cplusplus
extern "C" {
#endif

int add(int x, int y);

#ifdef __cplusplus
}
#endif

// foo.c
int add(int x, int y) {
    return x+y;
}

// 1.1.cpp
#include "foo.h"
#include <iostream>
#include <functional>

int main() {
    [out = std::ref(std::cout << "Result from C code: " << add(1, 2))](){
        out.get() << ".\n";
    }();
    return 0;
}
```

請先使用 `gcc` 編譯C語言的程式碼：

```bash
gcc -c foo.c
```

編譯出 `foo.o` 檔案，再使用 `clang++` 將 C++ 代碼和 `.o` 檔案鏈接起來（或者都編譯為 `.o` 再統一鏈接）：

```bash
clang++ 1.1.cpp foo.o -std=c++2a -o 1.1
```

當然，你可以使用 `Makefile` 來編譯上面的程式碼：

```makefile
C = gcc
CXX = clang++

SOURCE_C = foo.c
OBJECTS_C = foo.o

SOURCE_CXX = 1.1.cpp

TARGET = 1.1
LDFLAGS_COMMON = -std=c++2a

all:
	$(C) -c $(SOURCE_C)
	$(CXX) $(SOURCE_CXX) $(OBJECTS_C) $(LDFLAGS_COMMON) -o $(TARGET)
clean:
	rm -rf *.o $(TARGET)
```
