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