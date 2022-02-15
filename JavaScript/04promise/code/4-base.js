const Promise = require('./myPromise')
const p = new Promise((resolve, reject) => {
  resolve('hello')
})

// then 参数问题处理
// p.then().then().then(data => {
//   console.log(data)
// })

p.then().then(null, err => {
  throw err
}).then(null, err => {
  console.log(err);
}).then(data => {
  console.log(data)
})