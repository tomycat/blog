---
layout: default
tags : clojure
comments : true
title : 学习 clojure 3 ：《Clojure程序设计》 Clojure 编程入门 - 在 repl 中测试代码
---

### 继续探索 repl

```
; CIDER 0.7.0alpha (package: 20140711.835) (Java 1.7.0_55, Clojure 1.5.1, nREPL 0.2.3, cider-nrepl 0.7.0-snapshot)
user> (defn hello [name] 
        (str "Hello, " name)) ;; str 将列表转为字符串
#'user/hello
user> (hello "tom")
"Hello, tom"
user> *1 ; *1 *2 *3 分别存储了 repl 的最近3次求职
"Hello, tom"
user> (/ 1 0) ;; 0 是不能作为分母的，会报错
ArithmeticException Divide by zero  clojure.lang.Numbers.divide (Numbers.java:156)
user> ;; *e 存储了最后一个异常的的信息
user> *e
#<ArithmeticException java.lang.ArithmeticException: Divide by zero>
user> (pst) ;; print stacktrace 得到堆栈信息 
CompilerException java.lang.RuntimeException: Unable to resolve symbol: pst in this context, compiling:(/private/var/folders/nt/gkh1mbhn4pncwb79gmrfr9740000gn/T/form-init5253497584462403679.clj:1:1) 

user> ;; 额，好像 pst 这个函数不存在了：1.3.0 之后，pst 放到 clojure.repl/pst 了，需要引入 (use 'clojure.repl)，见后面

user> (load-file "tmp.clj") ;; 加载 tmp.clj ，里面的定义会导入 到 user 命名空间下来 : (def a 1)
#'user/a
user> a ;;
1
```

### 查找文档

```
user> (use '[clojure.repl :only (doc)]) ;; 从 coljure.repl 中导入 doc 

nil
user> (doc str)                         ;; 使用 doc 来查找函数的文档
-------------------------
clojure.core/str
([] [x] [x & ys])
  With no args, returns the empty string. With one arg x, returns
  x.toString().  (str nil) returns the empty string. With more than
  one arg, returns the concatenation of the str values of the args.
nil

user> (use '[clojure.repl :only (find-doc)])
nil
user> (find-doc "reduce") ;; 在导入一个 find-doc 函数，支持正则或者字符串查找
-------------------------
clojure.core/areduce
([a idx ret init expr])
Macro
  Reduces an expression across an array a, using an index named idx,
  and return value named ret, initialized to init, setting ret to the 
  evaluation of expr at each step, returning ret.
-------------------------
clojure.core/reduce
([f coll] [f val coll])
  f should be a function of 2 arguments. If val is not supplied,
  returns the result of applying f to the first 2 items in coll, then
...
```



### 查看函数源码

```
user> (use '[clojure.repl :only (source)])
nil
user> (source identity)
(defn identity
  "Returns its argument."
  {:added "1.0"
   :static true}
  [x] x)
nil
```

### 修改用户配置文件，引入常用的工具函数

像上面的 `doc` 、`find` 等函数需要 `use` 才能使用，为方便起见，可以在repl启动时，就载入，只需在 `~/.lein/user.clj`  添加

```
;; 1.3.0 之后，将 doc source 等放到了 clojure.repl 中，可以在启动 repl时导入
(if (>= (.compareTo (clojure-version) "1.3.0") 0)
  (do (use 'clojure.repl)
      (use 'clojure.java.javadoc)))
```

这样，每次启动 repl 都能直接使用这些函数了
