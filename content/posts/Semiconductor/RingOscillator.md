---
title: "Ring Oscillator 環形振盪器"
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
comments: false
canonicalURL: "https://intervalrain.github.io/"
disableHLJS: true
disableShare: true
disableHLJS: false
hideSummary: false
searchHidden: true
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
<head>
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            inlineMath: [['$','$']]
            }
        });
    </script>
</head>

# Ring Oscillator 環形振盪器(RO)
## 簡介
+ 一種採用奇數個 Inverter(NOT Gate) 組成的環形電路。透過在輸入端振盪產生方波，經過奇數個 Inverter 之後，在輸出端產生反向的方波訊號，其時間差即為 time delay。
![RO](/images/ro.png) [註] 圖為一個由3個反向器組成的環形振盪器，其輸出頻率為 $\frac{1}{6}t_p$(Gate Delay)。
+ 由偶數個 Inverter 組成的環形電路無法構成環形振盪器，因為其輸入與輸出相同。然而這種配置可以被用作記憶體的基本單元，它是建構靜態隨機存取記憶體 SRAM (static random access memory)的基本組成。
+ 環形振盪器通常全部由 inverter 所組成，較能抵抗環境影響。事實上也可以用 non-inverter 與 inverter 混合組成，前提是 inverter 的總數要是奇數。其振蕩器的週期等於兩倍的閘延遲(Gate delay)。
+ 為了增加振盪頻率，通常有兩種方法  
  1. 減少環形電路中的 inverter 數量。
  2. 提升電壓，但同時會有較大的電流與功耗。

## Inverter (反相器)基本原理
+ Inverter 由一個 NMOS 與一個 PMOS 共閘極組成，其輸出端為輸入端的相反電位。  
+ 其一顆 Inverter 造成的 Gate delay 會傳播(propagate) 到下一顆 Inverter，共由 n 顆 Inverter 組成的環形振盪器，所造成的的延遲為 td
![RO_circuit](/images/ro_circuit.png)
![td](/images/td.png)

## Power consumption
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