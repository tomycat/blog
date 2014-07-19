---
layout: default
tags : clojure
comments : true
title : 学习 clojure 1：缘起
---

想学 clojure 是因为看到一篇 blog ，在 pc 上支持 600k 的并发，太疯狂了，比 Node.js
的 250k 两倍还多，于是就心痒痒。并且 clojure 是 lisp 的方言，已知对 lisp 很有兴趣，
但是好像它被一些人人视为「玩具」——除非你特别牛，用它是找不到工作的。而clojure和
Java一样，是基于JVM的语言，所以它可以真的投入使用，比如 Storm 就是 clojure 的应用。

1. clojure 的高并发能力
   - 因为它是 lock-free 的 [5]

2. Mac 下安装lein 
   在已经有 Java 环境的情况下，安装非常简单：
   
   ```
   brew install leiningen
   ```
   
   然后执行下面的命令，开启 repl
   
   ```
   lein repl
   ```

3. 环境搭建：Emacs+cider [4]
   - M-x package-install [RET] cider [RET]
   - 使用 lein 创建一个项目
     lein new demo

     ![0.png](/blog/images/2014-07-14-learning-clure-1/0.png)

     ![1.png](/blog/images/2014-07-14-learning-clure-1/1.png)

     ![2.png](/blog/images/2014-07-14-learning-clure-1/2.png)

   - 用 Emacs 打开 demo/src/demo/core.clj，执行 M-x cider-jack-in （或使用快捷键 C-c M-j ）开启 nREPL server 以及 Emacs client ，这样就可以在 Emacs 中和后台的 server 交互了
     如果出现如下的报错：ider-jack-in can't find cider-nrepl
      
     添加一个文件 ~/.lein/profiles.clj

     ```
       {:user {:plugins [[cider/cider-nrepl "0.7.0-SNAPSHOT"]]}}
     ```

   - 在编辑器中测试代码：在 demo/src/demo/core.clj 里面
     - C-x C-e 移动光标到s-exp括号后面，就是是执行这个表达式
     - 注意在执行 (foo "hello") 之前，要执行前面的两个表达式

       ![3.png](/blog/images/2014-07-14-learning-clure-1/3.png)

   - 在repl中执行代码

     ![4.png](/blog/images/2014-07-14-learning-clure-1/4.png)

   - 使用 lein 在 termial 中执行代码 

     ![5.png](/blog/images/2014-07-14-learning-clure-1/5.png)
    
     可以看到，缺少 main 函数，修改下代码

     ![6.png](/blog/images/2014-07-14-learning-clure-1/6.png)
      
     也可以指定为其它的函数为入口函数

     ![7.png](/blog/images/2014-07-14-learning-clure-1/7.png)

   - project.clj 的所有配置项目见 https://github.com/technomancy/leiningen/blob/stable/sample.project.clj
   - Emacs 的快捷键见 https://github.com/clojure-emacs/cider cider-mode Keyboard shortcut

4. 学习 learning 需要 Java 的经验吗？[1]
   - clojure 是lisp的方言，和Java很不相同，所以从语言角度来说，不需要
   - 使用已经存在的Java API，那必须还是要和Java打交道

     You don't need to write any Java code to use Java APIs from Clojure, but you do need to know enough Java (method signatures, data types etc.) to be able to read the JavaDoc documentation of the APIs and convert this into an appropriate Clojure function call. Often, this is as simple as (.someJavaMethod someJavaObject param1 param2) but sometimes it can be more complex (e.g. when you need to instantiate a subclass of some Java class to pass as a parameter)

   - clojure 是最终会编译为JVM字节码，所以精通Java，应该是有好处的

5. 在哪里寻找第三方的库？
   - clojure-contrib [8] 
   - leiningen [9]

6. clojure 的中小项目[2]
   - cow-blog [7]
   - 使用 lein 构建一个web应用 guest-book

7. 甚至有一个 clojure-android 的项目，可以让你在 android 上使用 clojure [6]
   
   但是这时一个 hobby project ，性能很成问题

### Footnotes

[1] http://stackoverflow.com/questions/5721496/learning-java-so-i-can-get-at-clojure

[2] http://stackoverflow.com/questions/329221/medium-size-clojure-sample-application

[3] http://dev.clojure.org/display/community/Clojure%2BSuccess%2BStories

[4] https://github.com/clojure-emacs/cider
    
[5] http://stackoverflow.com/questions/11031886/is-clojure-lockfree-by-using-lockfree-algorithms

[6] http://clojure-android.info/

[7] https://github.com/briancarper/cow-blog

[8] http://github.com/richhickey/clojure-contrib

[9] http://zef.me/2470/building-clojure-projects-with-leiningen

