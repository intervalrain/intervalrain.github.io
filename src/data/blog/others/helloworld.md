---
title: "Hello World"
author: "Rain Hu"
pubDatetime: 2019-05-28T15:15:36+08:00
description: "How to hello world?"
tags: ["hello-world", "programming-languages", "beginner"]
---

How to say hello to the world?

### Java
```java
class Hello{
    public static void main(String[] args){
        System.out.println("Hello World!");
    }
}
```

### C
```c
#include <stdio.h>

int main(){
    printf("Hello World!");
    return 0;
}
```

### C++
```cpp
#include <iostream>

int main(){
    std::cout << "Hello World!" << std::endl;
    return 0;
}
```

###C#
```csharp
namespace HelloWorld{
    class Hello{
        static void Main(String[] args){
            System.Console.WriteLine("Hello World!");
        }
    }
}
```

### Python
```Python3
print("Hello World!")
```

### Ruby
```Ruby
puts 'Hello World!'
```

### TCL Language
```tcl
puts "Hello World!"
```

### JavaScript
```Java Srcipt
console.log("Hello World!");
```

### TypeScript
```
console.log 'Hello World!'
```
### Perl
```Perl
print "Hello World!";
```

### R
```R
cat('Hello World!');
```

### Swift
```Swift
println('Hello World!');
```

### Kotlin
```Kotlin
fun main(args: Array<String>){
    println("Hello World!")
}
```

### Go
```Go
println('Hello World!');
```

### PHP
```PHP
echo "Hello World!";
```

### VBA
```Shell
msgbox "Hello World"
```

### Assembly Language
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