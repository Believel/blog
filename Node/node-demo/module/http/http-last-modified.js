// 强缓存对浏览器地址栏访问的资源无效，但浏览器提供了另一种缓存策略，可以缓存地址栏访问的文件，这种策略叫做协商缓存。
// 协商缓存规定，浏览器再发起 HTTP 请求的时候，服务器可以返回Last-Modified响应头，这个响应头的值是一个时间戳。
// 如果服务器这么做了，那么浏览器会缓存这个资源，并且在今后请求该资源的时候，会带有if-modified-since请求头，它的值是上一次Last-Modified响应头中的时间戳。
import http from 'http'
import url from 'url'
import path from 'path'
import fs from 'fs'
import mime from 'mime'

const server = http.createServer((req, res) => {
  //  /assets/js/app.js
  // console.log(req.url)
  let filePath = path.join('www', url.fileURLToPath(`file:///${req.url}`)); // 解析请求的路径
  //  www/assets/js/app.js
  // console.log(filePath)
  if(fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const isDir = stats.isDirectory();
    if(isDir) {
      filePath = path.join(filePath, 'index.html');
    }
    if(!isDir || fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath); // 读取文件内容
      const { ext } = path.parse(filePath)
      const timeStamp = req.headers['if-modified-since']
      console.log(timeStamp)
      let status = 200
      // 协商缓存会有例外，比如服务器意外判断错了协商缓存的过期条件，返回了304状态。
      // 在这种情况下，浏览器的强制刷新也可以清除协商缓存，因为当浏览器强制刷新的时候，请求头不会带上if-modified-since信息
      if (timeStamp && Number(timeStamp) === stats.mtimeMs) {
        status = 304
      }
      res.writeHead(status, {
        // 根据扩展名，来设置对应的类型
        'Content-Type': mime.getType(ext),
        'Cache-Control': 'max-age=86400', // 缓存一天
        'Last-Modified': stats.mtimeMs  // 协商缓存响应头
      })
      if (status === 200) {
        // if (ext === '.png') {
        //   res.writeHead(200, {
        //     'Content-Type': 'image/png',
        //     'Cache-Control': 'max-age=86400', // 缓存一天
        //     'Last-Modified': stats.mtimeMs  // 协商缓存响应头
        //   });
        // } else {
        //   res.writeHead(200, {
        //     'Content-Type': 'text/html; charset=utf-8', 
        //     'Cache-Control': 'max-age=86400', // 缓存一天
        //     'Last-Modified': stats.mtimeMs
        //   });
          // 浏览器的强缓存策略，在不是通过地址栏访问资源的情况下，需要强制刷新才能更新资源
        // }
        return res.end(content); // 返回文件内容
      } else {
        // 如果状态码不是200，不用返回Body
        return res.end()
      }
    }
  }
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<h1>Not Found</h1>');
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8080, () => {
  console.log('opened server on', server.address());
});