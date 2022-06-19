# `loader-runner`

1. 定义： `loader-runner`允许你在不安装webpack的情况下运行loaders
2. 作用：
  * 作为webpack的依赖，webpack中使用它执行loader
  * 进行loader的开发和调试
3. 运行：`node run-loader.js`

# `loader-utils` loader的参数获取
1. `getOptions(this)`