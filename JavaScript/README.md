# JavaScript
1. ![prototype](https://images0.cnblogs.com/blog/138012/201409/181637013624694.png)
2. Promise

## es6
1. `var` 和 `let`
* `let` 不存在变量提升
* `let` 暂时性死区
```js
// 只要块级作用域内存在 let 命名，它所声明的变量就 绑定 这个区域，不再受外部的影响
var temp = 123
if (true) {
  tmp = 'abc' // ReferenceError
  let tmp
}
```
* 不允许重复声明
* 块级作用域
  * ES5 只有全局作用域和函数作用域


## 存储

特性 | cookie | localStorage | sessionStorage | indexDB
---|---|---|---|---
数据生命周期 | 一般由服务器生成，可以设置过期时间| 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在
数据存储大小 | 4k | 5M | 5M |无限
与服务器端通信 | 每次都会携带在 header 中，对于请求性能影响 | 不参与 | 不参与 | 不参与

## 渲染机制
1. 处理 HTML 并构建 DOM树
2. 处理 CSS 构建 CSSOM树
3. 将 DOM 和 CSSOM 合并成一个渲染树
4. 根据渲染树来布局，计算每个节点的位置
5. 调用 GPU 绘制，合成图层，显示在屏幕上

## Load 和 DOMContentLoaded区别
1. load 事件触发代表页面中的DOM、CSS、JS，图片已经全部加载完毕
2. DOMContentLoaded 事件触发代表初始HTML被完全加载和解析，不需要等待CSS、JS,图片加载

## 重绘(Repaint)和回流(Reflow)
1. Repaint: 当节点需要更改外观而不影响布局的，比如改变`color`就叫重绘
2. Reflow: 布局或几何属性需要改变就称为回流

> 回流必定会发生重绘，重绘不一定会引发回流

### 减少重绘和回流
* 使用`translate`替代`top`
* 使用 `visibility` 替代`display:none`
* 不用使用 table布局

## 性能
1. DNS与解析
```html
// DNS 解析需要时间，可以通过预解析的方式来预先获得域名所对应的 IP
<link rel="dns-prefetch" href="//yuchengkai.cn" />
```
2. 缓存：缓存策略可以降低资源的重复加载提高网页的整体加载速度。
  * 2.1 强缓存
  
  > 实现强缓存可以通过两种响应头实现：`Expires` 和 `Cache-Control` 。强缓存表示在缓存期间不需要请求，state code 为 200

  ```js
  // HTTP/1.0
  // 受限于本地时间，如果修改了本地时间，可能会造成缓存失效
  Expires: Wed, 22 Oct 2018 08:41:00 GMT

  // HTTP/1.1  优先级高于 Expires
  // 表示资源会在30s后过期，需要再次请求
  Cache-control: max-age=30
  ```

  * 2.2 协商缓存
    * 方式1：`Last-Modified` 和 `If-Modified-Since`
    ```js
      Last-Modified 表示本地文件最后修改日期
      If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否更新

      但是如果本地打开了缓存文件，就会造成last-modified被修改，所以在 http/1.1 出现了 ETag
    ```
    * 方式2： `ETag` 和 `If-None-Match`

    ```js
    ETag 类似于文件指纹，If-None-Match 会将当亲 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来

    并且 ETag 的优先级高于 Last-Modified
    ```

## 安全
1. XSS : Cross-site Script 跨网站指令码， 是代码注入的一种
  * 如何防御：转义输出的内容
2. CSRF：跨站请求伪造（Cross Site Request Forgery）， 利用用户的登录态发起恶意请求。
  * 如何防御：get请求不对数据进行修改；不让第三方网站访问到用户cookie；阻止第三方网站请求接口；请求时附带验证信息

## HTTP
1. http/1.0和http/1.1有什么区别
  * 长链接：http/1.1支持长连接和请求的流水线，在一个TCP连接上可以传送多个http请求，避免了因为多次建立TCP连接的时间消耗和延时
  * 缓存处理：http/1.1引入了Etag、if-none-match
  * 带宽优化及网络控制缓存
  * Host 头处理

2. HTTP/2.0新特性
  * 多路复用：即多个请求都通过一个TCP连接并发地完成
  * 服务端推送：服务端能够主动把资源推送给客户端
    * 指的是，还没有收到浏览器的请求，服务器就把各种资源推送给浏览器 
      * 比如，浏览器只请求了index.html，但是服务器把index.html、style.css、example.png全部发送给浏览器。这样的话，只需要一轮 HTTP 通信，浏览器就得到了全部资源，提高了性能。
  * 新的二进制格式：HTTP/2 采用二进制格式传输数据，相比于HTTP/1.1的文本格式，二进制格式具有更好的解析性和拓展性
  * header压缩：http/2 压缩消息头，减少了传输数据的大小

## 在浏览器输入URL回车之后发生了什么

> https://zhuanlan.zhihu.com/p/80551769

* URL解析
* DNS查询
* TCP连接
* 处理请求
* 接受响应
* 渲染页面


## 正则表达式，千分位分隔符
```js
function thousand(num) {
  // $& 最后匹配的字符
  // exp1(?=exp2) 查找exp2前面的exp1
  return (num+'').replace(/\d(?=(\d{3})+$)/g, "$&,")
}
console.log(thousand(1234567))
```