// 一般在项目里，所有模型都共用一个数据库连接信息，把连接数据库的代码抽取到connect.js文件里，
// 然后在应用入口 app.js引用，这样整个应用里就只存在一个数据库连接了

const Mongoose = require("mongoose");

// 开启调试模式
Mongoose.set("debug", true);

// mongodb://user:pass@ip:port/database
// user 是MongoDB里的用户名
// pass是MongoDB里该用户对应的密码
// ip 是 MongoDB服务器可以访问的IP地址，比如本地IP地址为127.0.0.1
// port是 MongoDB服务器可以访问的端口，默认是27017
Mongoose.connect("mongodb://127.0.0.1:27017/db_demo");

Mongoose.connection.on("error", function(error) {
  console.log("数据库连接失败：" + error);
})

Mongoose.connection.on("open", function() {
  console.log("数据库连接成功")
})
