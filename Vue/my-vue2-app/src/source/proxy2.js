
// 一个响应式系统的工作流程如下：
// 1. 当读取操作发生时，将副作用函数收集到“桶”中
// 2. 当设置操作发生时，从“桶”中取出副作用函数并执行

// 用一个去哪聚变量存储被注册的副作用函数
let activeEffect
// 用于注册副作用函数
function effect (fn) {
  // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
  activeEffect = fn
  fn()
}

// 存储副作用函数的桶
// WeakMap 中的 key 必须是对象，并且是弱引用，不影响垃圾回收器的工作
const bucket = new WeakMap()
// 原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get (target, key) {
    console.log('get', key)
    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
    track(target, key)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set (target, key, value) {
    console.log('set', key)
    // 设置属性值
    target[key] = value
    // 把副作用函数从桶里取出来并执行
    trigger(target, key)
    // 返回 true 代表设置操作成功
    return true
  }
})

// 在 get 拦截函数内调用 track 函数追踪变化
function track (target, key) {
  // 没有 activeEffect 直接 return
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    // new Set()  会去重
    depsMap.set(key, (deps = new Set()))
  }
  // 最后将当前激活的副作用函数添加到“桶”里
  deps.add(activeEffect)
}
// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger (target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  // 根据 key 取得所有副作用函数 effects
  effects && effects.forEach(fn => fn())
}

effect(
  // 一个匿名的副作用函数
  () => {
    console.log('effect fun')
    document.body.innerHTML = obj.text
  }
)
setTimeout(() => {
  obj.text = '007'
}, 1000)

// target
// |
//  - key
//     |
//      - effectFn
