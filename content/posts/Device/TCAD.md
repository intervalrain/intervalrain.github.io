---
title: "[TCAD] 工具語言"
date: 2022-03-26T21:46:26+08:00
tags: ["Programming", "Semiconductor", "TCAD"]
draft: false
Categories: TCAD     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA, TCAD
description: "Desc Text."                     
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
# TCAD 常用的三種程式語言
### 工具語言
+ 用於操作 Sentaurus 工具的指令，例如：
    + **snmesh**
    + **sdevice**

### 預處理語言
+ Sentaurus Workbench Preprocessing Language(SPP)：在 SWB 執行指令檔之前，會先翻譯 SPP 語言。(類似於 C 的 macro)
    + 例如：
    ```TCAD
    #define __x__ 1   // 將所有 __x__ 字串取代成字串 1
    ```

### TCL
+ 公用語言，通常用來處理字串與數據。


## 範例
+ SPP 語言：`@...@`、`#`開頭的敘述都是 SPP 語言
```SPP
#if "@tunneling@ == "Hurkx"
    #define _B2BTunnelModel_ Band2Band(Model=Hurkx)
    #define _B2BTunnelMath_ NoSRHperPotential
#elif "@tunneling@ == "E1"
    #define _B2BTunnelModel_ Band2Band(Model=E1)
    #define _B2BTunnelMath_ NoSRHperPotential
#elif "@tunneling@ == "E1_5"
    #define _B2BTunnelModel_ Band2Band(Model=E1_5)
    #define _B2BTunnelMath_ NoSRHperPotential
#elif "@tunneling@ == "E2"
    #define _B2BTunnelModel_ Band2Band(Model=E2)
    #define _B2BTunnelMath_ NoSRHperPotential
#else
    #define _B2BTunnelModel_
    #define _B2BTunnelMath_
#endif
```

+ TCL 語言：`set` 與 `puts`
    + 其中 @...@ 因為是 SPP 語言，故會先被前面定義好的 header 取代，之後才會執向 .cmd 檔。
```Tcl
set A [expr -@BF_Thick@-@AB_Thick@-@GR_Thick@-@CH_Thick@-@ML_Thick@]
puts "DOE: Xmin [format %.2f $A]"
```