// ! 未跑通
const test = require("ava");
const {MongoMemoryServer}  = require("mongodb-memory-server");
const mongoose = require("mongoose");


// 定义 Schema
const UserSchema = new mongoose.Schema({
  // 姓名
  username: {
    type: String,
    required: true
  },
  // 密码
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }

})


// 通过 mongoose.model 定义模型
const User = mongoose.model("User", UserSchema);

// 虚拟属性
// 案例： 拆分 address 字段： 省、市、区（县）及街道详细信息

function _sp(str) {
  return str.replace(/\n/g, "").trim().splice("-");
}
UserSchema.virtual("provices").get(function() {
  const arr = _sp(this.address);
  return arr[0];
})
UserSchema.virtual("city").get(function() {
  const arr = _sp(this.address);
  return arr[1];
})
UserSchema.virtual("county").get(function() {
  const arr = _sp(this.address);
  return arr[2];
})

// 3. 实例化模型， 创建 user 实体

const user = new User({
  username: "zhangpanpan",
  password: "123456",
  address: "天津-天津-东丽区-空港商务园"
})

// 在运行测试用例之前，需要创建数据库连接

test.before(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    dbName: "user"
  })
})

test.before.cb(t => {
  user.remove({}, (err, result) => {
    t.end()
  })
})

test("#provice city county", t => {
  user.save((err, u) => {
    t.is(u.provice, "天津")
    t.is(u.city, "天津")
    t.is(u.county, "东丽区")
  })
})