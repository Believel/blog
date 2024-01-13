1. `typeof` 能判断哪些类型
  * 识别所有的值类型
  * 识别函数
  * 判断是否是引用类型（不可再细分）
2. 何时使用 `===`何时使用 `==`
  * == 会隐式的类型转换
3. 值类型和引用类型的区别
4. 手写深拷贝
  * 判断是否是对象
  * 判断是否是数组
  * 递归

5. 如何准确判断一个变量是不是数组？
```js
const a = []

a instanceof Array
```

6. 手写一个简易jQuery,考虑插件和扩展性
  * class 实现
  * 继承或者原型链 扩展插件

7. class的原型本质，怎么理解？

8. this的不同应用场景，如何取值？

> this值：当被执行的时候才确认

  * 1. 作为普通函数调用
  ```js
  function fn() {
    // this === window
    console.log(this)
  }
  fn()
  ```
  * 2. 使用 `call` `apply` `bind` 调用
  ```js
  function fn() {
    // {x: 100}
    console.log(this)
  }

  fn.call({x:100})

  fn.bind({x:100})()
  ```
  * 3. 作为对象方法被调用
  ```js
  const obj = {
    name: 'zhangsan',
    sayHi(){
      // {name: 'zhangsan', sayHi: ƒ}
      console.log(this)
    },
    update() {
      setTimeout(function() {
        // this === window
        console.log(this)
      }, 1000)
    }
  }

  obj.sayHi()
  obj.update()
  ```
  * 4. 在 `class` 方法中调用
  ```js
   class People {
      constructor(name) {
        this.name = name
      }
      sayHello() {
        // People {name: 'lisi'}
        console.log(this)
      }
    }

    const p = new People('lisi')
    p.sayHello()
  ```
  * 5. 箭头函数中调用

  ```js
  const obj = {
    name: 'zhangsan',
    update() {
      setTimeout(() => {
        // 箭头函数中指向上层作用域
        // {name: 'zhangsan', sayHi: ƒ}
        console.log(this)
      }, 1000)
    }
  }
  obj.update()
  ```

9. 手写bind函数
```js
  Function.prototype.myBind = function() {
    // 解析参数为数组
    const args = [].slice.call(arguments)
    // 取出参数第一项
    const context = args.shift()
    // 当前函数
    const that = this
    // 返回一个函数
    return function() {
      // 执行原函数，并返回结果
      return that.apply(obj, args.concat(...arguments))
    }
  }

  function foo(...args) {
    console.log(this, ...args)
  }

  let obj = {
    name: 'zpp'
  }

  foo.myBind(obj, '1')('2', '3')
```

10. 实际开发中闭包的应用场景，举例说明
  * 1. 隐藏数据，只提供 API
  ```js
  function createCache() {
      let data = {}  // 闭包中的数据，被隐藏，不被外界访问
      return {
          set: function (key, val) {
              data[key] = val
          },
          get: function (key) {
              return data[key]
          }
      }
  }
  let c = createCache()
  c.set('a', 100)
  console.log( c.get('a') )
  ```
  * 2. 创建 10 个 a 标签，点击的时候弹出来对应的序号
  ```js
    for(var i = 0; i < 10; i++) {
      const a = document.createElement('a')
      a.innerText = i + '<br/>'

      a.addEventListener('click',
      // 闭包
      function(v) {
        return function() {
          alert(v)
        }
      }(i))
      document.body.appendChild(a)
    }
  ```

11. 闭包
  * 定义：函数中能够访问其定义时的环境中的变量
  * 自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方！！！

  * 作用域应用的特殊情况，有两种表现：
    * 1. 函数作为参数被传递
    ```js
     function print(fn) {
      let a = 200
      fn()
    }
    let a = 100
    function fn1() {
      console.log(a)
    }

    print(fn1) // 100
    ```
    * 2. 函数作为返回值被返回
    ```js
    function create() {
      let a = 100
      return function() {
        console.log(a)
      }
    }
    let fn = create()
    let a = 200
    fn() // 100
    ```

12. 同步和异步的区别是什么？分别举一个同步和异步的例子
  * 单线程
    * JS是单线程语言，只能同时做一件事
    * 浏览器和nodejs已支持JS启动进程，如Web Worker
    * JS和DOM渲染共用同一个线程，因为JS可修改DOM结构
    * 遇到等待（网络请求，定时任务）不能卡住
    * 需要异步
    * 回调 callback 函数形式
  * 同步和异步
    * 基于JS是单线程语言
    * 异步不会阻塞代码执行
    * 同步会阻塞代码执行

13. 一个关于`setTimeout`的笔试题
```js
  console.log(1)
  setTimeout(function() {
    console.log(2)
  }, 1000)
  console.log(3)
  setTimeout(function() {
    console.log(4)
  }, 0)
  console.log(5)

//  1 3 5 4 2
```

14. 手写用 Promise 加载一张图片
```js
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error(`图片加载失败${src}`))
    }
    img.src = src
  })
}
```

15. 前端使用异步的场景有哪些
  * 网络请求，如ajax图片加载
  * 定时任务，如setTimeout
17. DOM操作
  1. 编写一个通用的事件监听函数
  ```js
   function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
      fn = selector
      selector = null
    }

    elem.addEventListener(type, event => {
      const target = event.target
      if (selector) {
        // 代理绑定
        if (target.matches(selector)) {
          fn.call(target, event)
        }
      } else {
        // 普通绑定
        fn.call(target, event)
      }
    })
   }
  ```
  2. 描述事件冒泡的流程
    * 基于DOM树形结构
    * 事件会顺着触发元素往上冒泡
    * 应用场景：事件代理
  3. 无限下拉的图片列表，如何监听每个图片的点击？
    * 事件代理
    * 用`e.target`获取触发元素
    * 用`matches`来判断是否是触发元素

  4. 事件绑定、事件冒泡、事件代理
  ```js
  // 事件绑定
  const btn = document.getElementById('btn')
  btn.addEventListener('click', event => {
    console.log('clicked')
  })

  // 事件代理
    // 代码简洁、减少浏览器内存占用、但是，不要滥用
  ```
  5. ajax 的核心API - XMLHttpRequest
  ```js
  // get请求
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api', false)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert(xhr.responseText)
        }
      }
    }
    xhr.send(null)
  ```

  6. 什么是浏览器的同源策略
    * 同源策略
      * ajax请求时，浏览器要求当前网页和server必须同源（安全）
      * 同源：协议、域名、端口，三者必须一致
      * 加载图片css js可无视同源策略
        * <img src=跨域的图片地址/>
        * <link href=跨域的css地址/>
        * <script src=跨域的js地址></script>
        * <img/>可用于统计打点，可使用第三方统计服务
        * <link/><script>可使用CDN，CDN一般都是外域
        * <script></script>可使用JSONP
    * 跨域
      * 所有的跨域，都必须经过server端允许和配合
      * 未经server端允许就实现跨域，说明浏览器有漏洞，危险信号

  7. 实现跨域的常见方式 - jsonp 和 CORS
    * jsonp
    ```js
    // 写好自己提前定义的callback名字
    window.jsonpcallback = function(data) {
      console.log(data)
    }
    <script src="http://127.0.0.1:9001/jsonp.js?callback=jsonpcallback"></script>

    // jsonp.js
    jsonpcallback(
      {
        name: 'zhangsan'
      }
    )
    ```
    * CORS
    ```js
    // 服务器设置 http header
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
    response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    // 设置接收跨域的 cookie
    response.setHeader('Access-Control-Allow-Credentials', 'true')
    ```

  8. 实际项目中 ajax 的常用插件
    * jQuery
    * Fetch
    * axios

  9. 如何理解 `cookie`
    * 本身用于浏览器和server通讯
    * 被“借用”到本地存储来
    * 可用`document.cookie=''`来修改
    * `cookie` 的缺点：
      * 存储大小，最大4kB
      * http请求时需要发送到服务端，增加请求数据量
      * 只能用`document.cookie=''`来修改，太过简陋

  10. `localStorage` `SessionStorage` 和 `cookie` 的区别
    * `localStorage` 和 `sessionStorage`
      * `HTML5`专门为存储而设计，最大可存5M
      * API简单易用`setItem` `getItem`
      * 不会随着`http`请求被发送出去
      * 区别
        * `localStorage`数据会永久存储，除非代码或手动删除
        * `sessionStorage`数据只存在当前会话，浏览器关闭则清空
18. http面试题
  1. http 常见的状态码有哪些
    * 状态码分类
      * 1xx 服务器收到请求
      * 2xx 请求成功，如 200
      * 3xx 重定向，如 302
        * `301` 永久重定向（配合 `location`,浏览器自动处理）
        * `302` 临时重定向（配合 `location`,浏览器自动处理）
        * `304` 资源未被修改
      * 4xx 客户端错误，如
        * `404` 资源未找到
        * `403` 没有权限
      * 5xx 服务端错误，如
        * `500` 服务器错误
        * `504` 网关超时
  2. http 常见的 header 有哪些
    * Request Headers
      * Accept 浏览器可接收的数据格式
      * Accept-Encoding 浏览器可接收的压缩算法，如`gzip`
      * Accept-Languange 浏览器可接收的语言，如`zh-CN`
      * Connection:keep-alive 一次TCP连接重复使用
      * Cookie
      * Host
      * User-Agent 浏览器信息
      * Content-type 发送数据的格式
    * Response Headers
      * Content-type 返回数据的格式，如`application/json`
      * `Content-length` 返回数据的大小，多少字节
      * Content-Encoding 返回数据的压缩算法，如gzip
      * Set-Cookie

  3. 什么是 Restful API
    * 一种新的 API 设计方法
    * 传统API设计：把每个url当做一个功能
    * Restful API 设计：把每个url当做一个唯一的资源
  4. 描述一下 http 的缓存机制（重要）
    * 缓存：缓存策略可以降低资源的重复加载提高网页的整体加载速度。
    * 强制缓存

      > 实现强缓存可以通过两种响应头实现：`Expires` 和 `Cache-Control` 。强缓存表示在缓存期间不需要请求，state code 为 200

      ```js
      // HTTP/1.0
      // 受限于本地时间，如果修改了本地时间，可能会造成缓存失效
      Expires: Wed, 22 Oct 2018 08:41:00 GMT

      // HTTP/1.1  优先级高于 Expires
      // 表示资源会在30s后过期，需要再次请求
      Cache-control: max-age=30
      Cache-control: no-store   // 拒绝一切形式的缓存
      Cache-control: no-cache   // 是否每次都需要向服务器进行缓存有效确认
      Cache-control:  private / public // 考虑该资源是否可以被代理服务器缓存
      ```
    * 协商缓存（对比缓存）

    > 服务器端缓存策略，服务器判断客户端资源，是否和服务端资源一样，一致则返回304，否则返回200和最新的资源

      * 方式1：`Last-Modified` 和 `If-Modified-Since`
      ```js
        Last-Modified 表示本地文件最后修改日期   - Response Headers
        If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否更新 (Request Headers)

        但是如果本地打开了缓存文件，就会造成last-modified被修改，所以在 http/1.1 出现了 ETag

        弊端：不能感知文件内容的变化
      ```
      * 方式2： `ETag` 和 `If-None-Match`

      ```js
      ETag 类似于文件指纹，If-None-Match 会将当亲 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来
      ETag 是由服务器为每个资源生成的唯一的标识字符串，这个标识字符串是基于文件内容编码的，只要文件内容不同，他们对应的Etag就是不同的，反之亦然。因此ETag能够精准的感知文件的变化。

      并且 ETag 的优先级高于 Last-Modified
      // Response Headers: 当首次请求时，我们会在响应头里获取一个最初的标识字符串
      ETag: W/"2a3b-1602480f459"

      // Request Headers: 下一次请求时，请求头里就会带上一个值相同的。名为if-none-match的字符串供服务器比对：
      If-None-Match: W/"2a3b-1602480f459"

      Etag 的生成过程需要服务器额外付出开销，会影响服务端的性能，这是它的弊端
      ```
    * 刷新操作对缓存的影响
      * 正常操作：地址栏输入url,跳转链接，前进后退等
        * 强制缓存有效，协商缓存有效
      * 手动刷新：F5,点击刷新按钮，右击菜单刷新
        * 强制缓存失效，协商缓存有效
      * 强制刷新：ctl + F5
        * 强制缓存失效，协商缓存失效

19. 从输入url到渲染出页面的整个过程
  * 加载资源的形式
    * html 代码
    * 媒体文件，如图片、视频等
    * javascript css

  * 加载资源的过程
    1. DNS 解析：域名 -> IP地址
    2. 浏览器根据 IP 地址向服务器发起http请求
    3. 服务器处理http请求，并返回给浏览器

  * 渲染页面的过程
    1. 根据 HTML 代码生成 DOM Tree
    2. 根据 CSS 代码生成 CSSOM
    3. 将 DOM Tree 和 CSSOM 整合生成 Render Tree
    4. 根据 Render Tree 来布局，计算每个节点的位置
    5. 遇到 <script></script>则暂停渲染，优先加载并执行JS代码，完成再继续
    6. 调用 GPU 绘制，合成图层，显示在屏幕上

20. `window.onload` 和 `DOMContentLoaded` 的区别
  * load 事件触发代表页面中的DOM、CSS、JS，图片,视频已经全部加载完毕
  ```js
  window.addEventListener('load', function(){})
  ```
  * DOMContentLoaded 事件触发代表初始HTML被完全加载和解析，不需要等待CSS、JS,图片，视频加载
  ```js
  document.addEventListener('DOMContentLoaded', function(){})
  ```

21. 安全
  1. 常见的web前端攻击方式有哪些？
    * XSS 跨站请求攻击（Cross-site Script）
      * 场景：一个博客网站，我发表一篇博客，其中嵌入`<script>`脚本,脚本内容：获取cookie，发送到我的服务器（服务器配合跨域），发布这篇博客，有人查看它，我轻松收割访问者的cookie
      * 如何预防
        * 替换特殊字符，如 `<` 变成`$lt`; `>` 变为`$gt`
        * 前端要替换，后端也要替换，都做总不会出错

    * XSRF 跨站请求伪造（Cross Site Request Forgery）
      * 场景：你正在购物，看中了某个商品，商品id是100，付费接口是`xxx.com/pay?id=100`但是没有任何验证；我是攻击者，我看中一个商品，id是200；我向你发送一个电子邮件，邮件标题很吸引人，但是邮件正文隐藏着`<img src=xxx.com/>pay?id=200 />`;你一查看邮件，就帮我购买了id是200的商品
      * 如何预防？
        * get请求不对数据进行修改；使用post接口
        * 不让第三方网站访问到用户cookie；
        * 阻止第三方网站请求接口；
        * 请求时附带验证信息



