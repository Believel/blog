// loader 默认导出一个函数，接受匹配到的文件资源字符串和sourceMap
// 我们可以修改文件内容字符串后再返回给下一个loader进行处理
/**
 * 同步 style-loader
 * @param {*} source 处理后的css文件字符串
 * @param {*} map 
 * @returns 返回的是一个JS代码的字符串，webpack 最后会将返回的字符串打包进模块中
 */
module.exports = function (source, map) {
  let style = `
    let style == document.createElement('style);
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style)
  `
  return style;
}