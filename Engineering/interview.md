1. 前端代码为何要进行构建和打包？

2. `module` `chunk` `bundle` 分别是什么意思，有何区别？
  1. `module`: 各个源码文件，webpack 中一切皆模块
  2. `chunk`: 多模块合并成的，如 entry import() splitChunk
  3. `bundle`: 最终的输出文件

3. `loader` 和 `plugin` 的区别？

4. webpack 如何实现懒加载？

5. webpack 常见性能优化
  * 优化打包构建速度 - 开发体验和速度
    * 优化 babel-loader
    ```js
    // babel在转译js过程中时间开销比较大，将babel-loader的执行结果缓存起来，重新打包的时候，直接读取缓存
    // 缓存位置：`node_modules/.cache/babel-loader`
    {
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        // 开启缓存
        cacheDirectory: true
      },
      include: path.resolve(__dirname, 'src') // 明确范围
      // 排除范围，include 和 exclude 两者选一个即可
      // exclude: path.resolve(__dirname, 'node_modules')
    }
    ```
    * IgnorePlugin 避免引入无用模块
    ```js
    const webpack = require('webpack')
    modules.exports = {
      plugins: [
        // 目的是将 moment 插件中的非中文语言排除掉
        new webpack.IgnorePlugin({
          // 匹配资源请求路径的正则表达式
          resourceRegExp: /^\.\/locale$/,
          // 匹配资源上下文的正则表达式
          contextRegExp: /moment$/
        })
      ]
    }
    ```
    * noParse：不需要解析依赖的第三方类库等，可以通过这个字段进行配置
    ```js
    module.exports = {
      module: {
        // 避免重复打包
        // noParse: /jquery|lodash/,

        // 完整的 `react.min.js`文件没有采用模块化，忽略对`react.min.js`文件的递归解析处理
        noParse: [/react\.min\.js$/]
        rules: [
          ...
        ]
      }
    }
  ```
    * happyPack —— 多进程打包
      * 此库已经不维护了，可以选择使用 `thread-loader`
    * ParallelUglifyPlugin —— 多进程压缩 JS
    ```js
    const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

    module.exports = {
      plugins: [
        // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS 的参数
            // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
            uglifyJS: {
                output: {
                    beautify: false, // 最紧凑的输出
                    comments: false, // 删除所有的注释
                },
                compress: {
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }
        })
      ]
    }
    ```
    * 自动刷新
      * 一般不会开启
      ```js
      module.exports = {
        watch: true // 开启监听，默认为false
        // 注意，开启监听之后，webpack-dev-server 会自动开启刷新浏览器！！！
      }
      ```
    * 热更新
    ```js
    // webpack5 中 devServer: {hot:true} 已经支持 HMR

    // webpack4 中配置如下
    module.exports = {
      entry: {
        xxx': [
          // 实时调整react组件
          'react-hot-loader/patch',
          // 重载开发服务器
          'webpack-dev-server/client?http://0.0.0.0:3999',
          // 热模块更换的运行时代码
          'webpack/hot/only-dev-server',
          srcPath('../src/index')
        ]
      },
      devServer: {
        hot: true
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ]
    }
    ```

    * DllPlugin —— 动态链接库插件
      * 场景：
        * 前端框架如 vue react ，体积大，构建慢
        * 较稳定，不常升级版本
        * 同一个版本只构建一次即可，不用每次都重新构建
      * 使用：webpack 已内置 DllPlugin 支持
        * DllPlugin - 打包出 dll 文件
        * DllReferencePlugin - 使用 dll 文件

  * 优化产出代码 - 产品性能
    * 好处
      * 体积更小
      * 合理分包，不重复加载
      * 速度更快、内存使用更少
    * 小图片 base64 编码
    * bundle 加 hash
    * 懒加载
    * 提取公共代码
    * IngorePlugin
    * 使用 CDN 加速
    * 使用 production
      * 自动开启代码压缩
      * Vue React 等会自动删掉调试代码（如开发环境的 warning）
      * 启动 Tree-Shaking: 剔除没有使用的代码
        * webpack默认支持，需要在`.babelrc`里面设置：`modules: false`,即可在生产环境默认开启
        * 注意：ES6 Module 语法才能让 tree-shaking 生效，commonjs 就不行
    * Scope Hosting
      * webpack 默认支持，在生产环境下默认开启
      ```js
      // 即作用域提升，原理是将多个模块放在同一个作用域下，并重命名防止命名冲突，通过这种方式可以减少函数声明和内存开销

      // hello.js
      export default 'hello world'

      // main.js
      import str from './hello.js'
      console.log(str)
      ```
      * 好处：
        * 代码体积更小
        * 创建函数作用域更小
        * 代码可读性更好

6. `babel-runtime` 和 `babel-polyfill` 的区别

7. IgnorePlugin vs noParse
  * `IgnorePlugin` 直接不引入，代码中没有，需要什么自己手动引入
  * `noParse` 引入，但不打包

8. 关于开启多进程
  * 项目比较大，打包比较慢，开启多进程能提高速度
  * 项目比较小，打包很快，开启多进程会降低速度（进程开销）
  * 按需使用

9. ES6 Module 和 Commonjs区别
  * ES6 Module 静态引入，编译时引入
  * Commonjs 动态引入，执行时引入
  * 只有 ES6 Module 才能静态分析，实现 tree-shaking


