// 编写一个程序将数组扁平化并去除其中重复部分数据，最终得到一个升序且不重复的数组
const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9], [11, 12, [12, 13, [14]]]]
// 方法1
console.log([...new Set([...arr.flat(Infinity)])])
// 方法2: 还有再去下重才是的
console.log(JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map(i => Number(i)).sort((a, b) => a - b))

// 方法3

function flat(arr) {
  let result = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      // result.push(...flat(item))
      result = result.concat(flat(item))
    } else {
      result.push(item)
    }
  });
  return result
}
console.log(flat(arr))

function flat2(arr, n) {
  if (n > 0) {
    return arr.reduce((prev, next) => {
      return prev.concat(Array.isArray(next) ? flat2(next, n - 1) : next)
    }, [])
  } else {
    return arr.slice()
  }
}

console.log(flat2(arr, 2))

// 数组扁平化采用尾递归实现
function flat3(arr = [], result = []) {
  arr.forEach(v => {
    if (Array.isArray(v)) {
      result = result.concat(flat(v, []))
    } else {
      result.push(v)
    }
  })
  return result
}