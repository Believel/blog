
const HtmlWebpackPlugin = require('html-webpack-plugin')
const threadLoader = require('thread-loader')
const os = require('os')
const path = require('path')

const MyPlugin = require('./plugins/MyPlugin')
const FileListPlugin = require('./plugins/FileListPlugin')

threadLoader.warmup(
  {
    workers: os.cpus(),
    workerParallelJobs: 50
  },
  ['babel-loader', 'less-loader']
)

module.exports = {
  // 设置为开发模式
  mode: 'development',
  // 入口
  entry: path.resolve(__dirname, './src/index'),
  // 输出文件
  output: {
    // 打包生成的文件名称
    filename: '[name].[hash].js',
    // 打包生成的文件目录
    path: path.resolve(__dirname, 'dist'),
    // 静态资源文件地址，一般 ‘/’
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
    devMiddleware: {
      publicPath: '',
    },
    historyApiFallback: {
      rewrites: [
        // 多页面，则可以设置二级目录来区分
        { from: /^.*$/, to: `/index.html`}
      ]
    },
    // 设置代理
    proxy: {
      '/api': {
        // 后端域名
        target: 'http://127.0.0.1:3000/',
        auth: false,
        // target 参数是域名的话，需要这个参数开启跨域
        changeOrigin: true,
        // 路径重写，也就是会修改最终请求的 api 路径
        pathRewrite: {
          // '/api/new': ''
        }
      }
    }
  },
  devtool: 'source-map',
  // 这样webpack 会先去loader文件夹下找loader,没有找到才去node_modules
  resolveLoader: {
    modules: [path.resolve(__dirname, './loader'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /(node_modules)/,
        use: [
          'thread-loader',
          'babel-loader',
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          'thread-loader',
          {
            loader: 'style-loader',
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          // webpack5中[ext]自带'.',这个与url-loader配置不同
          filename: '[name][hash:8][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024 // 超过50kb不转base64
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true
            }
          },
          {
            loader: 'svg-url-loader'
          }
        ]
      }
    ]
  },
  // 性能评估
  performance: {
    // 关闭性能提示
    hints: false
  },
  // 优化
  optimization: {
    usedExports: false,
    // 对于动态导入的模块
    splitChunks: {
      // 选择哪些 chunk 进行优化
      chunks: 'async',
      // 缓存组可以继承或覆盖来自 splitChunks.*的任何选项
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // 初始化，是入口起点的 main chunk 
          chunks: 'initial',
          priority: 10,
          enforce: true
        },
        default: {
          minChunks: 2,
          // 默认组的优先级是负，以允许自定组获得更高的优先级（自定义组的默认值为0）
          priority: -20,
          // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    // -- new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      cache: false,
      filename: 'index.html',
      // 引用的模板地址
      template: path.resolve(__dirname, '../index.html'),
      // 页面引用：<%= htmlWebpackPlugin.options.title %>
      title: '测试',
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new MyPlugin({
      title: 'zhangsan'
    }),
    new FileListPlugin()
  ]
}