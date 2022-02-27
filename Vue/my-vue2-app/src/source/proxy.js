// Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程
// const obj = new Proxy({}, {
//   get: function (target, propKey, receiver) {
//     console.log(`getting ${propKey}`)
//     return Reflect.get(target, propKey, receiver)
//   },
//   set: function (target, propKey, value, receiver) {
//     console.log(`setting ${propKey}:${value}`)
//     return Reflect.set(target, propKey, value, receiver)
//   }
// })
// obj.count = 1
// setting count:1
// ++obj.count
// getting count
// setting count:2

// !实现响应式数据
// 存储副作用函数的桶
const bucket = new Set()
// 原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get (target, key) {
    // todo 将副作用函数 effect 添加到存储副作用函数的桶中
    // 副函数名字不够灵活，有点硬编码
    bucket.add(effect)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set (target, key, value) {
    // 设置属性值
    target[key] = value
    // 把副作用函数从桶里取出来并执行
    bucket.forEach(fn => fn())
    // 返回 true 代表设置操作成功
    return true
  }
})
// 副作用函数
function effect () {
  document.body.innerText = obj.text
}
effect()
setTimeout(() => {
  obj.text = '007'
}, 1000)
