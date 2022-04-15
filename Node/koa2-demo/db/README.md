# Mongoose 进阶

## 模型扩展

### Mongoose 模型扩展方法
1. `statics`: 类上扩展

```js
// 比如：根据用户名查找用户
// 属于 模型 User 上的静态方法
UserSchema.statics.find_by_username = function(username, cb) {
  return this.findOne({ username: username}, cb)
}
```


2. `methods`: 对象上扩展

```js
// 比如：判断某个用户是否存在

UserSchema.methods.is_exist = function(cb) {
  const query = {
    username: this.username,
    password: this.password
  };
  return this.model("UserModel").findOne(query, cb);
}


// 我们需要创建一个 User 对象，才能调用上面方法

const user = new User({});
user.is_exist(cb)

```


## 虚拟属性
```js
Schema.vitual("fieldName", function() {
  return xxx
})
```


## 回调钩子

1. 给数据库操作方法增加pre和post回调。当数据库完成某些操作的时候，该机制会自动触发前置或后置行为。

2. 加密库： `npm i bcrypt --save`

## 插件机制

> 是基于 Schema 的动态扩展能力进行的封装


```js
// some_plugin.js
//  schema 是 Schema 的定义，
// options 是 配置项
module.exports = exports = function(schema, options) {

}


// 使用

const plugin = require("./some_plugin");
const Schema = new mongoose.Schema({})
// plugin: 插件对象
Schema.plugin(plugin, { index: true})
```


1. 持续集成 Travis
  * 一般来说，对通用Node.js模块进行持续集成的时候，直接使用Travis默认的集成方式即可。如果要用到数据库或缓存，需要单独在Travis里配置相应的服务。
  * 根项目目录下，创建`.travis.yml`文件

  ```js
  sudo: false
  language: node_js
  node_js:
    - '8'
  before_install:
    - npm i npminstall -g
  install:
    - npminstall
  script:
    - npm run ci
  after_script:
    - npminstall codecov && codecov

  ```

2. 密码的存储实践
  * 明文存储
  * 哈希存储（例如 MD5、SHA、SHA256）
  * 加盐哈希存储


# 数据库进阶

## 分页 - 小数据
```js
// 第 n 页数据
db.user.find().skip(pageSize * (n - 1)).limit(pageSize);

// 第一页分页
db.user.find().limit(10);

// 第二页数据
db.user.find().skip(10).limit(10)


// skip + limit 只适合处理体量小的数据，数据一多就会卡顿，再怎么加索引、做优化，都没有办法解决。
```

## 分页 - 大量数据

> `_id` 是MongoDB中的ObjectID类的数据，ObjectID类型的数据占用12字节的存储空间，每个字节为两位十六进制数字，是24位的字符串

### ObjectID 组成

```js
6198        733                c8            2e737ec72aac    e1f
时间戳(time) 机器标识码(machine)  进程标识(pid)                 自增计数器(inc)
```



1. 在当前页内查出最后一条记录的_id, 记为last_id
2. 将记下来的last_id作为查询条件，如果查出大于last_id的记录，就将这些记录作为下一页的内容

```js
// 第一页
db.user.find().limit(10)
const last_id = ObjectId("")

// 第二页
db.user.find({ "_id" > last_id}).limit(10)



// Robo 客户端代码
db.getCollection('users').find({"_id": {"$gt": ObjectId("6198733c82e737ec72aace1f")}})
```

## 关联查询
1. 聚合函数
* 对一组数值执行计算并返回结果的函数，它经常与SELECT语句的GROUP BY子句一同使用



## 事务
> transaction 是指单个逻辑工作单元执行的一系列操作，这些操作要么全部执行，要么全部不执行。事务必须要满足4个属性：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）



## 性能调优