// 异步 loader
// 一种方法：通过async/await,阻塞操作执行
// 另一种方法：可以通过loader本身提供的回调函数 callback

const less = require('less')
function loader (source) {
  const callback = this.async();
  less.loader(source, { sourceMap: {}}, function(err, res) {
    let { css, map } = res;
    callback(null, css, map);
  })
}

module.exports = loader


// callback 的详细传参方法如下：
callback({
  // 当无法转换原内容时， 给 Webpack 返回一个Error
  error: Error | null,
  // 转换后的内容
  content: String | Buffer,
  // 转换后的内容得出原内容的 Source Map (可选)
  sourceMap?: sourceMap,
  // 原内容生成 AST 语法树 （可选）
  abstractSyntaxTree?: AST
})