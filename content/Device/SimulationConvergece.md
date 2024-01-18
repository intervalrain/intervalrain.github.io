---
title: "[TCAD] 模擬收斂問題"
date: 2022-05-25T22:52:15+08:00
tags: ["Semiconductor", "TCAD"]
draft: false
Categories: Semiconductor   # Leetcode, Logic Design, Daily, OS, CS50, CA
description: "TCAD simulation convergence problem"                     
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

# TCAD 模擬收斂問題
## 收斂問題
Sentaurus Device 有非常多種可模擬大電場下之飽和遷移率的模型，而這主要是設定有效電場的模型。其中，最自然的選擇就是 Eparallel driving model。這種模型取總電場平行於電流方向上的分量。不過這通常會導致嚴重的收斂問題。主要是因為電場跟電流有著極為密切的關係，除此之外，以 MOSFET 通道為例，通常垂直與平行通道方向之電場數量級差很多，因為演算之數值誤差會「混合」這兩個分量，所以這種 Eparallel 模型會使得每個節點上的 driving force變化許多，進而改變電流方向，又接著改變電場分量，所以會造成極為不穩定的情況。

其中一個折衷的辦法，就是只考慮平行於 silicon-oxide 界面上的電場，可以使用 HighFieldSaturation(EparallelToInterface) 指令來啟動這模型。只要大部分的電流都平行於界面，那基本上這就是個很好的模型。然而，目前最新科技通常會使得 source/drain 的電流以「向外散開，向內吸入」的方式進入與離開。例如說目前的 ultrashalow source and drain extensions。電流散開之後，電流就不再平行於界面，而這模型可能會帶來將近 5-15 % 的誤差。因此，如果你知道電流的方向，那麼你也可以設定用來計算平行電場分量之方向向量，而不再只是單純地與最鄰近的界面平行的方向。例如說，如果你覺得電流主要是沿著 x 軸在流動，那麼可以在 Math section 設定 EparallelToInterface (Direction = (1 0 0))。

最常用的 driving force 是 quasi-Fermi potential 的梯度模型。通常這跟平行電場模型是一樣的，但它的演算法比較穩定。可以用 HighFieldSaturation(GradQuasiFermi) 選項來啟動它。不過，即便如此，還是可能會造成收斂問題。這是因為通常 quasi-Fermi potential 的梯度都非常的陡峭，變化得太過劇烈或是非常的不平滑，而這往往切得比較不好的網格所造成的。

但在有些時候，即便網格切得很好，還是沒辦法收斂。有時是因為低載子濃度的區域的濃度相對誤差都滿高的，而這會進一步導致 quasi-Fermi potential 的誤差變得滿大的。因為這些區域通常對總電流的貢獻並不是很顯著，所以算得太準反而會讓模擬跑得更慢。不過，你確實需要確認一下這些低密度是不是導致發散。

除此之外，也可藉由設定 RefDens_eGradQuasiFermi_EparallelToInterface 與 RefDens_hGradQuasiFermi_EparallelToInterface 來使用「內插 GradQuasiFermi 與 Eparallel」的 driving force 模型。該參數定義了 gradual transition 發生的局域載子濃度。例如說，如果設定為 1e12，那麼當載子濃度高於 1e12，就使用 GradQuasiFermi model，反之則使用 Eparallel model。通常 1e12 並不會影響到總電流，但仍能改善收斂問題。有時甚至需要用到 1e14 ～ 1e16 以獲得更好的收斂，但要留意不同設定所得到的電流是否一致，以確定 Eparallel driving force 帶來的誤差仍可接受。

另一種內插法是 QausiGradFermi 與 電場本身，可使用 RefDens_eGradQuasiFermi_ElectricField 與 RefDens_eGradQuasiFermi_ElectricField 參數來設定。

還有一種方法改善收斂，就是在低濃度的地方逐漸忽略 driving force。可以藉由 RefDens_eGradQuasiFermi_Zero (for electrons) and RefDens_hGradQuasiFermi_Zero (for holes) 設定，將它們設定為正值即可。例如說，如果設定為 1e10，那麼在 1e10 濃度以下的地方就不會用到 driving force。

還有一個在物理上可行的做法，就是使用 hydrodynamic transport model。這時 sdevice 會計算局域載子溫度，接著並用來計算 driving force。可以藉由 HighFieldSaturation(CarrierTempDrive) 來開啟它。有時會因為有比較好的收斂而改善通常 HT model 算太慢的現象。總之，如果你在使用 GradQuasiFermi 時遇到了收斂問題。那麼你可以：

+ 確保通道的網格足夠細緻與均勻
+ 考慮改成 EparallelToInterface
+ 如果 terminal currents 誤差實在很大，那麼可考慮將 RefDens_e/hGradQuasiFermi_ElectricField 設定為 1e12 或者更高。
+ 設定 RefDens_e/hGradQuasiFermi_Zero 到 1e10 或者更高以忽略在低於該濃度時的 driving force 計算
+ 最後可以考慮改用 hydrodynamic transport model。

## 常見模擬參數之意義
+ HighFieldSaturation(GradQuasiFermi)
+ RefDens_hGradQuasiFermi_Zero：低於其值則忽略 damp 有效電場
+ RefDens_eGradQuasiFermi_EparallelToInterface：高於其值則使用 GradQuasiFermi，低於則 EparallelToInterface。
+ RefDens_eGradQuasiFermi_ElectricField：高於其值則使用 GradQuasiFermi，低於則 Eparallel

## External resistor method
這方法很有用，但是非常慢。
> 簡單來說，只是在元件上串聯一個電阻。   

但因為我們設定 \\(R=V_b/I_b\\)，所以在 InnerVoltage 到達 \\(V_b\\) 時，`OuterVoltage` 會是兩倍的崩潰電壓。而在那之前，因為電流實在是很小，所以外接電阻分配到的分壓並沒有追到元件分壓，使得大部分分壓都會正常地落在元件上。設定方法為，先在其中一個電極設定電阻，如下所示。
```
Electrode {
	{ Name= "substrate" Voltage= 0.0 }
	#if "@BVmethod@" == "resistor"
		{ Name= "anode" Voltage= 0.0 Resistor= @R@}
	#else
		{ Name= "anode" Voltage= 0.0 }
	#endif
}
```
設定好之後其實就大功告成了。不過此時因為你只能夠控制某電極的電位，而在其中一個電極電位被設定為 Voltage=0.0 的情況下，這相當於設定兩電極（anode與substrate）之間的電壓，即「元件與電阻」的總跨壓。因此，倘若元件開始崩潰，電流開始爆增，那麼「元件與電阻」的總跨壓將會變得非常大。因此如果將後續的模擬目標電壓設定為-50V 或甚至是 -100V，那因為元件分到的跨壓一定比較小，所以很可能沒達到目標。因此這時需要將最後的目標電壓設定得高一點，通常我都設定-500到-1000。有時為了更加準確而會設定為-2000。

## Trap 設定(sdevice)
> Another available species is the fixed charge, which is a trap fully occupied by either electrons or holes. Therefore, its charge stays constant throughout the entire simulation and does not depend on electrical bias conditions. Electron–hole recombination through such a trap is not allowed. This type of trap uses the FixedCharge keyword for a trap specification.

### Recombination & Generation rate   
+ 基本上它們都遵守 SRH recombination rate:  
$$
R_{SRH}=\frac{np-n_i^2}{\tau_{p0}(n+n_1)+\tau_{n_0}(p+p_1)}
$$

但是沒辦法在 sdevice 用 SRHRecombination( Integrate( Semiconductor ) ) 觀察到這些特地、額外設定的 trap 造成的 SHR recombination rate，反而必須使用：
```
CurrentPlot {
        eGapStatesRecombination( Integrate( Semiconductor ) )
	eGapStatesRecombination( Integrate( Region="Absorption" ) )
	eGapStatesRecombination( Integrate( Region="Multiplication" ) )
	hGapStatesRecombination( Integrate( Semiconductor ) )
	hGapStatesRecombination( Integrate( Region="Absorption" ) )
	hGapStatesRecombination( Integrate( Region="Multiplication" ) )
}
```
才能夠看見這些 trap 的貢獻。

### Trap-assisted tunneling
這些 Trap 預設並沒有 trap-assisted tunneling 效果。換言之，即便之前設定了 `Physics{Recombination(SRH(ElectricField(Lifetime=Hurkx)))}`，也不會讓 trap 有此效應。這需要額外設定：

```
Physics(Region="Absorption"){
	Traps(eNeutral Level fromMidBandGap EnergyMid=@Eti@ 
              Conc=1e15 eXsection=@eXsec@ hXsection=@hXsec@
	      SpatialShape=Gaussian SpaceMid=(@PosX@, 1.5) SpaceSig=(@Lx@, 1e3)
	      Tunneling(Hurkx)
	)
}
```
上面的Tunneling(Hurkx)就是 trap-assisted tunneling 效應。

Lifetime
雖然 lifetime 滿足底下公式：

$$
\tau_{n,p}=\frac{1}{\sigma_{n,p}v_{n,p}N_t}
$$

但是沒辦法直接使用eLifetime與hLifetime觀察，需要手動將上述數據相乘。


