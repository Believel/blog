# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


# vuex4
```js
yarn add vuex@next --save
```
# vue-router4
```js
npm install vue-router@4
```

# element-plus
## 自动按需导入
1. `unplugin-vue-components: 0.22.2` vite启动报错

![](../docs/element-plus%E8%87%AA%E5%8A%A8%E5%AF%BC%E5%85%A5%E9%85%8D%E7%BD%AE%E5%90%AF%E5%8A%A8%E6%8A%A5%E9%94%99.png)

* 解决办法：
    * method one: you can temporarily add "type": "module" to package.json to fix the problem
    * method two: you can downgrade to ^0.21.2
