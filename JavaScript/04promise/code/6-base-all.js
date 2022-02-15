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
const read = promisify(fs.readFile)
read(parseUrl('../data/name.txt'), 'utf8').then(data => console.log(data))

// 判断是不是 promise
function isPromise(value) {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    return typeof value.then === 'function'
  }
  return false
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let arr = []
    let i = 0
    function processData(index, value) {
      arr[index] = value
      if (++i === promises.length) {
        resolve(arr)
      }
    }

    promises.forEach((value, index) => {
      if (isPromise(value)) {
        value.then(data => { // 如果有任何一个 promise 失败了，直接让这个 promise 变成失败
          processData(index, data)
        }, reject)
      } else {
        processData(index, value)
      }
    });

  })
}

const p1 = new Promise((resolve) => {
  resolve('hello')
}).then(result => result)
const readPromise = read(parseUrl('../data/name.txt'), 'utf8').then(data => data)

Promise.all([1, 2, p1, readPromise]).then(result => console.log(result))