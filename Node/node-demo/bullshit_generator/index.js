import { readFile, readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// fs.readFile: 异步读取文件内容
// fs.readFileSync：同步读取文件内容

// 参数1： 文件路径
// 参数2： 回调函数
// readFile('./corpus/data.json', { encoding: 'utf-8'}, (err, data) => {
//   if (err) {
//     console.error(err)
//   } else {
//     // err === null  读取成功
//     console.log(data)
//     // data值默认是 Buffer 对象，表示文件的二进制数据内容
//     // <Buffer 7b 0a 20 20 22 74 69 74 6c 65 22 3a 20 5b 0a 20 20 20 20 22 e4 b8 80 e5 a4 a9 e6 8e 89 e5 a4 9a e5 b0 91 e6 a0 b9 e5 a4 b4 e5 8f 91 22 2c 0a 20 20 20 ... 928 more bytes>

//     // 如果传递了参数：{ encoding: 'utf-8'}，这样就能得到utf-8编码的文件内容了
//   }
// })

const url = import.meta.url; // 获取当前的脚本文件URL: file:///Users/xx/studys/blog/Node/node-demo/bullshit_generator/index.js
// 当前文件路径：fileURLToPath(url): /Users/xx/studys/blog/Node/node-demo/bullshit_generator/index.js
// 当前文件所在的绝对目录：dirname(fileURLToPath(url)) : /Users/xx/studys/blog/Node/node-demo/bullshit_generator

const path = resolve(dirname(fileURLToPath(url)), 'corpus/data.json')

// './corpus/data.json' 这里的文件地址用的是相对路径，如果运行在上一级目录的话，就会出现问题，
// 所以使用相对于脚本的目录比较好
const data = readFileSync(path, { encoding: 'utf-8'})
// 将字符串内容转成JSON对象
const corpus = JSON.parse(data)


