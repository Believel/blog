const Koa = require('koa')
const app = new Koa()
// 视图渲染，支持模板引擎
const views = require('koa-views')
// 更好地支持 JSON
const json = require('koa-json')
const onerror = require('koa-onerror')
// 解析 post 类 HTTP 动词的 body 内容，加上 bodyparser 后就可以处理所有请求了
const bodyparser = require('koa-bodyparser')
// 开发阶段日志
const logger = require('koa-logger');

// 总结 Mongoose 常用的用法：
// 首先约定 Schema, 即在定义模型时指定字段和字段类型，避免出现乱用schema-free的问题
// 然后，对实例化模型创建的对象进行操作， 完成常见的增删改查功能。
// 定义模型即定义对象，对对象进行操作即对数据库进行操作


const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares  中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// koa-static 提供 HTTP 静态托管服务
// 静态服务器
app.use(require('koa-static')(__dirname + '/public'))

// 视图
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes  路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
