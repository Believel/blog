// 防抖： 一个用户一直触发一个函数，且每次触发的间隔小于 wait ，防抖只会调用一次
// 案例：在滚动事件需要做个复杂计算或者实现一个按钮的放二次点击操作

// 防抖是将多次执行变为最后一次执行

/**
 * 防抖函数: 事件被触发，每次执行事件处理回调时清除上一次设置的定时器，并设置一个定时器，从而实现在规定时间x内执行定时器里的回调函数，
 * 如果在规定时间x内该事件又被触发了，那定时器清零重新计算时间。
 * @param {*} fn 是用户传入的需要防抖的函数
 * @param {*} wait 等待时间
 */
// 这个防抖只会在会后调用
function debounce(fn, wait = 1000) {
  // 缓存一个定时器
  let timer = 0
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

// 搜索引擎搜索问题的时候，希望用户输入完最后一个字才调用查询接口，这个时候适用”延迟执行“的防抖函数
function now() {
  return +new Date()
}
function debounce2(func, wait = 50, immediate = true) {
  let timer, context, args
  const later = () => setTimeout(() => {
    timer = null
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)
  return function (...params) {
    if (!timer) {
      timer = later()
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
    // 如果已有延迟执行函数，调用的时候清除原来的并重新设定一个
      clearTimeout(timer)
      timer = later()
    }
  }
}
