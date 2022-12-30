import http from 'http'
import url from 'url'

const responseData = {
  ID: 'lisi',
  Name: '李四',
  RegisterDate: '2022年12月28日'
}

function toHTML(data) {
  return `
    <ul>
      <li><span>账号：</span><span>${data.ID}</span></li>
      <li><span>姓名：</span><span>${data.Name}</span></li>
      <li><span>注册时间：</span><span>${data.RegisterDate}</span></li>
    </ul>
  `
}
// http 模块实现HTTP内容协商
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(`http://${req.headers.host}${req.url}`)
  if (pathname === '/') {
    const accept = req.headers.accept
    if (accept.indexOf('application/json') >= 0) {
      res.writeHead(200, { 'Content-Type': 'application/json'})
      res.end(JSON.stringify(responseData))
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8'})
      res.end(toHTML(responseData))
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html'})
    res.end('<h1>Not Found</h1>')
  }
})
server.listen(8080, () => {
  console.log('opened server on', server.address());
});