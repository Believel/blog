const wait = function() {
  // 定义一个 promise 对象
  const promise = new Promise((resove, reject) => {
    // 将之前的异步操作，包括到这个 new Promise 函数之内
    const task = function() {
      console.log('执行完成')
      resove() // callback 中去执行 resolve 或者 reject
    }
    setTimeout(task, 1000)
  })
  // 返回 promise 对象
  return promise
}
const w = wait()
w.then(() => {
  console.log('ok 1')
}).then(() => {
  console.log('ok 2')
})

// node
const fs = require('fs')
const path = require('path')
const readFilePromise = function(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.toString())
      }
    })
  })
}
const fullName = path.resolve(__dirname, './data/data.json')
const result1 = readFilePromise(fullName)
const fullName2 = path.resolve(__dirname, './data/data2.json');
const result2 = readFilePromise(fullName2)
Promise.all([result1, result2]).then(datas => {
  console.log(datas[0])
  console.log(datas[1])
})

// 对标 Promise/A+ 规范
// promise 可能有三种状态：等待(pending)、已完成(fulfilled)、已拒绝(rejected)
// Promise 只是对于异步操作代码可读性的一种变化，它并没有改变`JS`异步执行的本质，也没有改变JS中存在`callback`的现象
