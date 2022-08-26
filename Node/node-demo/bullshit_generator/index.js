
import { generate } from './lib/generator.js'
import { createRandomPicker } from './lib/random.js'
import { options } from './lib/cmd.js'
import { loadCorpus, saveCorpus } from './lib/corpus.js'

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

// const url = import.meta.url; // 获取当前的脚本文件URL: file:///Users/xx/studys/blog/Node/node-demo/bullshit_generator/index.js
// 当前文件路径：fileURLToPath(url): /Users/xx/studys/blog/Node/node-demo/bullshit_generator/index.js
// 当前文件所在的绝对目录：dirname(fileURLToPath(url)) : /Users/xx/studys/blog/Node/node-demo/bullshit_generator

// './corpus/data.json' 这里的文件地址用的是相对路径，如果运行在上一级目录的话，就会出现问题，
// 所以使用相对于脚本的目录比较好
// const data = readFileSync(path, { encoding: 'utf-8'})
// 将字符串内容转成JSON对象
// const corpus = JSON.parse(data)

// 自己解析命令行参数，不能对参数合法做验证，改用第三方插件：command-line-args
function parseOptions(options = {}) {
  // 例如命令行输入：node index.js --title 嗨 --min 400 --max 1000
  const argv = process.argv;
  // [
  //   '/opt/homebrew/Cellar/node/18.7.0/bin/node',
  //   '/Users/zhangpanpan/studys/blog/Node/node-demo/bullshit_generator/index.js',
  //   '--title',
  //   '嗨',
  //   '--min',
  //   '400',
  //   '--max',
  //   '1000'
  // ]
  for(let i = 2; i < argv.length; i++) {
    const cmd = argv[i - 1];
    const value = argv[i];
    if(cmd === '--title') {
      options.title = value;
    } else if(cmd === '--min') {
      options.min = Number(value);
    } else if(cmd === '--max') {
      options.max = Number(value);
    }
  }
  return options
}
// 获取语料数据
const corpus = loadCorpus('corpus/data.json')
const pickTitle = createRandomPicker(corpus.title)
const title = options.title || pickTitle()
// 获取文章数组内容
const article = generate(title, { corpus, ...options })
// 保存文章输入在文件中
saveCorpus(title, article)





