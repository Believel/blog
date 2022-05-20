// 常用算法
// 1. 数组转成树数据
let arr2 = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
];
function arrayToTree(data) {
  let result = {}
  const itemMap = {}
  for (const item of data) {
    itemMap[item.id] = { ...item, children: []}
  }
  // console.log('itemMap', itemMap)
  for (item of data) {
    const id = item.id
    const pid = item.pid
    if (pid === 0) {
      result = itemMap[id]
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      }
      itemMap[pid].children.push(itemMap[id])
    }
  }
  return result
}

// console.log(arrayToTree(arr2))
// 2. 两数之和：给定一个整数数组和一个整数目标值，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标
// [1, 2, 3] 5
function twoSum(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.get(nums[i])) {
      return [map.get(nums[i]), i]
    } else {
      map.set(target - nums[i], i)
    }
  }
  return [];
}

// function twoSum (nums, target) {
//   let result = []
//   for (let i = 0; i < nums.length; i++) {
//     const value = target - nums[i];
//     if (nums.includes(value)) {
//       const j = nums.findIndex(v => v === value)
//       if (j !== i) {
//         result = [i, j];
//       }
//     }
//   }
//   return result
// }

// 3. 两数组交集
// const num1 = [1, 2, 2, 3]
// const num2 = [2, 2]

// const Intersection = (num1, num2) => {
//   return [...new Set(num1)].filter(item => new Set(num2).has(item))
// }

const Intersection = (num1, num2) => {
  let result = []
  const map = {}
  for (let i of num1) {
    map[i] = true
  }
  for (let j of num2) {
    if (map[j]) {
      result.push(j)
      map[j] = false
    }
  }
  return result
}
// console.log(Intersection(num1, num2)) // [2]