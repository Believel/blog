import { reactive } from './05otherProxy'
import { effect } from './05otherProxy/util'

// 原始值的响应方案
function ref (val) {
  // 在 ref 函数内部创建包裹对象
  const wrapper = {
    value: val
  }
  // 使用 Object.defineProperty 在 wrapper 对象上定义一个不可枚举的属性 __v_isRef，并且值为 true
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true
  })
  // 将包裹对象变成响应式数据
  return reactive(wrapper)
}
function toRef (obj, key) {
  const wrapper = {
    get value () {
      return obj[key]
    },
    set value (val) {
      obj[key] = val
    }
  }
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true
  })
  return wrapper
}
function toRefs (obj) {
  const ret = {}
  // 使用 for ... in 循环遍历对象
  for (const key in obj) {
    ret[key] = toRef(obj, key)
  }
  return ret
}
function proxyRefs (target) {
  return new Proxy(target, {
    get (target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      // 自动脱 ref 实现，如果读取的值是 ref,则返回它的 value 属性值
      return value.__v_isRef ? value.value : value
    },
    set (target, key, newValue, receiver) {
      const value = target[key]
      if (value.__v_isRef) {
        value.value = newValue
        return true
      }
      return Reflect.set(target, key, newValue, receiver)
    }
  })
}
const refVal = ref(2)
effect(() => {
  console.log(refVal.value)
})
refVal.value = 3

// 如何区分一个数据是否是 ref

// 描述响应式丢失的问题
const obj = reactive({ foo: 1, bar: 2 })
// const newObj = {
//   ...obj
// }
// const newObj = {
//   foo: toRef(obj, 'foo'),
//   bar: toRef(obj, 'bar')
// }
const newObj = proxyRefs({ ...toRefs(obj) })

effect(() => {
  // 在副作用函数内通过新的对象 newObj 读取 foo 属性值
  console.log(newObj.foo)
})
// obj.foo = 100
newObj.foo = 100

// ref 的作用不仅仅是实现原始值的响应式方案，它还用来解决响应丢失问题
