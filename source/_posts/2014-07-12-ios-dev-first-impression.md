---
layout: default
tags : 
-cordova
-ios
comments : true
title : iOS 开发的第一印象
---
   

第一、贵 ，$99 刀换成人民币要 699 圆

第二、申请流程要填一大堆东西，还有各种申请，要登录各种系统，配置文件（Provisioning Profile） XCode 会代你生成，但是有些又要你自己申请

1. Certificates xCode 会帮你生成，所以不用操心

2. Identifiers 需要自己申请，申请后，要等一段时间才能生效[3] ，并且注意和 iTunes connect 上的 bunddle id 要对应上

3. Provisioning Profiles 要自己生成

第三、给开发者用的系统挺烂的：访问慢，提示在维护；在后台申请了一个 identities id，XCode 操作老是不成功，原来是这个id没有同步，上网一查，不是个案，要等一天左右才能同步

第四、开发完了打包发布，发现再怎么都不能 achive ，解决办法是，device不要选择模拟器

第五、发布时，不断的报错：choose a profile to sign with no identities were available，原因就是第三点里描述的，系统延迟！！而且还要延迟一天左右，见 [ref](http://stackoverflow.com/questions/10215530/no-identities-were-available-administrator-request)

第六、使用 Webview 真的有点慢，在一个循环里面用了正则表达式测试，就把页面拖的卡死，但是我的这个应用又必须是网页的

**附录**

[1] http://docs.phonegap.com/en/edge/guide_platforms_ios_index.md.html

[2] http://stackoverflow.com/questions/12825724/applications-must-be-ready-for-upload-on-itunes-connect-before-they-can-be-valid

[3] http://anthonytietjen.blogspot.jp/2012/08/overcoming-trouble-validating-your.html
