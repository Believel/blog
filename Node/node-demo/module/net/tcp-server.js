// 可以方便地创建TCP服务，监听端口，接收远程客户端的连接
import net from 'net'

function responseData(str, status = 200, desc="OK") {
  return `HTTP/1.1 ${status} ${desc}
  Connection: keep-alive
  Date: ${new Date()}
  Content-Length: ${str.length}
  Content-Type: text/html
  
  ${str}`;
}
// 创建并返回一个 server 对象，它的参数是一个回调函数，这个回调函数会在连接建立的时候被调用
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const matched = data.toString('utf-8').match(/^GET ([/\w]+) HTTP/);
    if (matched) {
      const path = matched[1];
      if (path === '/') {
        // 向浏览器返回内容
        socket.write(responseData('hello world'))
      } else { // 否则返回404状态
        socket.write(responseData('<h1>Not Found</h1>', 404, 'NOT FOUND'));
      }
    }
    // 接收http请求向我们发送的数据
    console.log(`DATA:\n\n${data}`)
  })
  socket.on('close', () => {
    console.log('connection closed,goodbye!\n\n\n')
  })
}).on('error', err => {
  console.log(err)
  throw err
})
// 需要调用 listen 方法才能够与客户端建立连接
server.listen({
  // 如果设置为0.0.0.0，则表示不校验名称及 IP 地址
  // 也就是说只要能访问到运行tcp-server.js的这台服务器，不管是通过哪个 IP 地址或者服务器名访问的，都允许建立连接
  host: '0.0.0.0',
  port: 8090
}, () => {
  console.log('opened server on', server.address())
})