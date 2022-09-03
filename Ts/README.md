# init ts
```js
tsc --init
```

# ts调试
![](../imgs/ts%E8%B0%83%E8%AF%95/%E8%BF%90%E8%A1%8C%E4%BB%BB%E5%8A%A1.png)
![](../imgs//ts%E8%B0%83%E8%AF%95/%E9%80%89%E6%8B%A9ts%E7%9A%84%E8%BF%90%E8%A1%8C%E4%BB%BB%E5%8A%A1.png)
![](../imgs/ts%E8%B0%83%E8%AF%95/%E7%82%B9%E5%87%BB%E5%AF%B9%E5%BA%94%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95%E4%B8%8B%E7%9A%84tsconfig.png)


# ts 实战
## 1. 如何将js应用切换至ts
1. 调整项目目录
```js
JavaScript2TypeScriptProject
├── src     // 源码目录
│   ├── a.js
│   └── b.js
├── build 或则 lib   // 打包构建的目录
├── typings         // ts 类型
├── package.json
└── tsconfig.json   // 手动创建的tsconfig.json配置文件
```
2. 配置 `tsconfig`

> 以 React Web 项目为例，为了尽可能少改动源码、让项目正常运行起来，我们不要一步到位开启严格模式，而应该尽量宽松地配置tsconfig, 如下
```js
{

  "compilerOptions": {
    // 配置“target”为 "es5"，用来将 TypeScript 转译为低版本、各端兼容性较好的 ES5 代码。
    "target": "es5",

    "lib": [

      "dom",

      "dom.iterable",

      "esnext"

    ],
    // 开启的 allowJs，它允许 JavaScript 和 TypeScript 混用，这使得我们可以分批次、逐模块地迁移代码。
    "allowJs": true,

    "skipLibCheck": true,

    "esModuleInterop": true,

    "allowSyntheticDefaultImports": true,

    "forceConsistentCasingInFileNames": true,

    "module": "esnext",

    "moduleResolution": "node",

    "resolveJsonModule": true,

    "isolatedModules": true,

    "noEmit": true,
   // 因为是react web 项目，所以需要将“jsx”配置为“react”。
    "jsx": "react",
    // 我们把 typings 目录添加到类型查找路径，让 TypeScript 可以查找到自定义类型声明，比如为缺少类型声明的第三方模块补齐类型声明。
    "typeRoots": ["node_modules/@types", "./typings"]

  },
  // 我们把 src 和 typings 目录添加到 TypeScript 需要识别的文件中（也可以按照实际需要添加其他目录或者文件，比如说独立的单测文件目录 __tests__）。
  "include": [ "src", "typings" ]

}

// 注意：因为 Web 项目中不会直接使用 tsc 转译 TypeScript，所以我们无需配置 rootDir、outDir，甚至可以开启 noEmit 配置（如上边配置所示，开启该配置 tsc 不会生成转译产物）。
```
3. 构建工具集成 TypeScript