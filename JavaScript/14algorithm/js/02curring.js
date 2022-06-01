// 柯里化：目的在于避免频繁调用具有相同参数函数的同时，又能够轻松的重用。
// 根据传入的参数：求和
// let a = add(1, 2, 3)
// let b = add(1)(2)(3)

function add() {
  const args = [...arguments]
  var addr = function() {
    args.push(...arguments)
    return addr
  }
  addr.toString = function() {
    return args.reduce((prev, next) => {
      return prev + next
    }, 0)
  }
  return addr
}