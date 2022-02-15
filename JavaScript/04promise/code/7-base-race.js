const Promise = require('./myPromise')
const fs = require('fs')
const path = require('path')

const parseUrl = url => {
  return path.resolve(__dirname, url)
}
// promise 化：把异步的node中的api转化成promise方法, 只针对 node 方法
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function(err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

// 判断是不是 promise
function isPromise(value) {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    return typeof value.then === 'function'
  }
  return false
}

// 赛跑 谁第一个完成 就用他的结果，如果是失败这个promise就失败，如果第一个是成功就是成功
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = promises.length; i < len; i++) {
      let current = promises[i]
      if (isPromise(current)) {
        current.then(data => {
          resolve(data)
        }, reject)
      } else {
        resolve(current)
      }
    }

  })
}

const p1 = new Promise((resolve) => {
  resolve('hello')
}).then(result => result)
const read = promisify(fs.readFile)
const readPromise = read(parseUrl('../data/name.txt'), 'utf8').then(data => data)

Promise.race([1, 2, p1, readPromise]).then(result => console.log(result))