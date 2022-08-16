# CSS
1. 盒子模型
2. display
3. float
4. position

# 前端首屏优化
1. 交给DNS域名解析 -> 找到对应的IP地址 -> 然后进行TCP连接 -> 浏览器发送HTTP请求 -> 服务器接收请求 -> 服务器处理请求并返回HTTP报文 -> 以及浏览器接收并解析渲染页面通过缩短请求时间，从而加快网站的访问速度，提升性能

## 常见的几种SPA首屏优化方式
1. 减少入口文件体积
  * 路由懒加载
  * 静态资源引入CDN
2. 静态资源本地缓存
  * 后端资源采用HTTP缓存，设置`Cache-Control`,`Last-modified`,`Etag`等响应头
3. UI框架按需加载
4. 图片资源的压缩
5. 组件重复打包
6. 开启GZip压缩
7. 使用SSR

# BFC(Blocking Formating Context)块级格式化上下文
## 什么情况下触发BFC
1. 根元素（html）
2. float 属性不为none
3. position 为absolute或fixed
4. display 为inline-block，table-cell,table-caption,flex,inline-flex等
5. overflow不为visible