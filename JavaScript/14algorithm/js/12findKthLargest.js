// 数组中的第 K 大的数字
// 给定整数数组 nums 和整数 k，请返回数组中的第 k 个最大的元素

// const arr = [3, 2, 1, 5, 6, 4], k = 2 //  输出：5
const arr = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4 // 输出：4



// 利用冒泡排序
function findKthLargest(arr, k) {
  const len = arr.length;
  for (let i = 0; i < k; i++) {
    for (j = 0; j < len - i -1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+ 1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr[len - k];
}

console.log(findKthLargest(arr, k))