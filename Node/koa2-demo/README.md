
#  koa-generator

```js
npm install -g koa-generator

// create koa v1 project
koa koa1-demo
cd koa1-demo
npm install


// create koa v2 project
koa2 koa2-demo
cd koa2-demo
npm install


```
# 项目目录说明

```js
├── app.js
├── bin
│   └── www
├── package-lock.json
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

## `public` 

1. 纯 API 项目，不需要 `public` 目录
2. 纯前后端分离项目，后端不需要`public`目录，前端需要
3. 需要`public`目录的项目，但会将`public`目录里的内容分发到CDN上


## `views`

### `koa-views`
### 编译（模板 + 数据）= HTML

```js
router.get('/', async (ctx, next) => {
  // 视图渲染   
  // 参数1：模板，相对路径，对应的是 views 目录下的 index.pug
  // 参数2：JSON对象，所谓的数据
  // ctx.render 执行的操作如下：
  // 1. 通过文件读取 index.png 模板
  // 2. 使用 Pug 模板引擎编译器将数据和模板引擎内容编译为 HTML 字符串。
  // 3. 将 Content-Type 设置为 text/html
  // 4. 将 statusCode 状态码设置为200
  // 5. 通过 http 模板底层的 res.wite 和 res.end 方法将 HTML 字符串写入浏览器。
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
```

### Pug
| 特性 | 描述 | 
| ---- | ----|
| extend 和 blocks | 都与布局有关，几乎所有的模板引擎都支持 |
| case 、each 、while、if 、unless | 用于逻辑判断，模板引擎中应尽量减少这种逻辑判断，否则非常复杂 |
| include | 用于引用 子模板，复用性极好，Pug 的 include 还可以传递数据 this 作为参数 |
| mixin | 用于复用模板代码的块级，十分方便，但滥用会导致代码维护极难 |
| filter | 支持 stylus、less、markdown、coffee,但容易降低代码的可识别度，虽功能强大但不够实用 |


## router

1. `routes/index.js`
```js
// 支持 async/await写法（koa-router v7.x）
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // 视图渲染
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

module.exports = router
```

2. app.js

```js

const index = require('./routes/index')
// 将 路由挂载到 app 上
// index.routers() 是 router 对象上挂载的所有中间件，每个中间件其实就是一个子路由
app.use(index.routes(), index.allowedMethods())
```
### 路由的实现原理
1. 定义路由。

2. 路由的路径会被转译成正则表达式。（path-to-regexp 模块）

3. 匹配请求，使用中间件进行处理。














# Koa 的核心扩展机制：中间件

## 什么是中间件
1. 中间件是框架的扩展机制

## Koa 与浏览器交互
1. `ctx.body` (Koa 内置)
```js
// 返回文本
ctx.body = 'hello world'

// 返回HTML付出
ctx.body = '<h1>Hello</h1>'

// 返回 JSON
ctx.body = {
  msg: 'hello json!'
}


// ctx.body的工作原理是根据赋值类型来进行不同Content-Type的处理，处理过程如下：
// 1. 根据body的类型设置对应的Content-Type
// 2. 根据Content-Type调用res.write或res.end,将数据写入浏览器
```


2. `ctx.redirect`(Koa 内置)

> 浏览器重定向，向前重定向和向后重定向


```js
// 向后重定向
ctx.redirect('back');
ctx.redirect('back', '/index.html');

// 向前重定向
ctx.redirect('/login');
ctx.redirect('http://google.com');
```

3. `ctx.render` (外部中间件)

>  渲染模板

```js
router.get('/', async (ctx, next) => {
  // 视图渲染: 参数1：模板， 参数2：数据
  // 该方法注意用于将模板编译成HTMl并写入浏览器
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
```

## Koa 中间件的工作过程 *

1. 处理请求前先完成一些准备工作。

2. 进行业务逻辑处理或通过next将业务交由下一个中间件处理。

3. 后面的中间件完成处理后会进行回溯，执行处理后的操作。



# HTTP 必知必会

```js
const http = require("http");
const options = {
  // 要向其发出请求的服务器的域名或IP地址。默认值：localhost
  host: "httpbin.org",
  // 请求的路径
  path: "/ip"
}
// 
const client = http.request(options, function(res) {
  res.setEncoding("utf-8");
  let str = "";
  res.on("data", function(chunk) {
    str += chunk;
  })
  res.on("end", function() {
    console.log(str);
  })
})
client.on("error", (e) => {
  console.log(`problem with request: ${e.message}`)
})
// 开始发起请求，整个请求是异步的，所以要不断地拼接获得chunk,以便获得最终的响应数据
//! 使用 http.request() 必须始终调用 client.end() 来表示请求的结束 - 即使没有数据写入请求正文。
client.end();
```


## HTTP 代理

1. 查看 Node.js 源码中和HTTP相关的文件，在终端执行的命令：`ls -a lib | grep http`

2. 代理对客户端来说，代理负责接收请求报文，返回响应报文。对服务器来说，代理负责发送请求报文，接收响应报文。

3. `http-proxy` 是使用非常广泛的代理服务器，协议支持丰富，特别适合做反向代理和负载均衡，是一个经典的模块。


## HTTPS(Hyper Text Transfer Protocol over Secure Socket Layer)

> 是以安全为目标的HTTP通道，简单讲是HTTP的安全版。HTTPS在网络传输过程中主要使用SSL/TLS进行加密，是目前最安全的方式。

1. SSL(Secure Socket Layer) ,安全套接字层，是位于可靠的面向连接的网络协议层和应用协议层之间的一种协议层。

2. TLS(Transport Layer Security), 安全传输层协议，用于保证两个应用程序之间的保密性和数据完整性。


# Koa API study

```js
foo:
//
cnodejs.org:3000     authority
/over/there          path
?name=ferret         query
#nose                fragment

```

## HTTP 头部消息
```js
// 设置     无参数时可以用来获取所有的头部信息
ctx.header

// 获取

ctx.get

```

## 状态码

```js
ctx.status = ctx.response.status

//
500  Server Error
404  Not Found
403  Forbidden
304  Not Modified
200  OK
```

## Cookie

>  Cookie 是在 HTTP下，服务器或脚本维护客户工作站上存在的一种信息形式，是由Web服务器保存在用户浏览器（客户端）上的小文本文件，它可以包含有关用户的信息。无论何时，只要用户连接到服务器，Web站点就可以访问Cookie信息。


1. Cookie 的处理过程

  * 服务器端向客户端发送Cookie，客户端的浏览器把Cookie保存起来，然后在每次请求浏览器时将Cookie发送到服务器端。在HTML文档被发送之前，Web服务器会通过传送HTTP包头中的Set-Cookie消息把一个Cookie发送到用户的浏览器中,示例如下

  ```js
  Set-Cookie: koa.sid=BypBuJromdMead;path=/;expires=Web,24 Jan 2018 06:44:28 GMT;httponly
  ```
2. Cookie 处理过程涉及的几个重要的属性
1. name=value: 在Cookie中可以用这种方式对内容赋值
2. maxAge: 最大失效时间（ms）
3. signed: Cookie值签名
4. path: Cookie影响到的路径。如果路径不能匹配，浏览器就不发送这个Cookie
5. domain: Cookie影响到的域名
6. secure: 值为true时，表示Cookie在HTTP中是无效的，在HTTPS中才有效
7. httpOnly: 微软对Cookie做的扩展。如果在Cookie中设置了httpOnly属性，则无法通过程序读取到Cookie信息，这样可以防止XSS攻击产生。
8. Expires: 缓存失效时间(s)

```js
ctx.cookies.set("name", "koajs", {signed: true})

```


# Mongodb

1. `mongodb-memory-server`是为了快速测试MongDB而被编写的Node.js模块。它可以将数据存储在内存中，而非MongoDB的持久化存储里。




# 前端视图模板

## 静态资源托管方式
1. 静态服务器


## 动态模板渲染：使用模板引擎，结合数据库返回的内容，进行动态渲染

## 前后端分离的实践

