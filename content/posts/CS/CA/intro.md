---
title: "[計算機組織與結構] 概述"
date: 2022-03-23T00:18:35+08:00
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
# 前言
## 二進制
+ 從真實世界的 **類比訊號** 到方便儲存與傳送的 **數位訊號** (Analog to Digital)。
+ 訊號容易用 **二進制** 表達，在電子電路上，可以用 **電子開關(Switch)** 來描述(bit)。
+ 利用 **電晶體(Transistor)** 其特性，可以作為一個電子開關。
    + 現今的積體電路最常見的電晶體為 **MOSFET** (Metal Oxide Silicon Field Effect Transistor)。
    + 利用閘極(Gate)控制源極(Source)與汲極(Drain)的電子通道。
+ 電子開關 → 邏輯閘 → 邏輯電路、記憶元件 → 計算機

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
    + **計算機結構(Computer Architecture) = 指令集架構(Instruction Set Architecture, ISA) + 機器組織(Machine Organization)**
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