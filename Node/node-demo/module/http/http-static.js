// 静态文件HTTP服务：当浏览器建立HTTP请求的时候，根据URL地址返回对应的文件。
import http from 'http'
import url from 'url'
import path from 'path'
import fs from 'fs'

const server = http.createServer((req, res) => {
  //  /assets/js/app.js
  console.log(req.url) 
  let filePath = path.join('www', url.fileURLToPath(`file:///${req.url}`)); // 解析请求的路径
  //  www/assets/js/app.js
  console.log(filePath)
  if(fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const isDir = stats.isDirectory();
    if(isDir) {
      filePath = path.join(filePath, 'index.html');
    }
    if(!isDir || fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath); // 读取文件内容
      const { ext } = path.parse(filePath)
      if (ext === '.png') {
        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Cache-Control': 'max-age=86400' // 缓存一天
        });
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8', 
          'Cache-Control': 'max-age=86400' // 缓存一天
        });
        // 浏览器的强缓存策略，在不是通过地址栏访问资源的情况下，需要强制刷新才能更新资源
      }
      return res.end(content); // 返回文件内容
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