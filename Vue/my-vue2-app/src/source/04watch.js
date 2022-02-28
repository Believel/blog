
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
function watch (source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }
  let oldValue, newValue
  const job = () => {
    // 在 scheduler 中重新执行副作用函数，得到的是新值
    newValue = effectFn()
    cb(newValue, oldValue)
    // 更新旧值，不然下一次会得到错误的旧值
    oldValue = newValue
  }
  // 使用 effect 注册副作用函数时，开启 lazy 选项，并把返回值存储到 effectFn 中以便后续手动调用
  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      // 在调度函数中判断 flush 是否为 ‘post’,如果是，将其放到微任务队列中执行
      if (options.flush === 'post') {
        const p = Promise.resolve()
        p.then(job)
      } else {
        job()
      }
    }
  })
  if (options.immediate) {
    job()
  } else {
    // 手动调用副作用函数，拿到的值就是旧值
    oldValue = effectFn()
  }
}
function traverse (value, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) return
  // 将数据添加到 seen中，代表遍历地读取过了，避免循环引用引起的死循环
  seen.add(value)
  // 暂时不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen)
  }
  return value
}
// 接收一个响应式数据
// watch(obj, () => {
//   console.log('数据变化了')
// })
// obj.bar++

// watch 接收一个getter函数，
// 第二个参数回调函数中拿到新旧值：用到 effect中的 lazy 选项
// watch(() => obj.foo, (newValue, oldValue) => {
//   console.log('newValue:', newValue)
//   console.log('oldValue:', oldValue)
// })
// obj.foo++

// 立即执行的回调函数
// 默认情况下，一个 watch 的回调只会在响应式数据发生变化时才执行
// watch(obj, () => {
//   console.log('数据变化了')
// })
watch(obj, (newvalue, oldvalue) => {
  console.log('数据变化了', newvalue, oldvalue)
}, {
  // 回调函数会在 watch 创建时立即执行一次
  immediate: true
})

// 回调函数的执行时机
