const fs = require('fs')
const path = require('path')
const { runLoaders } = require('loader-runner')
runLoaders({
  // 需要调试的源文件
  resource: './src/demo.txt',
  // 需要加载的指定loader文件
  loaders: [
    {
      loader: path.resolve(__dirname, './loader/raw-loader/index.js'),
      options: {
        name: 'test'
      }
    }
  ],
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  if (err) {
    console.error(err)
  } else {
    // 正确运行的结果 
    console.log(result)
  }
})