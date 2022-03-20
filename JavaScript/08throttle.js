// 节流：将多次执行变成每隔一段时间执行
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
