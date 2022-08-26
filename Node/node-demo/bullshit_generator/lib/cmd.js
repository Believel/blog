import commandLineUsage from 'command-line-usage';
import commandLineArgs from 'command-line-args';

// 定义帮助的内容
const sections = [
  {
    header: '狗屁不通文章生成器',
    content: '生成随机的文章段落用于测试',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'title',
        typeLabel: '{underline string}',
        description: '文章的主题。',
      },
      {
        name: 'min',
        typeLabel: '{underline number}',
        description: '文章最小字数。',
      },
      {
        name: 'max',
        typeLabel: '{underline number}',
        description: '文章最大字数。',
      },
    ],
  },
];
const usage = commandLineUsage(sections); // 生成帮助文本

// 配置我们的命令行参数
const optionDefinitions = [
  { name: 'help' },
  { name: 'title', alias: 't', type: String },
  { name: 'min', type: Number },
  { name: 'max', type: Number },
];
const options = commandLineArgs(optionDefinitions); // 获取命令行的输入
// 命令行输入--help参数，显示合法参数的含义
if ('help' in options) {
  console.log(usage)
  // 终止程序
  process.exit()
}

export { options }