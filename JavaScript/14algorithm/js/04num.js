// 合并两个有序数组
// 给定两个有序整数数组 nums1 和 nums2, 请将 nums2 合并到nums1中，使num1成为一个有序数组
const num1 = [1, 2, 3, 0, 0, 0], m = 3;
const num2 = [2, 5, 6], n = 3;
/***
 * 实现思路：
 * 1. 定义总数组索引长度,num1有内容的索引长度，num2有内容的索引长度
 * 2. 循环num2的内容索引长度
 *   2.1 如果 len1 小于0了，说明num1的内容已经排序完了，只剩下num2的了，直接赋num2的值就行
 *   2.2 否则的话，num1的值从右往左开始赋值
 */
function num(num1, m, num2, n) {
  let len1 = m - 1,
  len2 = n - 1,
  len = m + n - 1;
  while(len2 >= 0) {
    // num中有值的已经变了完了
    if (len1 < 0) {
      num1[len--] = num2[len2--]
      continue
    }
    // 从右往左放置数组内容
    num1[len--] = num1[len1] >= num2[len2] ? num1[len1--] : num2[len2--]
  }
  return num1
}
console.log(num(num1, m, num2, n))