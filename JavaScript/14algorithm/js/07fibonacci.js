// 斐波那契数列
// [1,1,2,3,5,8,13...]
function fibonacci(count) {
  function fn(count, curr = 1, next = 1) {
    if (count === 0) {
      return curr
    } else {
      return fn(count - 1, next, curr + next)
    }
  }
  return fn(count)
}