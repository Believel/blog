// 订阅者 Dep, 用来存放 Watcher 观察者对象
class Dep {
  constructor () {

    // 存放 watcher 对象的数组
    this.subs = []
  }
  // 添加一个Watcher对象
  addSub(sub) {
    this.subs.push(sub)
  }
  // 通知所有的 Watcher 对象更新视图
  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }

}
class Watcher {
  constructor(){
    // 在 new 一个Watcher对象时将对象赋值给Dep.target,在get中会用到
    Dep.target = this
  }
  update() {
    console.log('视图更新了~')
  }
}
// 实现对象的响应式
function defineReactive(obj, key, val) {
  // 一个 Dep 类对象
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 当前的Watcher对象存入dep的subs中
      dep.addSub(Dep.target)
      return val
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return
      val = newVal
      // 在 set 的时候触发 dep 的notify来通知所有的Watcher对象更新视图
      dep.notify()
    }
  })
}
function observer(data) {
  if (!data || (typeof data !== 'object')) return
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}
class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
    new Watcher()
    // 这里 模拟 触发 get
    console.log('render~', this._data.test)

  }
}



// demo
let o = new Vue({
  data: {
    test: 'I am test'
  }
})
o._data.test = 'hello,world'

// 依赖收集的前提条件：1.触发get方法  2. 新建一个Watcher对象