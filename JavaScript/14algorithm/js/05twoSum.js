// 两数之和：给定一个整数数组和一个整数目标值，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标

// 方法2： 数组方法
function twoSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    const v = target - arr[i]
    if (arr.includes(v)) {
      const index = arr.indexOf(v)
      if (index !== i){
        return [i, index]
      }
    }
  }
  return []
}

// 方法1： Map
function twoSum2(arr, target) {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    if (map.get(cur) >= 0) {
      return [map.get(cur), i];
    } else {
      map.set(target - cur, i)
    }
  }
  return []
}

console.log(twoSum2([2, 5, 7, 15], 9))