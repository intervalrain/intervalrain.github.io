---
title: "[Java] 淺談 Java MVC"
date: 2022-04-29T15:38:18+08:00
tags: ["Java", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Introduction to Java MVC."                     
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

# 前言
## MVC
+ MVC 是一種軟體架構模式。
    + 模型 (Model)
    + 視圖 (View)
    + 控制器 (Controller)
+ 目的是實現一種動態且有彈性的程式設計，使後續對程式設計的維護與擴充都變得更容易，另一方面也能使程式的某一部分被重複使用而提升設計效率。
## SSH
+ SSH 是 MVC 的一種，是常用的系統框架，由下面三種集合而成：
    + Struts
    + Spring
    + Hibernate
## SSM
+ SSH 是 MVC 的一種，是常用的系統框架，由下面三種集合而成：
    + Spring-MVC
    + Spring
    + MyBatis

## SSH v.s. SSM
### Spring-MVC v.s. Struts
1. Struts 和 Spring-MVC 都負責取轉發，但兩者針對 request 的請求上區別很大，
    + Struts 是針對一個 Action **class** 來進行 request，即一個 Action 對應一個 request，屬於類攔截，請求的數據類共享。
    + Spring-MVC 則是針對 **method** 級別的 request，即一個 method 對應一個 request，屬於方法攔截，請求的數據方法不共享。
2. Spring-MVC 的配置文件相對較少，容易上手，方便開發。
3. Spring-MVC 的入口是 Servlet 級別的而 Struts 的級別是 Filter 級別的。
### Hibernate v.s. MyBatis
1. Hibernate 是一種 O/R 關係型，即完成資料庫和持久化類別之間的映射；而 MyBatis 是針對的 SQL-Mapping。猶如 Hibernate 是對資料庫封裝完成後，調用相對應的語句(HQL)來控制資料庫；而 MyBatis 是用原生的資料庫語法。
2. 基於以上原因，Hibernate 的優化較 MyBatis 難，MyBatis 不需要額外學習新的語法，入門較快。
3. 對於更高級的 Queuy，MyBatis 需要編寫 SQL 語句與 ResultMap。而 Hibernate 有因應的映射機制，無需關心 SQL 的生成與結果映射，可以專注於開發流程。
4. Hibernate 的資料庫移植性很好，MyBatis 的資料庫移植性不好，不同的資料庫需要寫不同的 SQL。

# Spring
## Spring、Spring MVC、Spring Boot
+ Spring
    + 是一種框架，包含一系列的 **IoC 容器**的設計和**依賴注入(DI)** 及 **整合AOP**功能。
+ Spring MVC
    + 是一種以 Spring 為核心的框架。
+ Spring Boot
    + 是一種以 Spring 為核心的框架，同時又能簡化配置(configuration)。
## Spring 的核心基礎
### DI
+ *DI = 依賴注入 Dependency Injection*
+ 一種 coding style，為了未來在維護上能更加的靈活，概念類似：
```Java
// 1
System.out.println("This is Spring");

// 2
String str = "This is Spring";
System.out.println(str);
```

### IoC
+ *IoC = 控制反轉 Inversion of Control*
+ 將產生物件這件事交給IoC去做。簡單來說，IoC是一個xml檔，也可以是一個class(Bean class)。
+ IoC做的事情就是設定其他class(Bean class)的名稱，以及 Constructor 會用到的參數或物件。
```
public class User{
    Family family = new Family("Jason", "Jocelyn", "Mark", "Eva");
    public void showAll(){
        family.showFamily();
    }
}

public class Family{
    String dad;
    String mom;
    String son;
    String dau;

    public Family(String dad, String mom, String son, String dau){
        this.dad = dad;
        this.mom = mom;
        this.son = son;
        this.dau = dau;
    }

    public void showFamily(){
        System.out.println(dad + " " + mom + " " + son + " " + dau);
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans>
    <bean id="family" class="Family">
        <property name="dad" value="Jason" />
        <property name="mom" value="Jocelyn" />
        <property name="son" value="Mike" />
        <property name="dau" value="Eva" />
    </bean>
    <bean id="user" class="User">
        <property name="allFamily" value="family" />
    </bean>
</beans>
```
### 實例 DI + IoC
+ Dinner
```Java
public class Diner{
    Food food;
    public void getDinner(){
        food.getFood();
    }
}
```
+ xml
```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans>
    <bean id="pork" class="Pork"/>
    <bean id="chicken" class="Chicken"/>
    <bean id="food" class="Food">
        <property name="food" value="chicken" />
    </bean>
</beans>
```
+ classes
```
public interface Food{
    public void getFood();
}
public class Chicken implements Food{
    @override
    public void getFood(){
        System.out.println("Eat chicken");
    }
}
public class Pork implements Food{
    @override
    public void getFood(){
        System.out.println("Eat pork");
    }
}
```


# Spring Boot
+ 由 Pivotal 團隊在 2013 年開始研發、2014年4月發布第一個版本。
+ 是基於 Spring4.0 所設計的一種新型框架，繼承的 Spring 框架原有的優秀特性，還通過簡化配置來進一步簡化了 Spring 應用的整個搭建和開發過程。
+ 通過集成大量的框架使得依賴包的**版本衝突**與**引用的不穩定性**得到很好的解決。
+ 官方說明: 
> Spring Boot makes it easy to create stand-alone, production-grade Spring baesd Applications that you can "just run".
> We take an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss.
> Most Spring Boot applications need very little Spring configuration.  

+ String Boot 預設了各種合理的默認配置包括放棄了 XML，Spring Boot Web 應用程式使用了一個嵌入式 Tomcat 容器，可以自定義 Spring Boot 應用程式等。
+ 簡而言之，Spring Boot 提供一組工具，可以快速構建且容易配置的 Spring 應用程式。同時不需要在重新定義基本的配置，從而成為可以達到快速開發的效果。
## 特色
1. 創建獨立的 Spring 應用程式
2. 嵌入式 Tomcat、Jetty; Undertow(不用部署 WAR 包)
3. 提出自主的 starter 來簡化配置
4. 隨時自動地配置 Spring 及相關的第三方庫
5. 提供已隨時就緒的功能如 Metrics，程式的健檢及外部化配置
6. 不會生成任何代碼及無任何 XML 配置的前設要求