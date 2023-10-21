---
title: "[IT] Action-Domain-Responder(ADR) 架構"
keywords: ["Software Architecture"]
description: 
date: 2023-10-19T22:43:08+08:00
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
這篇文章將討論 MVC 的另一種變體：由 Paul M. Jones 創建的 Action-Domain-Responder。

# 2014 – Action-Domain-Responder(ADR)
ADR 模式是由 Paul M. Jones 於 2014 年創建的，其想法就像 RMR 一樣，是為了將 MVC 調整到網路 REST APIs的 情境中。ADR 的原始解釋非常簡單明瞭，我實在無法更好地改述它，所以我將在這裡複製/貼上部分內容，並只添加一些更多的評論。

![ADR](https://herbertograca.files.wordpress.com/2018/09/adr-22.png)

## Action 行動
Is the logic to connect the Domain and Responder. It invokes the Domain with inputs collected from the HTTP request, then invokes the Responder with the data it needs to build an HTTP response.
這是連接 domain 和 responder 的邏輯，它會用從 HTTP 收集來的請求來觸發 domain，接著使用需要構建 HTTP 響應的數據來調用 responder。

```php
<?php
namespace Pmjones\Adr\Web\Blog\Add;

use Pmjones\Adr\Domain\Blog\BlogService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class BlogAddAction
{
    protected $domain;
    protected $responder;

    public function __construct(
        BlogService $domain,
        BlogAddResponder $responder
    ) {
        $this->domain = $domain;
        $this->responder = $responder;
    }

    public function __invoke(Request $request) : Response
    {
        $payload = $this->domain->newPost();
        return $this->responder->__invoke($request, $payload);
    }
}
```

## Domain 領域
Is an entry point to the domain logic forming the core of the application, modifying state and persistence as needed. This may be a Transaction Script, Service Layer, Application Service, or something similar.
應用程式核心 domain 邏輯的進入點，根據需求修改狀態和持久性，也可能是交易腳本、服務層、應用服務，或類似的東西。

```php
<?php
namespace Pmjones\Adr\Domain\Blog;

use Pmjones\Adr\DataSource\Blog\BlogMapper;
use Pmjones\Adr\Domain\ApplicationService;
use Pmjones\Adr\Domain\Payload;
use Exception;

class BlogService extends ApplicationService
{
    protected $mapper;
    protected $filter;

    public function __construct(
        BlogMapper $mapper,
        BlogFilter $filter
    ) {
        $this->mapper = $mapper;
        $this->filter = $filter;
    }

    protected function fetchPage(int $page = 1, int $paging = 10) : Payload
    {
        $blogs = $this->mapper->selectAllByPage($page, $paging);

        return $this->newPayload(Payload::STATUS_FOUND, [
            'blogs' => $blogs,
        ]);
    }

    protected function fetchPost(int $id) : Payload
    {
        $blog = $this->mapper->selectOneById($id);

        if ($blog === null) {
            return $this->newPayload(Payload::STATUS_NOT_FOUND, [
                'id' => $id
            ]);
        }

        return $this->newPayload(Payload::STATUS_FOUND, [
            'blog' => $blog
        ]);
    }

    protected function newPost(array $data = []) : Payload
    {
        return $this->newPayload(Payload::STATUS_NEW, [
            'blog' => $this->mapper->newRecord($data)
        ]);
    }

    protected function addPost(array $data) : Payload
    {
        // instantiate a new record
        $blog = $this->mapper->newRecord($data);

        // validate the record
        if (! $this->filter->forInsert($blog)) {
            return $this->newPayload(Payload::STATUS_NOT_VALID, [
                'blog' => $blog,
                'messages' => $this->filter->getMessages()
            ]);
        }

        // insert the record
        $this->mapper->insert($blog);
        return $this->newPayload(Payload::STATUS_CREATED, [
            'blog' => $blog,
        ]);
    }

    protected function editPost(int $id, array $data) : Payload
    {
        // fetch the record
        $blog = $this->mapper->selectOneById($id);
        if ($blog === null) {
            return $this->newPayload(Payload::STATUS_NOT_FOUND, [
                'id' => $id
            ]);
        }

        // set data in the record; do not overwrite existing $id
        unset($data['id']);
        $blog->setData($data);

        // validate the record
        if (! $this->filter->forUpdate($blog)) {
            return $this->newPayload(Payload::STATUS_NOT_VALID, [
                'blog' => $blog,
                'messages' => $this->filter->getMessages()
            ]);
        }

        // update the record
        $this->mapper->update($blog);
        return $this->newPayload(Payload::STATUS_UPDATED, [
            'blog' => $blog,
        ]);
    }

    protected function deletePost(int $id) : Payload
    {
        // fetch the record
        $blog = $this->mapper->selectOneById($id);
        if (! $blog) {
            return $this->newPayload(Payload::STATUS_NOT_FOUND, [
                'id' => $id
            ]);
        }

        // delete the record
        $this->mapper->delete($blog);
        return $this->newPayload(Payload::STATUS_DELETED, [
            'blog' => $blog,
        ]);
    }
}
```

## Responder 響應器
Is the presentation logic to build an HTTP response from the data it receives from the Action. It deals with status codes, headers and cookies, content, formatting and transformation, templates and views, and so on.
根據從動作中收到的數據來構建 HTTP 響應的呈現邏輯。包含處理狀態碼、headers 和 cookies、內容、格式化和轉換、模板和視圖等等。

```php
<?php
namespace Pmjones\Adr\Web\Blog\Add;

use Pmjones\Adr\Web\Blog\BlogResponder;

class BlogAddResponder extends BlogResponder
{
    protected function new() : void
    {
        $this->renderTemplate('add');
    }
}
```

## 如何運作
1. 網路處理器(web handler)接收一個 HTTP 請求，並將其分派給一個動作(action)。
2. 動作(action)調用領域(domain)，從 HTTP 請求中收集 inputs 給領域(domain)。
3. 接著動作(action)會調用響應器(responder)，並提供建立 HTTP 響應所需的數據（通常是HTTP request 和 domain results，如果有的話）。
4. 響應器(responder)使用動作(action)提供的數據來構建 HTTP 響應(response)；
The Action returns the HTTP response to the web handler sends the HTTP response.
5. 活動(action)返回 HTTP 響應(response) 給網頁處理器(web handler)。

HTTP 響應是由 Responder 透過解析和理解 domain response 來建立的，這反過來又取決於動作方法的使用案例。這意味著每個動作方法都需要一個特定的 Responder。如果我們將所有的資源方法都放在同一個控制器中，我們將需要實例化並注入所有的 Responders，但在一個 HTTP request 中我們只會使用一個，這作法顯然不夠好。因此，解決方案是讓每個控制器中只有一個方法，這個控制器及其唯一的動作方法就是 ADR 中所指的 Action。

由於 Action 只有一種方法，所以該方法的名稱可以是像 `run`、`execute` 這樣的通用名稱，或者在 PHP 的情況下，可以是 `__invoke` ，使該類別成為可調用的。然而，由於我們的想法是將 MVC 模式適配到 HTTP REST API 的情境中，所以 Action（controller）的名稱被映射到HTTP request 方法，因此我們將有名為 `Get`、`Post`、`Put`、`Delete` 等的 Actions，明確指出每種 HTTP request 類型調用哪個控制器。作為一種組織模式，一個 resource 上的所有 Actions 都應該被分組在一個以該 resource 命名的資料夾下。

## 對 ADR 的誤解
Anthony Ferrara 將 ADR 與 RMR 進行比較，他認為這是「相同的模式，只是調整了一些細節」。

我不同意，我其實認為 Anthony Ferrara 的理解錯了：

1. ***Resource 等於 Domain***  
在 RMR 中，resource 並非是 domain，它是一個 domain object，是一個 domain entity，而在 ADR 中的 domain 指的是整個 domain objects，所有的 entities 及其它們整體的關係。
2. ***Representation 等於 Responder***
在 RMR 中，Representation 是發送回客戶端的回應，在 ADR 中，Responder 是一個物件，其職責是根據一些內容和一些模板來創建回應(response)。
“it shares RMRs coupling to HTTP that it becomes difficult to make a non-HTTP interface”
3. 它將 RMRs 與 HTTP 進行耦合，進而使創建一個 non-HTTP 的介面變得困難。  
由於 ADR 將 domain 視為一個整體，而非一個 entity，因此 action 並不在單一個 domain object 內，它將是簡單地對 domain objects 要求進行一些業務邏輯，所以 domain 並未與 UI 耦合，我們可以創建一個 CLI 命令，使用 domain objects 來執行某些任務。

## 我的看法
在我寫這篇文章的時候，我覺得 **ADR 是將 MVC 適配到 HTTP request/response 範疇的最佳方式**，因為它清楚地將 HTTP 的 request 和 response 適配到 domain 的 request 和 response，同時仍然保持 domain 與 presentation layer 解耦。

HTTP 請求方法（對資源的期望動作）與接收 HTTP 請求的程式碼明確地連接，因為每個 HTTP 方法都直接映射到控制器方法名稱。這具有額外的好處，即產生清晰、明確且可預測的程式碼組織，而不是擁有大量動作的控制器，這些動作往往無關，往往命名不當，因此無法預測，往往做著極其相似的事情。換句話說，它防止了控制器和動作的混亂造成大泥球(或義大利麵結構)。


此外，它在解耦與互動本身（invoke domain）相關的程式碼與理解互動結果（domain response）並將其轉譯給客戶端的程式碼方面也做得非常出色。

然而，有一些要點需要考慮：

1. 這種模式是專為 REST APIs 而設想的，所以在這種形式下，它還不夠精煉，無法用於具有 HTML 介面的網路應用程式（即在創建 resource 之前，顯示表單的動作該怎麼命名？）
2. **每個控制器只有一種方法使得這種模式更為冗長**，例如，我們不再是有一個擁有 4 個動作（公開方法）的控制器（類別），而是有四個控制器和四個動作；

3. 為**每個活動(action)創建響應器(responder_也會增加模式的冗長性**。如果將 domain response 轉換為 HTTP response 的邏輯很簡單，我們應該考慮是否有需要使用響應器(responder)。不使用響應器意味著我們能夠在一個控制器中有多個方法，每個方法仍然對應到一個HTTP 方法。

考慮到第二點和第三點，Paul M. Jones自己也承認並同意，在某些情況下，使用該模式的簡化版本雖然不夠優雅，但對於手頭的情境來說可能已經足夠。

關於第一點，我認為這種模式可以輕易地擴展，使其能夠完全適用於 HTML 介面：我們可以模擬一些額外的 HTTP 方法，專門處理 REST API 無法處理的 HTML 請求。例如，在 REST API 中，我們可以使用 `PUT` 或 `POST` 來創建和/或更新資源，然而，對於 HTML 介面，我們需要在發送 `POST` 或 `PUT` 請求之前顯示一個表單，但是沒有 HTTP 方法指定客戶端請求創建資源的表單，也沒有指定編輯資源的表單。然而，我們可以通過使用帶有 `create` 或 `edit` 標頭的 GET 請求來模擬這一點，前端控制器可以解釋並將請求轉發到相應的名為 `Create` 或 `Edit` 的Action，然後回覆相應的 HTML 表單。然而，我們需要非常小心，並對我們創建的額外自定義 HTTP 方法保持極度的簡約……否則，這可能導致我們有大量的自定義 HTTP 方法，並且與行為緊密相連的自定義 HTTP 方法變得混亂！所以，對於我最後的這個建議，請謹慎行事。