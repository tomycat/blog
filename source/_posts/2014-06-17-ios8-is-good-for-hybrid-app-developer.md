---
layout: default
tags : 
- cordova
- phonegap
comments : true
title : iOS 8 发布对Hybrid app有什么影响？
---


iOS 8 正式发布后，基于 UIWebView 的 Hybrid app 性能有望获得大幅提升.

### webview 使用了和 safari javascript 引擎

Hybrid app 是基于 UIWebView 的应用，比如 Phonegap/cordova 最终会将 html/js/css 打
包运行在 UIWebView 中。而在 iOS 8 之前，处于安全的考虑[1]，只有 Safari 开启了 JavaScriptCore  just-in-time (JIT) 技术，实时的将 javascript 编译为机器码。使用了 JIT 技术有什么影响呢？js的计算能力有 200% - 300% 的提升，见下图 [2] —— 注意是js计算能力，对于非计算密集型的，比如游戏之外的项目，可能性能提升不是那么明显，比如参考[3]提到了一个 Todo MVC 的应用，经他的测试也有 20% 左右的提升.


![ios_chrome](/blog/images/2014-06-17-ios8-is-good-for-hybrid-app-developer/Chrome_for_iOS_SunSpider.jpg)

![ios_safari](/blog/images/2014-06-17-ios8-is-good-for-hybrid-app-developer/iOS_Safari_SunSpider.jpg)


### 需要 Hybrid 应应用框架 Phonegap/cordova 跟进

iOS 8 发布了，如果开发者的应用依赖像 Phonegap/cordova 这样的第三方框架，是不能立马享受到带来的好处的，需要 Phonegap/cordova 从 UIWebView 迁移到 WKWebView API. 不过，网络上还没有看到 cordova 跟进的消息，本身 iOS 的正式发布也要等一段时间，拭目以待吧.


### 参考

[1] http://www.cnet.com/news/ios-8-grants-new-power-to-rival-browsers-web-based-apps/  One possible reason was security: a JIT compiler essentially creates a new program on the fly and marks the region of memory it's stored in as executable, and a hacker could potentially abuse that privilege.

[2] http://developer.telerik.com/featured/why-ios-8s-wkwebview-is-a-big-deal-for-hybrid-development/

    http://developer.telerik.com/wp-content/uploads/2014/06/Chrome_for_iOS_SunSpider.jpg
    
    http://developer.telerik.com/wp-content/uploads/2014/06/iOS_Safari_SunSpider.jpg

[3] http://developer.telerik.com/featured/why-ios-8s-wkwebview-is-a-big-deal-for-hybrid-development/

[4] http://www.minemobile.com/nitro-javascript-engine-in-ios-phonegap-apps/
