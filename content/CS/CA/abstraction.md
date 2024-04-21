---
title: "[CA] 計算機的抽象化與科技"
date: 2022-03-24T01:12:11+08:00
tags: ["CA", "CS"]
draft: false
Categories: CA            
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
# 計算機的抽象化與科技

## 1.1 簡介
+ 有賴於科技高速的成長，計算機工業出現了嶄新的型態，計算機導致了文明的第三次革命-資訊革命，與農業革命和工業革命並駕齊驅。如科幻電影般的生活應用，也如雨後出筍般的出現。
    + 汽車
    + 手機
    + 人類基因組計劃(Human genome project)
    + 全球網路(World Wide Web)
    + 搜尋引擎
### 計算機的應用分類與其特性
+ 個人電腦(Personal Computer, PCs)
+ 伺服器(Servers)
    + 通過網路連接其它的工作站或電腦，通常面向單一且複雜大型的科學或工程應用，也可能是多而小的工作。
    + 成本和功能的差異性也最廣，可以是沒有螢幕沒有鍵盤的桌電，也可以是如超級計算機(supercomputers)這樣的極端。
+ 嵌入式計算機(Embedded Computers)
    + 最大的計算機類別，也涵蓋最廣泛的應用和性能。
    + 通常具有獨特的應用要求，這些要求將最低效能發揮的淋漓盡致，使成本與功耗成為很重要的指標。
### 後PC時代
![postPC](/CS/CA/images/postPC.png)
+ 個人行動裝置(Poersonal Mobile Device, PMD) 如智慧型手機與平板的出現，取代的 PC 的地位。
+ 雲端計算(Cloud Computing) 取代了傳統伺服器，這些雲端計算建構在「倉庫規模計算機」(Warehouse Scale Computer, WSC)。
    + 企業如Google、Amazon，提供了 WSC 的租借服務，這類通過雲端佈署的「軟體即服務」(Software as a Service, SaaS)，正在改變軟體業。
### 學習目標
+ 過去在硬體的限制下，程式設計師需要嚴格的考慮程式的效能：*減少記憶體空間以使程式更快*。
+ 在計算機設計與記憶體科技的進步下，取而代之程式設計師要考量的事情變成：**處理器的並行性**和**記憶體的分層**，或諸如在 PMD 或雲端上運行的程式的能源效率問題。
+ 以下是我們將要學習的目標：
    + 用高級語言編寫的程式如何翻譯成硬體語言，以及硬體如何執行生成的程式？藉此可以理解硬體與軟體的關係，也與程式的性能有關聯。
    + 軟體和硬體間的介面是什麼，軟體如何指示硬體執行所需的工作？這些概念對於理解如何編寫多種軟體至關重要。
    + 什麼決定了一個程式的性能，程式設計師如何提高性能？這關係了源始碼編譯成電腦的語言時，硬體執行程式的效率。
    + 硬體設計人員可以使用哪些技術來提高性能(Performance)？
    + 硬體設計人員可以使用哪些技術來提升能源效率(Energy Efficiency)？程式設計師又如何協助改善？
    + 什麼理由導致了循序處理(Sequential processing)轉變成了平行處理(Parallel processing)？
    + 自第一台商用計算機問世以來，計算機架構師提出了哪些想法來奠定現代計算的基礎？
## 1.2 計結中八個重要的思想
![great8](/CS/CA/images/great8.png)
+ 摩爾定律(Moore's Law)之於設計
    + 摩爾定律源於 Intel 創辦人之一的 Gordon Moore 對 IC 容量增長的預測。
    + 由於計算機設計需耗時數年，而晶片的成長使得計算機架構師在設計時，必須將眼光放到設計完成時的技術狀態，而非當下。
+ 用抽象化(Abstraction)來簡化設計
    + 程式設計師與計算機架構師都必須要不斷發明新的技術以面對日益更新的科技，
    + **抽象化**是一種分層設計的概念。對程式設計師而言，低階的細節被忽略，只需要遵從簡單的模型或規範去進行設計。而硬體工程師則是要去實現出這個定義好的模型的硬體、細節部分。
+ 快速處理常見情況
    + 將常使用的指令進行優化(**common case fast**)，比起其它不常使用的指令，更能提升效能。
    + 何者為最常使用的指令，必須透過嚴密的實驗與測量才以得知。
+ 平行處理(parallelism)
+ Pipeline
+ 預測
    + 某些情況下，將硬體的效能預測的高一點，好過於等到效能滿足才開始設計。
+ 記憶體的結構化(hierarchy)
    + 透過將記憶體分層，將最快、最小、最昂貴的部分置於層狀結構的頂層；而最慢、最大、最便宜的記憶體置於層狀結構的底層。
+ 用多餘創造可靠性(dependability)
    + 計算機不只要速度快，還要具有可靠性。任何物理設備都可能發生故障，此時可以透過引入冗餘的元件來使系統變的更可靠，這些冗餘的元件可以在發生故障時接管工作並協助檢測故障。
## 1.3 抽象化
![abstraction](/CS/CA/images/abstraction.png)
+ 從高階語言編譯或轉譯成簡單的計算機指令，這樣的分層結構，即是一種抽象化的呈現。
+ 應用軟體-系統軟體-硬體，從外而內，即是現代計算機的基本架構。
+ 計算機系統中最重要的兩個系統軟體：
    + **作業系統(Operating System, OS)**
        + 處理基本的輸入與輸出操作。
        + 分配儲存空間與記憶體。
        + 在同時使用多個應用程式時提供保護的功能。
    + **編譯器(Compiler)**
        + 將高階語言如 C, C++, Java, Visual Basic 轉換成硬體可以執行的指令(機器碼)。
### 高階語言到硬體語言
+ **二進制**
    + 電訊號是與電子硬體進行溝通的唯一橋樑。即是所謂的**二進制(Binary digit)**。在電子硬體的世界，**位元(bit)** 即為最基本的單位。
    + 從真實世界的 **類比訊號** 到方便儲存與傳送的 **數位訊號** (Analog to Digital)。
    + **電晶體(Transistor)**
        + 電晶體的特性，可以作為一個電子開關。
        + 現今的積體電路最常見的電晶體為 **MOSFET** (Metal Oxide Silicon Field Effect Transistor)。
        + 利用閘極(Gate)控制源極(Source)與汲極(Drain)的電子通道。
    + 電子開關 → 邏輯閘 → 邏輯電路、記憶元件 → 計算機
+ **彙編語言(Assebly Language)**
    + 最早人們使用二進位與電子設備溝通，但效率太慢了，於是發明了更貼近人類思維的符號。
    + 而**彙編程式(Assembler)**即是第一個用來翻譯這些符號的程式。
        + **彙編語言(Assembly Language)**
        ```Assembly
            add A,B
        ```
        + **機器語言(Machine Language)**
        ```Machine
            1000110010100000
        ```
+ **高階語言(High-level Language)**
    + 高階語言的出現使得計算機的發展更進一步的突破，而高階與言、編譯器與彙編程式即是另一個抽象化的呈現。
    ![compiler](/CS/CA/images/compiler.png)
    + 好處
        + 高階語言使程式設計師能用更自然的思考，使用英文單字與代數進行程式設計。
        + 高階語言允許語言根據其預期用途設計：
            + Fortran 專為科學計算設計
            + Cobol 用於業務數據處理
            + Lisp 用於符號操作
            + …等等
        + 提升了程式設計的效率，減少了軟體開發的時間，滿足軟體開發的通則「簡潔」。
        + 高階語言是獨立於計算機的，因為編譯器與彙編程式可以在任何電腦上進行編譯。

## 1.4 計算機結構
![component](/CS/CA/images/components.png)
+ 任何計算機底層的硬體都執行相同的基本功能：
    + 輸入數據(inputing data)
    + 輸出數據(outputing data)
    + 處理數據(processing data)
    + 儲存數據(storing data)
## 計算機組織(organization)
+ **輸入(Input)、輸出(Output)**
+ **記憶體(Memory)**
+ **處理器(Processor)**
    + **資料流(Datapath)**
    + **控制器(Control)**
## 計算機架構(architecture)
+ **計算機架構 = 指令集架構 + 計算機組織**
+ 積體電路(integrated circuits, IC, chips)包含了大部分的計算機組織，包含了
    + 輸入、輸出裝置
        + 液晶顯示器(Liquid crystal displays, LCDs)
        + 觸控面板(touchscreen)
        + 前鏡頭、後鏡頭
        + 麥克風
        + 喇叭
        + 加速度傳感計(accelerometer)
        + 陀螺儀(gyroscope)
        + Wi-Fi 網路、藍芽網路
    + 處理器，或稱中央處理器(central processor unit, CPU)。
        + 資料流，用來處理算術、邏輯運算。
        + 控制器，根據程式的指令告訴資料流、記憶體、I/O裝置要做什麼事。
    + 記憶體
        + 用來儲存程式、程式所需的資料。
        + 由動態隨機存取記憶體 DRAM(dynamic random access memory)組成，相較於循序存取記憶體 sequential access memories，RAM 訪問不同的區域花費的時間基本相同。
        + 快取記憶體(Cache) 是由小型、快速的記憶體所組成，作為 DRAM 的緩衝區。由靜態隨機存取記憶體 SRAM(static random access memory)所組成，SRAM 速度快但密度較低、成本較高。
        + 又分為揮發式(volatile)的與非揮發式(non-volatile)的，通常主記憶體(main memory, primary memory)使用揮發式的(如 DRAM)，而次級的記憶體使用非揮發式的(如磁碟、flash)。
            + flash 雖比 DRAM 慢，但它具有非揮發式且較便宜的性質，相較於磁碟，flash 更小、更堅固、也更高效，儘管 flash memory 大約會在 寫入 100,000 到 1,000,000 次後磨損，所以文件系統必須要追蹤，並制定記憶體全部磨損的策略。

### **指令集架構(Instruction Set Architecture, ISA)**
+ 包含了所有使二進制機器語言正常工作的內容，包括指令、IO 設備。
+ 通常作業系統會裝這些細節封裝好，使程式設計師只需專心於設計。
+ 由**基本指令集**與**作業系統介面**組合而成的介面稱為**應用程式二進制介面(Application binary interface, ABI)**
+ **指令集架構是為軟體與硬體間提供的一個抽象化架構。**
    + 可編程的儲存量(programmable storage)
    + 資料型別與結構：編碼與表現(Encodings and Representations)
    + 指令集(Instruction Set)
    + 指令形式(Instruction Formats)
    + 讀寫資料的模式與指令
    + 例外狀況

### 網路 Network

## 1.5 科技推動處理器與記憶體
## 1.6 效能
## 1.7 The Power Wall
## 1.8 從單處理器到多處理器
## 1.9 Benchmark
## 1.10 Fallacles and Pitfalls
## 1.11 小結
## 1.12 歷史觀點與未來展望
## 1.13 習題

![arch](/images/CA/Lec0/arch.png)
# 前言


## 計算機結構 vs. 計算機組織
![architecture](/images/CA/Lec0/architecture.png)
+ 計算機結構 Computer Architecture
    + **處理器(processor)**
        + 控制器(Control)
        + 資料路徑(Datapath)
    + **記憶體(memory)**
    + **裝置(Devices)**
        + 輸入(Input): 鍵盤、滑鼠、磁碟
        + 輸出(Output): 磁碟、顯示器、影印機
![organization](/images/CA/Lec0/organization.png)
+ 計算機組織 Computer Organization(架構)
    + 功能元件的性能: 暫存器(registers)、算術邏輯單元(ALU)、移位器(shifters)
    + 結構(Structure)
    + 資料流(Dataflow)
    + 控制邏輯(Control logic)
    + **暫存器傳輸階層(Register Transfer Level, RTL)** 描述

![arch](/images/CA/Lec0/arch.png)
+ 計算機結構
    
    + 軟體與硬體間的介面。(不同層級抽象化的協同)
    + 因應不同的需求所設計出來的機械**結構**。
        + 選用的演算法
        + 選用的程式語言或編譯器
        + 選用的作業系統
        + 處理器
        + I/O 系統與裝置
    + 指令集架構 Instruction Set Architecture(ISA)
        + 可編程的儲存量(programmable storage)
        + 資料型別與結構：編碼與表現(Encodings and Representations)
        + 指令集(Instruction Set)
        + 指令形式(Instruction Formats)
        + 讀寫資料的模式與指令
        + 例外狀況

# 計算機的發展
+ 電腦的分類與市場：歸因於行動裝置的崛起和技術的進步(CMOS、SoC、CAD tools等)。
    + 桌上型電腦(Desktop computers)
    + 伺服器電腦(Server computers)
    + 嵌入式電腦(Embedded computers)
+ 依指令集的長度、複雜度分為
    + 複雜指令集電腦(Complex Instruction Set Computer, CISC)
    + 精簡指令集電腦(Reduced Instruction Set Computer, RISC)
+ 微處理器(Microprocessor) 的分類與市場：主要有兩大架構
    + **ARM 架構**：
        + 過去稱為進階精簡指令集機器(Advanced RISC Machine)。
        + 32 位元 RISC 處理器架構。
        + 低成本、高效能、低耗電。
        + 廣泛使用在嵌入式系統設計。
        + 適用於行動通訊領域。
    + **MIPS 架構**：
        + Microprocessor without Interlocked Pipeline Stages
        + RISC 處理器架構，早年使用 32 位元，最新版本已變成 64 位元。
        + 廣泛使用於電子產品、網路設備、個人娛樂裝置與商業裝置。
        + 在 MIPS 架構中，指令被分為 **R型**、**I型**、**J型**，三種類型的指令的最高 6 位均為 6 位的 opcode 碼。
+ 瓶頸
    + 摩爾定律(Moore's Law)
        + 積體電路晶片上所整合的電路數目，每隔 18 個月就增加一倍。
        + 摩爾定律的時代將會結束，因為研究和實驗室的成本需求十分高昂，而有財力投資在建立和維護晶片工廠的企業很少。而且製程也愈來愈接近半導體的物理極限，將會難以再縮小下去。
        ![moore's law](https://th.bing.com/th/id/R.c313eb85d740e6ec761abaa48bda414e?rik=8GyS9kadkZKJPQ&riu=http%3a%2f%2fp2.ifengimg.com%2ffck%2f2018_52%2f5a0262c7429e118_w550_h332.png&ehk=oZRQP72tOXd0524Jx8pXPtwYknRJ7vm3zDIxraf6n2o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1)
    + 能耗限制(The power wall)
        + 微處理器的效能提升一直仰賴提高處理器的操作頻率，但在提升操作步率的同時，也會帶來龐大的功耗，故形成 Power Wall。
        + 散熱問題愈趨嚴重、電壓無法再下降。
        + \\(\text{P}_\text{dynamic} = \text{IV} = \frac{1}{2}\text{CV}^2\times\frac{1}{\text{T}} = \frac{1}{2}\text{CVF}\\)
        + 多處理器(Multi-processor)開始發展
            + 反應時間(Response Time)不增加，但吞吐量(Throughput)增加。
            + 程式設計師要開始考量平行運算程式設計。
        ![power wall](https://2.bp.blogspot.com/-8nX3GzSWmDI/VL4CwKj7EzI/AAAAAAAAlhY/22pkbJnWdT0/s1600/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%2B2015-01-20%2B%E4%B8%8B%E5%8D%882.40.17.png)
    + 阿姆達爾定律(Amdahl's Law)
        + 它代表了**處理器平行運算**之後效率提升的能力，無論如何提升處理器的數目，加速比將會達到一個極限。(比方說導線的電導率決定電子傳遞速度的上限)
        + \\(\text{T} _\text{improved}=\frac{\text{T} _\text{affected}
        }{\text{improvement facetor}}+\text{T} _\text{unaffected}\\)
            + \\(\text{T} _\text{improved} \rightarrow 0 + \text{T} _\text{unaffected}\\)
            + unaffected term 會決定速度的上限
        ![Amdahl's law](https://3.bp.blogspot.com/-5a4rccSHnls/VL4CuTBziAI/AAAAAAAAlg8/02boMKlAxI4/s1600/648px-AmdahlsLaw.svg.png)


# 效能(Performance)
## 效能的表示法
+ 吞吐量(Throughput)：單位時間的工作量。適用於大型主機。
+ 反應時間(Response time)：任務完成所需的時間。適用於個人電腦。
    + I/O time
    + CPU time：任務的處理(processing)時間
        + 系統 CPU
        + 使用者 CPU
    + Elapsed time = Total Response time，包含處理器、I/O、OS overhaed、閒置時間
## CPU time
+ \\(\boxed{\text{CPU Time} = \text{n}_ \text{clock}\times\text{t}_ \text{clock}}\\)
    + \\(\text{n}_\text{clock}\\)：clock 的數目
    + \\(\text{t}_\text{clock}\\)：單位 clock 的時間
+ \\(\boxed{\text{CPI}=\frac{\text{n}_\text{clock}}{\text{n} _\text{IC}}}\\)
    + \\(\text{n}_\text{IC}\\)：指令數目(Instruction Count, IC)
    + \\(\text{CPI}\\)：Cycle per instruction
+ \\(\boxed{\text{CPU Time} = \text{n}_ \text{IC}\times\text{CPI}\times\text{t}_ \text{clock}}\\)
+ \\(\boxed{\text{Clock Rate} = \frac{1}{\text{t}_\text{clock}} = \frac{\text{n} _\text{clock}}{\text{CPU time}}}\\)
## 影響效能的因素
+ \\(\boxed{\begin{array}{ccccccc}
\text{CPU Time}&=&\frac{\text{Instruct.}}{\text{{Program}}}&\times&\frac{\text{Clock cycles}}{\text{Instruct.}}&\times&\frac{\text{Seconds}}{\text{Clock cycle}}\\\\
&=&\text{n}_ \text{IC}&\times&\text{CPI}&\times&\text{t}_ \text{clock}
\end{array}}\\)
+ \\(\begin{array}{|l|c|c|c|}\hline
&\text{Instruction Count}&\text{CPI}&\text{Clock Rate}\\\\\hline
\text{程式、演算法}&\checkmark&\checkmark&\\\\\hline
\text{程式語言、編譯器}&\checkmark&\checkmark&\\\\\hline
\text{指令集}&\checkmark&\checkmark\\\\\hline
\text{計算機結構(ISA已定義好)}&&\checkmark&\checkmark\\\\\hline
\text{科技}&&&\checkmark\\\\\hline
\end{array}\\)
## 效能的測量
+ 不同程式需求，在不同的硬體設計架構上，會有不同的效能呈現。
    + 如矩陣相乘的程式，對有處理矩陣相乘的 ISA，workload 必定會比較小。
    + 如數字相乘的程式，有乘法器的 ISA，必定優於只有加法器的 ISA。
+ Benchmarks
    + 為不同程式需求，產生不同的標準程式。
    + Standard Performance Evaluation Corporation(SPEC)
        + SPEC CPU performance benchmark
            + High-performance computing
            + Client-server models
            + Mail systems
            + File systems
            + Web servers
        + SPEC Power benchmark
            + 在不同 workload level 下測量功耗。
            + \\(\sum\text{ssj\\_ops} _\text{i}/\sum\text{power} _\text{i}\\)
        + MIPS 成為效能的指標
            + MIPS(Millions of Instructions Per Second)
                + 注意這裡不是 *Microprocessor without Interlocked Pipeline Stages*
            + \\(\boxed{\text{MIPS}=\frac{\text{Instruct. count}}{\text{Execution time}\times10^6}
            =\frac{\text{Instruct. count}}{\frac{\text{Instruct. count}\times\text{CPI}}{\text{Clock rate}}\times10^6}
            =\frac{\text{Clock rate}}{\text{CPI}\times10^6}}\\)
## 電腦的定義
+ 一種可以進行**計算**的裝置，特指**可編程(programmable)** 且可執行高速的數學或邏輯的運算，或可收集、儲存、處理資料的電子器械。
    + 一般用途 or 特別用途
    + 可編程 or 不可編程
    + 科學用 or 商務
    + 機械械 or 電子式 or 電機 ...
        + Instruction 與 data 分開儲存的結構稱為 [哈佛架構Harvard Architecture](https://zh.wikipedia.org/zh-tw/%E5%93%88%E4%BD%9B%E7%BB%93%E6%9E%84?msclkid=c1396340ab9a11eca75aa799cfa527fc)
### 電腦的歷史
+ ENIAC (Electronic Numberical Integrator and Calculator)
    + 1943 - 1946 at the University of Pennsylvania
    + 約 25 公尺長、2.5 公尺高
    + 由真空管製成: 耗能、易燒壞KJKKI
    + 1900個加法/每秒
+ 商業化、電晶體的發現 in 1947
+ 使用電晶體的電腦 (IBM 14001, Big Blue) in 1959
+ IC(Integrated Circuit) in 1958 at 德儀
+ 微處理器(Intel 4004) in 1971
+ Apple II in 1977
+ 個人電腦(IBM PC) in 1981
+ IBM 開放式系統(open system)使得周邊設備大量的發展
    + Xerox PARC Alto: 具備滑鼠、[以太網路](https://zh.wikipedia.org/wiki/以太网)、[點陣圖](https://zh.wikipedia.org/wiki/位图)、按鍵、菜單、[WYSIWYG編輯器](https://zh.wikipedia.org/wiki/所见即所得)
    + 區域網路
    + 雷射列印
    + client / server 分散式計算
+ 應用程式
    + VisiCalc for Applie II in 1979
+ 超大型積體電路 VLSI(Very-Large-Scale Integration)
+ **RISC(Reduced Instruction Set Computer)** 的出現，對應於 **CISC(Complex Instruction Set Computer)**
    + RISC: MIPS
    + CISC: Intel x86 processor
+ Post PC Era: Embedded Computer
    + 冰箱、手機、手錶…
### 電腦的發展
+ 應用
    + 行動電腦
    + 手機
    + 人類基因體計畫
    + 世界網路
    + 搜尋引擎
+ **摩爾定律 Moore's Law**
![moore](/images/CA/Lec1/moore.png)
    + Line Width/Feature Size: 電晶體的 Source 與 Drain 的距離，約是 gate length。
    ![nmos](/images/CA/Lec1/nmos.png)
### 電腦的分類
+ 通用電腦
    + 特性：
        + 軟體相容性
        + 產品生命週期短
        + 更好的效能(more transistors)與人機介面
    + 個人電腦 Personal Computers
        + 一般用途、軟體多樣性
        + 取決於**成本**與**效能**的權衡
    + 伺服器電腦 Server Computers
        + 基於網路的
        + 高容量、效能、可靠度
        + 範圍可小至伺服，大至建築
    + 超級電腦 Supercomputers
        + 高端的科學與工程計算
        + 最高的效能，但小的市佔
+ 特殊用途電腦
    + 特性：
        + 通常沒有浮點數、記憶體管理
        + 會與各種功能的外部裝置(peripherals)協作 e.g. DSP
            + 多元的 ISA、效能、外部裝置
            + 較不需考量相容性(通常是 pre-determined program)，ISA更簡單、低功耗
        + 更多元的結構、生命週期更長
        + 高產低銷 (Large volume sale and low price)
        + 趨勢：低成本、更多功
            + SoC(system-on-chip)、micro P core on ASIC
    + 嵌入式電腦 Embedded Computers
        + 隱身在系統中
        + 嚴格的功耗、效能、成本考量
---
## 