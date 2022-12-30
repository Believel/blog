import http from 'http'
import url from 'url'

// 创建一个HTTP服务，其中参数req表示HTTP请求对象，res表示HTTP响应对象
const server = http.createServer((req, res) => {
  const {pathname} = url.parse(`http://${req.headers.host}${req.url}`);
  if(pathname === '/') {
    // 写入其他HTTP响应头
    res.writeHead(200, {'Content-Type': 'text/html'});
    // 写入HTTP的Body部分
    res.end('<h1>Hello world</h1>');
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Not Found</h1>');
  }
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8080, () => {
  console.log('opened server on', server.address());
});