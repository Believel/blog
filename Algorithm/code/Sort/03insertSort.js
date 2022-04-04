// 插入排序 ： 拆半插入
// 步骤：
// 1. 将第一待排序序列的第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列
// 2. 从头到尾依次扫描未排序序列，将扫描的每一个元素插入到有序序列的适当位置，
export default function insertSort (arr) {
  const len = arr.length;
  let preIndex, current;
  for (let i = 1; i < arr; i++) {
    preIndex = i - 1;
    current = arr[i]
    // 找插入已排序的
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current
  }
  return arr;
}