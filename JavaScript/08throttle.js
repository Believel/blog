// 节流：将多次执行变成每隔一段时间执行
// 节流函数：事件被触发，事件处理回调里设置一个定时器，定时时间间隔x,保证每次间隔时间x都会执行一次定时器里的回调，
//        显然节流函数的执行定时器回调等待时间就是定时器设置时间x，执行完当前次时任务结束后才会进行下一次定时x的任务
function now() {
  return +new Date()
}
function throttle (func, wait, options) {
  let context, args, result;
  let timeout = null
  let previous = 0
  if (!options) options = {}
  let later = function () {
    previous = options.leading === false ? 0 : now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    let now = now()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
    // 没有的话就开启一个定时器
      // 并且不能不能同时设置 leading 和 trailing
      timeout = setTimeout(later, remaining);
    }
    return result
  }
}

function throttle2 (fn, delay) {
  let timer = null
  let that = this
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(that, args)
        timer = null
      }, delay)
    }
  }
}


// 总结
// 1. 防抖函数执行回调等待时间大于等于x; 节流函数执行回调等待时间始终为 x
// 2. 防抖函数实现的关键技术是，如在x时间内再次被触发事件，需要在x时间内清除上一次定时器任务，从而保证等待时间大于等于x
// 3. 节流函数实现的关键技术是设置一个标志量去判断当前次定时器任务是否完成，完成再进行下一次定时器任务，从而保证等待时间恒为x;
// 4. 防抖函数适用场景：搜索框搜索输入并请求数据、resize
// 5. 节流函数适用场景：scroll、mousedown

