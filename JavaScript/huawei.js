// 华为面试题
// 1. 最后一个字符串的长度
// 2. 计算某个字符出现次数
// const newStr = readline().toLowerCase()
// const key = readline().toLowerCase()
function getLen(str, key) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === key) {
      count++;
    }
  }
  return count
}

// console.log(getLen(newStr, key))

// 3. 明明的随机数

// 4. 字符串分隔
  // String.prototype.repeat() 构造并返回一个新字符串，改字符串包含被连接在一起的指定数量的字符串的副本
  // String.prototype.substring(indexStart[, indexEnd]) 返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集
  // indexEnd 不包括在内

  // String.prototype.substr(str[, length]) 返回一个字符串中从指定位置开始到指定字符数的字符

  function separate(line) {
    var str = line +'00000000';
      for(let i = 8; i < str.length; i += 8) {
        console.log(str.substring(i - 8, i));
      }
  }
// 5. 进制转换
const a = {
  'A': 10,
  'B': 11,
  'C': 12,
  'D': 13,
  'E': 14,
  'F': 15
}
function base(str) {
  str = str.slice(2)
  let sum = 0
  if (str.length === 1) {
    sum = a[str] || str
  } else {
    sum = str.split('').reverse().reduce((prev, next, index) => {
      console.log(prev, next, index)
      prev = a[prev] || parseInt(prev)
      next = a[next] || parseInt(next)
      return prev + next * Math.pow(16, index)
    })
  }
  return sum
}

// console.log(base('OXBAA'))

// 6. 质数因子
const str = 9876673;
let map = {}
const sum = String(str).split('').reduce((prev, next, index) => {
  console.log("prev", prev)
    if (!map[next]) {
        map[next] = true
        return `${prev}${next}`
    } else {
        return prev
    }
})
console.log(Number(sum))