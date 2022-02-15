// Promise 是一个类，类只需要用的时候new一下

// 1. 在 new Promise 时需要传递一个执行器函数，executor 这个函数默认就会被立即执行
// 2. 每个 promise 都有三个状态：pending 等待态、fulfilled 成功态、rejected 失败态
// 3. 默认创建一个 promise 是等待态， 默认提供给两个函数 resolve 让 promise 变成成功态， reject 让 promise 变成失败态
// 4. 每个 promise 的实例都具备一个 then 方法， then 方法中传递两个参数：1.成功的回调，2.失败的回调
// 5. 如何让 promise 变成失败态 reject() / 可以抛出一个错误
// 6. 如果多次调用成功或者失败  只会执行第一次，一旦状态变化了，就不能再变成成功或者失败了

const Promise = require('./myPromise')
const promise = new Promise((resolve, reject) => {
  resolve('success')
  // reject('fail')
  // throw new Error('我失败了')

  // 接收异步代码时
  // setTimeout(() => {
  //   resolve('success')
  // }, 1000)

})

// 同一个 promise 实例，可以 then 多次
// 核心就是发布订阅模式
promise.then((success) => {
  console.log('Success', success)
}, (err) => {
  console.log('fail', err)
})

promise.then((success) => {
  console.log('success', success)
}, (err) => {
  console.log('fail', err)
})

