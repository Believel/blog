// 最长递增子序列
function getSequence(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
// effect 的执行时同步的，因此当响应式数据发生变化时，与之关联的副作用函数会同步执行
// 换句话说，如果多次修改响应式数据的值，将会导致渲染函数执行多次，这实际上是没有必要的
// 因此，我们需要设计一个机制，以使得无论对响应式数据进行多少次修改，副作用函数都只会重新执行一次
// 调度器
// 任务缓存队列
const queue = new Set()
// 一个标志，代表是否正在刷新任务队列
let isFlushing = false
// 创建一个立即 resolve 的 Promise 实例
const p = Promise.resolve()
// 本质上基于微任务的异步执行机制，实现对副作用函数的缓冲
// 调度器的主要函数，用来将一个任务添加到缓冲队列中国，并开始刷新队列
function queueJob(job) {
  // 将 job 添加到 任务队列中
  queue.add(job)
  // 如果还没有还是刷新队列，则刷新
  if (!isFlushing) {
    // 设置标志为true以避免重复刷新
    isFlushing = true
    // 在做任务中刷新缓冲队列
    p.then(() => {
      try {
        // 执行任务队列中的任务
        queue.forEach(job => job())
      } finally {
        // 重置状态
        isFlushing = false
        queue.length = 0
      }
    })
  }
}