const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 压缩 JS, webpack 5自带开箱即用，但是如果想自定义需要自己下载使用
const TerserPlugin = require('terser-webpack-plugin')

// webpack 4, 优化或者压缩 CSS
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// webpack 5 优化或者压缩 CSS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// 将 CSS 提取单独的文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const threadLoader = require('thread-loader')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const os = require('os')
// const smp = new SpeedMeasurePlugin()
const config = require('./webpack.common')
const { srcPath } = require('./paths')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

threadLoader.warmup({
  workers: os.cpus(),
  workerParallelJobs: 50
}, [
  'babel-loader', 
  'less-loader'
])

// 生产环境
module.exports = {
  mode: 'production',
  entry: config.entry,
  resolve: config.resolve,
  output: {
    path: srcPath('../dist/'),
    filename: '[name].[contenthash:8].js',
    publicPath: ''
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
      // new OptimizeCSSAssetsPlugin()
      new CssMinimizerPlugin()
    ],
    // 分割代码块
    splitChunks: {
      // initial 入口 chunk,对于异步导入的文件不处理
      // async 异步 chunk,只对异步导入的文件处理
      // all 全部 chunk
      chunks: 'all',
      // 第三方模块
      name: 'vendor'
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /(node_modules)/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: false
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'thread-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: false
            }
          },
          {
            loader: 'postcss-loader'
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
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10000,
        //     esMoudles: false,
        //     fallback: {
        //       loader: 'file-loader',
        //       options: {
        //         esMoudles: false,
        //         name: '[contenthash].[ext]'
        //       }
        //     }
        //   }
        // }
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
  plugins: [
    ...config.plugins,
    new BundleAnalyzerPlugin({
      // analyzerMode: 'disable', // 不启动展示打包报告的http服务器
      // generateStatsFile: true // 是否生成stats.json文件
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
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