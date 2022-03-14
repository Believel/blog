
// 开发环境
// 为应用程序生成一个HTML文件，并自动将生成的所有bundle注入到此文件中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 运行loader在 work pool中，请仅在耗时的操作中使用
const threadLoader = require('thread-loader')
// 用 eslint 发现和修复js代码 （eslint-loader已经不再使用）
const ESLintPlugin = require('eslint-webpack-plugin')
const { srcPath } = require('./paths')
const config = require('./webpack.common')
const os = require('os')
const webpack = require('webpack')
threadLoader.warmup(
  {
    workers: os.cpus(),
    workerParallelJobs: 50
  },
  ['babel-loader', 'babel-preset-env', 'less-loader']
)

module.exports = {
  // 设置为开发模式
  mode: 'development',
  // 入口
  entry: {
    'demo': [
      // 实时调整react组件
      'react-hot-loader/patch',
      // 重载开发服务器
      'webpack-dev-server/client?http://0.0.0.0:3999',
      // 热模块更换的运行时代码
      'webpack/hot/only-dev-server',
      srcPath('../src/index')
    ]
  },
  // 输出文件
  output: {
    // 打包生成的文件名称
    filename: '[name].[hash].js',
    // 打包生成的文件目录
    path: srcPath('../dist/'),
    // 静态资源文件地址，一般 ‘/’
    publicPath: `${config.context}/`
  },
  resolve: config.resolve,
  // 本地开发服务器
  devServer: {
    // hot: true,
    // client: false,
    // webpack 4: contentBase: srcPath('../dist/'),
    // webpack 5
    static: {
      directory: srcPath('../dist/'),
    },
    port: 3999,
    host: '0.0.0.0',
    // 提供处理 webpack 资源的配置项
    devMiddleware: {
      publicPath: `${config.context}`,
    },
    historyApiFallback: {
      rewrites: [
        // 多页面，则可以设置二级目录来区分
        { from: /^.*$/, to: `${config.context}/index.html`}
      ]
    },
    // 设置代理
    proxy: {
      '/api': {
        // 后端域名
        target: 'http://127.0.0.1:3000/',
        auth: false,
        changeOrigin: true,
        pathRewrite: {

        }
      }
    }
  },
  devtool: 'source-map',
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                outputStyle: 'expanded',
                javascriptEnabled: true,
                // modifyVars: require('')
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            esMoudles: false,
            fallback: {
              loader: 'file-loader',
              options: {
                esMoudles: false,
                name: '[hash].[ext]'
              }
            }
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
    ...config.plugins,
    new ESLintPlugin({
      // 指定需要检查的扩展名
      extensions: ['js', 'tsx', 'ts', 'jsx'],
      // 启用 Eslint 自动修复特性
      fix: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      cache: false,
      filename: 'index.html',
      // 引用的模板地址
      template: srcPath('../index.html'),
      // 页面引用：<%= htmlWebpackPlugin.options.title %>
      title: config.title,
      minify: {
        removeAttributeQuotes: true
      }
    })
  ]
}