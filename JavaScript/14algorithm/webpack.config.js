
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'development',
  // 入口
  entry: path.resolve(__dirname, 'index.js'),
  // 输出文件
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // 本地开发服务器
  devServer: {
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'dist/'),
    },
    port: 3999,
    host: '0.0.0.0',
    // 提供处理 webpack 资源的配置项
    devMiddleware: {
      publicPath: '/',
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
        ]
      }
    ]
  },
  // 性能评估
  performance: {
    // 关闭性能提示
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // 引用的模板地址
      template: path.resolve(__dirname, 'index.html')
    })
  ]
}