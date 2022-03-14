# 工程化
## webpack
1. `loader`: 
2. `plugins`:
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
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  // ...
  plugins: [new ESLintPlugin(options)],
  // ...
};
```