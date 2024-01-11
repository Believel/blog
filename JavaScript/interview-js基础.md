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