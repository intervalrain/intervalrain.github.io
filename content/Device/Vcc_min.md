---
title: "[Device] SRAM Vcc_min Introduction"
date: 2022-03-05T22:07:03+08:00
tags: ["Semiconductor"]
draft: true
Categories: Semiconductor     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Daily
description: "Intro to SRAM Vcc_min"                     
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: false
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

# Vcc_min Methodology
+ Vcc_min is defined as the minimum Vcc that the SRAM starts to fail under read/write operation mode.
+ Vcc_ret means `Data retention test`, The Vcc will drop to certain level and keep 250ms duration. And check the memory content is kept or not.

# Another Test Methodology for Vcc_min
## V_op yeild
+ Pass for V +/-10%
## V_box yeild
+ Normally, pass for V+10% ~ V-20%
## Vcc_min index ~ V_op - V_box
+ The smaller, the better.

# SRAM Vcc_min
## The role of SRAM Vcc_min
+ SRAM Vcc_min is a index for robust SRAM Vop(or Vbox) yeild.
+ Some applicatinos need to operate under lower Vcc.
## SRAM Vcc_min Fail
+ Vcc lowering down -> power supply is not enough.
+ Root causes:
  + SRAM bit cell caused fail and failure bit map type: 
    + SB(single bit) fail
    + TB(twin bits) fail
    + 4B(4 bits) fail
  + Peripheral circuit caused fail and failure bit type:
    + Block fail
    + BL fail
    + WL fail

# SRAM Cell Characteristics v.s. Vcc_min
> These three getting worse when Vcc is lowering(dominates Vcc_min)
## SNM(static Noice Margin)
+ Related to failure mode: read disturb fail
## WRM(Write Margin)
+ related to failure mode: write fail
## Iread(read current, cell current)
+ related to failure mode: read fail

> Variation is not too much when Vcc changes. Normally getting worse when Vcc is lowering.
## BL_L(BL loading, Max. Rows of BL)

> Getting better when Vcc is lowering
## Isb(Cell Leak, standby current)
+ when Isb is so large that impact IR-drop seriously,  
  voltage level will not be corret in SRAM anymore.  
  Thus, impact Vcc_min value
  
# SRAM speed
+ Speed is related to
  + Iread -> the lower, the slower
  + SA(sense Amp.)
  + BL_C(BL Capacitance)

# Vcc Shmoo

Vcc  
^  
|  |  
|  |    
|  \    
|   \    
|    \     
|     ---------------------    
|--------------------------------->Speed  
|  A  |         B        |

## A: speed(Iread) related Vcc_min
+ Peripheral speed-related circuit and SRAM Iread dominated normally.

## B: not speed(Iread) related Vcc_min
+ Peripheral non-speed-related circuit or SRAM SNM/WRM dominated normally.

## Vcell < Vperipehry
+ PD_Ion↓, PG_Ion↑
+ Beta-ratio(PD/PG)↓
+ SNM↓
+ WRM↑

## Vcell > Vperiphery
+ PD_Ion↑, PG_Ion↓
+ Beta-ratio(PD/PG)↑
+ SNM↑
+ WRM↓