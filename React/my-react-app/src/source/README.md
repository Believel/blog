1. 并发模式

> `window.requestIdleCallback`将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应

2. fiber

> fiber 既是一种数据结构，也是一个工作单元。

* 每个fiber都有一个链接指向它的第一个子节点、下一个兄弟节点和它的父节点。这种数据结构可以让我们更方便的查找下一个工作单元。

https://mp.weixin.qq.com/s/9Pox7ovRn4voXbShTAJrXg