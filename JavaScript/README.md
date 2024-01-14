# JavaScript
1. ![prototype](https://images0.cnblogs.com/blog/138012/201409/181637013624694.png)
2. Promise

## 存储

特性 | cookie | localStorage | sessionStorage | indexDB
---|---|---|---|---
数据生命周期 | 一般由服务器生成，可以设置过期时间| 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在
数据存储大小 | 4k | 5M | 5M |无限
与服务器端通信 | 每次都会携带在 header 中，对于请求性能影响;服务端也可以写cookie到客户端 | 不参与 | 不参与 | 不参与

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


## 正则表达式，千分位分隔符
```js
function thousand(num) {
  // $& 最后匹配的字符
  // exp1(?=exp2) 查找exp2前面的exp1
  return (num+'').replace(/\d(?=(\d{3})+$)/g, "$&,")
}
console.log(thousand(1234567))
```

## 上拉加载

> 页面触底，或者快要触底时动作, 触底公式：`scrollTop + clientHeight >= scrollHeight`
## 下拉刷新
> 页面本身置于顶部时，用户下拉时需要出发的动作

## 单点登录

> `SSO`在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统

1. `SSO`一般都需要一个独立的认证中心（passport）,子系统的登录均得通过passport,子系统本身将不参与登录操作

2. 同域名下的单点登录

> a.b.com; sso.b.com

  * 要求建立在一个共同的主域名下，如`a.b.com`和`sso.b.com`，他们都建在在`b.com`这个主域名下，那么它们可以将Cookie的domain属性设置为父域的域名（主域名），同事将Cookie的path属性设置为根路径，将Session ID(或token)保存在父域名中.这样所有的子域应用就都可以访问到这个Cookie

## 本地存储
1. cookie
  * 大小 - 4KB
  * 存储少量的信息
  * cookie 是区别在顶级域名下，二级域名可以共享

> Cookie实现跨域共享要求根域必须是一样才行，比如都是www.baidu.com和map.baidu.com的根域都是 baidu.com

* Cookie的域和路径
  * Cookie是不可以跨域的，隐私安全机制禁止网站非法获取其他网站(域)的Cookie。概念上咱不用长篇大论，举个例子你应该就懂了：

 > 淘宝有两个页面：A页面`a.taotao.com/index.html`和B页面`b.taotao.com/index.html`，默认情况下A页面和B页面的Cookie是互相独立不能共享的。若现在有需要共享（如单点登录共享token ），我们只需要这么做：将A/B页面创建的Cookie的`path`设置为“/”，`domain`设置为“.taobtao.com”，那么位于a.taotao.com和b.taotao.com域下的所有页面都可以访问到这个Cookie了。

  * `domain`：创建此cookie的服务器主机名（or域名），服务端设置。但是不能将其设置为服务器所属域之外的域（若这都允许的话，你把Cookie的域都设置为baidu.com，那百度每次请求岂不要“累死”）
    * 注：端口和域无关，也就是说Cookie的域是不包括端口的
  * `path`：域下的哪些目录可以访问此cookie，默认为`/`，表示所有目录均可访问此cookie
2. web storage
  * local Storage
    * 持久化的本地存储，存储在其中的数据是永远不会过期，除非手动删除
    * 遵循同源策略
  * session Storage
    * 临时性的本地存储，它是会话级别的存储，当会话结束（页面被关闭）时，存储内容也随之被释放
    * 遵循同源策略, 即便是相同域名下的两个页面，只要它们不在同一个浏览器窗口中打开，那么它们的 Session Storage 内容便无法共享。
  * 上面两个特性
    * 存储容量大： Web Storage 根据浏览器的不同，存储容量可以达到 5-10M 之间。
    * 仅位于浏览器端，不与服务端发生通信。
3. indexedDB
  * 一个运行在浏览器上的非关系型数据库。理论上来说，IndexedDB 是没有存储上限的（一般来说不会小于 250M）。它不仅可以存储字符串，还可以存储二进制数据。

## `CDN`的缓存与回源机制解析
1. CDN 的核心点
  * 缓存： 我们把资源copy一份到CDN服务器上这个过程
  * 回源：CDN 发现自己没有这个资源（一般是缓存的数据过期了），转头向根服务器（或者它的上层服务器）去要这个资源的过程
2. CDN 往往被用来存放静态资源
