---
title: "[IT] MVC 及其變形"
keywords: ["Software Architecture"]
description: 
date: 2023-10-19T10:54:19+08:00
tags: ["Software Architectrue"]
draft: false
Categories: "IT"
author: "hgraca"
showToc: true
TocOpen: true
math: true
mermaid: true
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

創立一個可維護的應用程式一直是程式設計的一項長期挑戰。

不久前，我在一家公司工作，其核心業務應用是一個 SaaS 平台，被幾千個客戶公司使用，這項應用程式已經運營了三年，其中的程式碼混雜了 HTML, CSS, 業務邏輯及 SQL，當然，在應用程式推出後的兩年，公司決定開始重構。儘管我們知道這樣的做法是不好的，且我們也知道如何避免，但是這樣的情況還是時常發生。

然後，回溯到 1970 年代，混合職責是很常見的做法，且人們仍在努力尋找如何改進。隨著應用程式的複雜性提升，對 UI 的更動必然會導致業務邏輯的更改，從而增加了修改的複雜度、執行的時間與 bug 出現的可能性。(因為會有更多的程式碼被更改)。

# 1979 - Model-View-Controller

![mvc](https://herbertograca.files.wordpress.com/2017/04/mvc.jpg)
為了解決上述問題，Trygve Reenskaug 於 1979 年提出了 MVC 架構，以此來將關注點分離，將 UI 與業務邏輯分離。該模式被應用於 1973年出現的桌面 GUI。

MVC 架構將程式分為三個部分：
+ **Model**: 模型，代表了商業邏輯。
+ **View**: 視圖，代表了 UI 中的組件，如 button, text box 等。
+ **Controller**: 控制器，負責協調視圖和模型之間的配合，這意味著它：
    + 決定要顯示哪些視圖，以及使用什麼數據。
    + 將使用者行為轉化為業務邏輯。

> *A model could be a single object (rather uninteresting), or it could be some structure of objects.* - ***Trygve Reenskaug 1979, MVC***  
> *一個模型可以是單一物件(相對無趣)，或可以是一些物件的結構。* - ***特里格維‧倫斯考 1979, MVC***

其他重要且經典的 MVC 概念有：
1. 視圖直接使用模型數據物件(model data objects)，以顯示其數據。
2. 當模型數據發生變化時，它會觸發一個事件，立即更新視圖(1997年，還沒有HTTP)。
3. 通常，每個視圖都會關聯到一個控制器。
4. 每個螢幕可以包含數對的視圖與控制器。
5. 每個控制器可能有多個視圖。

今日我們熟悉的 HTTP Request & Response 模式，並未使用這樣的 MVC 風格。因為在這種情境下，流程是從視圖到控制器的，如同我們熟悉的，但在另一個方向上，它直接從模型流向視圖，而不經過控制器。

此外，在現在的 Request & Response 模式中，當數據發生變化時，並不會觸發在瀏覽器中的視圖進行更新(儘管這可以透過使用 web sockets 來實現)。要查看更新的數據，用戶需要發出新的 request，接著數據才能透過控制器返回。

# 1987/2000 - PAC/Hierarchical Model-View-Controller
![h-mvc](https://herbertograca.files.wordpress.com/2017/04/hmvc.png?w=486&h=450)
PAC，也被稱為 HMVC，為了提高模組化，將 UI 部分做 **widgetization**。

例如，當我們有一個視圖，其中的一個部分在其他多個視圖中或甚至在同一個視圖中以完全相同的格視重複使用。一個實際的例子是網頁中的 RSS，它在多個頁面中重複被使用。

使用 HMVC，處理主要 request 將會將次要的 request 轉發給其它控制器，以獲得 widget 的渲染，然後將其融入主視圖的渲染中。

就我個人而言，我在 HTTP Request & Response 模式中遇過幾次這種案例，但我發現讓 UI 透過 AJAX 呼叫控制器來渲染 widget 是更簡單的方法，因為它保留了模組化的好處，且不會因嵌套呼叫控制器而增加複雜性，這樣的次要請求可以在像 Varnish 這樣的東西中被緩存，這是一個加分的部分。

# 1996 - Model-View-Presenter
![MVP](https://herbertograca.files.wordpress.com/2017/04/mvp.jpg)
MVC 架構為當時的程式設計提供了重大的改進，然而，隨著應用程式複雜性的增加，對進一步解耦的需求也隨之增加。

在 1996 年，IBM 子公司 Taligent 公開了他們基於 MVC 架構開發的 MVP 架構，想法是進一步將模型與 UI 進行關注點分離：
+ 視圖是被動的，且對模型一無所知。
+ 專注於控制器(presenter)，它們不包含任何業務遲輯，只是在模型中調用命令、查詢，將原始數據傳遞給視圖。
+ 數據的變化並不會直接觸發視圖的更新：它會透過 presenter 進行，然後 presenter 再更新視圖。這樣可以讓 presenter 在執行視圖更新前執行額外跟呈現相關的邏輯。例如，更新與數據庫中發生變化的數據相關的數據。
+ 每個視圖都有一個單獨的 presenter。

這已經更接近我們在今日 Request & Response 模式中看到的：流程總是通過 Controller/Presenter。然而，presenter 仍然不會主動更新視圖，它總是需要執行新的 request 才能使變更可見。

在 MVP 中，presenter 又被稱為**監督控制器(supervisor controller)**。

# 2005 - Model-View-ViewModel
![MVVM](https://herbertograca.files.wordpress.com/2017/04/mvvm.jpg)
再次，源於應用程式的複雜性增加，2005年，微軟的 WPF 和 Silverlight 的架構師 John Gossman 宣布了 MVVM 架構，其目標是進一步將 UI 設計與程式碼分離，並提供從視圖到數據模型的數據綁定。

> *[MVVM] is a variation [of MVC] that is tailored for modern UI development platforms where the View is the responsibility of a designer rather than a classic developer. […] the UI part of the application is being developed using different tools, languages and by a different person than is the business logic or data backend.* - ***John Gossman 2005, Introduction to Model/View/ViewModel pattern***
> *[MVVM]是[ MVC]的一種變體，專為現代UI開發平台量身定制，其中視圖是由設計師而非傳統開發人員負責。[…] 應用程序的UI部分是使用不同的工具、語言以及由與業務邏輯或數據後端不同的人來開發的。* - ***約翰‧高斯曼 2005，模型/視圖/視圖模型模式介紹***

其中，Controller 被 ViewModel 所取代。

> *[The View] encodes the keyboard shortcuts and the controls themselves manage the interaction with the input devices that is the responsibility of Controller in MVC (what exactly happened to Controller in modern GUI development is a long digression…I tend to think it just faded into the background. It is still there, but we don’t have to think about it as much as we did in 1979).* - ***John Gossman 2005, Introduction to Model/View/ViewModel pattern***
*[視圖]編碼鍵盤快捷鍵，而控制項本身則管理與輸入設備的互動，這是MVC中控制器的責任（現代GUI開發中控制器究竟發生了什麼，是一個長篇的離題...我傾向於認為它只是淡出了背景。它仍然存在，但我們不必像1979年那樣多考慮它）。* - ***約翰‧高斯曼 2005，模型/視圖/視圖模型模式介紹***

MVVM 的概念是：
+ 一個 ViewModel 只對應一個 View，反之亦然。
+ 將視圖邏輯移至 ViewModel 以簡化視圖。
+ 視圖中使用的數據與 ViewModel 中的數據之間的一對一映射。
+ 將 ViewModel 中的數據與 View 中的數據綁定，以便當 ViewModel 中的數據發生變化時，它會立即在 View 中反映出來。

就像在原始的 MVC 模式中一樣，這種方法在傳統的 request & response 模式中是不可能的，因為 ViewModel 無法主動更新視圖（除非使用web socket），而 MVVM 需要它。此外，ViewModel 具有與視圖中使用的數據匹配的屬性，並非控制器的常見做法。

# Model-View-Presenter-ViewModel
![MVPVM](https://herbertograca.files.wordpress.com/2017/07/m-v-p-vm1.png)
在為雲端建立複雜的企業應用程式時，我傾向於將應用程式的使用者介面結構理性化為 M-V-P-VM，其中的 ViewModel 就是 Martin Fowler 在 2004 年所稱的 Presentation Model。

+ **Model 模型**
一組包含所有業務邏輯和使用案例的類別。

+ **View 視圖**
一個模板，用於使用模板引擎生成 HTML。

+ **ViewModel 視圖模型**(aka Presentation Model)
從查詢（或從中提取原始數據的模型實體）接收原始數據，並保留該數據以在模板中使用。它還封裝了複雜的呈現邏輯，以簡化模板。我發現使用 ViewModel 尤其重要，因為我們將不會被誘惑在模板中使用實體，這使我們能夠完全隔離視圖和模型：
    + 模型中的變化（即實體結構的變化）可能會影響到 ViewModel，但不會影響模板；
    + 複雜的呈現邏輯不會滲透到領域中（即，在業務實體中創建與呈現邏輯專屬相關的方法），因為我們可以將其封裝在 ViewModel 中。
    + 模板的依賴性因必須在 ViewModel 中設定而變得明確。使這些依賴性可見可以幫助我們，例如，決定應該從數據庫中急切加載什麼以防止 N+1 問題。
+ **Presenter**
+ 接收一個 HTTP 請求，觸發一個命令或查詢，使用查詢返回的數據，一個 ViewModel，一個模板和一個模板引擎來生成HTML並將其發送回客戶端。所有視圖交互都通過一個 presenter 進行。

```php
<?php
// src/UI/Admin/Some/Controller/Namespace/Detail/SomeEntityDetailController.php

namespace UI\Admin\Some\Controller\Namespace\Detail;

// use ...

final class SomeEntityDetailController
{
    /**
     * @var SomeRepositoryInterface
     */
    private $someRepository;
  
    /**
     * @var RelatedRepositoryInterface
     */
    private $relatedRepository;

    /**
     * @var TemplateEngineInterface
     */
    private $templateEngine;

    public function __construct(
        SomeRepositoryInterface $someRepository,
        RelatedRepositoryInterface $relatedRepository,
        TemplateEngineInterface $templateEngine
    ) {
        $this->someRepository = $someRepository;
        $this->relatedRepository = $relatedRepository;
        $this->templateEngine = $templateEngine;
    }

    /**
     * @return mixed
     */
    public function get(int $someEntityId)
    {
        $mainEntity = $this->someRepository->getById($someEntityId);
        $relatedEntityList = $this->relatedRepository->getByParentId($someEntityId);

        return $this->templateEngine->render(
            '@Some/Controller/Namespace/Detail/details.html.twig',
            new DetailsViewModel($mainEntity, $relatedEntityList)
        );
    }
}
```
```php
<?php
// src/UI/Admin/Some/Controller/Namespace/Detail/DetailsViewModel.php

namespace UI\Admin\Some\Controller\Namespace\Detail;

// use ...

final class DetailsViewModel implements TemplateViewModelInterface
{
    /**
     * @var array
     */
    private $mainEntity = [];

    /**
     * @var array
     */
    private $relatedEntityList = [];

    /**
     * @var bool
     */
    private $shouldDisplayFancyDialog = false;

    /**
     * @var bool
     */
    private $canEditData = false;

    /**
     * @param SomeEntity $mainEntity
     * @param RelatedEntity[] $relatedEntityList
     */
    public function __construct(SomeEntity $mainEntity, array $relatedEntityList)
    {
        $this->mainEntity = [
            'name' => $mainEntity->getName(),
            'description' => $mainEntity->getResume(),
        ];

        foreach ($relatedEntityList as $relatedEntity) {
            $this->relatedEntityList[] = [
                'title' => $relatedEntity->getTitle(),
                'subtitle' => $relatedEntity->getSubtitle(),
            ];
        }
        
        $this->shouldDisplayFancyDialog = /* ... some complex conditional using the entities data ... */ ;
        
        $this->canEditData = /* ... another complex conditional using the entities data ... */ ;
    }

    public function getMainEntity(): array
    {
        return $this->mainEntity;
    }

    public function getRelatedEntityList(): array
    {
        return $this->relatedEntityList;
    }

    public function shouldDisplayFancyDialog(): bool
    {
        return $this->shouldDisplayFancyDialog;
    }

    public function canEditData(): bool
    {
        return $this->canEditData;
    }
}
```

模板和 ViewModel 有一對一的對應關係，這意味著一個視圖只能與特定的 ViewModel 一起使用，反之亦然。這實際上甚至讓我想到，也許我們可以將模板和 ViewModel 封裝在一個視圖物件中，有效地將控制器與模板和 ViewModel 解耦，使其依賴於一個通用的視圖介面，但我從未嘗試過這種方法。

# 結論

我們可能會在網路上找到 MVC 的其他變形。然而，以上是我認為跟我工作相關且我認為相對比較有趣的幾種案例。

儘管如此，我在這裡引用的模式是為桌面應用程式和/或豐富客戶端的情境而創建的，因此它們並不總是 100% 適合 Request & Response 模式。

如果您正在進行企業雲應用，並且您正在使用 MVC，那麼您很可能實際上使用的是更接近 MVP 的東西，但無論如何，我的觀點並不是要堅持遵循 MVC 的特定變體或了解所有名稱並對此嚴格要求，我的觀點是我們應該從所有這些中學習，以便我們可以根據需要使用和調整。最終的目標是，像往常一樣，低耦合和高內聚：關注點分離。