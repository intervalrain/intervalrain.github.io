---
title: "[Java] transient 關鍵字"
date: 2022-03-08T23:53:27+08:00
tags: ["Java", "Programming"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily
description: "Introduction to keyword transient" 
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
# 1. transient 的作用及使用方法
+ 當一個物件繼承(implements)了 Serializable 介面，這個物件就可以被序列化，Java 的序列化模式為開發者提供了許多便利，開發者可以不必關心具體序列化的過程，只要繼承了 Serializable 介面，該類別(class)的所有屬性(property)和方法(method)都會自動序列化。
+ 然而在實際開發過程中，有些屬性需要序列化，有些屬性則不需要。
  + 用戶的私密訊息如密碼、銀行帳號等，通常不希望在網路操作時被傳輸。
+ 此時，便可在這些對應的變數前加上 transient。
+ 如此一來，這些私密訊息的生命週期只會存在於調用者的記憶體(memory)中，不會寫到磁碟(disk)裡。
> 注意讀取時，讀取數據的順序一定要和存放數據的順序保持一致。
+ 範例：
```Java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class TransientExample {
    public static void main(String[] args){
        User user = new User();
        user.setUsername("Rain");
        user.setPassword("12345678");

        System.out.println("Read before Serializable: ");
        System.out.println("Username: " + user.getUsername());
        System.out.println("Password: " + user.getPassword());

        try {
            ObjectOutput os = new ObjectOutputStream(new FileOutputStream("/Users/rainhu/workspace/algo/temp/user.txt"));
            os.writeObject(user);
            os.flush();
            os.close();
        } catch (FileNotFoundException e){
            e.printStackTrace();
        } catch (IOException e){
            e.printStackTrace();
        }
        try {
            ObjectInputStream is = new ObjectInputStream(new FileInputStream("/Users/rainhu/workspace/algo/temp/user.txt"));
            user = (User) is.readObject();
            is.close();

            System.out.println("Read after Serializable: ");
            System.out.println("Username: " + user.getUsername());
            System.out.println("Password: " + user.getPassword());
        } catch (FileNotFoundException e){
            e.printStackTrace();
        } catch (IOException e){
            e.printStackTrace();
        } catch (ClassNotFoundException e){
            e.printStackTrace();
        }
    }
}

class User implements Serializable{
    private static final long serialVersionID = 8294180014912103005L;
    
    private String username;
    private transient String password;

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return password;
    }
    
    public void setPassword(String password){
        this.password = password;
    }
}
```
+ 輸出的結果是：
> Read before Serializable:   
> Username: Rain  
> Password: 12345678  
> Read after Serializable:   
> Username: Rain  
> Password: null
+ 也就是說反序列化並沒有成功從文件獲取到訊息。
# 2. transient 的小結
1. 一旦變數被 transient 修飾，變數將不再是物件持久化的一部分，該變敗內容將在序列化後無法再次訪問。
2. transient 關鍵字只能飾飾變數(variable)，不能修飾方法(method)和類別(class)。注意，區域變數是無法被 transient 修飾的。
3. 被 transient 修飾的變數不能再被序列化，一個靜態變數不管是否被 transient 修飾，都不能被序列化。
+ 其中，在上例中的 username 帶有 static 關鍵字，實際上是沒有被序列化的，也就是說我們在讀取之前改變 username 的值，讀取完並不會改變 username 的值，而是 JVM 中對應靜態變數的值。

# 3. 當遇上了 Externalizable
+ 當被 transient 修飾的變數在存於一個繼承了 Externalizable 的介面，則代表沒有任何東西被自動序列化。
+ 需要在 `writeExternal`方法中手工指定所要序列化的變數，這與是否被 transient 修飾無關。