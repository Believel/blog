
// 一个响应式系统的工作流程如下：
// 1. 当读取操作发生时，将副作用函数收集到“桶”中
// 2. 当设置操作发生时，从“桶”中取出副作用函数并执行

// 原始数据
const data = { foo: 1, bar: 2 }

// 用一个去哪聚变量存储被注册的副作用函数
let activeEffect
// effect 栈   解决多个副作用函数嵌套引起当前副作用函数错乱问题
const effectStack = []
// 用于注册副作用函数
function effect (fn, options = {}) {
  const effectFn = () => {
    // 清除工作
    cleanup(effectFn)
    // 当 effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn
    // 在调用副函数之前将当前的副作用函数压入栈中
    effectStack.push(effectFn)
    // 将 fn 的执行结果存储到 res中
    const res = fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    // 将 res 作为 effectFn 的返回值
    return res
  }
  // 将 options 挂载到 effectFn上
  effectFn.options = options
  //  activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = []

  if (!options.lazy) {
    // 执行副作用函数
    effectFn()
  }
  // 将副作用函数作为返回值返回
  return effectFn
}

function cleanup (effectFn) {
  // 遍历 effectFn.deps 数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i]
    // 移除
    deps.delete(effectFn)
  }
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0
}

// 存储副作用函数的桶
// WeakMap 中的 key 必须是对象，并且是弱引用，不影响垃圾回收器的工作
const bucket = new WeakMap()

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

  // deps 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps)
}
// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger (target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  // 根据 key 取得所有副作用函数 effects
  // effects && effects.forEach(fn => fn())  // 有问题，会导致死循环

  const effectsToRun = new Set()
  // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
// !++ watch 本质利用了effect以及 options.scheduler选项
// watch(obj, () => {
//   console.log('数据变了')
// })
// 修改响应式数据的值，会导致回调函数执行
obj.foo++

effect(() => {
  console.log(obj.foo)
}, {
  scheduler () {
    // 当 obj.foo 的值变化是，会执行 scheduler 调度函数
  }
})
