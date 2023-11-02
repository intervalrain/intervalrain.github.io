---
title: "[IT] 服務導向的架構 Service Oriented Architecture (SOA)"
keywords: ["Software Architecture"]
description: 
date: 2023-11-02T22:32:25+08:00
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
The SOA Style has been around since the late 1980s and has its origins in ideas introduced by CORBA, DCOM, DCE and others. Much has been said about SOA, and there are a few different implementation patterns but, in essence, SOA focuses on only a few concepts and doesn’t give any prescription on how to implement them:
SOA風格自 1980 年代晚期便一直存在，其起源於 CORBA、DCOM、DCE 等等。關於 SOA 已經有很多討論，且有許多不同的實作，但本質上，SOA 只關注少數幾個概念，而且指引我們如何去實作：
+ 使用者導向的應用程式。
+ 可重複使用的商業服務。
+ 獨立的技術堆。
+ 自治性(獨立演進、可擴展性與可部署性)

SOA 是一最獨立於任何技術或產品的架構原則，就像多態與封裝一樣。

# 通用物件請求代理架構 CORBA - Common Object Request Broker Architecture
在 1980 年代，由於日漸成長的企業網路與客戶端/伺服器架構，人們需要一種方式讓軟體可以用不同的技術來建構且能被執行在不同的作業系統上。CORBA 就是為了這樣的需求而開發的，它是自 1980 年代開始發展，直至 1991 年才趨於成熟的一種分散式計算的標準。

CORBA 的準則包含：
+ 平台中立遠端程序呼叫 Platform neutral Remote Procedure Call
+ 交易 Transactions
+ 安全性 Security
+ 事件 Events
+ 程式語言獨立 Programming language independence
+ 作業系統獨立 OS independence
+ 硬軟體立 Hardware independence
+ 獨立於數據傳輸/通訊細節 Isolation from data-transfer/communication details
+ 透過介面定義語言進行數據輸入 Data typing through an Interface Definition Language (IDL).

至此，CORBA 仍被用於異質運算，舉例來說，它目前仍是 JAVA EE 的一部分，儘管從 JAVA 9 開始，它被作為一個單獨的模塊進行打包。

值得注意的是，**我並不認為 CORBA 是 SOA 模式**（儘管我認為 CORBA 和 SOA 模式都屬於分散式計算的範疇）。我選擇在這裡介紹它，是因為我認為**它的不足導致了 SOA 的興起**。

## CORBA 是如何運作的
首先，我們需要獲得一個符合 CORBA 規範的物件請求代理器（Object Request Broker, ORB），它由供應商提供，並使用語言映射器(language mappers)在客戶端的程式碼中生成存根(stubs)和骨架(skeletons)。使用該 ORB 和使用 IDL（類似於 WSDL）定義的介面定義。  
+ 在用戶端，我們生成可以遠程調用的真實類的存根類。  
+ 在伺服器端，我們生成可以處理傳入請求並將調用傳遞給真實目標物架的骨架類。
![corba](https://herbertograca.files.wordpress.com/2017/07/1980s-corba.png)

1. The caller calls a local procedure implemented by the stub;  
呼叫者呼叫由存根實現的本地程序；
2. The stub validates the call and creates a request message that passes to the ORB;  
該存根驗證呼叫並創建一個請求訊息，該訊息會傳遞給ORB；
3. The client ORB sends the message over the network to the server and blocks the current execution thread;  
客戶端ORB將訊息透過網路傳送到伺服器，並阻塞當前的執行線程；
4. The server ORB receives the request message and instantiates the skeleton;  
伺服器的ORB接收請求訊息並實例化骨架；
5. The skeleton executes the procedure on the called object;  
骨架在被呼叫的物件上執行程序
6. The called object performs a computation and returns the result;  
被呼叫的對象執行計算並返回結果;
7. The skeleton packs the output arguments into a response message and passes it to the ORB;  
骨架將輸出參數打包成一個回應訊息，並將其傳遞給ORB；
8. The ORB sends the message over the network back to the client;  
ORB將訊息透過網路傳回給客戶端
9. The client ORB receives the response message, unpacks it and delivers it to the stub;  
客戶端ORB接收到回應訊息，解開它並將其傳遞給存根；
10. The stub passes output arguments to the caller, releases execution thread and the caller continues in execution.  
存根將輸出參數傳遞給呼叫者，釋放執行線程，然後呼叫者繼續執行。

## 優點
+ 獨立技術堆（ORB實作除外）。
+ 從數據傳輸/通訊細節中分離。
## 缺點
+ **位置透明性**：客戶端程式碼不知道呼叫是本地還是遠程，這聽起來像是一件好事，然而，延遲和失敗的類型卻大不相同，這取決於它是本地呼叫還是遠程呼叫。不知道呼叫的類型，使得應用程式無法選擇適當的策略來處理方法呼叫，並最終在迴圈內進行遠程呼叫，因此大大地減慢了整個系統的速度。
+ **複雜、冗餘且模糊的規範**：該規範是由多個現有供應商版本混合創建的，因此（在當時）它既模糊又冗餘，使得實施變得困難。
+ **阻塞的通訊管道**：它使用TCP/IP上的特定協議和特定端口，甚至是隨機端口。但企業的安全規則和防火牆通常只允許通過端口80進行HTTP通訊，有效地阻塞了CORBA通訊。

# 網路服務 Web Services
雖然CORBA現今仍有其使用情境，我們了解到我們需要減少遠端通訊以提高系統的效能，我們需要一個可靠的通訊管道，並且我們需要一個更簡單的通訊規範。

因此，在1990年代末，網路服務開始出現，目的是解決上述提到的問題：

+ **我們需要一條可靠的通訊管道，所以：**
    + 透過 port 80 的 HTTP 是預設的通訊管道。
    + 使用一種跨平台的通訊語言（如XML或JSON）。
+ **我們需要減少遠程通訊，所以：**
    + 我們有明確的遠程通訊，所以我們確切知道何時進行遠程通話。
    + 我們進行了粗粒度的遠程呼叫，也就是說，我們並不經常呼叫遠程對象，而是較少地呼叫遠程服務。

+ **我們需要一個更簡單的通訊規範，所以：**
    + **SOAP** 於1998年有了初版，並在2003年達到了W3C的推薦，使其實質上成為一種標準。它體現了CORBA的一些理念，如處理通信的層和使用Web服務描述語言（Web Service Description Language, WSDL）定義介面的「文檔」。
    + **REST** 於2000年由Roy Fielding在他的博士論文《Architectural Styles and the Design of Network-based Software Architectures》中定義，它比SOAP規範簡單得多，這使得它比稍微老一點的SOAP規範更快地獲得了更高的採用率。
    + **GraphQL** 是由 Facebook 在 2012 年開發並於 2015 年向公眾發布的。它是一種 API 查詢語言，允許客戶端準確指定伺服器應返回的數據，而不是一種特定的負載，從而避免了數據的過度和不足的提取。

> *[Web] Services can be published, discovered and used in a technology neutral, standard form.* - ***Microsoft 2004, Understanding Service-Oriented Architecture***  
> *[網頁] 服務可以以技術中立、標準形式進行發布、發現和使用。* - ***Microsoft 2004，理解服務導向架構***
![soa](https://herbertograca.files.wordpress.com/2017/07/2000s-soa.png)

透過網路服務，SOA從遠程調用物件方法（CORBA）的範疇轉變為在服務之間傳遞訊息的範疇。

我們需要理解，在SOA的大旗下，網路服務並不僅僅是一個通用的API，它並不只是透過HTTP提供對其數據庫的CRUD訪問。雖然在某些情況下，這種實現可能是有用的，但它要求用戶理解底層模型並遵守業務規則，以確保您的數據完整性得到保護。SOA意味著網路服務被設計為業務子域的有界上下文，將實現從它們提供的概念服務中抽象出來。

> *SOA is not just an architecture of services seen from a technology perspective, but the policies, practices, and frameworks by which we ensure the right services are provided and consumed.* - ***Microsoft 2004, Understanding Service-Oriented Architecture***  
> *SOA不僅僅是從技術角度看的服務架構，而是我們確保提供和使用正確服務的政策、實踐和框架。* - ***Microsoft 2004，理解服務導向架構***

## 優點
+ 獨立技術堆、獨立的服務部署與獨立的擴展性。
+ 常見的、簡單且可靠的通訊管道（透過HTTP的文字，port 80）。
+ 優化的通訊。
+ 穩定的通訊規範。
+ 領域內容(domain contexts)的隔離。
## 缺點
+ 由於使用不同的通訊語言，使得不同網路服務的**整合變得困難**，例如，兩個使用不同JSON表示相同概念的網路服務。
+ 同步通訊可能會導致**系統過載**。

# 訊息佇列 Message Queue 
核心理念是讓多個應用程式之間進行異步通訊，使用不可知的訊息。訊息隊列提供了更好的可擴展性和更高的應用程式解耦，因為它們不需要知道其他應用程式的位置，數量，甚至是它們是誰。儘管如此，他們都需要使用相同的通訊語言，即一種預定的文字格式來表示數據。

訊息佇列使用訊息代理軟體（例如 RabbitMQ、Beanstalkd、Kafka等）作為基礎設施工具，並可以以不同方式設置以實現應用程序之間的通信：

+ **Request/Reply**
    + 客戶端向訊息佇列發送一條訊息，其中包含一個「對話」參考。該訊息被送達到特定的節點，該節點將以另一條訊息回覆原始發送者，並包含相同的對話參考，以便接收者知道該訊息參考的是哪個對話，並可以繼續進行該過程。對於中長期的業務流程（故事）來說，這非常有用。
+ **Publish/Subscribe**
    + **List-Based**  
    它維護已發布主題和這些主題的訂閱者的列表。當它收到某個主題的訊息時，它會將該訊息放入相應的主題列表中。將訊息與主題匹配可以通過訊息類型或者一組更複雜的預定標準來完成，這些標準可以包括訊息內容本身。
    + **Broadcast-Based 基於廣播的**  
    當它接收到訊息時，會將它們廣播給所有正在監聽隊列的節點。每個監聽節點都負責過濾和處理它所感興趣的訊息。
![message queue](https://herbertograca.files.wordpress.com/2017/10/1995s-message-queue.jpg)

所有這些模式都可以設定為 `pull` 或 `push` 方式：

+ 在 `pull` 情境中，客戶端會每隔X時間就向佇列請求一條訊息。這樣做的好處是**客戶端能夠控制其負載**，但也可能帶來**延遲的缺點**，即當佇列中有訊息，而客戶端並未處理訊息，只是等待著下一個時機來 pull 新的訊息。
+ 在 `push` 情境中，佇列會在收到訊息後立即將其推送給客戶端。這樣的優點是**沒有延遲**，但**客戶端無法自我管理他們的負載**。
## 優點
+ 獨立技術堆，獨立的部署性與擴展性。
+ 常見的、簡單且可靠的通訊管道（透過HTTP的文字，port 80）。
+ 優化的通訊。
+ 穩定的通訊規範。
+ 領域內容(domain contexts)的隔離。
+ 輕鬆附加和拆除服務。
+ 非同步通訊有助於管理系統的負載。
## 缺點
+ 由於不同的通訊語言，使得不同網路服務的整合變得困難，例如，兩個使用不同JSON表示相同概念的網路服務。

# 企業服務總線 (ESB)
在1990年代，當網路服務正在演進的同時，企業服務總線已經開始利用它們（也許有些實現最初甚至使用了CORBA？）。

ESB在一個背景下誕生，那就是公司有自己的獨立應用程式，比如一個用於財務的應用程式，另一個用於人力資源，另一個用於庫存管理等等，他們需要讓這些應用程式彼此溝通，需要將它們整合起來。但是，這些應用程式並未考慮到整合的問題，並沒有一種共通的語言格式讓應用程式進行溝通（就像今天也沒有）。因此，合理的解決方案是讓應用程式供應商創建端點，以特定格式發送和接收數據。客戶公司則需要通過建立通信管道並將一種應用程式語言的訊息轉換成另一種語言來整合應用程式。

訊息佇列可能有助於解決這個問題，但它仍然無法解決應用程式具有不同語言格式的問題。然而，將訊息佇列從一個笨拙的通訊頻道轉變為一個處理訊息傳遞和將其轉換為接收者期望的語言/格式的中介軟體，這是一個小步驟。企業服務匯流排是更簡單的訊息佇列的自然演進。

![esb-2](https://herbertograca.files.wordpress.com/2017/02/esb-2.gif?w=580&h=682)

在這種架構類型中，我們有組合應用程式，通常面向使用者，透過聯繫網路服務來執行某些操作。這些網路服務反過來也可以聯繫其他網路服務，最終，它們可能會將一些數據返回給組合應用程式。然而，無論是組合應用程式還是後端服務，都對彼此的細節一無所知，即它們的位置或通訊協議。他們所知道的是他們需要什麼服務以及服務總線的位置。

因此，客戶端應用程式（無論是服務或是複合應用程式）將其請求發送到服務總線，服務總線再將訊息轉換成目的地所期待的格式，並將請求路由到目的地。值得注意的是，所有的通訊都通過ESB，這意味著如果ESB停機，所有的通訊都會中斷，所有的系統都將無法運作。最後，ESB就像是一個中介軟體，其中發生了許多事情，使其成為一個高度複雜的產物。

這當然只是對ESB架構的基本解釋。此外，雖然ESB是這種架構中的主要元件，但也可能涉及其他元件，如領域經紀人、數據服務、流程編排服務或規則引擎。這種架構模式也可以在聯邦設計中設置，其中系統被劃分為業務領域，每個領域都有自己的ESB設置，並且所有這些設置都相互連接。這有助於提高性能並減輕單點故障的問題，即如果一個ESB失敗，只會影響其業務領域。

[federated_esb](https://herbertograca.files.wordpress.com/2017/02/federated_esb.jpg)

一個ESB的主要職責是：
+ 監控並控制服務間訊息交換的路由。
+ 解決服務組件間通訊的訊息翻譯問題。
+ 控制服務的部署和版本管理。
+ 元帥使用多餘的服務。
+ 提供商品服務，如事件處理、數據轉換和映射、消息和事件排隊和排序、安全或異常處理、協議轉換以及強制實施適當的通信服務品質。

> *When building communication structures between different processes, we’ve seen many products and approaches that stress putting significant smarts into the communication mechanism itself. A good example of this is the Enterprise Service Bus (ESB), where ESB products often include sophisticated facilities for message routing, choreography, transformation, and applying business rules.* - ***Martin Fowler 2014, Microservices***  
> *在建立不同流程間的通訊結構時，我們看到許多產品和方法都強調要在通訊機制本身中投入大量的智慧。一個很好的例子就是企業服務總線（ESB），ESB產品通常包含了訊息路由、編排、轉換和應用業務規則等複雜的設施。* - **馬丁·福勒 2014，微服務**

這種架構模式有其優點，但我發現如果我們並非「擁有」網路服務，因此需要一種中介軟體來轉譯它們之間的訊息，協調涉及多個網路服務的業務流程等，那麼它尤其有用。

我們也應該記住，ESB的實現已經進化，現在我們甚至可以使用簡單的拖放界面來配置ESB，以滿足大多數使用情況。

## 優點
+ 獨立技術堆，獨立的部署性與擴展性。
+ 常見的、簡單且可靠的通訊管道（透過HTTP的文字，port 80）。
+ 優化的通訊。
+ 穩定的通訊規範。
+ 領域內容(domain contexts)的隔離。
+ 輕鬆附加和拆除服務。
+ 非同步通訊有助於管理系統的負載。
+ 版本控制和翻譯管理的單一點。
## Cons 缺點
+ 較慢的通訊速度，尤其是對於那些已經相容的服務。
+ **集中邏輯。**
    + 可能導致企業所有通訊中斷的單一故障點。
    + 高配置與維護複雜性。
    + 隨著時間的推移，ESB可能最終會包含業務規則。
    + 由於其複雜性，最終將需要一個團隊來管理它
    + 服務變得高度依賴於ESB。

# 微服務 Microservices
微服務架構的基礎建立在SOA概念上，並與ESB共享相同的全球目標：從多個特定的業務領域應用程序中創建一個全球性的企業應用程序。

關鍵的差異在於，ESB誕生於**需要整合的獨立應用程式的情境中**，以實現企業範圍的分散式應用程式，而微服務架構則誕生於快速變化且不斷創新的業務情境中，**這些業務（大部分）從零開始創建自己的雲應用程式**。

換句話說，起點是不同的。在ESB的情況下，我們從**我們並不「擁有」的現有應用程式開始**，因此我們無法改變它們。但是對於微服務，我們對應用程序（不代表系統中不能涉及任何第三方網絡服務）有**完全的控制權**。

微服務的建構/設計方式避免了對整合的高度需求。微服務應該針對特定的商業概念，對於有限的上下文，它們應該保持自己的狀態，以便不直接依賴於其他微服務，因此需要較少的整合。換句話說，微服務提供的低耦合和高內聚性有一個好的副作用，那就是減少了對整合的需求。

> *[Microservices are] Small autonomous services that work together, modelled around a business domain.* - ***Sam Newman 2015, Principles Of Microservices***  
> *[微服務是] 一種圍繞業務領域模型的小型自主服務，它們共同協作。* - ***Sam Newman 2015，微服務原則***


由於ESB架構的最大缺點是所有其他應用程序都必須依賴的非常複雜且中心化的應用程式，微服務架構通過幾乎完全移除它來解決這個問題。

仍然有一些元素貫穿於整個微服務生態系統，但它們的責任並不像企業服務總線(ESB)那麼多。例如，仍然有一個訊息佇列用於微服務之間的異步通訊，但它僅僅是一個訊息管道，沒有其他責任。另一個例子是微服務生態系統的門戶，所有與外界的通訊都是通過這個門戶進行的。

Sam Newman，「建構微服務」一書的作者，確定了微服務架構的八大原則：

+ Services are modelled around business domains   服務是根據業務領域來建模的  
Because it can give us stable interfaces around a business concept, very cohesive and decoupled units of code and clearly identified bounded contexts  
因為它能為我們提供圍繞商業概念的穩定介面，非常有凝聚力且解耦的程式碼單元，以及清晰識別的邊界上下文;
+ Culture of automation 自動化文化  
Because we will have a lot more moving parts and deployable units;  
因為我們將會有更多的移動部件和可部署單位
+ Hide implementation details 隱藏實作細節  
To allow one service to evolve independently of another;  
讓一項服務能夠獨立於另一項服務進行演進;
+ Decentralise all the things 將所有事物去中心化  
Decentralise the decision making power and the architectural concepts, giving autonomy to the teams so that the organisation transforms itself into a Complex Adaptative System who can quickly adapt to change;  
將決策權力和建築概念分散，賦予團隊自主權，使組織轉變為一個能夠迅速適應變化的複雜適應系統；
+ Deploy independently 獨立部署  
So that we can deploy a new version of a service without the need to change anything else;  
這樣我們就可以部署新版本的服務，而無需改變其他任何事物  
+ Consumer first 以消費者為先  
A service should be easy to consume, easy to be used by other services;  
一項服務應該易於使用，且能輕鬆地被其他服務所使用；  
+ Isolate failure 隔離失敗
So that even if one service fails, the others continue to operate, giving the overall system a high resilience to failure;
因此，即使有一項服務失效，其他服務仍會繼續運作，使整體系統對於失效具有高度的抵抗力
+ Highly observable 高度可觀察的  
Due to the system high number of parts, it is more difficult to understand everything that is going on, so we need sophisticated monitoring tools that allow us to know what is going on in every corner of the system and understand any chain reactions.
由於系統的組件數量龐大，要完全理解所有運作情況變得更為困難，因此我們需要精密的監控工具，讓我們能夠了解系統每一個角落的狀況，並理解任何鏈式反應。
[2010 - Microservices](https://herbertograca.files.wordpress.com/2018/10/2010-microservices.jpg)

> *The microservice community favours an alternative approach: smart endpoints and dumb pipes. Applications built from microservices aim to be as decoupled and as cohesive as possible – they own their own domain logic and act more as filters in the classical Unix sense – receiving a request, applying logic as appropriate and producing a response. These are choreographed using simple RESTish protocols rather than complex protocols such as WS-Choreography or BPEL or orchestration by a central tool.* - ***Martin Fowler 2014, Microservices***  
> *微服務社區偏好另一種方法：智能端點和簡單管道。由微服務構建的應用程序旨在盡可能地解耦和凝聚 - 它們擁有自己的領域邏輯，並更多地作為經典Unix意義上的過濾器 - 接收請求，適當地應用邏輯並產生響應。這些使用簡單的REST風格協議進行編排，而不是使用如WS-Choreography或BPEL等複雜協議，或由中央工具進行編排。* - ***馬丁·福勒 2014，微服務***

## 優點
+ 獨立技術堆，獨立的部署性和獨立的擴展性。
+ 常見的、簡單且可靠的通訊管道（透過HTTP的文字，port 80）。
+ 優化的通訊。
+ 穩定的通訊規範。
+ 隔離領域上下文。
+ 輕鬆附加和拆除服務。
+ 非同步通訊有助於管理系統的負載。
+ 同步通訊有助於管理系統的性能。
+ 真正獨立且自主的服務。
+ 服務之外無商業邏輯。
+ 具有將組織轉變為複雜適應系統的潛力，該系統由多個能夠快速適應業務變化的小型自主部分/團隊組成。
## 缺點
+ 高度的操作複雜性。
+ 需要大量投資以建立強大的DevOps文化。
+ 使用大量的技術和庫可能會變得難以控制。
+ 輸入和輸出API的變更必須謹慎管理，因為會有軟體依賴這些介面。
+ 使用最終一致性的做法在開發應用程式時，從後端到使用者體驗層面，都有重大的影響需要被處理。
+ 隨著介面變更，測試變得更為複雜，因為這可能會對其他服務產生無法預測的後果。

# Anti-Pattern: Ravioli Architecture
反模式：義大利餛飩架構
![ravioli](https://herbertograca.files.wordpress.com/2017/03/ravioli.png)

「Ravioli架構」是常用來指稱微服務架構的反模式的名稱。當我們創建了一個微服務的生態系統，其中的服務過多、過小，且無法自身代表領域概念時，就會發生這種情況。

Conclusion 結論
在過去的幾十年中，SOA已經進化了許多，並且由於實施解決方案的不足以及技術的進步，我們已經達到了微服務架構。

這整個演變背後的理念一直都是解決複雜問題的常用策略：將問題分解成較小、可解決的部分。

解決代碼複雜性也可以在我們有一個單體的情況下，以相同的方式進行，將其分解為解耦的領域組件（有界上下文）。但是，隨著團隊和代碼庫的增長，對於獨立演化、可擴展性和可部署性的需求也在增加。SOA為這種獨立性提供了工具，強制在有界上下文之間設定更嚴格的邊界。

![soa](https://herbertograca.files.wordpress.com/2017/02/soa.gif)

再一次，這是關於低耦合和高內聚，這次的粒度比以前更粗。同樣，我們需要實事求是地分析我們的需求：只有在真正需要時才使用SOA，因為它會為混合帶來很多複雜性，如果我們真的需要使用SOA，那麼讓我們創建真正適合我們需求的大小和數量的微服務，不多也不少。