// 从json文件中读取数据的插件
import json from 'rollup-plugin-json'
// 可以使用未被浏览器和Node.js支持的将来版本的JavaScript特性
import babel from 'rollup-plugin-babel';

export default {
  // 入口点
  input: 'src/main.js',
  output: {
    // 输出的文件
    file: 'bundle.js',
    // 生成包的格式
    // umd : 浏览器和node中都可以运行
    // cjs: Commonjs, 适用于node中运行
    // amd或者cmd: 浏览器环境运行
    // esm: ES模块文件
    format: 'umd',
    // 生成包的名字
    name: 'MyBundle'
  },
  plugins: [
    json(),
    babel({
      // 只编译我们的源代码
      exclude: 'node_modules/**'
    })
  ],
  // external 接收一个模块名称的数组或一个接受模块名称的函数
  // 指出应将哪些模块视为外部模块: 不会与你的库打包在一起
  // external: ['lodash']
  external: id => /lodash/.test(id)
}