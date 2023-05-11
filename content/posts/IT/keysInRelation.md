---
title: "[IT] 關聯模式的五大鍵 Super key、Candidate Key、Primary Key、Alternate Key、Foreign Key"
keywords: ["IT", "SQL", "database"]
description: "關聯模式的五大鍵介紹"
date: 2023-05-11T21:50:43+08:00
tags: ["IT", "SQL", "database"]
draft: false
Categories: IT
author: "Rain Hu"
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
### 關聯模式的條件
+ 關聯模式可以比實體關係模式(ERM)更精準的描述資料，他有幾個條件必須滿足：
1. 定義域限制: 指資料庫的關聯中的每個屬性質，必須符合該屬性的定義，例如產品名稱必須是字串，薪水必須是整數數字等。
2. 關聯鍵限制: 指資料庫的關聯中必須有關聯鍵的定義，也就是Super key、Candidate Key、Primary Key、Alternate Key、Foreign Key。這些定義我們稍後再來解釋。
3. 實體完整限制: 如果關聯存在主鍵(Primary Key)，則不能為空。因為如果為空值，無法得知其相關的屬性值到底是描述哪一個實體。
4. 參考完整限制: 如果關聯存在外鍵(Foreign Key)為非空值，必須有可以參考的主鍵(Primary Key)。因為如果外鍵存在，而無法關連到其他表格的主鍵，這個關聯存在就沒有意義。
5. 語意完整限制: 這個限制不是必須的，但是可以更完備的描述實體世界的資料。例如交易金額高於100元才可以使用信用卡付款等。

### 關聯模式的五大鍵
+ Super key 超鍵: 符合唯一性的關聯鍵。
+ Candidate Key 候選鍵: 符合唯一性以及最小性的關聯鍵。
+ Primary Key 主鍵: 從候選鍵中，挑選出其中一個關聯鍵，也就是最具識別意義的關聯鍵。
+ Alternate Key 次要鍵: 沒有被選為主鍵的其他候選鍵。
+ Foreign Key 外鍵/外部鍵: 關聯中被用來參考到其他表格主鍵的關聯鍵，就是外鍵。
---
例如學生資料表(student_id, student_no, student_name, student_depid)

|student_id|student_no|student_name|student_depid|
|----------|----------|------------|-------------|
|A123454321|00001|Rain Hu|MSE|
|A123123123|00002|Mike Hu|IM|
|A221232134|00003|Eva Hsu|ECE|
|A223124125|00004|Dudu Liu|ECE|
|A124124512|00005|Gober Wei|IT|
+ student_id表示學生身分證字號
+ student_no表示學生學號
+ student_name表示學生姓名
+ student_depid表示學生的科系代號
    + Super key 就可以是 {student_id}、{student_no}、 {student_id, student_no}、{student_id, student_name}、{student_id, student_depid} ... 等等，都符合唯一性的條件。
    + Candidate Key 就可以是 {student_id}、{student_no}，都符合唯一性及最小性的條件。
    + Primary Key 就可以從Candidate Key挑選一個，至於挑選哪一個，就看你的系統特性。如果你的學校是多學制的話，就可能不適合挑選學生身分證字號當主鍵，因為可能某個學生原本是國中部，畢業後再進入高中部，如果系統沒有考慮清楚，這個畢業後再變新生的個體，就可能出錯。
    + Alternate Key 就是沒被挑中當成Primary Key的其他Candidate Key，例如，如果挑選 {student_id}當成主鍵，Alternate Key 就是{student_no}。
    + 如果存在科系資料表 (depid, dep_name)，而且depid當成科系資料表的主鍵，學生資料表的 student_depid就是Foreign Key。

資料來源：[https://www.mysql.tw/2015/04/super-keycandidate-keyprimary.html](https://www.mysql.tw/2015/04/super-keycandidate-keyprimary.html)