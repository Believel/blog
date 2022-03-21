// 选择排序
// 步骤：
// 1. 首先在未排序序列中找到最小元素，存放到排序序列的起始位置
// 2. 再从剩余未排序元素中继续寻找最小元素，然后放到已排序序列的末尾
// 3. 重复第二步，直到所有元素均排序完毕

export default function selectSort (arr) {
  // 已排序的位置索引
  let pos = 0;
  while (pos < arr.length - 1) {
    let miniIndex = pos
    for (let i = pos; i < arr.length; i++) {
      // 寻找最小的数
      if (arr[i] < arr[miniIndex]) {
        // 将最小的索引保存
        miniIndex = i
      }
    }
    if (miniIndex > pos) {
      [arr[pos], arr[miniIndex]] = [arr[miniIndex], arr[pos]]
    }
    pos = pos + 1;
  }
  return arr
}