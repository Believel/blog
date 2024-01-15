1. `var` 和 `let const` 的区别
  * `var` 是ES5语法，`let const` 是ES6语法；`var` 有变量提升
  * `var` 和 `let`是变量，可修改；`const`是常量，不可修改；
  * `let``const`有块级作用域（ES5 只有全局作用域和函数作用域），`var`没有

2. `typeof` 能判断哪些类型
  * undefined string number boolean symbol
  * object(注意,`typeof null === 'object'`)
  * funtion

3. 列举强制类型转换和隐式类型转换
  * 强制：`parseInt` `parseFloat` `toString`等
  * 隐式：if、逻辑运算、==、+ 拼接字符串

4. 手写深度比较，模拟 lodash isEqual
```js
// 测试代码
const obj1 = { a: 10, b: { x: 100, y: 200 }}
const obj2 = { a: 10, b: { x: 100, y: 200 }}
isEqual(obj1, obj2) === true

function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
function isEqual(data1, data2) {
  if (!isObject(data1) || !isObject(data2)) {
    return data1 === data2
  }
  // 是同一个的对象
  if (data1 === data2) {
    return true
  }
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)

  // 比较对象的键个数是否相等
  if (keys1.length !== keys2.length) {
    return false
  }
  // 比较每个键值是否相等
  for (let key in data1) {
    // 递归
    const res = isEqual(data1[key], data2[key])
    if (!res) {
      return false
    }
  }
  return true
}

```

5. 数组的 pop push unshift shift 分别是什么

> 回答方式：功能是什么？返回值是什么？是否会对原数组造成影响？

  * `pop` 从尾部删除一个数组项，返回删除的那项值，会影响原数组
  * `push` 从尾部添加一个值到数组中，返回数组的长度，会影响原数组
  * `unshift` 从头部添加一个值到数组中，返回数组长度，会影响原数组
  * `shift` 从头部删除一个数组项，返回删除的那项值，会影响原数组

> 不影响原数组的API: `concat`,`map`,`filter`,`slice`

6. 数组`slice`和`splice`的区别
  * `slice` 返回一个新数组，这个数组是由 start 索引（包括）和 end 索引（不包括）决定的原数组的浅拷贝，原数组不会改变
  * `splice` 移除或替换已存在的元素或添加新元素，改变原数组, 返回包含删除元素的数组
7. [10, 20, 30].map(parseInt) 返回结果是什么？
  * 返回：`[10, NaN, NaN]`
  * 解释：parseInt(string, radix) 其中string: 是要被解析的值，radix: 表示进制的基数（2-36）, 假如指定 0 或未指定，基数将会根据字符串的值进行推算
8. ajax 请求 get 和 post 的区别？
  * get 一般用于查询操作，post一般用户提交操作
  * get 参数拼接在url上，post放在请求体内（数据体积更大）
  * 安全性：post 易于防止 CSRF
9. 函数 `call` 和 `apply` 的区别
10. 事件代理（委托）是什么
11. 闭包是什么，有什么特性？有什么负面影响
12. 如何阻止事件冒泡和默认行为？
  * e.stopPropagation() 阻止冒泡
  * e.preventDefault()  阻止默认行为

13. 查找、添加、删除、移动DOM节点的方法？
  * 查找：`getELementById` `getElementsByTagName` `getElementsByClassName` `querySelectorAll` `querySelector`
  * 添加: 先创建节点`document.createElement`，再 `appendChild`
  * 删除: `removeChild`
  * 移动: 先获取元素，再`appendChild`
14. 如何减少DOM操作？
  * 缓存 DOM 查询结果
  * 多次 DOM 操作，合并到一次插入

15. 解释 jsonp 的原理，为何它不是真正的 ajax
  * 浏览器的同源策略（服务端没有同源策略）和跨域
  * 哪些html标签能绕过跨域？
  * jsonp 的原理

16. 函数声明和函数表达式的区别
  * 函数声明function fn(){}
  * 函数表达式const fn = function(){}
  * 函数声明会在代码执行前预加载，而函数表达式不会

17. `new Object()` 和 `Object.create()`的区别
  * {} 等同于 `new Object()`,原型`Object.prototype`
  * `Object.create(null)` 没有原型
  * `Object.create({})` 可指定原型

18. 关于作用域和自由变量的场景题
```js
let a = 100
function test() {
  console.log('1:', a) // 100
  a = 10
  console.log('2:', a) // 10
}
test()
console.log('3:', a) // 10
```

19. 判断字符串以字母开头，后面字母数字下划线，长度6-30
  ```js
  /^(a-zA-z)\w{5, 29}$/
  ```

20. 手写字符串 `trim` 方法，保证浏览器兼容性
```js
// 方式1
function trim(str) {
  return str.replace(/^\s+|\s+$/, '')
}

// 方式2
String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '')
}
```

21. 如何获取多个数字中的最大值
```js
// 方式1
Math.max(10, 30, 20, 40)

// 方式2
function max() {
  // 多个参数转为数组
  const nums = [].slice.call(arguments)
  let max = 0

  nums.forEach(n => {
    if (n > max) {
      max = n
    }
  })
  return max
}
```

22. 如何捕获JS程序中的异常
```js
try {
  // todo
} catch(e){
  // 手动捕获异常
  console.error(e)
}

// 自动捕获
window.onerror = function(message, source, lineNum, colNum, error) {
  // 第一，对跨域的js，如 CDN 的，不会有详细的报错信息
  // 第二，对于压缩的js，还要配合 sourceMap 反查到未压缩的行、列
}
```

23. 什么是 JSON
  * json 是一种数据格式，本质是一段字符串
  * json 格式和 JS 对象结构一致，对JS语言更友好
  * window.JSON是一个全局对象：`JSON.stringify` `JSON.parse`

24. 获取当前页面 url 参数
```js
// location.search = '?a=1&b=23&name=zs'

function query(name) {
   const search = location.search.substr(1)
   const reg = new RegExp((`^|&)${name}=([^&]*)(&|$)`, 'i')
   const res = search.match(reg)
   if (res === null) {
    return null
   }
   return res[2]
}

function format() {
  const str = location.search.slice(1)
  const strArr = str.split('&')
  let obj = {}
  strArr.forEach(s => {
    const arr = s.split('=')
    obj[arr[0]] = arr[1]
  })
  return obj
}

// 方式2：新API
const paramsString = "q=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);

// Iterating the search parameters
for (const p of searchParams) {
  console.log(p);
}

// searchParams.get('q')
```

25. 介绍一下 requestAnimationFrame
  * 要想动画流畅，更新频率要 60帧/s,即 16.67ms更新一次视图
  * setTimeout 要手动控制频率，而 RAF 浏览器会自动控制
  * 后台标签或隐藏 iframe中，RAF 会暂停，而 setTimeout 依然执行

26. 前端性能如何优化？一般从那几个方面考虑？
  * 原则：多使用内存、缓存，减少计算、减少网络请求
  * 方向：加载页面，页面渲染，页面操作流畅度

27. Map 和 Set
  * 有序和无序
    * Object 无序，Array 有序
    * 有序：操作慢
    * 无序：操作快，但无序
    * 如何结合两者优点呢？—— 二叉树、及其变种

  * Map 和 Object 的区别
    * API 不同，Map 可以以任意类型为 key
    * Map 是有序结构（重要）
    * Map 操作同样很快

    ```js
    const m = new Map([
      ['key1', 'hello'],
      ['key2', 100]
    ])
    // m.set('name', 'zs')   // 添加
    // m.set('key1', 'hello world') // 修改
    // m.delete('key2')    // 删除
    // m.has('key1')    // 是否有值
    // m.size           // 获取长度大小

    // Map 有序输出
     m.forEach((value, key) => {
      // value 键值
      // key 键
      console.log(value, key)
    })

    // Object 无序
    const obj = {
      2: 200,
      3: 300,
      1: 100
    }
    console.log(Object.keys(obj)) // ['1', '2', '3']

    ```

  * Set 和 Array 的区别
    * API 不同
    ```js
    const set = new Set([10, 20, 30, 40])
    set.add(50)
    set.delete(20)
    set.has(30)
    set.size
    set.forEach(val => console.log(val)) // 没有 index
    ```
    * Set 元素不能重复
      * 场景：数组去重 `[...new Set([1,1, 2])]`
    * Set 是无序结构，操作很快
    ```js
    const arr = []
    for (let i = 0; i < 100 * 10000; i++) {
      arr.push(i)
    }

    console.time('arr unshift')
    arr.unshift('a') // 往前插入很慢
    console.timeEnd('arr unshift')

    console.time('arr push')
    arr.push('b')
    console.timeEnd('arr push')

    const set = new Set()
    for (let i = 0; i < 100 * 10000; i++) {
      set.add(i)
    }

    console.time('set add')
    set.add('a')
    console.timeEnd('set add')
    ```

28. WeakMap 和 WeakSet
  * 弱引用，防止内存泄露
  ```js
  const wMap = new WeakMap()

  function fn() {
    const obj = { name: 'zs' }
    wMap.set(obj, 'name info')
  }
  fn()
  console.log(wMap) // 弱引用，里面是没值的

  // WeakMap 场景
  const userInfo = { name: 'zs'}
  const cityInfo = { name: 'beijing' }
  wMap.set(userInfo, cityInfo) // 建立一种关联关系，而且两者保持独立，而且互不影响
  ```
  * WeakMap 只能用对象作为 key, WeakSet 只能用对象作为 value
  * 没有 forEach 和 size,只能用 add delete has







