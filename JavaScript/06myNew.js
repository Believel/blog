// new 操作符用于创建一个给定函数的实例对象
function myNew() {
  // 1. 新生成一个对象
  const obj = Object.create()
  // 2. 获得构造函数
  const fn = [].shift.call(arguments)
  // 3. 新对象原型指向构造函数原型对象
  obj.__proto__ = fn.prototype
  // 4. 将构造函数的this指向新对象
  const result = fn.apply(obj, arguments)
  // 5. 根据返回值判断
  return result instanceof Object ? result : obj
}

// 闭包
// for (var i =0; i < 10; i++) {
//   setTimeout(function timer() {
//     console.log(i)
//   }, i * 1000)
// }
// 每隔10毫秒打印： 10
// 打印10次

// 方式1: 使用let:会创建一个块级作用域
// for (let i =0; i < 10; i++) {
//   setTimeout(function timer() {
//     console.log(i)
//   }, i * 1000)
// }
// 方式2：闭包
// for (var i =0; i < 10; i++) {
//   (function(i){
//     setTimeout(function timer() {
//       console.log(i)
//     }, i * 1000)
//   })(i)
// }
// 方式3： setTimeout 传第三个参数
// for (var i =0; i < 10; i++) {
//   setTimeout(function timer(i) {
//     console.log(i)
//   }, i * 1000, i)
// }

// 深浅copy

let a = {
  age: 1,
  jobs: {
    first: 'FE'
  },
  name: undefined,
  sex: Symbol('female')
}
// 浅拷贝
// let b = {...a}
// let b = Object.assign({}, a)
// b.age = 2

// console.log(a)

// 深拷贝
// 会忽略undefined,symbol, 不能序列化函数，不能解决循环引用的对象
// const b = JSON.parse(JSON.stringify(a))
// b.jobs.first = 'native'
// console.log(b)

function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
function isObject2(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
function deepCopy(sourceObj) {
  if (!isObject(sourceObj)) {
    return sourceObj
  }
  const result = Array.isArray(sourceObj) ? [] : {}
  for (let i in sourceObj) {
    if (isObject(sourceObj[i])) {
      result[i] = deepCopy(sourceObj[i])
    } else {
      result[i] = sourceObj[i]
    }
  }
  return result
}
const b = deepCopy(a)
b.jobs.first = 'native'
console.log(a)
