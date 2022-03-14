// webpack 共用文件

const { srcPath }  = require('./paths')
// 生成资产清单的插件
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const moduleName = 'xxx'
const title = 'xxx系统'

module.exports = {
  title,
  context: '',
  entry: {
    [moduleName]: srcPath('../src/index')
  },
  resolve: {
    alias: {
      '@': srcPath('../src')
    },
    // 扩展名：在这里定义之后，引入的时候可以省略这些扩展名
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.less',
      '.png',
      '.jpg',
      '.gif',
      '.css'
    ]
  },
  plugins: [
    new WebpackManifestPlugin({
      // 生成资产的文件
      filename: 'cdnResource.json',
      seed: {
        title
      }
    })
  ]
}