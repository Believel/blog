export default {
  // 支持值为 Object 和 Array
  'GET /api/user': { users: [1, 2] },
  // GET 可忽略
  '/api/user/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /api/user/create': (req: any, res: any) => {
    // 添加跨域请求头
    req.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  }
}