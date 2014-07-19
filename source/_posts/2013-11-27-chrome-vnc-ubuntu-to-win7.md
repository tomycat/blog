---
layout: default
tags : other
comments : true
title : ubuntu 13.10 通过chrome vnc viewer 插件连接 windows7
---


chrome 安装 vnc viewer 插件就不说了，具体看这里

关键在于，windows7 安装了vnc server 后，通过ubuntu上的vnc viewer 连接 不上的问题


原因在与，win7 默认开启了防火墙设置。具体解决步骤如下:

点击windows徽标，搜索防火墙，打开“高级安全 Windows防火墙”

![step1](https://lh6.googleusercontent.com/-0ie8vPKKU4w/UpXmdfeKWGI/AAAAAAAABmc/kVYelKW9gQY/w205-h225-no/a.png )

![step2](https://lh6.googleusercontent.com/-9q-3NC354aU/UpXmdYRynXI/AAAAAAAABmo/lGJolfDxBvQ/w710-h518-no/b.png )

![step3](https://lh6.googleusercontent.com/-AcFaDcpbOJ4/UpXmeDfTT-I/AAAAAAAABmw/FUkzUgUJw-Y/w703-h509-no/f.png )

接下来下一步，到结束，起个名字再用vnc viewer 连接就能成功了
