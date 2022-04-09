// 打包目录生成一个 filelist.md 文件，文件的内容是将所有生成文件展示在一个列表中



class FileListPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
      var filelist = 'In this build:\n\n'
      // 遍历所有编译过的资源文件
      // 对每个文件名称，都添加一行内容
      for (var filename in compilation.assets) {
        filelist+='- ' + filename + '\n'
      }
      // 将这个列表作为一个新的文件资源，插入到webpack构建中
      compilation.assets['filelist.md'] = {
        source: function() {
          return filelist
        },
        size: function() {
          return filelist.length
        }
      }
      callback()
    })
  }
}
module.exports = FileListPlugin