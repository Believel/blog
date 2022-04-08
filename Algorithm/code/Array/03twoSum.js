// 两数之和
// 给定一个整数数组 nums 和一个整数目标值 target, 
// 请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标
// const nums = [2, 7, 11, 15]
// const target = 9
// [0, 1]

export default function twoSum (nums, target) {
  let result = []
  for (let i = 0; i < nums.length; i++) {
    const value = target - nums[i];
    if (nums.includes(value)) {
      const j = nums.findIndex(v => v === value)
      if (j !== i) {
        // 找到之后就终止整个循环
        result = [i, j];
        break
      }
    }
  }
  return result
}