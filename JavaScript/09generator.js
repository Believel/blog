
function* test() {
  let a = 1 + 2;
  yield 2;
  yield 3
}
// cb 是编译过的函数
function generator(cb) {
  return (function() {
    let object = {
      next: 0,
      stop: function() {

      }
    }
    return {
      next: function() {
        const ret = cb(object)
        if (ret === undefined) {
          return {
            value: undefined,
            done: true
          }
        }
        return {
          value: ret,
          done: false
        }
      }
    }
  })()
} 