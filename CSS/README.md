# CSS
1. 盒子模型
2. display
3. float
4. position

# 前端首屏优化
1. 交给DNS域名解析 -> 找到对应的IP地址 -> 然后进行TCP连接 -> 浏览器发送HTTP请求 -> 服务器接收请求 -> 服务器处理请求并返回HTTP报文 -> 以及浏览器接收并解析渲染页面通过缩短请求时间，从而加快网站的访问速度，提升性能

## 常见的几种SPA首屏优化方式
1. 减少入口文件体积
  * 路由懒加载
  * 静态资源引入CDN
2. 静态资源本地缓存
  * 后端资源采用HTTP缓存，设置`Cache-Control`,`Last-modified`,`Etag`等响应头
3. UI框架按需加载
4. 图片资源的压缩
5. 组件重复打包
6. 开启GZip压缩
7. 使用SSR

# BFC(Blocking Formating Context)块级格式化上下文
## 什么情况下触发BFC
1. 根元素（html）
2. float 属性不为none
3. position 为absolute或fixed
4. display 为inline-block，table-cell,table-caption,flex,inline-flex等
5. overflow不为visible

# 面试题
## 布局
1. 盒模型的宽度如何计算
2. margin纵向重叠的问题
  * 相邻元素的 `margin-top` 和 `margin-bottom` 会发生重叠
  * 空白内容也会重叠
3. `margin` 负值的问题
  * `margin-top` 和 `margin-left`负值，元素向上、向左移动
  * `margin-right` 负值，右侧元素左移，自身不受影响
  * `margin-bottom` 负值，下方元素上移，自身不受影响
4. BFC 理解和应用
  * 4.1 什么是BFC？
    * Block format Context 块级格式化上下文
    * 一块独立的渲染区域，内部元素的渲染不会影响边界以外的元素
    * 形成BFC的条件？
      * float不是none
      * position 是 absolute 或 fixed
      * overflow 不是 visible
      * display 是 flex inline-block等
  * 4.2 如何应用？
5. float 布局的问题，以及clearfix
  * 5.1 如何实现圣杯布局和双飞翼布局
    * 目的
      * 三栏布局，中间一栏最先加载和渲染（内容最重要）
      * 两侧内容固定，中间内容随着宽度自适应
    * 技术总结
      * 使用 float 布局
      * 两侧使用margin负值，以便和中间内容相重叠
      * 防止中间内容被两侧覆盖，一个用padding一个用margin
  * 5.2 手写 clearfix
  ```js
  .clearfix:after {
    content: '';
    display: table;
    clear: both;
  }
  .clearfix {
    /* 兼容 IE 低版本 */
    *zoom: 1;
  }
  ```
6. flex 布局的问题
  * 6.1 flex实现一个三点的色子

## 定位
1. absolute 和 relative 分别依据什么定位？
  * relative 自身定位
  * absolute 依据最近一层的定位元素定位
2. 居中对齐的实现方式
  * 水平居中
    * inline 元素：`text-align: center`
    * block 元素：`margin: auto`
    * absolute 元素：`left: 50% + margin-left负值`

  * 垂直居中
    * inline 元素：`line-height值等于height值`
    * absolute 元素：`top: 50% + margin-top负值`
    * absolute 元素: `transform(-50%, -50%)`
    * absolute 元素：`top,left,bottom,right=0 + margin: auto`

## 图文样式
1. line-height 如何继承

## 响应式
1. rem 是什么
  * rem 是一个长度单位，
    * px 是绝对长度单位，最常用
    * em 是相对长度单位，相对于父元素，不常用
    * rem 是相对长度单位，相对于根元素，常用于响应式布局
2. vw/vh
  ```js
  window.innerHeight === 100vh

  window.innerWidth === 100vw
  ```
2. 响应式的常见方式
  * media-query,根据不同的屏幕宽度设置根元素font-size
  * rem,基于根元素的相对单位


## CSS3