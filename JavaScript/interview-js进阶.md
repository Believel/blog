# 异步
1. 请描述 event loop（事件循环/事件轮询）的机制，可画图
  * JS 是单线程运行的
  * 异步要基于回调来实现
  * event loop 就是异步回调的实现原理
  * 过程
    * 同步代码，一行行的放在 Call Stack 执行
    * 遇到异步，会先“记录”下，等待时机（定时、网络请求等）
    * 时机到了，就移动到 Callback Queue
    * 如 Call Stack 为空（即同步代码执行完）Event Loop 开始工作
    * 轮询查找 Callback Queue, 如有则移动到 Call Stack 执行
    * 然后继续轮询查找

2. promise 有哪三种状态？如何变化？
  * 等待态 pending、完成态 resolved、拒绝态 rejected
  * 状态变化：pending -> resolved 或 pending -> rejected
  * 变化不可逆
  * then正常返回 resolved, 里面有报错则返回 rejected
  * catch 正常返回 resolved, 里面有报错则返回 rejected

3. async/await
  * 异步回调 callback hell
  * Promise then catch 链式调用，但也是基于回调函数
  * async/await 是同步语法，彻底消灭回调函数

4. async/await 和 Promise 的关系
  * async/await 是消灭异步回调的终极武器
  * 但和 Promise 并不互斥
  * 反而，两者相辅相成
    * 执行 async 函数，返回的是 Promise 对象
    * await 相当于 Promise 的 then
    * try...catch 可捕获异常，代替了 Promise 的 catch
  * 场景题
  ```js
  async function async1() {
    console.log('async1 start') // 2
    await async2() // undefined
    // await 的后面，都可以看做是 callback 里面的内容，即异步
    // 类似， event loop, setTimeout(cb1)
    // setTimeout(() => { console.log('async1 end')})
    // Promise.resolve().then(() => { console.log('async1 end')})
    console.log('async1 end') // 5
  }

  async function async2() {
    console.log('async2') // 3
  }

  console.log('script start') // 1
  async1()
  console.log('script end') // 4
  ```

5. 什么事微任务(microTask)/宏任务(macroTask)，两者有什么区别？
  * 宏任务：setTimeout、setInterval、Ajax、DOM事件
  * 微任务：Promise、async/await
  * 微任务的执行时机比宏任务要早
  * 区别
    * 宏任务：DOM 渲染后触发
    * 微任务：DOM 渲染前触发

6. 场景题

```js
// promise 面试题
  // 1
  Promise.resolve().then(() => {
    console.log(1)
  }).catch(() => {
    console.log(2)
  }).then(() => {
    console.log(3)
  })
  // answer: 1 3

  // 2

  Promise.resolve().then(() => {
    console.log(1)
    throw new Error('error1')
  }).catch(() => {
    console.log(2)
  }).then(() => {
    console.log(3)
  })
  // answer: 1 2 3

  // 3

  Promise.resolve().then(() => {
    console.log(1)
    throw new Error('error1')
  }).catch(() => {
    console.log(2)
  }).catch(() => {
    console.log(3)
  })
  // answer: 1 2

  async function fn() {
    return 100
  }

  (async function() {
    const a = fn() // ??
    const b = await fn() // ??

    console.log(a, b)
  })()

  // answer: Promise 100

  console.log(100)
  setTimeout(() => {
    console.log(200)
  })
  Promise.resolve().then(() => {
    console.log(300)
  })
  console.log(400)

  // answer: 100 400 300 200

```