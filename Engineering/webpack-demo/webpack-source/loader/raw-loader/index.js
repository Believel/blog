const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  // 1. 同步读取
  // const json = JSON.stringify(source).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
  // return `export default ${json}`

  // 读取loader 参数
  const { name } = loaderUtils.getOptions(this)

  // 关闭缓存
  this.cacheable(false)

  console.log('name:', name)
  // 2. 异步读取
  const callback = this.async()

  fs.readFile(path.resolve(__dirname, '../../src/async.txt'), 'utf-8', (err, data) => {

    callback(err, data)
  })
}