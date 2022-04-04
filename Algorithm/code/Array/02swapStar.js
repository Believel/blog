// 一个字符串中只包含*和数字，请把*号都放在开头
// 思路：使用两个指针，从后往前遍历字符串，遇到数字则赋值给后面的指针，并继续往后遍历，遇到 * 则不处理

const isNumberic = n => !isNaN(parseFloat(n)) && isFinite(n)

// 通过逆序操作使数字后置，遍历完一遍数组后，所有的数字便都已经在后面了，同时用 * 来填充前面的数组项
export default function (s) {
  const n = s.length
  let a = s.split('')
  let j = n - 1
  for (let i = n - 1; i >= 0; --i) {
    if (isNumberic(a[i])) {
      a[j--] = a[i]
    }
  }
  for (; j >= 0; --j) {
    a[j] = '*'
  }
  return a.join('')
}