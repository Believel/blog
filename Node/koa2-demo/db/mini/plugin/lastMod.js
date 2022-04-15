// 定义插件

module.exports = exports = function lastModifiedPlugin(schema, options) {
  // 增加字段
  schema.add({ lastMod: Date});
  schema.pre("save", function(next) {
    // 对字段进行赋值
    this.lastMod = new Date;
    next();
  })
  // 如果设置了索引，就给该字段增加索引
  if (options && options.index) {
    // 获取字段， 然后通过 index  方法给该资源增加索引
    schema.path("lastMod").index(options.index);
  }
}