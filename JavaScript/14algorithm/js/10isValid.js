// 给定一个字符是否能正确匹配
const isValid = (s) => {
  if (!s) return true
  const leftToRight = {
    '(' : ')',
    '[' : ']',
    '{' : '}'
  }
  const stack = []
  for (let i = 0; i < s.length; i==) {
    const ch = s[i]
    // 左括号
    if (leftToRight[ch]) {
      stack.push(ch)
    } else {
      // 右括号开始匹配
      // 1. 如果栈内没有左括号，直接false
      // 2. 有数据但是栈顶不是当前的右括号
      if (!stack.length || leftToRight[stack.pop()]) {
        return false
      }
    }
  }
  // 最后检查栈内有没有元素，有说明还有未匹配则不符合
  return !stack.length
}