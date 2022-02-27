
// 一个响应式系统的工作流程如下：
// 1. 当读取操作发生时，将副作用函数收集到“桶”中
// 2. 当设置操作发生时，从“桶”中取出副作用函数并执行

// 原始数据
// const data = { ok: true, text: 'hello world' }
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

// effect(
//   // 一个匿名的副作用函数
//   () => {
//     console.log('effect fun')
//     // 分支切换： 一个副作用函数中有多个变量
//     document.body.innerHTML = obj.ok ? obj.text : 'not'
//   }
// )
// setTimeout(() => {
//   // obj.ok = false
//   // 如何做到无论 obj.text 的值怎么变，都不需要重新执行副作用函数
//   // 思路：每次副作用函数执行时，我们可以先把它从所有与之管理的依赖集合中删除
//   obj.text = '111111'
// }, 1000)

// target
// |
//  - key
//     |
//      - effectFn

// 嵌套的 effect 与 effect 栈
// let temp1, temp2
// effect(function effectFn1 () {
//   console.log('effectFn1 执行')
//   effect(function effectFn2 () {
//     console.log('effectFn2 执行')
//     temp2 = obj.bar
//   })
//   temp1 = obj.foo
// })
// setTimeout(() => {
//   obj.foo = '121'
// }, 1000)

// 避免无限递归循环
// 读取和设置在同一个副作用函数内进行的
// effect(() => {
//   obj.foo = obj.foo + 1
// })

// 支持调度器
// effect(() => {
//   console.log(obj.foo)
// }, {
//   scheduler (fn) {
//     setTimeout(fn)
//   }
// })

// obj.foo++
// console.log('结束了')

function computed (getter) {
  let value
  // dirty 标志，用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计算
  let dirty = true
  // 把 getter 作为副作用函数，创建一个 lazy 的 effect
  const effectFn = effect(getter, {
    lazy: true,
    // 添加调度器，在调度器中将 dirty 重置为 true
    scheduler () {
      if (!dirty) {
        dirty = true
        // 当计算属性依赖的响应式数据变化时， 手动调动 trigger 函数触发响应
        trigger(obj, 'value')
      }
    }
  })
  const obj = {
    // 当读取 value 是才执行 effectFn
    get value () {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      // 当读取 value 值时， 手动调用 track 函数进行追踪
      track(obj, 'value')
      return value
    }
  }
  return obj
}

const sum = computed(() => {
  return obj.foo + obj.bar
})
// 多次调用，会导致 effectFn 进行多次计算
// console.log(sum.value)
// console.log(sum.value)
// obj.bar = 3
// console.log(sum.value)

// 在 副作用函数中读取值 - 手动追踪和触发响应
effect(() => {
  console.log(sum.value)
})

obj.foo++
