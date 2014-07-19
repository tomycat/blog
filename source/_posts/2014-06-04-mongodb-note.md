---
layout: default
tags : mongodb
comments : true
title : mongodb 的笔记
---

### 1. mongodb 的连接数问题
每次接受一个请求，打开数据库，然后将其关闭。像下面这样：

```javascript
app.get('/detail/:id',function(req,res){
  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    db.findOne({_id:ObjectId(req.params.id)},function(err,result){
      // do sth
      db.close()
    })
  });  
})
```

直觉有点浪费，每次 request 都重新建立 db connection，用完后又关掉，对于高并发的应用来说，尤其浪费。

所以，更好的方式是复用db connection，以下代码摘自 mongodb node native 官方例子：

```javascript
var express = require('express');
var mongodb = require('mongodb');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/integration_test", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

// Reuse database object in request handlers
app.get("/", function(req, res) {
  db.collection("replicaset_mongo_client_collection").find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
      }else {
        res.end();
      }
    });
  });
});     
```
应用初始化时，就建立一个 db 实例，以后所有的连接，都是使用这个 db connection。

并且，通过上面方式建立的 db connection 单独的连接，而是 connection pool，非常高效。

<blockquote>
You open do MongoClient.connect once when your app boots up and reuse the db object. It's not a singleton connection pool each .connect creates a new connection pool. [4]
</blockquote>

更进一步，API 还提供了 maxPoolSize 选项，设置连接池的最大值，默认为 5 http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html

### 2. mongodb 连接失败导致 node crash

见 stackoverflow 上的问题 How to ensure Node.js keeps running after MonogBD connection drops? [1]，如何让 Node.js 在数据库挂掉后继续跑？ 目前没有特别好的解决方案。

首先描述下问题，创建一个 mongodb client：

```javascript
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
// do sth
});  
```

当db连接断掉后（可以手动kill掉mongod进程来模拟复现当掉的情况），再访问 web 服务，就会出现下面类似的出错：

```javascript
Error: failed to connect to [localhost:27017]     
```

这时候web服务也宕掉了……

理想的情况是，希望出现一个 500 内部错误提示界面，或者提示在升级什么的，但是数据库连接断掉以后，（我猜测）是 throw 了一个 Error 出来，导致 Node 的主进程挂掉了

其中一个解决方案是，将数据库的连接操作放在 domain 中。

```javascript
var d = require('domain').create();

d.on('error', function(er) {
  console.log('Oh no, something wrong with DB');
});

d.run(function() {
  // 这里使用的是 mongoose
  mongoose.connect(config.db, options);
});     
```

domain 的介绍见 文档 http://nodejs.org/api/domain.html， 不过，有点要注意就是 domain 还不够稳定 ，文档标注的是 `unstable`，
不过，附录[1] 说已经用于生产环境中了，并且没有发现啥问题。

### 3. 总结：数据库连接可以复用；为保证数据库挂掉后，Node.js 主进程仍然继续跑，可以将数据可的连接操作放到 `domain` 模块中

### 4. 附录：mongolab 上的一篇博文 Deep Dive into Connection Pooling [3]

### 参考

[1] http://stackoverflow.com/questions/20689768/how-to-ensure-node-js-keeps-running-after-monogbd-connection-drops/20690008#20690008

[2] http://stackoverflow.com/questions/10656574/how-to-manage-mongodb-connections-in-a-nodejs-webapp

[3] http://blog.mongolab.com/2013/11/deep-dive-into-connection-pooling/ 介绍两种数据库连接方式，一种复用（好），一种不复用（坏）         

[4] https://groups.google.com/forum/#!msg/node-mongodb-native/mSGnnuG8C1o/Hiaqvdu1bWoJ

