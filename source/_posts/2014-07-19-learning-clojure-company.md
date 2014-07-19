---
layout: default
tags : clojure
comments : true
title : Clojure 的发展情况
---


<blockquote>Clojure 是 Lisp 对 JVM 的抱大腿行为</blockquote>

我猜，由于 Clojure 是 Lisp 方言的原因，在国内，Clojure 的使用真的很少很少，[cn-clojure](https://groups.google.com/forum/#!forum/cn-clojure) 这个国内的 Clojure 用户组的人气也不高。

于是，我提了一个问题， [Clojure的发展情况如何？](https://groups.google.com/forum/#!topic/cn-clojure/V03N0qJQ6_w) ，也做了些查询，汇总下信息

### 国内使用 Clojure 的公司

1. 一个比较大的公司是 [AVOS](https://www.avoscloud.com/)  ，是前 Youtube 创始人的公司，后端基本都是用 Clojure 来写的。
2. [中瑞财富](https://www.zrcaifu.com/)  p2p 互联网金融项目
3. [百思](http://rd.kuaijianli.com/u102510) 一个社交网站数据分析的公司
4. 深圳风林火山 - 一家游戏公司：深圳风林火山，游戏产品黄金岛牌类游戏，目前使用 Clojure 作为主力服 务器开发语言。我们目前使用的 Clojure 技术都在刀锋上，非常前卫。使用 ClojureScript 和 Clojure 结合的开发框架目前正在产品化中，其中使用到的 ClojureScript 和 One 的新特性由 Clojure Core 团队开发，使用 Datomic 数据库。 我们的项目在第一次 ClojureConj 大会上作为 Aaron Bedra 介绍的 Clojure in the Field (Clojure 用于实战)的重要项目介绍。
5. [直播贴](http://zbdang.com/) 一家八卦网站，也 [正在招人](https://groups.google.com/forum/#!searchin/cn-clojure/%E6%8B%9B%E8%81%98/cn-clojure/c7GU9Q9X6ck/ADNvCr-X_pMJ)


### 金融系统

Clojure 的很多代码都是银行的业务作为例子，比如下面这个，所以以为会有比较多的金融行业应用，但是实际上没看到。。。

```
(def account1 (ref 100))
(def account2 (ref 0))

;; ; to read the current value of a ref, use (deref refname):
;; ;=> (deref account1)
;; 100
;; ;=> @account1 ; @refname is equivalent to (deref refname)
;; 100

(defn transfer [amount from to]
  (dosync
   (alter from - amount)   ; alter from => (- @from amount)
   (alter to   + amount))) ; alter to   => (+ @to amount)

;; ;=> @account1
;; 100
;; ;=> @account2
;; 0
;; ;=> (transfer 100 account1 account2)
;; 100
;; ;=> @account1
;; 0
;; ;=> @account2
;; 100
```
这个例子中，应用了 Clojure 的 STM 机制保证转账操作能都完毕，参见 [1]

```
(alter from - amount)
(alter to   + amount)
```

搜索了下国外的情况，其实应用也不多，有 citi （花旗银行）、 UBS （瑞士联合银行） ，但是好像实际用的也不多。有一段评价[2]：

<blockquote>
Based on my own experience and conversations with others who work in the City, there’s a small but increasing move towards functional languages. I have to say that by far the most common I’ve heard of are Scala or F#, with ML and Clojure far behind.
</blockquote>

也就是说金融行业虽然也在往函数式语言靠，但是F# 和 Scala 的使用更广泛，远高于 ML 和 Clojure 这样的语言。

### Clojure 语言本身的发展情况

1. 特性变化还是挺多的，版本更新时，有 core.* 下面的更新
2. 库变更也比较频繁：我目前借的两本书，《Clojure 编程》 和 《Clojure 程序设计》，内容都稍微有点过时，导致有些例子不能运行
3. 语法发展也可以看下 [这个帖子](https://groups.google.com/forum/#!topic/cn-clojure/V03N0qJQ6_w) ，dennis zhuang 的回复，他本人就是在 AVOS 工作


#### REFS
[1] http://chaifeng.com/clojure-stm-what-why-how/

[2] http://mdavey.wordpress.com/2013/05/24/clojure-in-finance/ 的评论
