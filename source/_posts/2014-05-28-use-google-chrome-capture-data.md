---
layout: default
tags : other
comments : true
title : 使用google chrome抓取数据：抓取全国的高中
---

**KEY WORDS** : Chrome插件 数据抓取

--------------------

## 1.数据源
正在做一个网站，需要全国的中学数据，中学数据比较全的应该是人人网了，简单搜索发现 http://xuexiao.eol.cn/ 也有比较全的数据，并且还有地址信息，所以决定不从人人网抓取了。

## 2.抓取数据的思路

作为一名「优秀」的前端工程师，当然使用 javascrpt 来抓取啦，浏览器提供了便捷的 API，处理 DOM 信息比写后端程序方便太多了。

查看「中国教育信息」黄页——黄页这种叫法好像是很多年前的事情了，可以看到三部分，挨个遍历下去，并处理分页抓取学校名称就可以了。

![数据源](/blog/images/2014-05-28-use-google-chrome-capture-data/2.png)

思路如下：

1. 获取左边的省份列表
2. 处理该省份的城市
3. 然后挨个分页抓取就行了

3部分对应的主要代码如下（网站已经提供了 jQuery 了）：

<pre><code class="javascript">//1. function getAllProv(){
  return ["北京", "上海", "天津", "四川", "安徽", "江苏", "浙江", "辽宁", "山西", "福建", "广东", "广西", "海南", "河南", "湖南", "陕西", "湖北", "江西", "河北", "山东", "重庆", "青海", "吉林", "云南", "贵州", "甘肃", "宁夏", "新疆", "西藏", "内蒙古", "黑龙江"];
}
//2. function setCurrentCitiesOfProv(prov){
  return $.map($(".quyu_list a"),function(a){
                               var query = a.getAttribute('href');
                               var val = getQueryStringParameter(query,"local2");
                               return decodeURI(val.replace('_local2',''));
                             });
}
//3. function savePageData(){
  var prov = getCurrentProv();
  var city = getCurrentCityOfProv(prov);
  var schools = $('.right_box');
  var rows = [];
  $.map(schools,function(school){
    var name = $('h2',school).text().trim();
    var detail = $('h3',school).text().trim();
    var parts = detail.split(/\s+/);

    var row = {};
    row.name = name;
    // row.prov = decodeURI(prov);
    row.city = city;

    $.each(parts,function(i,item){
      var o = {
          "地址":"address",
          "邮编":"mailno",
          "电话":"phone"
      };
      var ab = item.split('：');
      var key = o[ab[0]];
      row[key] = ab[1];
    });
    rows.push(row);
  })
  saveStore(rows);// 存储本页的数据
}</code></pre>

<blockquote>注意，上面的脚本只表示了三个步骤，不能直接运行</blockquote>

## 3.将脚本封装为 Chrome 插件

单个页面的逻辑已经处理完毕了，怎么让浏览器自动抓取下去呢？答案很简单：将脚本变为 chrome 的一个插件，每次 http://xuexiao.eol.cn/ 这个站点的页面载入后，都执行上面写好的脚本就行了，每页的学校数据处理完毕后，脚本自动改变 url，刷新获取下页的数据。

实现一个 chrome 插件，使用 userscript 的方式是最简单的，安装好插件后，插件载入一个脚本，之行上面描述的三步逻辑，并且自动刷新到下面一页。这里比较关键的一个步骤是存储所有的省份、城市，并计算出下页的的 url 。具体请看后面附的完整代码。

那么具体怎么实现呢？

1. 创建一个 manifest.json，这个是 chrome userscript 的声明文件
2. 创建一个 contentscript.js （名字随意，但是在 manifest.json 中要对应），这个脚本的作用仅仅是一个脚本加载器，载入 script.js 执行页面数据抓取逻辑。为什么要这样做呢？因为contentscript.js的之行环境和真是页面的执行环境是隔离的，也就是说contentscript.js的一个变量和页面中的变量可以独立存在，它们属于两个世界，这样做的好处在于，比如你可以独立的运行不同版本的jQuery，而不冲突。 javascript 虽独立运行，但是 dom 接口却是共享的，比如 document.createElement('script') 创建一个脚本并插入到 dom 中，可以实现网页面载入一个脚本的目的， 可以将插件中的 script.js 插入运行中的文档中，每次页面载入都会执行 script.js 。
3. 创建一个 script.js （名字随意，但是在 manifest.json 中要对应），用于处理真正的数据抓取逻辑。script.js 会将得到的数据存入 localStorage 中，那么所有载入的页面就可以共享这个数据了。

由于写文章的时候，数据抓取工作还没有完成，就不附上抓取的数据了，页面每秒中才刷新一次，并且只有一个页面在跑，比较慢。要数据的请联系我。

## 4.插件代码

https://github.com/WeweTom/chrome-extension-data-picker
