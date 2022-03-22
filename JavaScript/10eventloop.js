// event loop
// JS在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到Task(有多种task)队列中。
// 一旦执行栈为空，Event Loop就会从Task队列中拿出需要执行的代码放入到执行栈中执行，所以本质上来说JS的异步还是同步行为

// 不同的任务源会分配到不同的 Task 队列中，
// 任务源可以分为微任务（microtask | jobs）：process.nextTick、promise、Object.observe、MutationObserver
// 宏任务（macrotask | task）：script、setTimeout、setInterval、setImmediate、I/O、UI rendering

console.log('script start')

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resove => {
  console.log('Promise')
  resove()
}).then(function() {
  console.log('promise1')
}).then(function() {
  console.log('promise2')
})

console.log('script end')

// script start
// Promise
// script end
// promise1
// promise2
// setTimeout


// 微任务不一定快于宏任务，因为宏任务中包括了script，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务

// 正确的一次 Event loop 顺序是这样的
// 1. 执行同步代码，这属于宏任务
// 2. 执行栈为空，查询是否有微任务需要执行
// 3. 执行所有微任务
// 4. 必要的话渲染 UI
// 5. 然后开始下一轮 Event loop，执行宏任务中的异步代码