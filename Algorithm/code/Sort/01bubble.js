// 冒泡排序
// 定义：重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。

// 步骤：
// 1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个
// 2. 对每一对相邻元素作同样的工作，从开始第一队到结尾的最后一对。这步做完后，最后的元素会是最大的数
// 3. 针对所有的元素重复以上的步骤，除了最后一个
// 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较

export default function bubbleSort (arr) {
  const len = arr.length;
  // 行数
  for (let i = 0; i < len - 1; i++) {
    // 是否排序
    let flag = true
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    if (flag) {
      break;
    }
  }
  return arr;
}