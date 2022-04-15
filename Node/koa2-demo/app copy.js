
// ! 一定要会中间件的源码
const co = require("co");
const debug = require("debug")("v0");

module.exports = {
  // 保存中间件
  middleware: [],
  use: function(fn) {
    debug("use: " + fn);
    // 给数组增加中间件
    this.middleware.push(fn);
    return this;
  },
  // 入口
  callback: function(cb) {
    // 把 this.middleware 转变成一个名为 fn 的 Generator 函数
    const fn = this.compose(this.middleware);
    debug("callback compose fn=" + fn);
    // 通过 co 来执行 fn
    // co 的返回值是 promise 对象， 所以 then 后面接了两个参数，其中 cb 是成功的回调，后面的匿名函数是用来处理异常的
    co(fn).then(cb, function(err) {
      console.error(err.stack);
    })
  },
  // Koa v1 的中间件机制：将compose（[f1，f2，...，fn]）转化为fn（...f2（f1（noop（）））），最终的返回值是一个Generator函数
  compose: function(middleware) {
    debug("compose:" + middleware);
    return function * (next) {
      if (!next) {
        next = function * () {}
      }

      const i = middleware.length;
      while(i--) {
        debug("compose middleware[" + i + "]=:" + middleware[i]);
        next = middleware[i].call(this, next);
        debug(next);
      }
      return yield *next;
    }
  }
}



// Koa v2 的中间件机制：将 compose([f1, f2, ..., fn])转化为 f1(...f(n-1)(fn(noop()))),
// 最终的返回值是一个function(context, next){}。即使返回值是function *(next){},也会被转换成function(context, next){},
// 这就是convert的向后兼容特性的体现。