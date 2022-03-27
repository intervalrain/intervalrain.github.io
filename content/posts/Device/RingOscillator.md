---
title: "[Device] Ring Oscillator 環形振盪器"
date: 2022-02-21T01:29:24+08:00
tags: ["Semiconductor", "Device"]
draft: false
Categories: Semiconductor     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "A ring circuit with an odd numbers of inverters"
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
## 前言
*2022/3/3 更新*
+ 此篇為筆者以工作經驗為背景寫下的筆記，如有錯誤煩請指教。[點此聯絡我](https://intervalrain.github.io/posts/aboutme/)。
# Ring Oscillator 環形振盪器(RO)

## 簡介
+ 在 IC 電路設計中，除了 metal routing 會造成訊號的延遲，邏輯閘從高電位轉換到低電位、或從低電位轉換到高電位(switch)，也會造成相對應的 Gate Delay，然而 Gate Delay 非常小，很難以測量，故 RO 是一個便於測量 Gate Delay 的電路設計。
+ 在 IC 電路設計中，除了考慮速度，還會考慮功耗，而邏輯閘開關所造成的動態功耗(dynamic power consumption)佔比非常大，故 Ring Oscillator 也可以用來計算閘開關的功耗。
## 1. Time Delay 
+ 為了方便測量 Time Delay，RO 是一種用奇數 n 個 inverter(NOT Gate) 串接成的電路。透過在輸入端振盪產生方波，經過奇數個 inverter 之後，在輸出端產生反向的方波訊號，其時間差為經過 n 個 inverter 的 time delay。利用 time delay 會透過串接 inverter 累加(或稱propagation)的性質，故可以算出單個閘極的 gate delay(\\(T_p\\), propagation time)
+ \\(t_{HtoL}\sim t_{LtoH}=t_p=\Delta T/2n\\)
![RO](/images/ro.png) [註] 圖為一個由3個反向器組成的環形振盪器，其輸出頻率為 \\(\frac{1}{6}t_p\\)(Gate Delay)。
+ 由偶數個 inverter 組成的環形電路無法構成環形振盪器，因為其輸入與輸出相同。然而這種配置可以被用作記憶體的基本單元，它是建構靜態隨機存取記憶體 SRAM (static random access memory)的基本組成。
+ 環形振盪器通常全部由 inverter 所組成，較能抵抗環境影響。事實上也可以用 non-inverter 與 inverter 混合組成，前提是 inverter 的總數要是奇數。其振蕩器的週期等於兩倍的閘延遲(Gate delay)，
+ 為了增加振盪頻率，通常有兩種方法  
  1. 減少環形電路中的 inverter 數量。
  2. 提升電壓，但同時會有較大的電流與功耗。
![RO_circuit](/images/ro_circuit.png)
![td](/images/td.png)

## 2. Power consumption
+ 分為 Dynamic Power Consumption 與 Static Power Consumption。
+ \\(P_{total}=a\times f\times(\frac{1}{2}CV_{DD}^2+V_{DD}I_{SC})+V_{DD}I_{off}+V_{DD}I_{Diode}+V_{DD}I_{Gate}\\)
  + a 為 activity，每個 clock cycle 的平均開關切換數目。
    + 故在電路設計上減少開關的次數也能有效降低功耗。
  + f 為頻率，代表一秒內可以完成幾次開關(switch)。
![PowerDissipation](/images/powerDissipation.png)
### Dynamic Power(Switching Power)
+ 為現今 CMOS 振盪器的主要功耗來源。
+ Dynamic Power 為 RO 在固定方波頻率為 \\(f\\) 時的平均功率(一組方波歷時為 \\(1/f\\))。
+ 每一次開或關(switch)所耗的能為 \\(\frac{1}{2}CV^2\\)
  + 推導：  
    + \\(C=\frac{Q}{V}\\)  
    + \\(I=\frac{dQ}{dt}=C\frac{dV}{dt}\\)
    + \\(W=IV=\int_{0}^{t}CV\frac{dV}{dt}=\frac{1}{2}CV^2\\)
+ 故功耗為\\(P_{dynamic}=I_{active}V=CV^2\\)
+ 如何降低功耗?
  + 降低 Activity
    + Clock Gating: 
      + 避免不必要的 flip-flop
      + 避免 transition downstream logic
      + 加入 enable 來控制邏輯複雜度
      ![ClockGating](/images/clockgating.png)
    + Data Gating:
      + 利用 gating off inputs 來避免不必要的 toggling
    + Bus Encodings
    + Freeze "Don't cares"
    + Remove Glitches
  + 降低\\(C_{Load}\\)
  + 降低\\(f\\)
  + 降低\\(V_{DD}\\)
  + 平行結構
    + 可降低相同 Throughput 時的功耗
  + Trade off performance
### Short-Circuit current
+ 當 NMOS 與 PMOS 同時在切換開關時發生(NMOS尚未完全關閉，但PMOS已經部分啟動或是兩者相反)。
  + Kept to < 10% of capacitor charging current by making edges fast

### Static Power
+ 因為 subthreshold leakage，MOS並未完全關閉所造成的漏電流致使的功耗。
+ 在小尺寸(<180nm)元件中，因為 short channel effect 的加劇，此功耗的比例會加劇，甚至達 10~40%。
![Static Power](/images/staticpower.png)

### Diode Leakage
+ Drain 端與 Source 端的 Diode junction 產生的 junction leakage。
+ 通常很小可忽略。

### Gate Leakage
+ 因為電子穿隧穿過閘極氧化層(gate oxide)造成的漏電，通常在極薄的閘極氧化層發生，可忽略。

# Reference
[reference1_Eletrical Engineering and Computer Science by MIT](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-884-complex-digital-systems-spring-2005/lecture-notes/l11_power.pdf)