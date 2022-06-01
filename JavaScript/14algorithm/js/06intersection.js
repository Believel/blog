// 两数组交集
const num1 = [1, 2, 2, 3]
const num2 = [2, 2]

// 方法1
const Intersection = (num1, num2) => {
  return [...new Set(num1)].filter(item => new Set(num2).has(item))
}
// 方法2

const Intersection2 = (num1, num2) => {
  let res = []
  const map = {}
  for(let num of num1) {
    map[num] = true
  }
  for (let num of num2) {
    if (map[num]) {
      res.push(num)
      map[num] = false
    }
  }
  return res;
}

console.log(Intersection2(num1, num2))