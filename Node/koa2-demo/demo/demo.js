// 中间件案例
// const app = require("../app copy");

// app.use(function *(next) {
//   console.log(1);
//   yield next;
//   console.log(2);
// })

// app.use(function *(next) {
//   console.log(3);
//   yield next;
//   console.log(4);
// })

// app.callback();


// 2. http.request

// const http = require("http");
// const options = {
//   host: "httpbin.org",
//   path: "/ip"
// }
// const client = http.request(options, function(res) {
//   res.setEncoding("utf-8");
//   let str = "";
//   res.on("data", function(chunk) {
//     str += chunk;
//   })
//   res.on("end", function() {
//     console.log(str);
//   })
// })
// client.on("error", (e) => {
//   console.log(`problem with request: ${e.message}`)
// })
// client.end();


// 3. http proxy

// const http = require("http");

// const app = http.createServer((req, res) => {
//   if ("/remote" === req.url) {
//     res.writeHead(200, { "Content-Type": "text/plain"});
//     return res.end("Hello Remote Page\n");
//   } else {
//     proxy(req, res);
//   }
// })

// function proxy(req, res) {
//   const options = {
//     host: req.host,
//     port: 3000,
//     headers: req.headers,
//     path: "/remote",
//     agent: false,
//     method: "GET"
//   };
//   // httpProxy 是一个新的请求
//   const httpProxy = http.request(options, (response) => {
//     response.pipe(res);
//   })
//   req.pipe(httpProxy);
// }
// app.listen(3000, function() {
//   const PORT = app.address().port;
//   console.log(`Server running at http://127.0.0.1:${PORT}`);
// })

// EventEmitter  事件
// 是 Node.js里典型的基于观察者设计模式的实现类，它是对事件触发与事件监听器功能的封装。

// 所有的 Stream 对象都是 EventEmitter 的实例，而响应和请求属于 Stream 对象，所以它们也是 EventEmitter 的实例，并且继承了 Stream 和 EventEmitter 中的事件

// 常见的事件有以下几类：
// data: 当有数据可读时触发
// end: 没有更多的数据可读时触发
// error: 接收和写入过程中发生错误时触发
// finish: 所有数据已被写入底层系统时触发



// const Koa = require("koa");
// const app = new Koa();
// app.use(async ctx => {
//   // return ctx.body = {
//   //   href: ctx.href,
//   //   path: ctx.path,
//   //   url: ctx.url,
//   //   query: ctx.query,
//   //   querystring: ctx.querystring,
//   //   search: ctx.search,
//   //   host: ctx.host,
//   //   hostname: ctx.hostname,
//   //   protocol: ctx.protocol,
//   //   secure: ctx.secure,
//   //   subdomains: ctx.subdomains,
//   //   origin: ctx.origin
//   // }
//   ctx.body = {
//     header: ctx.header,
//     get_cache_control: ctx.get("Cache-Control"),
//     length: ctx.length,
//     // Content-Type
//     type: ctx.type
//   }
// })

// app.listen(3000)


// !缓存实现

const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req, res)=> {
    const {pathname} = url.parse(req.url);
    fs.stat(`www${pathname}`, (err, stat) => {
        if (err) {
            res.writeHeader(404)
            res.write('Not Found')
            res.end()
        } else {
            // 检验客户端头信息是否有此信息
            if (req.headers['if-modified-since']) {
                let oClientDate = new Date(req.headers['if-modified-since'])
                let oClientTime = Math.floor(oClientDate.getTime()/1000)
                let oServerTime = Math.floor(stat.mtime.getTime()/1000)
                if (oServerTime > oClientTime) {  //服务器的文件时间>客户端手里的版本
                    sendFileClient()
                } else {
                    res.writeHeader(304);
                    res.write('Not Modified');
                    res.end();
                }
            } else {
                sendFileClient()
            }
        }
        function sendFileClient() {
            let modifyDate = stat.mtime.toGMTString()
            // 第一次设置服务端头信息
            res.setHeader('Last-Modified', modifyDate)
            // 以流的形式读文件
            const rs = fs.createReadStream(`www${pathname}`)
            // 输出
            rs.pipe(res)
            res.on('error', err => {
                res.writeHeader(404);
                res.write('Not Found');
                res.end();
            })   
        }
    })

    
}).listen(8080)


