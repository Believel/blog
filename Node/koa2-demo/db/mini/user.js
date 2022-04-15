// !定义模型  - 即 数据库中定义的表结构，以及字段类型、约束等信息
const Mongoose = require("mongoose");
// 加密
const bcrypt = require("bcrypt");
const saltRounds = 10

// 引入插件
const lastMod = require("./plugin/lastMod");


for (let i in Mongoose.Schema.Types) {
  console.log(i);
}
// 定义 Schema
const UserSchema = new Mongoose.Schema({
  // 姓名
  username: {
    type: String,
    required: true
  },
  // 密码
  password: {
    type: String,
    required: true
  }
})

// 使用插件
UserSchema.plugin(lastMod, { index: true});


// 注册钩子，将 password 子弹通过加盐处理生成哈希密码，并赋值给最终的password

UserSchema.pre("save", function(next) {
  const that = this;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      console.log(err);
      return next()
    }
    bcrypt.hash(that.password, salt, function(error, hash) {
      if (error) {
        console.log(error);

      }
      that.password = hash;
      return next();
    })
  })
})

// 登录操作，验证密码是否一致

UserSchema.statics.login = function(username, password, cb) {
  this.findOne({
    username: username
  }, function(err, user) {
    if (err || !user) {
      if (err) {
        console.log(err);
        // 用户名不存在
        return cb(err, {
          code: -1,
          msg: username + " is not exist"
        })
      }
    }
    bcrypt.compare(password, user.password, function(error, res) {
      if (error) {
        // 如果密码不正确
        console.log(error);
        return cb(error, {
          code: -2,
          msg: "password is incorrect , please check it again!"
        })
      }
      // 如果密码校验正确，返回用户的具体信息
      return cb(null, user)
    })
  })
}

// 通过 mongoose.model 定义模型
const UserModel = Mongoose.model("User", UserSchema);

// 暴露接口

module.exports = UserModel;