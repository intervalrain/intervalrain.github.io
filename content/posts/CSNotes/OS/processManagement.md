---
title: "[計算機作業系統] 進程管理"
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

# 進程管理
## 進程與執行緒
### 1. 進程(process)
+ 進程是資源分配的基本單位。
+ 進程控制塊(Process Control Block, PCB)描述進程的基本訊息和運行狀態，所謂的創建進程和撤銷進程，都是指對 PCB 的操作。
![PCB](https://www.usna.edu/Users/cs/bilzor/ic411/calendar.php?key=c8bc3778e1e290e4a99e60360fa8c03a340b21ad&type=class&event=6)
### 2. 執行緒(thread)
+ 執行緒又稱線程，是獨立調度的基本單位。
+ 一個進程可以有多個執行緒，它們共享進程資源。
+ 以瀏覽器(browser)為例，瀏覽器進程有很多執行緒，如 HTTP 請求(request)、事件響應、渲染。執行緒的並行處理(concurrent)使得瀏覽器中點擊一個新的超連結從而發起 HTTP 請求時，瀏覽器還可以響應用戶的其它事件。
    ![thread](https://4.bp.blogspot.com/-QyEW1jszBJM/UnUsSC-mVOI/AAAAAAAAABY/Z94NgDcWTb4/s640/process-thread.png)

### 3. 區別
1. 擁有資源
    + 進程是資源分配的基本單位，但是執行緒不擁有資源，而是訪問隸屬進程的資源。
2. 調度
    + 執行緒是獨立調度的基本單位，在同一進程中，執行緒的切換不會引起進程切換，從一個進程中的執行緒切換到另一個進程中的執行緒時，才會進行進程的切換。
3. 系統開銷
    + 由於創建或撤銷進程時，系統都要為之分配或回收資源，如硬碟中的記憶體、I/O 設備等，所付出的開銷遠大於創建或撤銷執行緒時的開銷。
    + 同樣的，在進行進程切換時，涉及當前執行進程 CPU 環境的保存及新調度進程 CPU 環境的設置，而執行緒切換只需保存和設置少量暫存器的內容，開銷較小。
4. 溝通
    + 執行緒可以通過直接讀寫同一個進程中的數據進行溝通，但是進程的溝通需要借助 IPC(inter-process communication)。
## 進程狀態的切換
![process state](https://jingtao.fun/images/%E8%AF%BB%E4%B9%A6-%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/image-20201102105129598.png)
+ 就緒就態(ready)：等待被調度
+ 執行狀態(running)
+ 阻塞狀態(waiting)：等待資源
    + 只有就緒狀態和執行狀態可以相互轉換，其它的都是單向轉換。就緒狀態的進程通過調度演算法從而獲得 CPU Time，轉為執行狀態；而執行狀態的進程，在分配給它的 CPU Time 片段用完之後就會轉為就緒狀態，等待下一次調度。
    + 阻塞狀態是缺少需要的資源從而由執行狀態轉換而來，但是該資源不包括 CPU Time, 缺少 CPU Time 會從執行狀態轉換為就緒狀態。
## 進程調度演算法
+ 不同環境的調度演算法目標不同，因此需要針對不同環境來討論調度演算法。
### 1. 批次處理系統(batch system)
+ 批次處理系統沒有太多的用戶操作，在該系統中，調度演算法目標是保証吞吐量和周轉時間(從提交到終止的時間)。
#### 1.1 先來先服務(first-come first-served, FCFS)
+ 非搶占式的調度，按照請求的順序進行調度。
+ 有利於長作業，不利於短作業，因為短作業必須一直等待前面的長作業執行完畢才能執行，而長作業又需要執行很長時間，造成短作業等待時間過長
#### 1.2 短作業優先(shortest job first, SJF)
+ 非搶占式的調度算法，按估計運行時間最短的順序進行調度。
+ 長作業有可能會永遠做不完，處於一直等待短作業執行完畢的狀態。因為如果一直有短作業到來，那麼長作業永遠得不到調度。
#### 1.3 最短剩餘時間優先(shortest remaining time next, SRTN)
+ 最短作業優先的搶占式版本，按剩餘運行時間的順序進行調度。當一個新的作業到達時，其整個運行時間與當前進程的剩餘時間作比較。如果新的進程需要的時間更少，則夠停當下進程，運行新的進程；否則則讓新的進程進入等待。
### 2. 交互式系統(time-sharing system)
+ 交互式系統有大量的用戶交互操作，在該系統中調度演算法的目標是快速地進行響應。
#### 2.1 時間片段輪轉(robin round scheduling, RR)
+ 將所有就緒進程按 FCFS 的原則排成一個佇列，每次調度時，把 CPU 時間分配給佇首進程，該進程可以執行一個時間片段，當時間片段用完時，由計時器發出時鐘中斷，調度程序便停止該進程的執行，並將它送往就緒佇尾，同時繼續把 CPU 時間分配給佇首的進程。
+ 時間片段輪轉演算法的效率和時間片段的大小很有關係：
    + 因為進程切換都要保存進程的訊息並且載入新進程的訊息，如果時間片段太小，會導致頻繁地切換進程，導致時間浪費。
    + 而如果時間片段過長，那麼實時性就不能得到保証。
#### 2.2 優先級調度(priority scheduling)
+ 為每個進程分配一個優先級，按優先級進行調度。
+ 為了防止低優先級的進程永遠等不到調度，可以隨著時間的推移增加等待進程的優先級。
#### 2.3 多級反饋佇列(Multilevel Feedback-Queue Scheduling, MLFQ)
+ 一個進程需要執行 100 個時間片段，如果採用時間片段輪轉調度演算法，那麼需要交換 100 次。
+ 多級佇列是為這種需要連續執行多個時間片段的進程考慮，它設置了多個佇列，每個佇列時間片段大小都不同，例如 1, 2, 4, 8,...。進程在第一個佇列沒執行完，就會被移到下一個佇列。這種方式下，之前的進程只需要交換 7 次。
+ 每個佇列優先權也不同，最上面的優先權最高。因此只有上一個佇列沒有進程在排隊，才能調度當前佇列上的進程。可以將這種調度算法看成是時間片段輪轉調度算法和優先級調度算法的結合。
![MLFQ](https://i.pinimg.com/736x/9e/56/96/9e5696a52f10453be9717470b28a44c7--round-robin-robins.jpg)
### 3. 實時系統(real time system)
+ 實時系統要求一個請求在一個確定時間內得到響應。
+ 分為硬實時和軟實時，前者必須滿足絕對的截止時間，後者可以容忍一定的超時。
## 進程同步
### 1. 臨界區
+ 對臨界資源進行訪問的那段代碼稱為臨界區。
+ 為了互斥訪問臨界資源，每個進程在進入臨界區之前，需要先進行檢查。
```C++
// entry section
// crtical section;
// exit section
```
### 2. 同步與互斥(synchronization and mutex)
+ 同步(synchronization)：多個進程因為合作產生的直接制約關係，使得進程有一定的先後執行關係。
+ 互斥(mutual exclusion, mutex)：多個進程在同一時刻只有一個進程能進入臨界區。
### 3. 號誌(Semaphore)
+ 號誌，或稱信號量，是一個整數變數，可以對其執行 down 和 up 操作，也就是常見的 P 和 V 操作。
    + **down**：如果號誌量大於 0，執行 -1 操作；如果號誌等於 0，進程睡眠，等待號誌大於 0。
    + **up**：對號誌執行 +1 操作，喚醒睡眠的進程讓其完成 down 操作。
+ down 和 up 操作需要被設計成原語，不可分割，通常的做法是在執行這些操作的時候屏蔽中斷。  
如果號誌的取值只能為 0 或者 1，那麼就成為了互斥(mutex)，0 表示臨界區已經加鎖，1 表示臨界區解鎖。
```C++
typedef int semaphore;
semaphore mutex = 1;
void P1(){
    down(&mutex);
    // critical section
    up(&mutex);
}

void P2(){
    down(&mutex);
    // critical section
    up(&mutex);
}
```
---
**使用號誌實現生產者-消費者問題**
![producer-consumer-problem](https://th.bing.com/th/id/R.dbbe36e7d63143d6defdab98ece8fff8?rik=J8NwPrcsGHP7jw&pid=ImgRaw&r=0)
+ 問題描述：使用一個緩衝區來保存物品，只有緩沖區沒有滿，生產者才可以放入物品；只有緩衝區不為空，消費者才可以拿走物品。  
+ 因為緩衝區屬於臨界資源，因此需要使用一個互斥 mutex 來控制對緩衝區的互斥訪問。  
+ 為了同步生產者和消費者的行為，需要記錄緩衝區中物品的數量。數量可以使用號誌來進行統計，這裡需要使用兩個號誌：empty 記錄空緩衝區的數量，full 記錄滿緩衝區的數量。其中，empty 號誌是在生產者進程中使用，當 empty 不為 0 時，生產者才可以放入物品；full 號誌是在消費者進程中使用，當 full 號誌不為 0 時，消費者才可以取走物品。
+ 注意，不能先對緩衝區進行加鎖，再測試號誌。也就是說，不能先執行 down(mutex) 再執行 down(empty)。如果這麼做了，那麼可能會出現這種情況：生產者對緩衝區加鎖後，執行 down(empty) 操作，發現 empty = 0，此時生產者睡眠。消費者不能進入臨界區，因為生產者對緩衝區加鎖了，消費者就無法執行 up(empty) 操作，empty 永遠都為 0，導致生產者永遠等待下，不會釋放鎖，消費者因此也會永遠等待下去。
```C++
#define N 100
typedef int semaphore;
semaphore mutex = 1;
semaphore empty = N;
semaphore full = 0;

void producer() {
    while(TRUE) {
        int item = produce_item();
        down(&empty);
        up(&mutex);                 // entry section
        insert_item(item);          // critical section
        up(&mutex);                 // exit section
        up(&full);
    }
}

void consumer() {
    while(TRUE) {
        down(&full);
        down(&mutex);               // entry section
        int item = remove_item();   // critical section
        consume_item(item);         // exit section
        up(&mutex);
        up(&empty);
    }
}
```
### 4. 管程
+ 使用號誌機制實現的生產者消費者問題需要客戶端代碼做很多控制，而管程把控制的代碼獨立出來，不僅不容易出錯，也使得客戶端程式碼調用更容易。
+ C 語言不支持管程，下面的示範程式碼使用了類 Pascal 語言來描述管程。範例程式碼的管程提供 `insert()` 和 `remove()` 方法，客戶端程式碼通過調用這兩個方法來解決生產者-消費者問題。
```Verilog
monitor ProducerConsumer
    integer i
    condition c;

    procedure insert();
    begin
        // ...
    end

    procedure remove();
    begin
        // ...
    end
end monitor;
```
+ 管程有一個重要特性：在一個時刻只能有一個進程使用管程。進程在無法繼續執行的時候不能一直占用管程，否則其它進程永遠不能使用管程。
+ 管程引入了**條件變量**以及相關的操作：`wait()` 和 `signal()` 來實現同步操作。對條件變數執行 `wait()` 操作會導致調用進程阻塞，把管程讓出來給另一個進程持有。`signal()` 操作用於喚醒被阻塞的進程。
```Verilog
monitor ProducerConsumer
    condition full, empty;
    integer count = 0;
    conditon c;

    procedure insert(item: integer);
    begin
        if count = N then wait(full);
        insert_item(item);
        count := count + 1;
        if count = 1 then signal(empty);
    end;

    function remove: integer;
    begin
        if count = 0 then wait(empty);
        remove = remove_item;
        count := count - 1;
        if count = N - 1 then signal(full);
    end;
end monitor;

precedure producer
begin
    while true do
    begin
        item = produce_item;
        ProducerConsumer.insert(item);
    end;
end;

Procedure consumer
begin
    while true do
    begin
        item = ProducerConsumer.remove;
        consume_item(item);
    end;
end;
```
---
## 經典同步問題
### 1. 哲學家進餐問題
![philosopher](https://camo.githubusercontent.com/7f8eb6362323b56a5dd8ec061d7ea0c5b0d07a842132598bbed860a8bb941317/68747470733a2f2f63732d6e6f7465732d313235363130393739362e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f61393037376630362d373538342d346632622d386332302d3361386534363932383832302e6a7067)
+ 問題描述：五個哲學家圍著一張圓桌，每個哲學家面前放著食物。哲學家的生活有兩種交替活動：吃飯和思考。當一個哲學家吃飯時，需要先拿起自己左右邊的兩根筷子，並且一次只能拿起一根筷子。
+ 若所有哲學家同時拿起左手邊的筷子，那麼所有哲學家都在等待其它哲學家吃完並放下手中的筷子，導致 dead lock。
+ 為了防止 dead lock 的產生，可以設置兩個條件：
    + 必須同時拿起左右兩根筷子；
    + 只有在兩個鄰居都沒有進餐的情況下才允許進餐。
```C++
#define N 5
#define LEFT (i + N - 1) % N
#define RIGHT (i + 1) % N
#define THINKING 0
#define HUNGRY   1
#define EATING   2
typedef int semaphore;
int state[N];           // philosopher's state
semaphore mutex = 1;    // mutex for critical section
semaphore s[N];         // semaphore of philosopher

void philosopher(int i){
    while(TRUE){
        think(i);
        take_two(i);
        eat(i);
        put_two(i);
    }
}

void take_two(int i){
    down(&mutex);
    state[i] = HUNGRY;
    check(i);
    up(&mutex);
    down(&s[i]);        // eat only if receive notification, or wait
}

void put_two(int i){
    down(&mutex);
    state[i] = THINKING;
    check(LEFT);        // notify left and right
    check(RIGHT);
    up(&mutex);
}

void eat(int i){
    down(&mutex);
    state[i] = EATING;
    up(&mutex);
}

void check(int i ){
    if (state[i] == HUNGRY && state[LEFT] != EATING && state[EIGHT] != EATING){
        state[i] = EATING;
        up(&s[i]);
    }
}
```
### 2. 讀寫問題
## 進程溝通
### 1. 管道
### 2. FIFO
### 3. 訊息佇列
### 4. 訊號量
### 5. 記憶體共享
### 6. word 套接

