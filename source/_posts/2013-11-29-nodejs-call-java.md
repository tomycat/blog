---
layout: default
tags : other
comments : true
codesyntax : true
title : nodejs 中调用java 
---

java由于其历史悠久，有很多有用的jar包，nodejs作为比较新的平台，相比之下还是有所欠
缺的。本篇文章介绍如何在nodejs中调用java程序，这样既能用你熟悉的js语言，又能享用
java的成熟工具。

下面以nodejs中调用 yuicompressor.jar 这个jar包进行压缩的示例来说明node调用java的
完整过程——尽管yuicompressor.jar已经很大程度上被uglifyjs代替了。

类似的，这个例子也可以调用 google 的压缩工具 compiler.jar

## windows 环境中 nodejs 调用 java 

1. 确保你已经正确的安装了java，你可以通过下面的代码来检查是否安装成功

<pre><code>java -version</code></pre>

若看到类似下面的截图，表示安装成功了
![Alt Text](https://lh3.googleusercontent.com/-cVhFVD8smPw/UphdH9jhD_I/AAAAAAAABoE/MVAteYN7WdU/w506-h281/2013-11-29+17:23:03%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png ) 

2. 用nodejs封装cmdline下的命令

下载yuicompressor.jar ，建立一个测试文件test.js，内容随便写点什么

在windows命令行中，压缩这个js的命令是：

<pre><code>java -jar yuicompressor.jar test.js</code></pre>

上面的命令实际上完整的是（windows有个cmd.exe来完成实际的工作）

<pre><code>cmd /c java -jar yuicompressor.jar test.js</code></pre>

nodejs提供了spawn工具来执行外部程序命令，详见 [nodejs文档](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)

完整的代码如下

<pre><code>var spawn = require('child_process').spawn;


exe(["/c","java","-jar","yuicompressor.jar","test.js"]);
// 相当于在命令行下执行 cmd /c java -jar yuicompressor.jar test.js
// 也可以加入更多的参数

function exe(command){
    // windows下 
    var cmd = spawn("cmd",command);

    cmd.stdout.setEncoding("ASCII");
    cmd.stdout.on("data",function(data){
	console.log("------------------------------");
	console.log("exec",command);
	console.log("stdout:"+data);
    });

    cmd.stderr.on("data",function(data){
	console.log("------------------------------");
	console.log("stderr:"+data);
	console.log("------------------------------");
    });

    cmd.on("exit",function(code){
	console.log("exited with code:"+code);
	console.log("------------------------------");
    });
};</code></pre>

将上面的代码保存为 node-compress.js，执行即可

<code><pre>node node-compress.js</code></pre>

## linux 版本

linux 调用java不用像windows 那样：

<pre><code>cmd /c java -jar yuicompressor.jar test.js</code></pre>

而是直接调用

<pre><code>java -jar yuicompressor.jar test.js</code></pre>

即可

所以完整的代码是：

<pre><code>var spawn = require('child_process').spawn;

exe(["-jar","yuicompressor.jar","test.js"]);
// 相当于在命令行下执行 java -jar yuicompressor.jar test.js

function exe(command){

    // linux下，不用 cmd /c java -jar yuicompressor.jar test.js，这种形式，直接
    // java -jar yuicompressor.jar test.js 即可
    var cmd = spawn("java",command);

    cmd.stdout.setEncoding("ASCII");
    cmd.stdout.on("data",function(data){
	console.log("------------------------------");
	console.log("exec",command);
	console.log("stdout:"+data);
    });

    cmd.stderr.on("data",function(data){
	console.log("------------------------------");
	console.log("stderr:"+data);
	console.log("------------------------------");
    });

    cmd.on("exit",function(code){
	console.log("exited with code:"+code);
	console.log("------------------------------");
    });
};</code></pre>
