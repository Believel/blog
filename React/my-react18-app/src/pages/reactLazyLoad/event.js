export function on(el, eventName, callback, opts) {
  opts = opts || false;
  if (el.addEventListener) {
    el.addEventListener(eventName, callback, opts);
  } else if (el.attachEvent) {
    // IE8以下：支持的注册事件
    el.attachEvent(`on${eventName}`, (e) => {
      callback.call(el, e || window.event);
    });
  }
}

export function off(el, eventName, callback, opts) {
  opts = opts || false;
  if (el.removeEventListener) {
    el.removeEventListener(eventName, callback, opts);
  } else if (el.detachEvent) {
    // IE8以下：支持的清除事件监听
    el.detachEvent(`on${eventName}`, callback);
  }
}
