# babel 环境搭建和基本配置

> `Babel 7.4` 之后弃用 `babel-polyfill`,推荐直接使用 `core-js` 和 `regenerator`

1. `.babelrc` 配置
```js
{
    "presets": [
      "@babel/preset-env",
      // 按需引入 babel-polyfill
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    "plugins": []
}
```

3. `babel-polyfill` 是什么

4. `babel-runtime`