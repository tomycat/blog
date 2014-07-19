---
layout: default
comments : true
tags :
- javascript
codesyntax : true
title : 前端模板引擎Temple简介
---

### Features
- 语法继承自KISSY 1.2 Template ,不过少了个花括号
- 编译后的代码非常直观 [Temple编译后的代码](http://tomycat.github.io/blog/temple/index.html) 
- 基本的 if/elseif/else each
- include 子模板
- extend 模板继承
- if(exp) exp可以为复杂表达式
- 模板允许使用自定义函数

### Getting Started

<pre><code class="javascript">KISSY.use('gallery/temple/1.0/index', function (S, Temple) {
     Temple.add("base","this is head , my sex is {#block name} female {/block}!");
     var temple = Temple.compile('{#extend base} {#block name} {sex} {/block}');
	 var html = temple.render({"sex":"male"});
	 console.log(html);
})</code></pre>

### API
- `Temple.compile` 将模板编译为可以直接执行的js函数，返回的对象具有render方法
- `Temple.to_js` 将模板编译为js代码字符串,用于调试或者预编译

### 语法示例

#### expression and variable
<pre><code class="javascript">
var s = '{#if (a+(b-c*d/(ef%3)))}'
          + 'blah blah {lib}'
      + '{/if}';
var temple = Temple.compile(s);

temple.render({a:1,b:2,c:3,d:4,ef:5,lib:"KISSY"});
// => "blah blah KISSY"
</code></pre>

#### if
<pre><code class="javascript">
var template = '{#if name}'
				 + 'hi {name}'
			 + '{/if}'

var temple = Temple.compile(template);
temple.render({name:"tom"});
// -> tom
</code></pre>

#### if/else
<pre><code class="javascript">
var template;
template = '{#if name}'
			 + '{name}'
		 + '{#else}'
			 + 'noname'
		 + '{/if}'
var temple = Temple.compile(template);
template.render({name:"tom"});
</code></pre>

#### if/elseif/else
<pre><code class="javascript">
template = '{#if name}'
			 + '{name}'
		 + '{#elseif sex}'
			 + '{sex}'
		 + '{#else}'
		   + 'oops'
		 + '{/if}'
var temple = Temple.compile(template);
temple.render({name:"tom"});
// => tom
</code></pre>

#### each
<pre><code class="javascript">
 var template =  '{#each items as item index}'
				   + '{index} : {item.name}'
			   + '{/each}';
 
var temple = Temple.compile(template);

temple.render({items:[{name:"john"}]});
// => "0 : john"
</code></pre>

#### include
<pre><code class="javascript">
Temple.add("head","&lt;h1&gt;共用头&lt;/h1&gt;");
Temple.add("foot","&lt;h1&gt;共用脚&lt;/h1");

var template = '{#include head}'
             + '&lt;p&gt;身体是你自己的&lt;/p&gt;'
             + '{#include foot}';
var temple = Temple.compile(template);
temple.render();
// =&gt; "&lt;h1&gt;共用头&lt;/h1&gt;&lt;p&gt;身体是你自己的&lt;/p&gt;&lt;h1&gt;共用脚&lt;/h1"
</code></pre>

#### extend
<pre><code class="javascript">
Temple.add("base","&lt;h1&gt;共用头&lt;/h1&gt;"
                  + "{#block body}"
                    + "&lt;p&gt;大家都公用的身体&lt;/p&gt;"
                  + "{/block}"
                + "&lt;h1&gt;共用脚&lt;/h1&gt;");

var app = '{#extend base}'
        + '{#block body}'
        + '&lt;p&gt;你自己的身体&lt;/p&gt;'
        + '{/block}';

var temple;
temple = Temple.compile(app);
temple.render();
// =&gt; "&lt;h1&gt;共用头&lt;/h1&gt;&lt;p&gt;你自己的身体&lt;/p&gt;&lt;h1&gt;共用脚&lt;/h1&gt;"
</code></pre>

#### custom function 
<pre><code class="javascript">
Temple.reg("myescape",function(s){
  return escape(s);
});
var temple  = Temple.compile('{myescape(htmlstr)}');
temple.render({htmlstr:"&lt;p&gt;foo&lt;/p&gt;"});
// => "%3Cp%3Efoo%3C/p%3E"
</code></pre>

#### comment
<pre><code class="javascript">
var temple;
temple  = Temple.compile('{#!this is a line of comment}');
temple.render();
// => ""

temple  = Temple.compile('{#! 可以包含"{"、"#"、"\\}" }');
temple.render();
// => ""

temple  = Temple.compile('{#! 中文注释} 中文字符串abc');
temple.render();
// => " 中文字符串abc"
</code></pre>

