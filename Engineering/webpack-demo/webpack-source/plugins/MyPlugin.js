// 在 webpack 运行的生命周期中会广播出许多事件， Plugin 可以监听这些事件，在合适的时机通过Webpack 提供的API 改变输出结果

// Plugin 的本质是类；
// 我们在定义plugin时，其实是在定义一个类

class MyPlugin {
  constructor (options) {
    console.log('Plugin 被创建')
    console.log(options)
    this.options = options
  }
  // compiler 对象包含了webpack环境所有的配置信息
  // compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等

  //区别在于：
  // compiler 代表了整个webpack从启动到关闭的生命周期，而compilation只是代表了一次新的编译过程
  // compiler和compilation暴露出许多钩子，我们可以根据实际需求的场景进行自定义处理
  apply (compiler) {
    // 注册完成的钩子   同步的钩子
    compiler.hooks.done.tap("MyPlugin", (compilation) =>{
      console.log("compilation done")
    })

    // 异步的钩子 ： tapAsync 和 tapPromise
    compiler.hooks.run.tapAsync("MyPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log('compilation async run')
        callback()
      }, 1000)
    })

    compiler.hooks.emit.tapPromise("MyPlugin", (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('compilation emit')
          resolve()
        }, 1000)
      })
    })
  } 
}

module.exports = MyPlugin

// 工作流程如下
// 1. webpack 启动，执行new MyPlugin(options), 初始化插件并获取实例
// 2. 初始化compiler对象，调用 myPlugin.apply(compiler) 给插件传入 compiler 对象
// 3. 插件实例获取compiler,通过compiler监听webpack广播的事件，通过compiler对象操作webpack