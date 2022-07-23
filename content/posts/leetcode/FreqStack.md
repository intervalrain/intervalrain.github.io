---
title: "[Leetcode] Maximum Frequency Stack 最大頻率堆疊"
date: 2022-03-19T16:53:23+08:00
tags: ["Algorithm", "Java", "Programming"]
draft: false
Categories: Algorithm     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, Operating System, CS50
description: "Maximum Frequency Stack algorithm"
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
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
cover:
    image: "/images/cover.jpg"
    alt: "Oh! You closed up the window, so you cannot see raining"
    relative: false
    hidden: false
---
# 題目
## 題目描述
+ 設計一個類似 stack 的資料結構，實行 `push()` 跟 `pop()` 的功能，其中 `pop()` 會丟出 stack 中出現最多次的元素。  
+ FreqStack class 必須實現：  
    + `FreqStack()` 建構子必須初始化一個空的 FreqStack。
    + `void push(int val)` 將 `val` 推至 stack 的頂端。
    + `int pop()` 將 stack 中最頻繁出現的元素移除，並返回。
        + 如果 stack 中最頻繁出現的元素出現平手的狀況，則返回平手的元素中最接近 stack 頂端的元素。
## 題目範例
**輸入**  
["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]  
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]  
**輸出**  
[null, null, null, null, null, null, null, 5, 7, 5, 4]  

**說明**
```Java
FreqStack freqStack = new FreqStack();
freqStack.push(5); // The stack is [5]
freqStack.push(7); // The stack is [5,7]
freqStack.push(5); // The stack is [5,7,5]
freqStack.push(7); // The stack is [5,7,5,7]
freqStack.push(4); // The stack is [5,7,5,7,4]
freqStack.push(5); // The stack is [5,7,5,7,4,5]
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].
freqStack.pop();   // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].
freqStack.pop();   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].
```
# 解題
## 想法
+ 在解題時，我打算在 push 時動手腳，將 push 的元素直接 push 到對的位置後，執行 pop 的動作時，就只要將最頂端的元素取出即可。
```Java
FreqStack freqStack = new FreqStack();
freqStack.push(5); // [5]
freqStack.push(7); // [5,7]
freqStack.push(5); // [5,7,5]
freqStack.push(7); // [5,7,5,7]
freqStack.push(4); // [5,7,5,7,4]
// 此時 4 因為並非最頻繁的元素，所以要將 4 往下推，即變成 [5,7,4,5,7]
freqStack.push(5); // [5,7,4,5,7,5]
freqStack.pop();   // return 5, [5,7,4,5,7]
freqStack.pop();   // return 7, [5,7,4,5]
freqStack.pop();   // return 5, [5,7,4]
freqStack.pop();   // return 4, [5,7]
```
+ 為了實現以上的想法，我試想將出現次數相同的元素放在同一個 stack，取出時則從頻率最高的 stack 開始取，即為：
```Java
freqStack[0] = [5,7,4] // 檢查元素是否出現在 freqStack[0] 否則則往freqStack[1] 移動
freqStack[1] = [5,7]
freqStack[2] = [5]  // pop 的時候，從freqStack[2] 開始取，空了則將 freqStack[2] 移除
```
## 實作1: List of Stacks
```Java
public class freqStack{
    // Field
    List<Stack<Integer>> stacks;

    // Constructor
    public freqStack(){
        stacks = new ArrayList<>();
    }

    // Methods
    public void push(int val){
        push(val, 0);
    }

    private void push(int val, int freq){
        // 當 stacks[freq] 是空的時候，則新建一個 stack。
        Stack<Integer> stack;
        if (freq >= stacks.size()){
            stack = new Stack<>();
            stacks.add(stack);
        } else {
            stack = stacks.get(freq);
        }
        // 當該 stacks[freq] 已經有該元素，則往下一個 stacks 找
        if (stack.contains(val)){
            push(val, freq + 1);
        } else {
            stack.push(val);
        }
    }

    public int pop(){
        // 直接找到最高的 stack，然後把頂端的元素 pop 出。
        Stack<Integer> stack = stacks.get(stacks.size() - 1);
        int top = stack.pop();
        if (stack.isEmpty()){
            stacks.remove(stacks.size() - 1);
        }
        return top;
    }
}
```
+ 然而，此時 push 的 complexity 與欲 push 的元素的出現次數 n 有關，元素出現 n 次，則需要往下找 n 個 stack，也就是 \\(O(n)\\)。
## 實作2: Use HashMap to record freqency
+ 為了優化，我們可以加入一個 HashMap 來記錄出現的次數，再下次要 push 此元素時，只需要到 HashMap 中查詢出現的次數即可。
```Java
public class freqStack{
    // Field
    List<Stack<Integer>> stacks;
    Map<Integer, Integer> map; // 用來記錄出現次數

    // Constructor
    public freqStack(){
        stacks = new ArrayList<>();
        map = new HashMap();
    }

    // Methods
    public void push(int val){
        Stack<Integer> stack;
        // 還沒有此出現次數的元素出現，則新增此 stack
        if (stacks.size() < map.getOrDefault(val, 0) + 1){
            stack = new Stack<>();
        } else {
            // 取得此元素出現的次數，若沒出現過則取得 stacks[0]
            stack = stacks.get(map.getOrDefault(val, 0));
        }
        stack.push(val);
        map.put(val, map.getOrDefault(val, 0) + 1); // 更新出現次數
    }

    public int pop(){
        // 直接找到最高的 stack，然後把頂端的元素 pop 出。
        Stack<Integer> stack = stacks.get(stacks.size() - 1);
        int top = stack.pop();
        map.put(val, map.get(val) - 1); // 更新出現次數
        if (stack.isEmpty()){
            stacks.remove(stacks.size() - 1);
        }
        return top;
    }
}
```

# 程式碼
+ 題解：[請點此](https://github.com/intervalrain/leetcode/blob/master/src/main/java/com/rainhu/n895_MaximumFrequencyStack.java)
+ 測試檔：[請點此](https://github.com/intervalrain/leetcode/blob/master/src/test/java/com/rainhu/n895_MaximumFrequencyStackTest.java)

Reference: [Leetcode: 895. Maximum Frequency Stack](https://leetcode.com/problems/maximum-frequency-stack/)