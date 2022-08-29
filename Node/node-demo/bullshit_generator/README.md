# Node.js开发PC小应用：随机文章生成器
## 需求
随机文章生成器的功能是根据语料库的配置和用户输入的规则，随机生成一篇可长可短的文本，里面的内容语句通顺，但是废话连篇。
## 功能
* 读取语料库并解析；
* 随机选取语料的随机算法；
* 字符串模板的参数替换；
* 文章内容的拼装；
* 生成文章输出。

## 技术点
* 利用 fs 模块读取语料库文件内容；
* 实现一个随机模块，提供符合要求的随机算法；
* 使用正则表达式和字符串模板替换以及字符串拼接，完成文章生成；
* 使用 process.argv 接收用户参数，根据参数输出不同内容；
* 利用 fs 模块、二进制模块，将生成的文本内容保存成文本和图片格式。

## 具体实现
### 1.项目目录

```js
// bullshit_generator/
.
├── README.md
├── corpus           // 存储语料的目录
│   └── data.json    // 语料数据 JSON 对象
├── index.js         // 入口文件
└── lib              // 内部封装模块目录
    ├── cmd.js          // 两种命令行参数处理：help 和 必须参数
    ├── corpus.js       // 处理语料JSON文件：读取文件、保存文件
    ├── generator.js    // 生成文章内容
    ├── interact.js     // 两种交互方式，接收参数
    └── random.js       // 创建随机模块
```
### 2. JSON对象组成
* `title`: 文章的主题
* `famous`: 名人名言
* `bosh_before`: 废话的前置分句
* `bosh`: 废话的主题
* `conclude`: 结论
* `said`: 名人名言中可选的文字片段

### 3. 用到的库
```js
// 替代 progress.argv,不仅可以获取用户输入，还能检测用户的输入是否正确
npm install command-line-args --save
// 添加一个--help参数，告知用户有哪些合法的参数以及每个参数的意义
npm install command-line-usage --save

// 例如输入：node index.js --help
// 输出： 是经过配置的
狗屁不通文章生成器

  生成随机的文章段落用于测试 

Options

  --title string   文章的主题。  
  --min number     文章最小字数。 
  --max number     文章最大字数。

```
