
const PENDING = 'PENDING'      // 等待态
const FULFILLED = 'FULFILLED'  // 成功态
const REJECTED = 'REJECTED'    // 失败态

// 专门处理 x 的状态
const resolvePromise = (promise2, x, resolve, reject) => {
  // 判断可能你的promise和别人的promise混用，可能不同的promise库之间要相互调用
  if (promise2 === x) {
    reject(new TypeError('Chaining cucle detected for promise #<Promise>'))
  }
  // 判断x是不是promise,首先判断是否是一个对象或者是一个函数
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called; // 为了考虑别人的promise不健壮，需要自己取判断一下，如果调用失败不能调用成功，调用成功不能调用失败，不能多次调用成功或者失败
    try {
      let then = x.then
      if (typeof then === 'function') {
        // 判断 then 是不是一个函数，如果then不是函数，说明不是 promise
        // 只能认准它是一个promise
        then.call(x, (y) => {
          if (called) return
          called = true
          // y 可能是一个promise,需要继续判断去取then的值
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          // 主要为了防止调了失败不能成功
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      // 一旦出错失败了就不能再调用成功了
      if (called) return
      called = true
      reject(error) // 取 then 失败了，直接触发 promise2 的失败逻辑
    }
  } else {
    // 肯定不是 promise ,那么就是一个普通值
    resolve(x)
  }
}
class Promise {
  constructor(executor) {
    this.state = PENDING;   // 默认是等待态
    this.value = undefined; // 成功时传入的值
    this.reason = undefined; // 失败时传入的值
    this.onResolvedCallbacks = []; // 接收成功时的回调
    this.onRejectedCallbacks = []; // 接收失败时的回调
    const resolve = (value) => {
      if (value instanceof Promise) { // 只要解析出一个普通值
        return value.then(resolve, reject)
      }
      // 判断状态是否是pending -> fulfilled
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn()) // 发布
      }
    }
    const reject = (reason) => {
      // 判断状态是否是pending -> rejected
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn()) // 发布
      }
    }
    // try catch 只能捕获同步异常
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
    
  }
  then(onFulfilled, rejected) {
    // 考虑 onFulfilled 不传的情况
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    // 考虑 rejected 不传的情况
    rejected = typeof rejected === 'function' ? rejected : err => {throw err}

    let promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        // !目的是为了获取promise2的值是在new Promise之后正常获取到
        setTimeout(() => {
          // 在 异步代码中外层 try + catch 是捕获不到的，所以要单独加 try catch
          try {
            // 存储成功回调的返回值，为了下次链式调用使用
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
       
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = rejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      // 订阅异步的状态存储在各自的数组中
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
         
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = rejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }

    })
    return promise2
  }
  // catch 只是 then 方法中没有成功会调的一个别名
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  finally(onResolve) {
    return this.then(v => {
      onResolve()
      return v
    }, err => {
      onResolve()
      throw err
    })
  }
  resolve(value) {
    return new Promise(resolve => resolve(value))
  }
  reject(err) {
    return new Promise((resolve, reject) => reject(err))
  }
}
Promise.deferred = function() {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise