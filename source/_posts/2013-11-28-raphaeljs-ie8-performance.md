---
layout: default
tags : other
comments : true
codesyntax : true
title : raphaeljs 在 IE8 下性能差的问题及解决方案
---

Raphaël 具有良好的兼容——IE能兼容到ie6，非常适合国情，但是情况正在发生变化，尤其是
在国外，考虑到IE9以及其他浏览器的份额，Raphaël 的作者推出了一个叫 [Snap.svg](http://snapsvg.io) 的
图形库，跟Raphaël 不同，Snap.svg完全是基于svg的图行库，少了些束手束脚。

不过在国内，ie6/7/8/仍然不可忽视，因此Raphaël 仍然是比较好的选择。

微软从IE9开始支持svg矢量图形技术，Raphaël 在 ie6/7/8 上使用的是专有的vml技术来模
拟svg的特性。

# vml在IE8浏览器下性能非常之差

我们知道，直到IE9才支持svg，微软必须跟上开放标准的潮流，vml的没落就像很多IE其它专
有特性一样，渐渐被抛弃，到IE8最终发布的时候，对vml的支持已经非常不好了 <sup>[1]</sup>

<blockquote>
“vml\:*”这个选择器被IE8认为不合法
</blockquote>

并且，相比IE6/7，IE8下vml性能问题差了很多，可以看 [stackoverflow上的一个用户测试](http://jsfiddle.net/t5NGF/)

测试代码如下：

<pre><code class="html">&lt;script src="http://fiddle.jshell.net/js/lib/raphael-1.5.2-min.js"&gt;&lt;/script&gt;
&lt;div id="time-result"&gt;&lt;/div&gt;
&lt;div id="canvas"&gt;&lt;/div&gt;
&lt;script&gt;
window.onload = function() {
    var timer = new Date();
    var paper = Raphael('canvas', 400, 400);
    var length = 25;
    for (var i = 0; i &lt; 10; i++) {
        for (var j = 0; j &lt; 10; j++) {
        paper.rect(length * i, length * j, length, length);
        }
    }
    $('#time-result').text('Rendered in ' + (new Date() - timer) + ' milliseconds.');
};
&lt;/script&gt;
</code></pre>

# Raphael IE8 性能差的应对方案

通过修改meta标签，让IE8运行在IE7模式下，于是有了

**改进1** 

<pre><code class="html">&lt;meta http-equiv="X-UA-Compatible" content="IE=7" &gt;</code></pre>

但是，如果仅仅是这样的化会误伤IE9 —— IE9 已经支持svg了，如果页面上还有这个声明的
化，那么IE9也会以IE7模式来渲染页面。抛弃svg而使用vml，这样显然是很不合理的。

我困惑了很久，想尝试使用IE的另一个奇葩特性——条件注释来避免这个问题：

**改进2** ——失败的尝试

将meta标签放在条件注释中，像这样

<pre><code class="html">&lt;!doctype html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;!--[if lt IE 9]&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=7"&gt;
    &lt;![endif]--&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;

  &lt;/body&gt;
&lt;/html&gt;</code></pre>

但是遗憾的是，浏览器根本就不识别这样注释后的meta标签，所以这种方案以失败告终

**改进3** —— 通过在服务器返回的header中设置，这个方案我没亲自尝试过

但是，PHP使用者，可以尝试下面的方案 <sup>[2]</sup>

<pre><code class="html">header("X-UA-Compatible: IE=7,IE=9");</code></pre>

**改进4** —— 最终方案

因为，我找到了更好的方案了，其实很简单，只要在 **方案1** 的基础上，做一点改变

<pre><code class="html">&lt;meta http-equiv="X-UA-Compatible" content="IE=7,IE=9" &gt;
</code></pre>

IE确实支持这样的写法，不过还是有坑的，在iframe下有问题，详细参看stackoverflow上的
讨论 <sup>[3]</sup>


[1] http://www.cnblogs.com/rubylouvre/archive/2009/10/12/1581891.html

[2] http://stackoverflow.com/questions/6156639/x-ua-compatible-is-set-to-ie-edge-but-it-still-doesnt-stop-compatibility-mode

[3] http://stackoverflow.com/questions/3413629/emulate-ie7-for-ie8-but-not-for-ie9-using-x-ua-compatible
