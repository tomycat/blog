---
layout: default
tags : cordova
comments : true
title : cordova icon generator
---

cordova/phonegap 能实现跨平台，在各个平台下有不同的 icon、land screen，作为独立开发者，没有设计师，一切都自己搞的人来说，要做那么多套 icon 和 land screen 真是一件悲痛的事情。仅仅就 iOS 和 android 而言，都要生成这么多的图标，下面这还仅仅是iOS 的：

![pic](/blog/images/2014-07-10-cordova-generator/1_c.png)


![pic](/blog/images/2014-07-10-cordova-generator/2_c.png)


![pic](/blog/images/2014-07-10-cordova-generator/3_c.png)


于是，写了个工具，从一张大图片直接生成所有的 icon 、land screen ，放到了 [github 上](https://github.com/WeweTom/cordova-gen) ，

**注意：** 依赖 ImageMagic 的 convert 命令

1. 在 Mac 下 安装 `brew install imagemagick`
2. linux (Ubuntu) 下 `apt-get install imagemagick`
