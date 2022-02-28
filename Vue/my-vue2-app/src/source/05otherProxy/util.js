import { reactive } from './index'
export const ITERATE_KEY = Symbol('ITERATE_KEY')
export const TriggerType = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE'
}
export let shouldTrack = true
export const arrayInstrumentations = {}
;['push', 'pop', 'shift', 'unshift', 'splice'].forEach(method => {
  const originMethod = Array.prototype[method]
  arrayInstrumentations[method] = function (...args) {
    // 禁止追踪
    shouldTrack = false
    // this 是代理对象，先在代理对象中查找，将结果存储到 res中
    let res = originMethod.apply(this, args)
    shouldTrack = true
    return res
  }
})
;['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
  const originMethod = Array.prototype[method]
  arrayInstrumentations[method] = function (...args) {
    // this 是代理对象，先在代理对象中查找，将结果存储到 res中
    let res = originMethod.apply(this, args)
    if (res === false) {
      // res 为false说明没找到，通过 this.raw 拿到原始数组，再去其中查找并更新res值
      res = originMethod.apply(this.raw, args)
    }
    return res
  }
})
// 对 Set 中 add，delete, Map 中 get, set重写
export const mutableInstrumentations = {
  add (key) {
    // 获取原始对象
    const target = this.raw
    const hadKey = target.has(key)
    const res = target.add(key)
    if (!hadKey) {
      trigger(target, key, 'ADD')
    }
    return res
  },
  delete (key) {
    const target = this.raw
    const hadKey = target.has(key)
    const res = target.delete(key)
    // 当要删除的元素确实存在时，才触发响应
    if (hadKey) {
      trigger(target, key, 'DELETE')
    }
    return res
  },
  get (key) {
    const target = this.raw
    const had = target.has(key)
    // 追踪依赖，建立响应系统
    track(target, key)
    if (had) {
      // 如果存在吗，则返回结果。这里要注意的是，如果得到的结果 res 仍然是可代理的数据
      // 则要返回使用 reactive 包装后的响应式数据
      const res = target.get(key)
      return typeof res === 'object' ? reactive(res) : res
    }
  },
  set (key, value) {
    const target = this.raw
    const had = target.has(key)
    const oldValue = target.get(key)
    // 获取原始数据
    const rawValue = value.raw || value
    target.set(key, rawValue)
    if (!had) {
      trigger(target, key, 'ADD')
      /* eslint-disable */
    } else if (oldValue !== value || (oldValue === oldValue && value === value)) {
      trigger(target, key, 'SET')
    }
  },
  forEach (callback, thisArag) {
    // wrap 函数可用来把可代理的值转换为响应式数据
    const wrap = (val) => typeof val === 'object' ? reactive(val) : val
    const target = this.raw
    track(target, ITERATE_KEY)
    target.forEach((v, k) => {
      // 通过 .call 调用 callback 并传递 thisArg
      callback.call(thisArag, wrap(v), wrap(k), this)
    })
  },
  [Symbol.iterator]: iterationMethod,
  entries: iterationMethod,
  values: valuesIterationMethod,
  keys: keysIterationMethod
}
function iterationMethod () {
  const target = this.raw
  // 获取原始迭代器方法
  const itr = target[Symbol.iterator]()
  const wrap = (val) => typeof val === 'object' && val !== null ? reactive(val) : val
  // 调用 track 函数建立响应式联系
  track(target, ITERATE_KEY)
  // 返回自定义的迭代器
  return {
    next () {
      const { value, done } = itr.next()
      return {
        value: value ? [wrap(value[0]), wrap(value[1])] : value,
        done
      }
    },
    [Symbol.iterator] () {
      return this
    }
  }
}
function valuesIterationMethod () {
  const target = this.raw
  // 获取原始迭代器方法
  const itr = target.values()
  const wrap = (val) => typeof val === 'object' && val !== null ? reactive(val) : val
  // 调用 track 函数建立响应式联系
  track(target, ITERATE_KEY)
  // 返回自定义的迭代器
  return {
    next () {
      const { value, done } = itr.next()
      return {
        value: wrap(value),
        done
      }
    },
    [Symbol.iterator] () {
      return this
    }
  }
}
export const MAP_KEY_ITERATE = Symbol('MAP_KEY_ITERATE')
function keysIterationMethod () {
  const target = this.raw
  // 获取原始迭代器方法
  const itr = target.keys()
  const wrap = (val) => typeof val === 'object' && val !== null ? reactive(val) : val
  // 调用 track 函数建立响应式联系 
  // ! 新建立的副作用函数 需要考虑下什么时候 trigger
  track(target, MAP_KEY_ITERATE)
  // 返回自定义的迭代器
  return {
    next () {
      const { value, done } = itr.next()
      return {
        value: wrap(value),
        done
      }
    },
    [Symbol.iterator] () {
      return this
    }
  }
}

// 用一个去哪聚变量存储被注册的副作用函数
let activeEffect
// effect 栈   解决多个副作用函数嵌套引起当前副作用函数错乱问题
const effectStack = []
// 用于注册副作用函数
export function effect (fn, options = {}) {
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
// 在 get 拦截函数内调用 track 函数追踪变化
export function track (target, key) {
  // 没有 activeEffect 直接 return
  if (!activeEffect || !shouldTrack) return
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
export function trigger (target, key, type, newVal) {
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
  // 如果操作目标是数组，并且修改了数组的 length 属性为0
  if (Array.isArray(target) && key === 'length') {
    // 对于索引大于或者等于新的length值的元素
    // 需要把所有相关联的副作用函数取出并添加到 effectsToRun 中待执行
    depsMap.forEach((effects, key) => {
      if (key >= newVal) {
        effects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
          }
        })
      }
    })
  }
  // 当操作类型为 ADD 并且目标对象是数组时，应该取出来并执行那些与 length 属性相关联的副作用函数
  if (type === TriggerType.ADD && Array.isArray(target)) {
    const lengthEffects = depsMap.get('length')
    lengthEffects && lengthEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }
  // 只有当操作类型是 ADD 或者 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数重新执行
  // 如果操作类型是 SET , 并且目标对象是 Map 类型的数据，也应该触发与 ITERATE_KEY 相关联的副作用函数重新执行
  if (type === TriggerType.ADD || type === TriggerType.DELETE || (type === TriggerType.SET && Object.prototype.toString.call(target) === '[object Map]')) {
    // 取得与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY)
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }

  effectsToRun.forEach(effectFn => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
