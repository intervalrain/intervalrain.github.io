---
title: "First Blog"
date: 2022-02-17T15:15:36+08:00
---

Here is how tow print "hello world" in different programming languages:

- Java
```Java
class Hello{
    public static void main(String[] args){
        System.out.println("Hello World!");
    }
}
```

- C
```C
#include <stdio.h>

int main(){
    printf("Hello World!");
    return 0;
}
```

- C++
```C++
#include <iostream>

int main(){
    std::cout << "Hello World!" << std::endl;
    return 0;
}
```

- C#
```C#
namespace HelloWorld{
    class Hello{
        static void Main(String[] args){
            System.Console.WriteLine("Hello World!");
        }
    }
}
```

- Python
```Python3
print("Hello World!")
```

- Ruby
```Ruby
puts 'Hello World!'
```

- TCL Language
```TCL
puts "Hello World!"
```

- JavaScript
```Java Srcipt
console.log("Hello World!");
```

- TypeScript
```
console.log 'Hello World!'
```
- Perl
```Perl
print "Hello World!";
```

- R
```R
cat('Hello World!');
```

- Swift
```Swift
println('Hello World!');
```

- Kotlin
```Kotlin
fun main(args: Array<String>){
    println("Hello World!")
}
```

- Go
```Go
println('Hello World!');
```

- PHP
```PHP
echo "Hello World!";
```

- VBA
```Visual Basic
msgbox "Hello World"
```

- Assembly Language
```Assembly Language
    global _main
    extern _printf

    section .text
_main:
    push message
    call _printf
    add   esp, 4
message:
    db    'Hello World!', 11, 0
```

