// 快速排序的特点就是分治
// 步骤：
// 首先在数组中选取一个基准点，将其称为 pivot, 根据这个基准点，把比基准点小的数组值放在基准点左边
// 把比基准点大的数组值放在基准点右边。
// 这样一来，基于基准点，左边分区的值都小于基准点，右边分区的值都大于基准点，然后针对左边分区和右边分区进行同样的操作，直到最后排序完成

export default function quickSort (arr) {
  if (arr.length < 2) {
    return arr.slice()
  }
  let pivot = arr[Math.floor(Math.random() * arr.length)]
  let left = []
  let middle = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    if (value < pivot) {
      left.push(value)
    }
    if (value === pivot) {
      middle.push(value)
    }
    if (value > pivot) {
      right.push(value)
    }
  }
  return quickSort(left).concat([middle, quickSort(right)])
}