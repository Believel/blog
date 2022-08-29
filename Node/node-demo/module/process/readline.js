// readline 实现可交换命令行
import readline from 'readline'

// 创建一个可交互的命令行对象
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const q = `请输入一个整数\n`
const answer = await new Promise((resolve) => {
  // 是一个异步方法，接收一个问题描述和一个回调函数 —— 用于接受用户的输入
  rl.question(q, (answer) => {
    resolve(answer)
  });
})
console.log(answer)
rl.close()