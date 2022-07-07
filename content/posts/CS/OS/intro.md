---
title: "[計算機作業系統] 概述"
date: 2022-07-02T04:00:55+08:00
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
# 作業系統
## 簡介
![computer os](https://2.bp.blogspot.com/-gzomOqKpa74/VLPwd72Q8KI/AAAAAAAAk-E/mnLR8NAJfLY/s640/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%2B2014-12-12%2B%E4%B8%8B%E5%8D%882.48.33-17.png)
+ 電腦系統主要可分成四個部分，或分成**硬體(hardware)**、**軟體(software)**、**數據(data)**
    1. 硬體(hardware)：為系統提供基本的計算資源。
        1. 中央處理器(central processing unit, CPU)
        2. 記憶體(memory)
        3. I/O 裝置
    2. 應用程式(Application programs)：定義資源如何用來解決使用者的計算問題。
    3. 使用者(users)
    4. 作業系統(Operating system, OS)：
    
+ 作業系統(Operating system, OS) 是管理電腦硬體與軟體資源的電腦程式，同時也是電腦系統的核心與基石。
+ OS 最主要的兩個功能是：
    + 資源分配：根據需求調配資源分配率(resource utilization)與效能(performance)
    + 監控使用者程式的執行，避免不正常的運作造成對系統的危害。
+ 一個標準的 PC 作業系統應該提供以下的功能：
    + 行程管理(Processing management)
    + 記憶體管理(Memory management)
    + 檔案系統(File system)
    + 網路通訊(Networking)
    + 安全機制(Security)
    + 使用者介面(User interface)
    + 驅動程式(Device drivers)

## PC 基本特徵
### 1. 並行計算(Concurrent computing)
+ Concurrent computing 是指宏觀上在一段時間內能同時運行多個進程，微觀上是交替發生的；而**平行計算(parallel computing)** 則指同一個時間內能運行多個指令。
+ 平行計算需要硬體支持，如多線程(multi-thread)、多核處理器(multi-core processor)或者分散式計算機系統(distributed OS)。
+ 作業系統通過引入進程(process)與線程(thread)，使程式能夠並行運作。
### 2. 分享(Sharing)
+ 共享是指系統中的資源可以被多個並行進程共同使用。
+ 有兩種共享方式：互斥共享(mutual exclusion)與同時訪問(time sharing)。
+ 互斥共享的資源稱為臨界資源(critical resources)，例如印表機等，在同一時間內只允許一個進程訪問，需要用同步機制來實現互斥訪問。
### 3. 虛擬(Virtual)
+ 虛擬技術把一個物理實體轉換為多個邏輯實體。
+ 主要有兩種虛擬技術：分時技術(time sharing)、空間分享技術。
+ 多個進程能在同一個處理器上並行處理使用了分時技術，讓每個進程輪流占用處理器，每次只執行一小個時間片段並快速切換。
+ 虛擬記憶體使用了空間分享技術，它將物理記憶體抽象化為地址空間，每個進程都有各自的地址空間。地址空間的頁被映射到物理記憶體中，地址空間的頁並不需要全部在物理記憶體中，當使用到一個沒有物理記憶體的頁時，執行頁面置換演算法，將該頁置換到記憶體中。
### 4. 異步(Asynchronous)
+ 異步指進程不是一次性執行完畢，而是走走停停，以不可知的速度向前推進。

## 基本功能
### 1. 進程管理(Process management)
+ 進程管理、進程同步、進程通信、死鎖處理、處理調度等。
### 2. 記憶體管理(Memory management)
+ 記憶體分配、地址映射、記憶體保護與共享、虛擬記憶體等。
### 3. 文件管理(File management)
+ 文件儲存空間的管理、目錄管理、文件讀寫管理和保護等。
### 4. 設備管理(Equipment management)
+ 完成用戶的 I/O 請求，方便用戶使用各種設備，並提高設備的利用率。
+ 主要包含緩衝管理、設備分配、設備處理、虛擬設備等。

## 系統調用
+ 如果一個進程在用戶模式(user mode)需要使用內核模式(kernel mode)的功能，就進行系統調用從而陷入內核，由作業系統代為完成。
![interface](https://camo.githubusercontent.com/e6e9338fcb2f8c849b5ed9798862d27937d80c94721948dd87c5dec1e739c2c6/68747470733a2f2f63732d6e6f7465732d313235363130393739362e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f74475056302e706e67)
+ Linux 的系統調用主要有以下這些：
|-|-|
|**Task**|**Commands**|
|進程控制|fork(); exit(); wait();|
|進程通信|pipe(); shmget(); mmap();|
|文件操作|open(); read(); write();|
|設備操作|ioctl(); read(); write();|
|訊息維護|getpid(); alarm(); sleep();|
|安全|chmod(); umask(); chown();|
## 內核與微內核
![ring](https://th.bing.com/th/id/R.859db91aeb8ec96109d43097bd911459?rik=lA7Jg6HrEIuyFA&riu=http%3a%2f%2fresources.infosecinstitute.com%2fwp-content%2fuploads%2fKernelDebugging-03012013.jpg&ehk=XDpXoi61cf6s%2fX4BOz3ghmFHsUIdfRiN8q%2f82rDn8%2fM%3d&risl=&pid=ImgRaw&r=0)

### 1. 內核(kernel)
+ 內核是將作業系統功能作為一個緊密結合的整體放到內核。
+ 由於各模塊共享訊息，因此有很高的性能。
### 2. 微內核(microkernel)
+ 由於作業系統不斷複雜化，因此將一部分作業系統功能移出內核，從而降低內核的複雜性。移出的部分根據分層的原則劃分成若干服務，相互獨立。
+ 在微內核結構下，作業系統被劃分成小的、定義良好的模塊，只有微內核這一個模塊運行在內核模式，其餘模塊運行時在用戶模式。
+ 因為脫試頻繁地在用戶模式與內核模式間進行切換，所以有一定的性能損失。
![kernel](https://docs.microsoft.com/zh-cn/windows-hardware/drivers/gettingstarted/images/userandkernelmode01.png)

## 中斷分類
### 1. 中斷(interrupt)
+ 由 CPU 執行指令以外的事件引起，如 I/O 完成中斷，表示設備輸入/輸出處理已經完成，處理器能夠發送下一個輸入/輸出請求。此外還有時鐘中斷、控制台中斷等。
### 2. 異常(exception)
+ 由 CPU 執行指令的內部事件引起，如非法操作碼、地址越界、算術溢位(overflow)等。
### 3. 陷入(trap)
+ 在用戶程序中使用系統調用。

## 常見系統類型分類
### 1. 批次處理系統(Batch Processing System)
+ 一次性的處理已經蒐集的資料。
+ 適合處理週期性的大筆資料。
+ 如大型機(Mainframe)。
### 2. 多行程系統(Muliprogramming System)
+ 系統中存在多組行程同時(concurrent)執行，避免CPU閒置，提升CPU利用度。  
**注意，不是平行運算(parallel computing)
+ **Multiprogramming Degree**：指系統內所存在等待執行的行程(proess)數目。
Multiprogramming Degree 愈高，則 CPU 使用度可能愈高，但若產生 **Thrashing**，可能會使 CPU 效能降低。
    + 振盪(Thrashing)：當 CPU 效能降低時，系統會想引入更多的 process 讓 CPU 盡可能地工作。但當存有太多 process 時，大部分的工作會花費在 Page Fault 造成的 Page Replacement，致使 CPU 效率下降，最後造成 CPU 的效能越來越低。
        1. 降低 Multiprogramming Degree。
        2. 利用 Page Fault Frequencry (Ratio) 控制來防止 Thrashing。
        3. 利用 Working Set Model 預估各 Process 在不同執行時期所需的頁框數，並依此提供足夠的頁框數，以防止 Thrashing。
### 3. 分時系統(Time Sharing System)
+ 或稱多工系統(Multi-Tasking System)。
+ 多行程系統的一種，OS 透過資源分享，使得每個使用者都認為有一套專屬的系統存在，提升反應時間(Response Time)。
+ 常見配置：
    + 行程排程使用輪詢調度(Robin Round Scheduling, RR Scheduling)。
    + 記憶體空間所有使用者共享。
    + 使用虛擬記憶體技術。
    + I/O 裝置透過
### 4. 多核系統與平行系統(Multiprocessor System and Parallel System)
+ 具有一個以上的CPU核心單元組，各核心之間共享記憶體、匯流排等資源，將工作同時分配給多個 CPU 處理。
+ 執行緒數是邏輯上模擬出來的 CPU 核心數，用於多工處理的需要。
+ 多核處理器又可分為：
    + Symmetric Multiprocessing (SMP)：對稱式多處理器，每一個處理器具有相同的功能，可靠度較高，強調負載平衡。
    + Asymmetric Multiprocessing (ASMP)：非對稱式多處理器，主僕架構。
+ [*補充：CPU個數、CPU核心數、CPU執行緒數*](/posts/cs/os/cpucorethread/)
### 5. 分散式系統(Distributed System)
+ 整合各地不同的電腦，以網路連線的方式，將工作分派給不同的電腦執行以提高效率。
+ 需滿足兩個條件：
    1. 硬體上每台電腦都是自主的
    2. 軟體上用戶將整個系統看作是一台電腦。
+ 一般分為兩類，分別是：
    1. 主僕式系(Client-Server System)
    2. P2P系統(Peer-to-peer)
+ 好處：
    + 資源共享(Resource Sharing)
    + 加快計算速度(Speed Up)
    + 可靠性(Reliability)
    + 通訊需求(Communication Need)
### 6. 即時系統(Real Time System)
+ 定義嚴謹的固定時間限制，電腦在處理工作時必須在這個定義的時間內完成，否則工作就算失效。
+ 依類型可分為兩類：
    + 硬性即時系統(Hard Real Time System)
    + 軟性即時系統(Soft Real Time System)
### 7. 叢集系統(Clustered System)
+ 叢叢集系統共享儲存裝置，集合許多 CPU 並且由網路連線緊密地連結以完成工作。叢集系統主要是利用多台獨立的電腦系統或是工作站來共同完成大型數值的平行計算。
+ 通常較不依賴記憶體。