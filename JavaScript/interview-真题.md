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


