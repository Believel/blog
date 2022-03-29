class Dep {
  constructor () {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null
function update(value) {
  document.querySelector('div').innerText = value
}

class Watcher {
  constructor (obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空

    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }
  update () {
    this.value = this.obj[this.key]
    this.cb(this.value)
  }
}


const data = {
  name: 'tang'
}

observe(data)
new Watcher(data, 'name', update)

data.name = 'yyyyy'

console.log(data)

function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, value) {
  // 递归子属性
  observe(value)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reativeGetter() {
      console.log('get value')
      if (Dep.target) {
        dp.addSub(Dep.target)
      }
      return value
    },
    set: function reativeSetter(newVal) {
      console.log('change value')
      value = newVal
      dp.notify()
    }
  })
}

// 核心思路： 手动触发一次属性的 getter 来实现发布订阅的添加

// defineProperty 和 proxy
// 1. defineProperty 可以检测对象修改属性或者获取属性，但不能检测对象增加或删除属性，而且也不能检测数组
// 2. proxy 可以检测对象或数组，增删改查属性，但兼容性不好



