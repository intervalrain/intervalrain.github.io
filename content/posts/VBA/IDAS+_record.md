---
title: "[IDAS+] Optimize Summary Table Function"
date: 2022-04-14T00:39:50+08:00
tags: ["VBA", "Programming", "IDAS+"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "An implementation of dictionary in VBA for searching algorithm"
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
+ 在做 WAT 量測後的資料處理時，IDAS 老舊的 VBA macro 執行時間實在過於久，且佔用大量的記憶體，於是就下了一個命題，想減少產生報表的時間。
# 想法
+ 通常量測多片 wafer 的狀況下，不同 wafer 的排列順序是一致的，如果可以加入 Java 中 `HashMap` 的資料結構來處理 VBA 中 `Lookup()`，便可大幅減少 summary table 時，對 rawdata 做搜尋的時間。
+ 令時間複雜度從\\(O(n)\\)進步到\\(O(1)\\)。  
# 做法
## 產生 Dictionary 物件
+ 由於 VBA 預設並沒有 Dictionary 的物，所以需要用 `CreateObject("Scritping.Dictionary")` 的程式碼，引入 Dictionary。
+ 其 Dictionary 物件的 method 可參考 Microsoft 的文件：[點此](https://docs.microsoft.com/zh-tw/office/vba/language/reference/user-interface-help/dictionary-object)
+ 在此先預先定義一個 function `setDict()` 可以對初始化 Dictionary。
+ 接著宣告兩個 Dictionary 物件來存取 spec 和 data 工作頁的列數(row)。
```VB.NET
Dim SpecDict As Object ' Claim a dict to store spec rows in worksheet SPEC.
Dim DataDict As Object ' Claim a dict to store rawdata rows in worksheet Data.

Set SpecDict = CreateObject("Scripting.Dictionary")
Set DataDict = CreateObject("Scripting.Dictionary")

Call setDict("SPEC", 3, SpecDict, Worksheets("SPEC").UsedRange, True)
Call setDict("Data", 2, DataDict, Range(Worksheets("Data").Names(1)), True)
```
## 實作 setDict() 函數
+ 利用 HashTable 的概念對不同的 parameter 列數先做一次記錄，因為只需一次迴圈，故時間複雜度是 \\(O(n)\\)，其中 n = SPEC 的列數 或是 量測的 parameter 數。
+ 在此設計了五個 arguments，方便在未來如果還有使用到 Dictionary 的需求時，可以方便使用。
    + `sheetName` 字串，需要作儲存的工作頁(worksheet)。
    + `Target` 要儲存的列數(row)或欄數(column)。
    + `Dict` 要存放的 Dictionary 物件。
    + `mRange` 要做儲存的資料範圍，若表頭並是在第一列或第一欄時可指定。
        + 若表頭是第一列或第一欄時，可直接代入 `Worksheets("工作頁名稱").UsedRange`
    + `byRows` 看要儲存的對象是列(row)或是欄(column)，預設是以列來搜尋。
```VB.NET
Public Function setDict(ByVal sheetName As String, ByVal Target As Integer, ByRef Dict As Object, ByVal mRange As Range, Optional ByVal byRows As Boolean = True)
    
    Dim nowSheet As Worksheet
    If Not IsExistSheet(sheetName) Then Exit Function
    Set nowSheet = Worksheets(sheetName)
    
    Dim i As Long
    Dim n As Long

    On Error Resume Next
    
    If byRows = True Then
        For i = 1 To mRange.Rows.Count
            If Not Trim(mRange.Cells(i, Target).Value) = "" Then
                Dict.Add mRange.Cells(i, Target).Value, i
            End If
        Next i
    Else
        For i = 1 To mRange.Columns.Count
            If Not Trim(mRange.Cells(Target, i).Value) = "" Then
                Dict.Add mRange.Cells(Target, i).Value, i
            End If
        Next i
    End If
    
End Function
```

## 對 getSPECByPara() 做重製
+ 將 parameter or SPEC 做 hashing 的處理後，可以用 Dictionary 物件來查值，時間複雜度為 \\(O(1)\\)。  
+ 在此不對原本的設計做更動，只做單純的 implement。
    + `nowPara` 要搜尋的 parameter 字串。
    + `n` 要搜尋的欄數(column)，specColumn是原作者預設的 enum，存放工作頁 SPEC 的每一欄的表頭。
    + `sheetName` 要搜尋的工作頁，預設為 SPECTEMP，是按完 initial，從 SPEC 工作頁複製出來的隱藏工作頁。
    
```VB.NET
Public Function getSPECByPara(ByVal nowPara As String, ByVal n As specColumn, Optional sheetName As String = "SPECTEMP")

    Dim reValue
    Dim nowRange As Range
    Dim TargetSheet As Worksheet
   
    If Left(nowPara, 1) = "'" Then nowPara = Mid(nowPara, 2)
   
    Set TargetSheet = Worksheets(sheetName)
    Set nowRange = TargetSheet.UsedRange
    On Error Resume Next
    reValue = TargetSheet.Cells(SpecDict(nowPara), n)
    If Not IsEmpty(reValue) Then
        If Trim(reValue) = "" Then Set reValue = Nothing
    End If
    getSPECByPara = reValue
End Function
```

## 對 getRangeByPara() 做重製
+ 將 parameter or SPEC 做 hashing 的處理後，可以用 Dictionary 物件來查值，時間複雜度為 \\(O(1)\\)。  
```VB.NET
Public Function getRangeByPara(nowWafer As String, nowPara As String, Optional dieNum As Integer = 0)
    Dim nowRow As Long
    Dim nowRange As Range
   
    Set nowRange = Worksheets("Data").Range("wafer_" & nowWafer)
    Set getRangeByPara = Nothing
    
    If DataDict.Exists(nowPara) Then
        nowRow = DataDict(nowPara)
        Set getRangeByPara = nowRange.Range(N2L(4) & CStr(nowRow) & ":" & N2L(dieNum + 3) & CStr(nowRow))
    End If
    
End Function
```
# 解析
+ 優點：較快的執行速度。經測試可以將 2~3 分鐘的執行時間縮短到 30 秒內。
+ 缺點：若修改 rawdata，會發生錯誤。但若針對每一片 wafer 都做 setDict()的話，會浪費太多 memory。
