# JS 为何是异步
1. JS是单线程的语言，所谓的”单线程“，就是拿到程序，一行一行的执行，上面的执行未完成，就傻傻的等着

# 实现异步的核心原理
1. 就是将`callback`作为参数传递给异步执行函数，当有结果返回之后再触发`callback`执行

# 常见的异步操作
1. 网络请求，如`ajax`,`http.get`
2. IO操作，如`readFile`,`readdir`
3. 定时函数，如`setTimeout`,`setInterval`

# event loop