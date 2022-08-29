console.log('请输入一个要求和的整数，以0结束输入')
// process.stdin 是异步的，它继承了 EventEmitter 对象，能够派发和监听事件
// 实现命令行交互
// 将用户交互的编码设定为utf-8
process.stdin.setEncoding('utf8')
let sum = 0

// 当用户输入字符串并回车，就会触发此事件
process.stdin.on('readable', () => {
  // 获取当前输入的字符，包含回车
  const chunk = process.stdin.read()
  // 把回车符抛弃掉
  const n = Number(chunk.slice(0, -1))
  sum += n
  if (n === 0) {
    // 派发一个结束输入的事件
    process.stdin.emit('end')
  }
  // 再调用一次，返回的是null, 并继续监听
  process.stdin.read()
})
// 监听 end 事件
process.stdin.on('end', () => {
  console.log(`求和的结果是：${sum}`)
})