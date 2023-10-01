---
title: "[IT] Clean Architecture"
keywords: ["Clean Architecture", "SOLID", "DDD", "Design Pattern"]
description:
date: 2023-09-29T02:03:47+08:00
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
# 乾淨架構
## 設計(design)與架構(architecture)為何重要？
+ 軟體架構的目標是將**開發**與**維護**軟體系統所需的人力最小化。
    + 不好的設計會使維護的成本愈來愈高。
![1-1](/posts/clean_arch/images/img1_3.png)
    + 每次版本的發布時的生產力。
![1-2](/posts/clean_arch/images/img1_4.png)
    + 良好的開發模式(TDD)大幅減少開發時間。
![1-3](/posts/clean_arch/images/img1_6.png)

### 行為(behavior)與架構(architecture)
+ 行為：緊迫但並非特別重要
+ 架構：重要不緊迫  
∵ 緊急且重要 > 不緊急但重要 > 緊急但不重要 > 不緊急且不重要  
∴ 大多情況下，架構(設計)比行為(開發)更重要。

## 程式設計範式(paradigms)
+ 結構化程式設計(structed programming)
    + 不要使用 `goto`，使用結構化的設計模式。(順序、選擇、迭代)
    + 總結：對直接控制權施加限制。
    + 關注點：**功能**
+ 物件導向程式設計(object-oriented programming)
    + 使用多型來避免函數指針的濫用。
    + 總結：對間接控制權施加限制。
    + 關注點：**組件分離**
+ 函式程式設計(functional programming)
    + λ演算的概念是不可變性，符號的值不會改變，意味著沒有賦值。
    + 總結：對賦值施加限制。
    + 關注點：**數據管理**

### 物件導向設計：
+ 依賴反轉：
![DIP](/posts/clean_arch/images/DIP.png)
+ 商業邏輯不依賴於 UI 與 DB，UI 與 DB 可以做為商業邏輯的插件。
![DIP2](/posts/clean_arch/images/DIP2.png)

### 小結：
+ 三種範式都在約束你寫 code 的某些行為。這些約束就是在制定規則。

## SOLID 設計原則
### SRP: 單一職責原則(The Single Responsibility Principle)
+ 一個模組只有一個原因(用戶/利益相關者)需要改變。
![SRP](/posts/clean_arch/images/SRP.png)

### OCP: 開放封閉原則(The Open-Closed Principle)
+ 軟體工程應對擴展開放，但對修改封閉。
![OCP](/posts/clean_arch/images/OCP.png)

### LSP: 里氏替體原則(The Liskov Substitution Principle)
+ 避免簡單的可替代性違規導致大量的額外機制。
![LSP](/posts/clean_arch/images/LSP.png)

### ISP: 介面隔離原則(The Interface Segregation Principle)
+ 關注點分離。將一個多功能的物件拆成繼承三個不同功能介面的物件。
![SRP](/posts/clean_arch/images/ISP.png)

### DIP: 依賴反轉原則(The Dependency Inversion Principle)
![DIP3](/posts/clean_arch/images/DIP3.png)

## 組件原則
+ 組件是部署的單位，他們是系統的最小單元。
    + 在 Java，他們是 jar 檔。
    + 在 Ruby，他們是 gem 檔。
    + 在 .Net，他們是 DLL 檔。
### 可搬遷性(relocatabbility)
+ 解決方案(solution)是可以被重定位的二進制檔案(binaries)。
+ 工程師可以告訴載入器要在哪裡載入函式庫。
+ 如果程式調用了函式庫，則編譯器會將之視為外部引用(external reference)；如果程式定義了函式庫，則編譯器會將之視為外部定義(external definition)。
+ 在加載器確定了加載的對象是外部引用或是外部定義之後，便可透過 linker 將外部引用對外部定義做連結。
### 連結器(linkers)
+ 當程式的規模愈來愈大，連結加載(linking loader)的速度愈來久。於是乎加載與連結被拆為兩個階段。
+ 模組化的組件被編譯後，餵進 linker，形成可執行的檔案，以供 loader 可以快速的加載。

## 內聚三原則
#### REP(The Reuse/Release Equivalence Principle)
+ REP: 重用/發布等價原則(The Reuse/Release Equivalence Principle)
    + 想要重用軟體組件，則這些組件必須經過發布流程追縱並有版本號。
    + 發布版本需確保所有重複使用的組件彼此具兼容性。模組須是有內聚力的群組，有共同的主題。
#### CCP(The Common Closure Principle)
+ CCP: 共同封包原則(The Common Closure Principle)
    + 將因為相同原因和時間改變的類別組合在一起；不同原因和時間改變的類別分開。
    + 組件版的 SRP：一個組件不應該有多個改變的原因。
    + 可維護性大於可重用性。
    + 若有應用程式需要被需改，最好這些修改要發生在一個組件中而非分散在多個組件中。
    + OCP 是對擴展開放，對修改封閉，但封閉不可能是100%的，所以需策略性的封閉。
#### CRP(The Common Reuse Principle)
+ CRP: 共同重用原則(The Common Reuse Principle)
    + 不只強調哪些組件因強耦合而應該放在同一個組件，還強調我們不應該把哪些類別放在一起。
    + 不強迫組件的使用者依賴他們不需要的東西。
    + ISP 的通用版。
![cohesion](/posts/clean_arch/images/cohesion.png)

## 耦合(Coupling)
### 非循環依賴原則(The Acyclic Dependencies Principle, ADP)
+ 組件間的依賴關係必須是有向無環圖(DAG)。
1. 應用 DIP 依賴反轉，創造介面，打破循環。
2. 創建一個新的組件，使兩者共同依賴於新的組件。

#### 由上自下的設計(Top-Down Design)
+ 組件結構不能從上而下設計，應隨著系統的成長和變化而演變。
+ 組件依賴圖是應用程式可構建性和可維護性的地圖，所以不該是項目開始時設計的原因。
+ 隨著軟體的成長，累積了愈來愈多的模組，則開始需要管理這些依賴關係，我們應該盡可能將更改局部化，因此我們開始關注 SRP 和 CCP。

### 穩定依賴原則(The Stable Dependencies Principle, SDP)
+ 穩定的依賴流。
![dependencyFlow](/posts/clean_arch/images/dependencyFlow.png)

### 穩定性指標
\\(I=\frac{\text{fan-out}}{\text{fan-in + fan-out}}\\)

#### 不是所有的組件都應該是穩定的
+ 如果系統中的所有組件都是極度穩定的，代表系統是不可改變的，這並非理想的情況。
+ 好的依賴方向，由不穩定指向穩定。
![instable](/posts/clean_arch/images/instable.png)
+ 被設計成 flexable 的組件，愈被依賴則愈難被更動，同樣應該用 DIP 來破壞對 flexable 的依賴。
![instable2](/posts/clean_arch/images/instable2.png)

### 穩定抽象原則(The Stable Abstractions Principle, SAP)
+ 要使組件穩定，它應該由接口和抽象類組成，以便擴展，且要不過度限制架構。
+ SAP 與 SDP 的結合就是組件的 DIP。
### 測量抽象性 A 指標
+ A 指標是衡量元件抽象程度的方方
+ \\(N_c\\) 是組件中類別的數量。
+ \\(N_a\\) f是組件中的抽象類別和介面的數量
+ \\(A=\frac{N_a}{N_c}\\) 抽象度。
![abstractions](/posts/clean_arch/images/Abstractions.png)
+ 在上圖的座標中，愈穩定且抽象的組件位於左上角(0,1)、愈不穩定且具體的組件位於右下角(1,0)。
+ 我們無法強制所有元件均位於 (0,1) 或 (1,0)，而是定義元件合理的位置，並找出元件不應該出現的區域。
    + Zone of Pain
        + 非常穩定且具體的元件，這樣的元件並不理想，因為它是僵硬且無法擴展的。
        + 如資料庫、實用程式庫…
    + Zone of Uselessness
        + 極度抽象卻沒有相依性，這樣的元件是無用的。
    + 連接 (1,0) 與 (0,1) 的線稱為主序線(the Main Sequence)。
        + 好的組件位在這條線上，對其穩定性並不太抽象，也不會因其抽象性而變得太不穩定。
        + 抽象程度決定了它的依賴性；具體性決定了它對他人的依賴程度。
+ 與主序線的距離，為元件的 D 指標，介 0~1 之間，任何不接近 0 的元件都可以被重新檢視和重組。
    + \\(D=|A+I-1|\\)