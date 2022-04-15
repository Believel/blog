// 1. 引入数据库连接, 保证 MongoDB 以及连接成功

require("./connect");

// 2. 引入模型定义文件， 即完成文档（表）结构的定义

const User = require("./user");

// 3. 实例化模型， 创建 user 实体

const user = new User({
  username: "tgd",
  password: "123456",
})

// 4. 对数据库进行操作，  完成用户注册

user.save(function(err, doc) {
  if (err) {
    console.log("save error:" + err);
  }
  console.log("save success\n" + doc);
})

// User.login("zhangpanpan", "000000", function(err, result) {
//   if (!err) {
//     console.log(result);
//   }
// })






