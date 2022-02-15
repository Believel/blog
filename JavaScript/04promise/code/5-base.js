const fs = require('fs')
const path = require('path')
const Promise = require('./myPromise')
const parseUrl = (url) => {
  return path.resolve(__dirname, url)
}

// Promise 是为了解决嵌套的问题
const read = (url, type) => {
  const dfd = Promise.deferred()
  fs.readFile(parseUrl(url), type, (err, data) => {
    if (err) dfd.reject(err)
    dfd.resolve(data)
  })
  return dfd.promise
}

read('../data/name.txt', 'utf8').then(data => {
  console.log(data)
})