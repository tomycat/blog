---
layout: default
tags : other
comments : true
codesyntax : true
title : 使用inkscape和fontforge制作iconfont
---

iconfont是通过矢量字体的方式来做icon，可以在高分辨率的屏幕上
也不会失真，能通过css来控制其样式，就像控制普通的文字一样。

像很多浏览器特性一样，使用iconfont是有兼容性问题的，要使用
iconfont，你不得不这样写字体声明：

<pre><code class="css">@font-face {
  font-family: 'mui-wl';
  src: url('http://at.alicdn.com/t/font_1384420140_864115.eot');										/* IE9*/
  src: url('http://at.alicdn.com/t/font_1384420140_864115.eot?#iefix') format('embedded-opentype'),		/* IE6-IE8 */
  url('http://at.alicdn.com/t/font_1384420140_8889937.woff') format('woff'),							/* chrome、firefox */
  url('http://at.alicdn.com/t/font_1384420140_8170962.ttf') format('truetype'),							/* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('http://at.alicdn.com/t/font_1384420140_9259503.svg#svgFontName') format('svg');					/* iOS 4.1- */
}</code></pre>

字体编辑的工具，windows平台下有fontlab配合AI能很好的生成
iconfont，具体介绍参看这里，[CSS3 icon font完全指南](http://www.qianduan.net/css3-icon-font-guide.html) 

生成ttf格式的文件后，要兼容ie系列浏览器，还需要转为其它几种
格式

网上有一些工具能够进行字体转化的工具，能将ttf格式的字体文件，
转为各种格式的iconfont字体文件，比如这
个：http://www.fontsquirrel.com/fontface/generator

那么整个过程就完毕了，下面要介绍的是在linux环境下进行字体文
件的的制作

--------------------

### 需要的环境 
  1. inkscape ，用于生成字体路径
  2. fontforge ，linux下面的字体编辑器，需要忍耐下，界面非常丑，
	 有很多快捷键

### 制作过程
  1. 准备好svg字体路径，可以用inkscape ，或者AI
	 ![步骤一](https://lh4.googleusercontent.com/-jJGU7L-rfs4/UoSu2hBfn_I/AAAAAAAABis/byeUYHHHJac/w865-h592-no/c.png)
  2. 用fontforge打开一个svg字体文件（也可以是ttf格式的），比如
     http://at.alicdn.com/t/font_1384420140_9259503.svg ，看到很多图形
     ![步骤二](https://lh5.googleusercontent.com/-WIf6jcITiW4/UoSu2r2NI9I/AAAAAAAABik/cICSgdUEd90/w427-h227-no/b.png) 	 
  3. 点击一个字体空位，复制画好的svg路径到空位上
	 ![步骤三](https://lh4.googleusercontent.com/-jJGU7L-rfs4/UoSu2hBfn_I/AAAAAAAABis/byeUYHHHJac/w865-h592-no/c.png) 
  4. 文件->生成字体，完成
	 ![步骤四](https://lh3.googleusercontent.com/-LWGpBPreJOM/UoSu3BnNtqI/AAAAAAAABiw/wAjBKhRK3AQ/w527-h561-no/d.png) 
  5. 借助上面的字体转换工具，将生成的ttf文件上传，生成其它格
     式的文件
  6. [demo](http://jsbin.com/UDoqosEx/1/edit)

### 需要注意的点
  1. fontforge 打开生成的ttf文件，前32个字符是不可见字符，如
     果你在这前32个字符中填充了图形也是没用的
  2. 如果你自己托管字体文件的的话，需要注意字体的跨域问题：
     firefox和IE9不支持对icon font字体的跨域。解决办法是在服
     务器的header中添加acceess-control

  ![http-header-access-control](https://lh3.googleusercontent.com/-bwAqo32fZ9M/UoTCT2Y08UI/AAAAAAAABjk/lVOc2ccltKU/w978-h394-no/a.png ) 

### 总结
  这样的制作过程还是比较麻烦的，但是能通过操作fontforge这个
  软件，对字体文件有个感性的认识，再使用在线的工具的时候就不
  会觉得完全是个黑箱了

### 更佳的方案——使用在线的工具
   1. http://fontello.com/
   2. http://icomoon.io/app

### 用iconfont实现loading的icon
    
