# 工程化
## webpack
1. `loader`: 处理其他类型(除了js，json)的文件，并将他们转换成有效的模块，以供应用程序使用，以及添加到依赖图中
2. `plugins`: 解决 loader 无法实现的其他事
3. react plus typescript
```js
// 用到的库
@babel/preset-typescript @babel-preset-env @babel-react @types/react @types/react-dom
```
4. react plus eslint 校验
* 安装

```js
npm i eslint --save-dev

```
* 初始化文件
```js
npx eslint --init // 进入问题配置页面
```
![配置页面](../imgs/eslint-init.png)

* 安装`npm install eslint-webpack-plugin --save-dev`
```js
// 注意保证：eslint >= 7
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  // ...
  plugins: [
    new ESLintPlugin({
      // 指定需要检查的扩展名
      extensions: ['js', 'tsx', 'ts', 'jsx'],
      // 启用 Eslint 自动修复特性
      fix: true
    }),
  ],
  // ...
};
```
* 安装的其他库：

```js
//  error  Definition for rule 'prettier/prettier' was not found
prettier eslint-config-prettier eslint-plugin-prettier prettier

// error  Missing file extension for "@/container/App" 
1. 安装： eslint-import-resolver-typescript
2. 在settings中配置
"settings": {
    "import/resolver": {
        "typescript": {}
    }
}
3. 在rules中配置
"import/extensions": [
    "error",
    "ignorePackages",
    {
        "ts": "never",
        "tsx": "never"
    }
]
```
5. 生产环境打包：`Error: You forgot to add 'mini-css-extract-plugin'`

> 原因：speed-measure-webpack-plugin 不能和上面插件同时用
