const fs = require('fs')
const path = require('path')

const Promise = require('./myPromise')

const parseUrl = (url) => {
  return path.resolve(__dirname, url)
}

function read(name, type) {
  return new Promise((resolve, reject) => {
    fs.readFile(parseUrl(name), type, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

const promise = read('../data/name.txt', 'utf8').then(data => {
  return data
})

// promise 是通过链式调用的方式解决这个问题
// promise.then(data => {
//   read(`../data/${data}`, 'utf-8').then(data => {
//     console.log(data)
//   })
// })


// 成功的回调和失败的回调都可以返回一个结果
// 情况1： 如果返回的是一个promise，那么会让这个promise执行，并且采用他的状态
//        将成功或者失败的结果传递给外层的下一个then中
// 情况2：如果返回的是一个普通值会把这个值作为外层的下一次then的成功的回调中
// 情况3：抛出一个异常

promise.then(data => {
  return read(data + '1', 'utf8')
})
// .then(data => {
//   console.log(data)
// }, err => {
//   return 100
// })
// .then(data => {
//   console.log(data)
// })

// promise 如何实现链式调用，返回一个新的 promise
// promise 必须返回一个全新的 promise 这样可以解决 promise 的状态问题