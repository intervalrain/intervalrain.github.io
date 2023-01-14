---
title: "[IT] Shell 筆記" 
date: 2023-01-12T23:34:41+08:00
tags: ["IT", "Linux", "Shell"]
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
> **Reference**  
> https://blog.csdn.net/w918589859/article/details/108752592  
> https://www.w3cschool.cn/linux/linux-Shell.html  
## 一、Shell 簡介
+ 什麼是 Shell?  
Shell 是一個用 C 語言編寫的程式，它是使用者使用 Linux 的橋樑。Shell 既是一種命令語言，又是一種程式設計語言。  
Shell 是指一種應用程式，這個應用程式提供了一個界面，使用者通過這個界面訪問作業系統核心(kernel)的服務。  
+ 為什麼要學習和使用 Shell?  
Shell 屬於內建的腳本，程序開發的效率非常高，依賴於功能強大的命令可以迅速的完成開發任務(批次處理)。  
+ Shell 腳本(Shell script)  
是一種為 Shell 編寫的腳本程式。業界所說的 Shell 通常都是指 Shell 腳本。
## 二、 Shell 入門
### 1. Shell 環境
+ Shell 編程需要能編寫程式碼的**文本編輯器**和一個能解釋執行的**腳本解釋器**。  
+ 在 linux 中有很多類型的 Shell，不同的 Shell 具備不同的功能，Shell 還決定了腳本中函數的語法。  
+ Bash 是 Linux 中默認的 Shell。一般情況下，人們不區分 Bourne Shell 和 Bourne Again Shell，所以 `#!/bin/sh` 也可以被替換成 `#!/bin/bash`
+ Linux 的 Shell 種類眾多，不同的 Shell 都有自己的特點以及用途，常見的有：
    + Bourne Shell (`/usr/bin/sh` 或 `/bin/sh`)
    + Bourne Again Shell (`/bin/bash`)
    + C Shell (`/usr/bin/csh`)
    + K Shell (`/usr/bin/ksh`)
    + Shell for Root(`sbin/sh`)
    + ......

---
### 2. Bash 常用快捷鏈
|快捷鏈 |功能|
|:----:|:---|
|Ctrl+A|把游標移動到命令行開頭。
|Ctrl+E|把游標移動到命令行結尾。
|Ctrl+C|強制終止當前的命令。
|Ctrl+L|清除螢幕，等於 `clear` 指令。
|Ctrl+U|清除並剪下當前命令。
|Ctrl+K|刪除並剪下游標以後的命令。
|Ctrl+Y|貼上。
|Ctrl+R|在歷史命令中搜索，按下 Ctrl+R 之後，就會出現搜索界面，只要輸入搜索內容，就會從歷史命令中搜索。
|Ctrl+D|退出當前終端機。
|Ctrl+Z|暫停，並放入後台。
|Ctrl+S|暫停螢幕輸出。
|Ctrl+Q|恢復螢幕輸出。

---
### 3. 輸入與輸出 I/O
+ **linux 的標準輸入與輸出**
|設備|設備名|文件描述符|類型|
|:---:|:--------|:-:|----|
|鍵盤|/dev/stdin|0|標準輸入|
|顯示器|/dev/stdout|1|標準輸出|
|顯示器|/dev/stderr|2|標準錯誤輸出|

+ **輸入重定向**  
輸入重定向：是指不使用系統提供的標準輸入界面，而進行重新的指定。換言之，輸入重定向就是不使用標準輸入界面輸入文件，而是使用指定的文件作為標準輸入設備。  
(簡言之就是用 `<` 來修改標準輸入設備)
|類型|語法|功能|
|:---|:----|:---|
|標準輸入|`command < file`|命令把文件中的內容作為標準輸入設備。|
|標識限定輸入|`command << tag`|命令讀取標準輸入中的內容，直到遇到**標識符號**為止。|
|輸入輸出重定向(同時使用)|`command < file1 > file2`|命令把文件1中的內容作為標準輸入，把文件2作為標準輸出。|

+ **輸出重定向**  
輸出重定向：將輸出的文件訊息寫入到指定文件。  
`&`表示全部文件，文件不管對錯，`1`表示標準輸出文件、`2`表示標準錯誤輸出。
|類型|語法|功能|
|:---|:----|:---|
|標註輸出重定向|`command > file`|以覆蓋方式，把命令的正確輸出內容輸出到指定的文件或設備中|
|標註輸出重定向|`command >> file`|以追加方式，把命令的正確輸出內容輸出到指定的文件或設備中|
|標準錯誤輸出重重定向|`err_command 2> file`|以覆蓋方式，把命令的錯誤輸出輸出到指定的文件或設備當中|
|標準錯誤輸出重重定向|`err_command 2>> file`|以追加方式，把令命的錯誤輸出輸出到指定的文件或設備中|
|正確輸出和錯誤輸出同時保存|`command > file > 2>&1`|以覆蓋的方式，把正確輸出和錯誤輸出都保存到同一個文件|
|正確輸出和錯誤輸出同時保存|`command >> file 2>&1`|以追加方式，把正確輸出和錯誤輸出都保存到同一個文件|
|正確輸出和錯誤輸出同時保存|`command &> file`|以覆蓋的方式，把正確輸出和錯誤輸出都保存到同一個文件|
|正確輸出和錯誤輸出同時保存|`command &>> file`|以追加方式，把正確輸出和錯誤輸出都保存到同一個文件|
|正確輸出和錯誤輸出同時保存|`command >> file1 2>> file2`|把正確的輸出追加到文件1，把錯誤的輸出追加到文件2中。

+ **/dev/null**  
若希望執行某個命令，但又不希望在螢幕上顯示輸出結果，那麼可以將輸出重定向到 **/dev/null** 中。
```bash
[root@localhost ~]$ command > dev/null
```

---
### 4. 多命令順序執行
|多命令執行符|作用|格式|
|:---:|:---:|:---|
|;|命令1;命令2|多個命令順序執行，命令之間沒有任何邏輯關係。|
|&&|命令1&&命令2|當命令1正確執行，命令2才會執行；當命令1執行不正確，則命令2不會執行。|
|\|\||命令1\|\|命令2|當命令1正確執行，命令2不執行；當命令1執行不正確，則命令2才會執行。|

---
### 5. Shell 腳本(Shell script)
**撰寫腳本**
```bash
[root@localhost ~]$ vim test.sh
#!/bin/bash
echo "hello world"
```
+ `#!` 是一個約定的標記，它告訴系統這個腳本需要什麼解釋器來執行，即使用哪一種 Shell。  
+ `echo` 命令用於向 Console 輸出文本。  
+ `file.sh` **.sh**是linux下 bash Shell 的預設副檔名  

**執行方法**
1. 增加執行權限
```bash
[root@localhost ~]$ chmod u+x test.sh       // 對所有user增加對當前目錄下的test.sh文件的執行權限
[root@localhost ~]$ ./test.sh
```
+ `chmod`: change the permissions mode of a file
+ `u`: user
+ `+x`: 增加執行權限

2. 通過 bash 調用執行腳本
```bash
[root@localhost ~]$ bash test.sh
```

---
## 三、 Shell 變數
### 1. 變數的命名規則
+ 首個字元必須為英文字母 (a-z，A-Z)
+ 中間不能有空格，可以用底線(_)取代。
+ 不能使用標點符號。
+ 不能使用關鍵字(可用 help 查看保留關鍵字)。
+ **環境變數習慣大寫，便於區分。**
```bash
[root@localhost ~]$ test=123
[root@localhost ~]$ test="$test"456
[root@localhost ~]$ echo $test
123456
[root@localhost ~]$ test=${test}789
[root@localhost ~]$ echo $test
123456789
```

**Shell 中的特殊符號**
|符號|作用|
|---|---|
|''|在單引號中所有字元都是普通字元，照原樣輸出。|
|""|在雙引號中只有 $ 與 ` 和 \ 是有特殊含義，分別是**調用變數**、**引用命令**和**轉義**。|
|\`\`|在反引號中的內容是系統命令，在 Bash 中會先執行，與 () 作用一樣，但不推薦使用。|
|$()|和反引號作用相同，用來引用系統命令。|
|()|用於一串命令執行時，() 中的命令會在子 Shell 中運行。|
|{}|用於一串命令執行時，{} 中的命令會在當前 Shell 中執行。也可以用於變數變形與替換。|
|[]|用於變數的測試。|
|#|用於注釋。|
|$|用於調用變數的值。|
|\ |用於轉義。|
### 2. 變數的分類
#### 2.1 自定義變數
#### 2.2 環境變數
#### 2.3 位置參數變數
#### 2.4 都定義變數
### 3. 唯讀變量
### 4. 可寫變量
## 四、 Shell 運算子
### 1. 算數運算子
### 2. 關係運算子
### 3. 邏輯運算子
### 4. 字串運算子
### 5. 文件測試運算子
## 五、流程控制
### 1. if 條件判斷
### 2. 多分支 case 條件語句
### 3. for 循環
### 4. while 循環
### 5. until 循環
### 6. 函數
### 7. 特殊流程控制語句
#### 7.1 exit
#### 7.2 break
#### 7.3 continue
## 六、字串截取、替換和處理
### 正則表達式
### 1. 字串截取、替換
#### 1.1 cut 列提取命令
#### 1.2 awk 編程
#### 1.3 sed 文本選取、替換、刪除、新增的令命
### 2. 字串處理
#### 2.1 sort 排序命令
#### 2.2 uniq 取消重複行
#### 2.3 wc 統計命令
