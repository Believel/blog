const maximumProduct = function(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  // 1. 两个最大负数与最大整数的乘积
  // 2. 三个最大正数的乘积
  // 3. 两者之间的最大值就是三个数的最大乘积
  return Math.max(nums[0] * nums[1] * nums[n - 1], nums[n - 1] * nums[n - 2] * nums[n - 3]);
};