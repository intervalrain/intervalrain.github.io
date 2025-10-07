# C# 並行與異步編程完整教學

## 目錄
1. [基礎概念](#基礎概念)
2. [處理器架構](#處理器架構)
3. [同步機制](#同步機制)
4. [異步編程元件](#異步編程元件)
5. [常見模式](#常見模式)
6. [常見問題與陷阱](#常見問題與陷阱)

---

## 基礎概念

### 多執行緒與並行

**執行緒 (Thread)** 是作業系統能夠進行運算排程的最小單位。一個程序可以包含多個執行緒，這些執行緒共享程序的記憶體空間。

**並行 (Concurrency)** 是指多個任務在重疊的時間段內執行，不一定是同時執行。

**平行 (Parallelism)** 是指多個任務在同一時刻真正同時執行，需要多核處理器支援。

### 異步編程 (Asynchronous Programming)

異步編程允許程式在等待某個操作完成時繼續執行其他工作，而不是阻塞等待。在 C# 中，主要透過 `async` 和 `await` 關鍵字實現。

```csharp
// 同步版本 - 會阻塞執行緒
public string DownloadData(string url)
{
    var client = new HttpClient();
    var response = client.GetStringAsync(url).Result; // 阻塞
    return response;
}

// 異步版本 - 不阻塞執行緒
public async Task<string> DownloadDataAsync(string url)
{
    var client = new HttpClient();
    var response = await client.GetStringAsync(url); // 不阻塞
    return response;
}
```

**關鍵差異**：

- 同步方法會佔用執行緒直到操作完成
- 異步方法在等待時釋放執行緒，讓它可以處理其他工作
- 異步特別適合 I/O 密集型操作（網路請求、檔案讀寫、資料庫查詢）

---

## 處理器架構

### 單核處理器

在單核處理器上，作業系統透過時間切片 (Time Slicing) 快速切換執行緒，創造出並行執行的假象。這種切換稱為上下文切換 (Context Switch)，有一定的效能開銷。

```csharp
// 在單核上執行多執行緒
public void SingleCoreExample()
{
    var thread1 = new Thread(() => 
    {
        for (int i = 0; i < 100; i++)
            Console.WriteLine($"Thread 1: {i}");
    });
    
    var thread2 = new Thread(() => 
    {
        for (int i = 0; i < 100; i++)
            Console.WriteLine($"Thread 2: {i}");
    });
    
    thread1.Start();
    thread2.Start();
    
    // 輸出會交錯出現，但不是真正的同時執行
}
```

### 多核處理器

多核處理器可以真正同時執行多個執行緒，實現平行處理。現代電腦通常都是多核架構。

```csharp
// 利用多核進行平行計算
public void MultiCoreExample()
{
    var numbers = Enumerable.Range(1, 1000000).ToArray();
    
    // 單執行緒計算
    var sw = Stopwatch.StartNew();
    long sum1 = numbers.Sum(x => (long)x * x);
    sw.Stop();
    Console.WriteLine($"單執行緒: {sw.ElapsedMilliseconds}ms");
    
    // 平行計算
    sw.Restart();
    long sum2 = numbers.AsParallel().Sum(x => (long)x * x);
    sw.Stop();
    Console.WriteLine($"平行處理: {sw.ElapsedMilliseconds}ms");
}
```

**效能考量**：

- CPU 密集型任務受益於多核平行處理
- I/O 密集型任務更適合異步編程
- 過多的執行緒會導致上下文切換開銷增加

---

## 同步機制

### Mutex (互斥鎖)

Mutex 是一種跨程序的同步原語，確保同一時間只有一個執行緒可以進入臨界區。

```csharp
public class MutexExample
{
    private static Mutex mutex = new Mutex();
    private static int counter = 0;
    
    public void IncrementWithMutex()
    {
        mutex.WaitOne(); // 取得互斥鎖
        try
        {
            counter++;
            Console.WriteLine($"Counter: {counter}, Thread: {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(100); // 模擬工作
        }
        finally
        {
            mutex.ReleaseMutex(); // 釋放互斥鎖
        }
    }
    
    public void RunExample()
    {
        var threads = new Thread[5];
        for (int i = 0; i < 5; i++)
        {
            threads[i] = new Thread(IncrementWithMutex);
            threads[i].Start();
        }
        
        foreach (var thread in threads)
            thread.Join();
    }
}
```

**Mutex vs Monitor (lock)**：

- Mutex 可以跨程序使用
- Monitor (lock) 只能在同一程序內使用，但效能較好
- Mutex 有擁有者概念，只有取得 Mutex 的執行緒才能釋放它

### Monitor 與 lock

`lock` 是 C# 的語法糖，底層使用 `Monitor` 類別。

```csharp
public class MonitorExample
{
    private readonly object lockObject = new object();
    private int counter = 0;
    
    public void IncrementWithLock()
    {
        lock (lockObject) // 等同於 Monitor.Enter/Exit
        {
            counter++;
            Console.WriteLine($"Counter: {counter}");
        }
    }
    
    // 使用 Monitor 的完整寫法
    public void IncrementWithMonitor()
    {
        Monitor.Enter(lockObject);
        try
        {
            counter++;
            Console.WriteLine($"Counter: {counter}");
        }
        finally
        {
            Monitor.Exit(lockObject);
        }
    }
    
    // Monitor 提供超時功能
    public bool TryIncrementWithTimeout(int timeoutMs)
    {
        if (Monitor.TryEnter(lockObject, timeoutMs))
        {
            try
            {
                counter++;
                return true;
            }
            finally
            {
                Monitor.Exit(lockObject);
            }
        }
        return false;
    }
}
```

---

## 異步編程元件

### Thread（執行緒）

`Thread` 是最基礎的多執行緒機制，提供對執行緒的直接控制。

```csharp
public class ThreadExample
{
    // 基本使用
    public void BasicThreadUsage()
    {
        var thread = new Thread(DoWork);
        thread.Start();
        thread.Join(); // 等待執行緒完成
    }
    
    private void DoWork()
    {
        Console.WriteLine($"執行緒 {Thread.CurrentThread.ManagedThreadId} 開始工作");
        Thread.Sleep(1000);
        Console.WriteLine("工作完成");
    }
    
    // 傳遞參數
    public void ThreadWithParameter()
    {
        var thread = new Thread(DoWorkWithParam);
        thread.Start("Hello from main thread");
    }
    
    private void DoWorkWithParam(object data)
    {
        string message = (string)data;
        Console.WriteLine(message);
    }
    
    // 前景與背景執行緒
    public void ForegroundVsBackground()
    {
        // 前景執行緒：應用程式會等待它完成
        var foregroundThread = new Thread(LongRunningWork);
        foregroundThread.IsBackground = false;
        foregroundThread.Start();
        
        // 背景執行緒：應用程式結束時會被終止
        var backgroundThread = new Thread(LongRunningWork);
        backgroundThread.IsBackground = true;
        backgroundThread.Start();
    }
    
    private void LongRunningWork()
    {
        for (int i = 0; i < 10; i++)
        {
            Console.WriteLine($"Working... {i}");
            Thread.Sleep(500);
        }
    }
}
```

**Thread 的限制**：

- 建立執行緒的開銷較大（約 1MB 記憶體）
- 難以控制執行緒數量
- 缺乏取消機制
- 不易處理例外狀況
- 不適合大量短期任務

### Task（任務）

`Task` 是基於執行緒池的抽象，提供更好的資源管理和錯誤處理。

```csharp
public class TaskExample
{
    // 基本使用
    public async Task BasicTaskUsage()
    {
        // 建立並啟動 Task
        Task task = Task.Run(() => 
        {
            Console.WriteLine("Task 正在執行");
            Thread.Sleep(1000);
        });
        
        await task; // 等待完成
    }
    
    // 回傳值的 Task
    public async Task<int> TaskWithReturnValue()
    {
        Task<int> task = Task.Run(() => 
        {
            Thread.Sleep(1000);
            return 42;
        });
        
        int result = await task;
        return result;
    }
    
    // 平行執行多個 Task
    public async Task ParallelTasks()
    {
        var task1 = Task.Run(() => DownloadData("url1"));
        var task2 = Task.Run(() => DownloadData("url2"));
        var task3 = Task.Run(() => DownloadData("url3"));
        
        // 等待所有任務完成
        await Task.WhenAll(task1, task2, task3);
        
        // 或等待任一任務完成
        await Task.WhenAny(task1, task2, task3);
    }
    
    // 連續任務
    public async Task TaskContinuation()
    {
        var result = await Task.Run(() => 10)
            .ContinueWith(t => t.Result * 2)
            .ContinueWith(t => t.Result + 5);
        
        Console.WriteLine(result); // 25
    }
    
    // 取消 Task
    public async Task TaskCancellation()
    {
        var cts = new CancellationTokenSource();
        var token = cts.Token;
        
        var task = Task.Run(async () => 
        {
            for (int i = 0; i < 100; i++)
            {
                token.ThrowIfCancellationRequested();
                await Task.Delay(100);
                Console.WriteLine($"進度: {i}%");
            }
        }, token);
        
        // 2 秒後取消
        await Task.Delay(2000);
        cts.Cancel();
        
        try
        {
            await task;
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("任務已取消");
        }
    }
    
    // 錯誤處理
    public async Task TaskErrorHandling()
    {
        try
        {
            await Task.Run(() => 
            {
                throw new InvalidOperationException("發生錯誤");
            });
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"捕獲例外: {ex.Message}");
        }
    }
    
    private string DownloadData(string url)
    {
        Thread.Sleep(1000);
        return $"Data from {url}";
    }
}
```

### SemaphoreSlim（輕量級信號量）

`SemaphoreSlim` 限制同時存取資源的執行緒數量，是異步友好的同步原語。

```csharp
public class SemaphoreSlimExample
{
    private readonly SemaphoreSlim semaphore = new SemaphoreSlim(3); // 最多 3 個並行
    
    // 基本使用
    public async Task BasicUsage()
    {
        await semaphore.WaitAsync(); // 進入信號量
        try
        {
            Console.WriteLine($"執行緒 {Thread.CurrentThread.ManagedThreadId} 進入");
            await Task.Delay(2000); // 模擬工作
        }
        finally
        {
            semaphore.Release(); // 釋放信號量
        }
    }
    
    // 限制並行 API 呼叫
    public class ApiClient
    {
        private readonly SemaphoreSlim semaphore = new SemaphoreSlim(5); // 最多 5 個並行請求
        private readonly HttpClient httpClient = new HttpClient();
        
        public async Task<string> GetDataAsync(string url)
        {
            await semaphore.WaitAsync();
            try
            {
                Console.WriteLine($"開始請求: {url}");
                var response = await httpClient.GetStringAsync(url);
                Console.WriteLine($"完成請求: {url}");
                return response;
            }
            finally
            {
                semaphore.Release();
            }
        }
        
        // 批次處理多個請求
        public async Task ProcessManyRequests()
        {
            var urls = Enumerable.Range(1, 20).Select(i => $"https://api.example.com/data/{i}");
            var tasks = urls.Select(url => GetDataAsync(url));
            var results = await Task.WhenAll(tasks);
        }
    }
    
    // 使用超時
    public async Task<bool> TryEnterWithTimeout(int timeoutMs)
    {
        if (await semaphore.WaitAsync(timeoutMs))
        {
            try
            {
                // 執行工作
                await Task.Delay(1000);
                return true;
            }
            finally
            {
                semaphore.Release();
            }
        }
        
        Console.WriteLine("無法在時限內取得信號量");
        return false;
    }
    
    // 動態調整容量
    public class DynamicSemaphore
    {
        private SemaphoreSlim semaphore;
        private int currentLimit;
        
        public DynamicSemaphore(int initialLimit)
        {
            currentLimit = initialLimit;
            semaphore = new SemaphoreSlim(initialLimit);
        }
        
        public async Task IncreaseCapacity(int amount)
        {
            for (int i = 0; i < amount; i++)
            {
                semaphore.Release();
            }
            currentLimit += amount;
            Console.WriteLine($"容量增加至 {currentLimit}");
        }
        
        public async Task Work()
        {
            await semaphore.WaitAsync();
            try
            {
                // 執行工作
                await Task.Delay(1000);
            }
            finally
            {
                semaphore.Release();
            }
        }
    }
}
```

**SemaphoreSlim 使用場景**：

- 限制資料庫連線數量
- 控制並行 API 請求
- 限制檔案同時讀寫數
- 資源池管理

### Channel（通道）

`Channel<T>` 是 .NET 中用於生產者-消費者模式的高效能、執行緒安全的資料結構。

```csharp
public class ChannelExample
{
    // 基本的生產者-消費者
    public async Task BasicProducerConsumer()
    {
        var channel = Channel.CreateUnbounded<int>();
        
        // 生產者
        var producer = Task.Run(async () =>
        {
            for (int i = 0; i < 10; i++)
            {
                await channel.Writer.WriteAsync(i);
                Console.WriteLine($"生產: {i}");
                await Task.Delay(100);
            }
            channel.Writer.Complete(); // 標記完成
        });
        
        // 消費者
        var consumer = Task.Run(async () =>
        {
            await foreach (var item in channel.Reader.ReadAllAsync())
            {
                Console.WriteLine($"消費: {item}");
                await Task.Delay(200);
            }
        });
        
        await Task.WhenAll(producer, consumer);
    }
    
    // 有界通道（限制容量）
    public async Task BoundedChannel()
    {
        var options = new BoundedChannelOptions(5)
        {
            FullMode = BoundedChannelFullMode.Wait // 滿時等待
        };
        
        var channel = Channel.CreateBounded<string>(options);
        
        var producer = Task.Run(async () =>
        {
            for (int i = 0; i < 20; i++)
            {
                await channel.Writer.WriteAsync($"Item {i}");
                Console.WriteLine($"生產 Item {i}");
            }
            channel.Writer.Complete();
        });
        
        var consumer = Task.Run(async () =>
        {
            await foreach (var item in channel.Reader.ReadAllAsync())
            {
                Console.WriteLine($"消費 {item}");
                await Task.Delay(500); // 慢速消費
            }
        });
        
        await Task.WhenAll(producer, consumer);
    }
    
    // 多個生產者，多個消費者
    public async Task MultipleProducersConsumers()
    {
        var channel = Channel.CreateUnbounded<int>();
        
        // 3 個生產者
        var producers = Enumerable.Range(0, 3).Select(producerId =>
            Task.Run(async () =>
            {
                for (int i = 0; i < 5; i++)
                {
                    int value = producerId * 100 + i;
                    await channel.Writer.WriteAsync(value);
                    Console.WriteLine($"生產者 {producerId} 生產: {value}");
                    await Task.Delay(Random.Shared.Next(100, 300));
                }
            })
        ).ToArray();
        
        // 等待所有生產者完成後關閉通道
        _ = Task.Run(async () =>
        {
            await Task.WhenAll(producers);
            channel.Writer.Complete();
        });
        
        // 2 個消費者
        var consumers = Enumerable.Range(0, 2).Select(consumerId =>
            Task.Run(async () =>
            {
                await foreach (var item in channel.Reader.ReadAllAsync())
                {
                    Console.WriteLine($"消費者 {consumerId} 消費: {item}");
                    await Task.Delay(Random.Shared.Next(100, 300));
                }
            })
        ).ToArray();
        
        await Task.WhenAll(consumers);
    }
    
    // 資料處理管道
    public class DataPipeline
    {
        public async Task ProcessData()
        {
            var stage1Channel = Channel.CreateUnbounded<int>();
            var stage2Channel = Channel.CreateUnbounded<int>();
            var stage3Channel = Channel.CreateUnbounded<string>();
            
            // 階段 1: 產生資料
            var stage1 = Task.Run(async () =>
            {
                for (int i = 1; i <= 100; i++)
                {
                    await stage1Channel.Writer.WriteAsync(i);
                }
                stage1Channel.Writer.Complete();
            });
            
            // 階段 2: 過濾偶數
            var stage2 = Task.Run(async () =>
            {
                await foreach (var number in stage1Channel.Reader.ReadAllAsync())
                {
                    if (number % 2 == 0)
                    {
                        await stage2Channel.Writer.WriteAsync(number);
                    }
                }
                stage2Channel.Writer.Complete();
            });
            
            // 階段 3: 轉換為字串
            var stage3 = Task.Run(async () =>
            {
                await foreach (var number in stage2Channel.Reader.ReadAllAsync())
                {
                    await stage3Channel.Writer.WriteAsync($"Number: {number}");
                }
                stage3Channel.Writer.Complete();
            });
            
            // 最終消費
            var consumer = Task.Run(async () =>
            {
                await foreach (var result in stage3Channel.Reader.ReadAllAsync())
                {
                    Console.WriteLine(result);
                }
            });
            
            await Task.WhenAll(stage1, stage2, stage3, consumer);
        }
    }
    
    // 錯誤處理
    public async Task ChannelWithErrorHandling()
    {
        var channel = Channel.CreateUnbounded<int>();
        
        var producer = Task.Run(async () =>
        {
            try
            {
                for (int i = 0; i < 10; i++)
                {
                    if (i == 5)
                        throw new InvalidOperationException("生產錯誤");
                    
                    await channel.Writer.WriteAsync(i);
                }
                channel.Writer.Complete();
            }
            catch (Exception ex)
            {
                channel.Writer.Complete(ex); // 傳遞例外
            }
        });
        
        var consumer = Task.Run(async () =>
        {
            try
            {
                await foreach (var item in channel.Reader.ReadAllAsync())
                {
                    Console.WriteLine($"處理: {item}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"消費者捕獲例外: {ex.Message}");
            }
        });
        
        await Task.WhenAll(producer, consumer);
    }
}
```

**Channel 優勢**：

- 執行緒安全，無需額外鎖定
- 支援異步操作
- 效能優異
- 內建背壓處理（有界通道）
- 清晰的完成語意

---

## 常見模式

### 生產者-消費者模式

```csharp
public class ProducerConsumerPattern
{
    // 使用 BlockingCollection
    public void UsingBlockingCollection()
    {
        var queue = new BlockingCollection<int>(boundedCapacity: 10);
        
        var producer = Task.Run(() =>
        {
            for (int i = 0; i < 20; i++)
            {
                queue.Add(i);
                Console.WriteLine($"生產: {i}");
                Thread.Sleep(100);
            }
            queue.CompleteAdding();
        });
        
        var consumer = Task.Run(() =>
        {
            foreach (var item in queue.GetConsumingEnumerable())
            {
                Console.WriteLine($"消費: {item}");
                Thread.Sleep(200);
            }
        });
        
        Task.WaitAll(producer, consumer);
    }
    
    // 使用 Channel (推薦)
    public async Task UsingChannel()
    {
        var channel = Channel.CreateBounded<int>(10);
        
        var producer = Task.Run(async () =>
        {
            for (int i = 0; i < 20; i++)
            {
                await channel.Writer.WriteAsync(i);
                Console.WriteLine($"生產: {i}");
                await Task.Delay(100);
            }
            channel.Writer.Complete();
        });
        
        var consumer = Task.Run(async () =>
        {
            await foreach (var item in channel.Reader.ReadAllAsync())
            {
                Console.WriteLine($"消費: {item}");
                await Task.Delay(200);
            }
        });
        
        await Task.WhenAll(producer, consumer);
    }
}
```

### 平行處理模式

```csharp
public class ParallelProcessingPatterns
{
    // Parallel.For
    public void ParallelFor()
    {
        Parallel.For(0, 100, i =>
        {
            Console.WriteLine($"處理項目 {i} on thread {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(10);
        });
    }
    
    // Parallel.ForEach
    public void ParallelForEach()
    {
        var items = Enumerable.Range(1, 100).ToList();
        
        Parallel.ForEach(items, new ParallelOptions 
        { 
            MaxDegreeOfParallelism = 4 
        }, 
        item =>
        {
            Console.WriteLine($"處理 {item}");
            Thread.Sleep(10);
        });
    }
    
    // PLINQ
    public void PlinqExample()
    {
        var numbers = Enumerable.Range(1, 1000000);
        
        var result = numbers
            .AsParallel()
            .WithDegreeOfParallelism(4)
            .Where(n => IsPrime(n))
            .OrderBy(n => n)
            .Take(100)
            .ToList();
        
        Console.WriteLine($"找到 {result.Count} 個質數");
    }
    
    private bool IsPrime(int n)
    {
        if (n < 2) return false;
        for (int i = 2; i <= Math.Sqrt(n); i++)
        {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    // Task 平行處理
    public async Task TaskParallelProcessing()
    {
        var items = Enumerable.Range(1, 100).ToList();
        var tasks = new List<Task>();
        
        var semaphore = new SemaphoreSlim(10); // 限制並行度
        
        foreach (var item in items)
        {
            await semaphore.WaitAsync();
            
            var task = Task.Run(async () =>
            {
                try
                {
                    await ProcessItem(item);
                }
                finally
                {
                    semaphore.Release();
                }
            });
            
            tasks.Add(task);
        }
        
        await Task.WhenAll(tasks);
    }
    
    private async Task ProcessItem(int item)
    {
        await Task.Delay(100);
        Console.WriteLine($"處理完成: {item}");
    }
}
```

### 異步鎖定模式

```csharp
public class AsyncLockPatterns
{
    // 使用 SemaphoreSlim 實作異步鎖
    private readonly SemaphoreSlim asyncLock = new SemaphoreSlim(1, 1);
    
    public async Task CriticalSection()
    {
        await asyncLock.WaitAsync();
        try
        {
            // 臨界區
            await Task.Delay(1000);
        }
        finally
        {
            asyncLock.Release();
        }
    }
    
    // 自訂 AsyncLock 類別
    public class AsyncLock
    {
        private readonly SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
        
        public async Task<IDisposable> LockAsync()
        {
            await semaphore.WaitAsync();
            return new LockReleaser(semaphore);
        }
        
        private class LockReleaser : IDisposable
        {
            private readonly SemaphoreSlim semaphore;
            
            public LockReleaser(SemaphoreSlim semaphore)
            {
                this.semaphore = semaphore;
            }
            
            public void Dispose()
            {
                semaphore.Release();
            }
        }
    }
    
    // 使用範例
    private readonly AsyncLock myLock = new AsyncLock();
    
    public async Task UseAsyncLock()
    {
        using (await myLock.LockAsync())
        {
            // 臨界區
            await Task.Delay(1000);
        }
    }
}
```

### 取消與逾時模式

```csharp
public class CancellationPatterns
{
    // 基本取消
    public async Task BasicCancellation(CancellationToken cancellationToken)
    {
        for (int i = 0; i < 100; i++)
        {
            cancellationToken.ThrowIfCancellationRequested();
            
            await Task.Delay(100, cancellationToken);
            Console.WriteLine($"進度: {i}%");
        }
    }
    
    // 逾時取消
    public async Task WithTimeout()
    {
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        
        try
        {
            await LongRunningOperation(cts.Token);
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("操作逾時");
        }
    }
    
    // 組合多個取消來源
    public async Task CombinedCancellation(CancellationToken externalToken)
    {
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
        using var combined = CancellationTokenSource.CreateLinkedTokenSource(externalToken, cts.Token);
        
        await LongRunningOperation(combined.Token);
    }
    
    // 手動取消
    public async Task ManualCancellation()
    {
        var cts = new CancellationTokenSource();
        
        var task = Task.Run(async () =>
        {
            await LongRunningOperation(cts.Token);
        });
        
        // 3 秒後取消
        await Task.Delay(3000);
        cts.Cancel();
        
        try
        {
            await task;
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("操作已取消");
        }
    }
    
    private async Task LongRunningOperation(CancellationToken cancellationToken)
    {
        for (int i = 0; i < 100; i++)
        {
            cancellationToken.ThrowIfCancellationRequested();
            await Task.Delay(100);
        }
    }
}
```

### 重試模式

```csharp
public class RetryPatterns
{
    // 簡單重試
    public async Task<T> RetryAsync<T>(Func<Task<T>> operation, int maxRetries = 3)
    {
        for (int i = 0; i < maxRetries; i++)
        {
            try
            {
                return await operation();
            }
            catch (Exception ex) when (i < maxRetries - 1)
            {
                Console.WriteLine($"嘗試 {i + 1} 失敗: {ex.Message}");
                await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, i))); // 指數退避
            }
        }
        
        return await operation(); // 最後一次嘗試，讓例外拋出
    }
    
    // 使用範例
    public async Task RetryExample()
    {
        var result = await RetryAsync(async () =>
        {
            var client = new HttpClient();
            return await client.GetStringAsync("https://api.example.com/data");
        });
    }
    
    // 進階重試（使用 Polly 函式庫的概念）
    public class RetryPolicy<T>
    {
        private readonly int maxRetries;
        private readonly Func<int, TimeSpan> delayProvider;
        
        public RetryPolicy(int maxRetries, Func<int, TimeSpan> delayProvider)
        {
            this.maxRetries = maxRetries;
            this.delayProvider = delayProvider;
        }
        
        public async Task<T> ExecuteAsync(Func<Task<T>> operation)
        {
            Exception lastException = null;
            
            for (int retry = 0; retry < maxRetries; retry++)
            {
                try
                {
                    return await operation();
                }
                catch (Exception ex)
                {
                    lastException = ex;
                    
                    if (retry < maxRetries - 1)
                    {
                        var delay = delayProvider(retry);
                        Console.WriteLine($"重試 {retry + 1}/{maxRetries}，等待 {delay.TotalSeconds} 秒");
                        await Task.Delay(delay);
                    }
                }
            }
            
            throw new AggregateException("重試全部失敗", lastException);
        }
    }
}
```

---

## 常見問題與陷阱

### 死鎖 (Deadlock)

死鎖發生在兩個或多個執行緒互相等待對方釋放資源。

```csharp
public class DeadlockExample
{
    private readonly object lock1 = new object();
    private readonly object lock2 = new object();
    
    // 錯誤：可能造成死鎖
    public void BadMethod1()
    {
        lock (lock1)
        {
            Thread.Sleep(100);
            lock (lock2)
            {
                // 工作
            }
        }
    }
    
    public void BadMethod2()
    {
        lock (lock2)
        {
            Thread.Sleep(100);
            lock (lock1)
            {
                // 工作
            }
        }
    }
    
    // 解決方案 1：統一鎖定順序
    public void GoodMethod1()
    {
        lock (lock1)
        {
            lock (lock2)
            {
                // 工作
            }
        }
    }
    
    public void GoodMethod2()
    {
        lock (lock1)
        {
            lock (lock2)
            {
                // 工作
            }
        }
    }
    
    // 解決方案 2：使用 Monitor.TryEnter
    public bool TryAcquireLocks(int timeoutMs = 1000)
    {
        bool lock1Acquired = false;
        bool lock2Acquired = false;
        
        try
        {
            lock1Acquired = Monitor.TryEnter(lock1, timeoutMs);
            if (!lock1Acquired) return false;
            
            lock2Acquired = Monitor.TryEnter(lock2, timeoutMs);
            if (!lock2Acquired) return false;
            
            // 執行工作
            return true;
        }
        finally
        {
            if (lock2Acquired) Monitor.Exit(lock2);
            if (lock1Acquired) Monitor.Exit(lock1);
        }
    }
}
```

### 競態條件 (Race Condition)

多個執行緒同時存取共享資源導致非預期的結果。

```csharp
public class RaceConditionExample
{
    private int counter = 0;
    
    // 錯誤：有競態條件
    public void UnsafeIncrement()
    {
        counter++; // 不是原子操作
    }
    
    // 解決方案 1：使用 lock
    private readonly object counterLock = new object();
    
    public void SafeIncrement()
    {
        lock (counterLock)
        {
            counter++;
        }
    }
    
    // 解決方案 2：使用 Interlocked
    public void AtomicIncrement()
    {
        Interlocked.Increment(ref counter);
    }
    
    // 檢查再操作的競態條件
    private Dictionary<string, int> dictionary = new Dictionary<string, int>();
    
    // 錯誤
    public void UnsafeCheckThenAct(string key)
    {
        if (!dictionary.ContainsKey(key)) // 檢查
        {
            dictionary[key] = 0; // 操作 - 可能在這之間其他執行緒已加入
        }
        dictionary[key]++;
    }
    
    // 正確：使用 ConcurrentDictionary
    private ConcurrentDictionary<string, int> concurrentDict = new ConcurrentDictionary<string, int>();
    
    public void SafeCheckThenAct(string key)
    {
        concurrentDict.AddOrUpdate(key, 1, (k, v) => v + 1);
    }
}
```

### async/await 常見錯誤

```csharp
public class AsyncAwaitMistakes
{
    // 錯誤 1：async void（除了事件處理器外應避免）
    public async void BadAsyncVoid()
    {
        await Task.Delay(1000);
        throw new Exception("無法被捕獲");
    }
    
    // 正確：使用 async Task
    public async Task GoodAsyncTask()
    {
        await Task.Delay(1000);
        throw new Exception("可以被捕獲");
    }
    
    // 錯誤 2：阻塞式等待異步方法（可能死鎖）
    public void BadBlockingWait()
    {
        var result = GetDataAsync().Result; // 危險
        // 或 GetDataAsync().Wait();
    }
    
    // 正確：使用 await
    public async Task GoodAwait()
    {
        var result = await GetDataAsync();
    }
    
    // 錯誤 3：不必要的 async/await
    public async Task<string> UnnecessaryAsync()
    {
        return await GetDataAsync(); // 多餘
    }
    
    // 正確：直接回傳 Task
    public Task<string> EfficientAsync()
    {
        return GetDataAsync();
    }
    
    // 錯誤 4：在 loop 中未等待 Task
    public async Task BadLoop()
    {
        var tasks = new List<Task>();
        for (int i = 0; i < 10; i++)
        {
            tasks.Add(ProcessAsync(i)); // 不等待
        }
        // 問題：可能超出範圍或資源耗盡
    }
    
    // 正確：控制並行度
    public async Task GoodLoop()
    {
        var semaphore = new SemaphoreSlim(3);
        var tasks = new List<Task>();
        
        for (int i = 0; i < 10; i++)
        {
            await semaphore.WaitAsync();
            int index = i; // 捕獲變數
            var task = Task.Run(async () =>
            {
                try
                {
                    await ProcessAsync(index);
                }
                finally
                {
                    semaphore.Release();
                }
            });
            tasks.Add(task);
        }
        
        await Task.WhenAll(tasks);
    }
    
    // 錯誤 5：捕獲變數問題
    public async Task BadCapture()
    {
        var tasks = new List<Task>();
        for (int i = 0; i < 5; i++)
        {
            tasks.Add(Task.Run(() => Console.WriteLine(i))); // 錯誤：可能都印出 5
        }
        await Task.WhenAll(tasks);
    }
    
    // 正確
    public async Task GoodCapture()
    {
        var tasks = new List<Task>();
        for (int i = 0; i < 5; i++)
        {
            int index = i; // 區域複製
            tasks.Add(Task.Run(() => Console.WriteLine(index)));
        }
        await Task.WhenAll(tasks);
    }
    
    private async Task<string> GetDataAsync()
    {
        await Task.Delay(100);
        return "data";
    }
    
    private async Task ProcessAsync(int index)
    {
        await Task.Delay(100);
        Console.WriteLine($"處理 {index}");
    }
}
```

### 執行緒池耗盡

```csharp
public class ThreadPoolStarvation
{
    // 錯誤：阻塞執行緒池
    public void BadThreadPoolUsage()
    {
        for (int i = 0; i < 1000; i++)
        {
            Task.Run(() =>
            {
                Thread.Sleep(10000); // 阻塞執行緒
            });
        }
        // 執行緒池很快耗盡
    }
    
    // 正確：使用異步
    public async Task GoodAsyncUsage()
    {
        var tasks = new List<Task>();
        for (int i = 0; i < 1000; i++)
        {
            tasks.Add(Task.Run(async () =>
            {
                await Task.Delay(10000); // 不阻塞執行緒
            }));
        }
        await Task.WhenAll(tasks);
    }
    
    // 設定執行緒池大小
    public void ConfigureThreadPool()
    {
        ThreadPool.SetMinThreads(50, 50);
        ThreadPool.SetMaxThreads(200, 200);
    }
}
```

### 記憶體洩漏

```csharp
public class MemoryLeakExample
{
    // 錯誤：事件處理器未取消訂閱
    public class Publisher
    {
        public event EventHandler DataChanged;
        
        public void RaiseEvent()
        {
            DataChanged?.Invoke(this, EventArgs.Empty);
        }
    }
    
    public class BadSubscriber
    {
        private Publisher publisher;
        
        public BadSubscriber(Publisher publisher)
        {
            this.publisher = publisher;
            publisher.DataChanged += OnDataChanged; // 未取消訂閱
        }
        
        private void OnDataChanged(object sender, EventArgs e)
        {
            // 處理
        }
    }
    
    // 正確：實作 IDisposable
    public class GoodSubscriber : IDisposable
    {
        private Publisher publisher;
        
        public GoodSubscriber(Publisher publisher)
        {
            this.publisher = publisher;
            publisher.DataChanged += OnDataChanged;
        }
        
        private void OnDataChanged(object sender, EventArgs e)
        {
            // 處理
        }
        
        public void Dispose()
        {
            if (publisher != null)
            {
                publisher.DataChanged -= OnDataChanged;
                publisher = null;
            }
        }
    }
    
    // 錯誤：Timer 未釋放
    public class BadTimerUsage
    {
        private Timer timer;
        
        public void StartTimer()
        {
            timer = new Timer(OnTimer, null, 0, 1000); // 未釋放
        }
        
        private void OnTimer(object state)
        {
            // 處理
        }
    }
    
    // 正確
    public class GoodTimerUsage : IDisposable
    {
        private Timer timer;
        
        public void StartTimer()
        {
            timer = new Timer(OnTimer, null, 0, 1000);
        }
        
        private void OnTimer(object state)
        {
            // 處理
        }
        
        public void Dispose()
        {
            timer?.Dispose();
        }
    }
}
```

### ConfigureAwait

```csharp
public class ConfigureAwaitExample
{
    // 函式庫程式碼應使用 ConfigureAwait(false)
    public async Task<string> LibraryMethod()
    {
        var client = new HttpClient();
        var response = await client.GetStringAsync("https://api.example.com")
            .ConfigureAwait(false); // 不需要回到原始上下文
        
        return response;
    }
    
    // UI 程式碼通常需要原始上下文
    public async Task UiMethod()
    {
        var data = await GetDataAsync();
        
        // 需要在 UI 執行緒上更新 UI
        // textBox.Text = data; // 需要同步上下文
    }
    
    // ASP.NET Core 中不需要 ConfigureAwait(false)
    // 因為沒有同步上下文
    
    private async Task<string> GetDataAsync()
    {
        await Task.Delay(1000);
        return "data";
    }
}
```

---

## 效能最佳化建議

### 選擇合適的並行機制

```csharp
public class ChoosingRightTool
{
    // CPU 密集型：使用 Parallel 或 PLINQ
    public void CpuBound()
    {
        var numbers = Enumerable.Range(1, 1000000);
        
        var primes = numbers
            .AsParallel()
            .Where(n => IsPrime(n))
            .ToList();
    }
    
    // I/O 密集型：使用 async/await
    public async Task IoBound()
    {
        var tasks = new List<Task<string>>();
        for (int i = 0; i < 10; i++)
        {
            tasks.Add(FetchDataAsync($"https://api.example.com/data/{i}"));
        }
        
        var results = await Task.WhenAll(tasks);
    }
    
    // 資料流處理：使用 Channel
    public async Task DataStream()
    {
        var channel = Channel.CreateBounded<int>(100);
        
        var producer = ProduceData(channel.Writer);
        var consumer = ConsumeData(channel.Reader);
        
        await Task.WhenAll(producer, consumer);
    }
    
    private bool IsPrime(int n)
    {
        if (n < 2) return false;
        for (int i = 2; i <= Math.Sqrt(n); i++)
        {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    private async Task<string> FetchDataAsync(string url)
    {
        var client = new HttpClient();
        return await client.GetStringAsync(url);
    }
    
    private async Task ProduceData(ChannelWriter<int> writer)
    {
        for (int i = 0; i < 1000; i++)
        {
            await writer.WriteAsync(i);
        }
        writer.Complete();
    }
    
    private async Task ConsumeData(ChannelReader<int> reader)
    {
        await foreach (var item in reader.ReadAllAsync())
        {
            // 處理
        }
    }
}
```

### 監控與診斷

```csharp
public class MonitoringExample
{
    // 記錄執行緒池資訊
    public void LogThreadPoolInfo()
    {
        ThreadPool.GetAvailableThreads(out int workerThreads, out int ioThreads);
        ThreadPool.GetMaxThreads(out int maxWorkerThreads, out int maxIoThreads);
        
        Console.WriteLine($"可用工作執行緒: {workerThreads}/{maxWorkerThreads}");
        Console.WriteLine($"可用 I/O 執行緒: {ioThreads}/{maxIoThreads}");
    }
    
    // 效能計數器
    public async Task MeasurePerformance()
    {
        var sw = Stopwatch.StartNew();
        
        await PerformWork();
        
        sw.Stop();
        Console.WriteLine($"執行時間: {sw.ElapsedMilliseconds}ms");
    }
    
    private async Task PerformWork()
    {
        await Task.Delay(1000);
    }
}
```

---

## 總結

本教學涵蓋了 C# 並行與異步編程的核心概念：

1. **基礎概念**：理解執行緒、並行、異步的差異
2. **同步機制**：Mutex、Monitor 用於保護共享資源
3. **異步元件**：Thread、Task、SemaphoreSlim、Channel 各有適用場景
4. **常見模式**：生產者-消費者、平行處理、重試等實用模式
5. **避免陷阱**：死鎖、競態條件、記憶體洩漏等常見問題

選擇合適的工具和模式，遵循最佳實務，就能寫出高效、穩定的並行程式。