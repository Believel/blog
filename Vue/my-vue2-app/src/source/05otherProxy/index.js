import { effect, track, trigger, ITERATE_KEY, TriggerType, arrayInstrumentations, mutableInstrumentations } from './util'
// 代理 Object
// 读取操作
// 1. 访问属性：obj.foo
// 2. 判断对象或原型上是否存在给定的key: key in obj
// 3. 使用 for...in 循环遍历对象：for (const key in obj) {}

// 代理数组
// 读取操作
// 1. 通过索引访问数组元素：arr[0]
// 2. 访问数组的长度：arr.length
// 3. 把数组作为对象，使用 for ... in 循环遍历
// 4. 使用 for ... of 迭代遍历数组
// 5. 数组的原型方法，如concat/join/every/some/find/findIndex/includes等，以及其他所有不改变原数组的原型方法
// 设置操作
// 1. 通过索引修改数组元素值：arr[1] = 2
// 2. 修改数组长度：arr.length = 0
// 3. 数组的栈方法：push/pop/shift/unshift
// 4. 修改原数组的原型方法：splice/fill/sort等

// const obj = { foo: 1 }
// 对 Proxy 进行了一层封装
function createReactive (obj, isShallow = false, isReadOnly = false) {
  const p = new Proxy(obj, {
    // 拦截获取操作
    get (target, key, receiver) {
      // 代理对象可以通过 raw 属性访问原始数据
      if (key === 'raw') {
        return target
      }
      if (key === 'size') {
        track(target, ITERATE_KEY)
        return Reflect.get(target, key, target)
      }
      if (mutableInstrumentations.hasOwnProperty(key)) {
        // 返回定义在 mutableInstrumentations 对象下的方法
        return mutableInstrumentations[key]
      }
      // 如果操作的目标对象是数组，并且 key 存在于 arrayInstrumentations上
      // 那么返回定义在 arrayInstrumentations 上的值
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver)
      }
      // 如果 key 的类型是 symbol 则不进行追踪
      if (!isReadOnly && typeof key !== 'symbol') {
        // 建立联系
        track(target, key)
      }
      // 返回属性值
      const res = Reflect.get(target, key, receiver)
      if (isShallow) {
        return res
      }
      if (typeof res === 'object' && res !== null) {
        // 如果数据为只读，则调用 readOnly 对值进行包装
        return isReadOnly ? readOnly(res) : reactive(res)
      }
      return res
    },
    // in 拦截
    has (target, key) {
      track(target, key)
      return Reflect.has(target, key)
    },
    // for in 拦截
    ownKeys (target) {
      // 如果操作目标 target 是数组，则使用 length 属性作为 key 并建立响应联系
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY)
      return Reflect.ownKeys(target)
    },
    // 拦截设置操作
    set (target, key, newVal, receiver) {
      // 如果是只读的，则打印警告信息并返回
      if (isReadOnly) {
        console.warn(`属性${key}是只读的`)
        return true
      }
      // 获取旧值
      const oldValue = target[key]
      // 如果属性不存在，则说明是在添加新属性，否则是设置已有属性
      const type = Array.isArray(target) ? Number(key) < target.length ? TriggerType.SET : TriggerType.ADD : Object.prototype.hasOwnProperty.call(target, key) ? TriggerType.SET : TriggerType.ADD
      // 设置属性值
      const res = Reflect.set(target, key, newVal, receiver)
      /* eslint-disable */
      // 说明 receiver 就是 target 的代理对象
      if (target === receiver.raw) {
        // 比较新值与旧值，只要当不全等并且都不是 NaN 的时候才触发响应
        if (oldValue !== newVal && (oldValue === oldValue || newVal === newVal)) {
          trigger(target, key, type, newVal)
        }
      }
      return res
    },
    // 拦截删除操作
    deleteProperty (target, key) {
      if (isReadOnly) {
        console.warn(`属性${key}是只读的`)
        return true
      }
      // 检查被操作的属性是否是对象自己的属性
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)
      // 使用 Reflect.defineProperty 完成属性的删除
      const res = Reflect.deleteProperty(target, key)
      if (res && hadKey) {
        trigger(target, key, TriggerType.DELETE)
      }
      return res
    }
  })
  return p
}
// 定义一个 Map 实例，存储原始对象到代理对象的映射
const reactiveMap = new Map()
export function reactive (obj) {
  // 优先通过原始对象 obj 寻找之前创建的代理对象，如果找到了，直接返回已有的代理对象
  const existionProxy = reactiveMap.get(obj)
  if (existionProxy) return existionProxy

  const proxy = createReactive(obj)
  reactiveMap.set(obj, proxy)
  return proxy
}
function shallowReactive (obj) {
  return createReactive(obj, true)
}
function readOnly (obj) {
  return createReactive(obj, false, true)
}

// 代理对象
// effect(() => {
//   console.log('foo' in p)
// })
// effect(() => {
//   for (const key in p) {
//     console.log(key)
//   }
// })
// 添加并修改新的属性
// p.bar = 2
// 修改已有的属性
// p.foo = 2

// 删除属性
// delete p.foo
// 当值没发生变化，不需要触发响应
// effect(() => {
//   console.log('触发了', p.foo)
// })
// p.foo = 1

// const obj = {}
// const proto = { bar: 1 }
// const child = reactive(obj)
// const parent = reactive(proto)
// Object.setPrototypeOf(child, parent)
// effect(() => {
//   console.log(child.bar)
// })
// child.bar = 2

// 浅响应与深响应
// const obj = reactive({ foo: { bar: 1 }})
// const obj = shallowReactive({ foo: { bar: 1}})
// effect(() => {
//   console.log(obj.foo.bar)
// })
// obj.foo.bar = 2

// 只读
// const data = readOnly({ a:1 })
// data.a = 2
// effect(() => {
//   // 可以读取值，但是不需要在副作用函数与数据之间建立响应联系
//   console.log(data.a)
// })

// 代理数组
// const arr = reactive(['foo'])
// effect(() => {
//   console.log(arr[0])
// })
// 如果设置数组长度为0，需要触发其他副作用函数重新执行
// 如果设置的数组长度大于目前数组的长度，不需要触发其它副作用函数重新执行
// arr.length = 0

// 遍历数组 for...in
// 添加新元素
// 修改数组长度
// const arr = reactive(['foo'])
// effect(() => {
//   for (const key in arr) {
//     console.log(key)
//   }
// })
// arr[1] = 'bar' // 能够触发副作用函数重新执行
// arr.length = 0 // 能够触发副作用函数重新执行

// 遍历数组 for ... of(用来遍历可迭代对象)
// const obj = {
//   val: 0,
//   [Symbol.iterator] () {
//     return {
//       next () {
//         return {
//           value: obj.val++,
//           done: obj.val > 10 ? true : false
//         }
//       }
//     }
//   }
// }
// for (const value of obj) {
//   console.log(value)
// }
// const arr = [1, 2, 3, 4, 5]
// const itr = arr[Symbol.iterator]()
// console.log(itr.next())
// console.log(itr.next())
// console.log(itr.next())
// console.log(itr.next())
// console.log(itr.next())
// console.log(itr.next())
// for (const value of arr) {
//   console.log(value)
// }
// 去除了属性 symbol 类型的追踪
// const arr = reactive([1, 2, 3, 4, 5])
// effect(() => {
//   for (const value of arr) {
//     console.log(value)
//   }
// })
// arr[1] = 'bar'

// 数组的查找方法
// const obj = {}
// const arr = reactive([obj])
// console.log(arr.includes(arr[0]))
// includes 内部的 this 指向的是 arr
// console.log(arr.includes(obj))

// 隐式修改数组长度的原型方法：push/pop/shift/unshift/slice
// const arr = reactive([])
// effect(() => {
//   arr.push(3)
// })
// effect(() => {
//   arr.push(2)
// })

// 代理 Set 和 Map
// const proxy = reactive(new Set([]))
// effect(() => {
//   console.log(proxy.size)
// })
// proxy.add(1)

// 处理 forEach
// const m = reactive(new Map([
//   [{ key: 1 }, { value: 1 }]
// ]))
// effect(() => {
//   m.forEach(function (value, key) {
//     console.log('value', value)
//     console.log('key', key)
//   })
// })
// m.set({ key: 2 }, { value: 2 })

// 迭代器方法
const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]))
effect(() => {
  for (const [key, value] of p) {
    console.log(key, value)
  }
})
p.set('key3', 'value3')
