const Promise = require('./myPromise')
const promise = new Promise((resolve, reject) => {
  resolve('hello')
})

const promise2 = promise.then(data => {
  return new Promise((resolve) => {
    resolve(data + 'world')
  })
})
promise2.then(data => {
  console.log('success', data) // helloworld
}, err => {
  console.log('---', err)
})

// ------ demo2: resolve 参数接收的是一个promise ---

const promise3 = new Promise((resole, reject) => {
  // resole('welcome')
  reject('welcome')
})
promise3.then(data => {
  return new Promise((resolve, reject) => {
    resolve(new Promise((r, j) => {
      r('BeiJing')
    }))
  })
}, err => {
  return new Promise((resolve, reject) => {
    resolve(new Promise((r, j) => {
      resolve('ChengDu')
    }))
  })
}).then(data => {
  console.log(data)
})