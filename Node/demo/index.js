// API网关中有两个重要功能，请求转发和跨域JSONP支持。
const http = require('http')

const server = http.createServer((req, res) => {
  if ('/remote' === req.url) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    return res.end('Hello Remote Page\n')
  } else {
    proxy(req, res)
  }
})

function proxy(req, res) {
  let options = {
    host: req.host,
    port: 3000,
    headers: req.headers,
    path: '/remote',
    agent: false,
    method: 'GET'
  }
  // http.request() 返回一个新的res
  // httpProxy 里面的是一次完整的HTTP请求，于是就有了httpProxy的response
  let httpProxy = http.request(options, (response) => {
    // 将res放到response流里,完成代理功能
    response.pipe(res)
  })
  // 通过pipe方法，使得req有了新的代理请求，即 httpProxy
  req.pipe(httpProxy)
}
server.listen(3000, function() {
  const PORT = server.address().port
  console.log(`Server running at http://127.0.0.1:${PORT}/`)
})


// 请求转发其实就是代理