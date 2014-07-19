---
layout: default
tags : clojure
comments : true
title : 学习 clojure 2 ： 《Clojure程序设计》 Clojure 简介
---

<blockquote>Clojure 是一种基于 Java 虚拟机 （Java Virtual Machine）的动态编程语言，支持函数式编程，简化并发编程，能调用 Java 程序</blockquote>

什么函数式编程？程序的功能单位是无副作用的函数，输入确定，输出就确定，就像数学上的函数一样。

相对传统的面向对象方式——复杂的对象关系图，基于状态变量，函数式编程提供了另外一种解决问题的思路。

### 示例：使用 `use` 和 `require` 引入非核心库

```
; CIDER 0.7.0alpha (package: 20140711.835) (Java 1.7.0_55, Clojure 1.5.1, nREPL 0.2.3, cider-nrepl 0.7.0-snapshot)
user> (use '[clojure.java.io :only (file)])
nil
user> (file "README.md")
#<File README.md>
user> (require '[clojure.java.io :as io])
nil
user> (io/file "README.md")
#<File README.md>
user> ;; user> 标明了当前所在的 Clojure 名字空间
```

### 示例：短小简洁的函数式风格代码

一个判断是否是空字符串的函数

**用Java 来写：**


```
public class StringUtils {
  public static boolean isBlank(String str){
    int strLen;
    if(str == null || (strLen = str.length()) == 0){
      return true;
    }
    for(int i = 0;i < strLen;i++){
      if((Character.isWhiespace(str.charAt(i)) == false)){
        return false;
      }
    }
    return true;
  }
}
```

**用Clojure 来写：**

```
(defn blank? [str]
  (every? #(Character/isWhitespace %) str))
```

短小多了吧！

值得的注意的是，Clojure版本的代码，噪音非常低，而Java的看起来很啰嗦，使用了更多的语法关键词，如 `public` , `class` , `boolean` 等

与 Java 等其它 C 系的语言不同，Clojure 中 `?` 也是可以作为函数名字的，Lisp系的语法关键词要少，因此显得简单优雅，这种简单优雅，是因为 Lisp 语言的构成单位括号表达式所带来的，括号表达式对与很多人来说显得很怪异，不过习惯了，就会喜欢上括号表示的，特别是Emacs对括号表达式的支持非常好，有一个 `par-mode ` 可以对括号表达式，进行非常快速高效的编辑变换。

上面 Clojure 代码中的的 every? 是接受两个参数，一个函数 `f` `#(Character/isWhitespace %)` 和一个 `c` - `collection` 做为参数，注意，以函数为参数是函数式语言的特性，函数是可以参数传递的。对于`collection`中的元素，本例中即是`str` ，`f` 作用于 `c` 的每一个元素，都返回为真的话，那么 `every?` 也返回为真。



### 示例：`defrecord`

#### 创建 `records`

```
user> (defrecord Person [first-name last-name])
user.Person
user> (def foo (->Person "Jinwei" "Tang"))
#'user/foo
user> foo
#user.Person{:first-name "Jinwei", :last-name "Tang"}
user> (:first-name foo) ;; 访问
"Jinwei"
user> (:last-name foo)
"Tang"
```

records 不可改变，records are immutable，但是可以通过 `assoc` 或者 `merge` 从原有的 records 创建新的 records

```
user> (assoc foo :sex "male")
#user.Person{:first-name "Jinwei", :last-name "Tang", :sex "male"}
user> foo                       ;; 原来的 foo 不变
#user.Person{:first-name "Jinwei", :last-name "Tang"}
user> (merge foo {:sex "male"}) ;; 也可以使用 merge 创建新的 records
#user.Person{:first-name "Jinwei", :last-name "Tang", :sex "male"}
```

#### 创建带默认值的 `record` [1]

(defrecord Foo [a b c])

(defn make-foo
  [& {:keys [a b c] :or {a 5 c 7}}]
  (Foo. a b c))

(make-foo :b 6)
(make-foo :b 6 :a 8)

#### 什么时候使用 record 

很多时候，`maps` 和 `structs` 即可完成大部分工作，可为什么还要使用 `record` 呢？ [这里](http://stackoverflow.com/questions/4575170/where-should-i-use-defrecord-in-clojure) 有介绍.

`records` 就是 Java class instances (not Clojure maps)，具有更好的性能。

### Clojure 的一些特性

1. 参数的容器是一个向量 `[]` ，而不是列表 `()`

   ```
   (defn hello-world [user]
     (println (format "Hello, %s" user)))
   ```
2. 相比Common Lisp简少了括号
   Common Lisp
   ```
   (cond ((= x 10) "equal")
          ((> x 10) "more"))
   ```
   Clojure 
   ```
   (cond (= x 10) "equal"
         (> x 10) "more")
   ```
### Clojure 中的并发编程示例：`dosync` 

```
user> (def accounts (ref #{}))
#'user/accounts
user> (defrecord Account [id balance])
user.Account
user> (dosync 
       (alter accounts conj (Account. "CLJ" 1000.00)))
#{#user.Account{:id "CLJ", :balance 1000.0}}
```

`ref` 创建了一个引用，`dosync` 开启了一个事务，事务能不用Java的锁定机制来更新 **可变数据** 。事务使用了 (STM, software transactional memory) 来支持并发。

**什么是 STM 呢？**

<blockquote>
Software Transactional Memory (STM) is a concurrency control technique
analogous to database transactions for controlling access to shared
memory in concurrent computing. It is an alternative to lock based synchronization.
</blockquote>

STM 通过过 `ref` and `dosync` 来构建。如上面的例子所示。

上面的示例，可能不是特别好，可以看参考 [2] 的银行转账的示例 

### 直接访问 Java API 

### 访问 JavaAPI
```
user> System
java.lang.System
user> (System/getProperties)
{"java.runtime.name" "Java(TM) SE Runtime Environment", "sun...
...many more...
```

### Clojure 为访问 JavaAPI 提供了语法糖

在 Java 中的方式：
```
"hello".getClass().getProtectionDomain()
```

Clojure 语法糖访问：

```
user> (.. "hello" getClass getProtectionDomain)

#<ProtectionDomain ProtectionDomain  null
 null
 <no principals>
 java.security.Permissions@7e8027cd (
 ("java.security.AllPermission" "<all permissions>" "<all actions>")
)
```

### Clojure 实现 Java 接口

Clojure 提供了简单的函数用于实现 Java 接口，以及从 Java 基类派生。Clojure 的所有函数都实现了 Callable 和 Runnable 接口，下面使用匿名函数创建 Java 线程：

```
user> (.run (new Thread (fn [] (println "Hello" (Thread/currentThread)))))
Hello #<Thread Thread[nREPL-worker-15,5,main]>
nil
```


### REF

[1] http://stackoverflow.com/questions/5634188/how-to-set-default-values-for-fields-in-records-in-clojure

[2] http://sw1nn.com/blog/2012/04/11/clojure-stm-what-why-how/
