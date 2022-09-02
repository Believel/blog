import http from 'http'
import HttpServer from '../src/http-serve'
describe('http-serve', () => {
  let server: HttpServer;
  // 单元测试开始创建一个实例，监听端口8099的服务
  beforeEach(() => {
    server = new HttpServer({})
    server.listen(8099)
  })
  // 单元测试结束关闭
  afterEach(() => {
    server.close()
  })
  it('should listen port', (done) => {
    http.request({
      method: 'GET',
      hostname: 'localhost',
      port: 8099
    }).end(() => {
      done()
    })
  })
})