// 1. 构造函数： 用new对象的函数
function Foo() {
  this.name = '张珈润'
  this.year = '1994'
  console.log(this); // Foo {name: '张珈润', year: '1994'}
}
const f1 = new Foo()
console.log(f1.name) // 张珈润

// 2. 函数作为对象的一个属性
// var obj = {
//   x: 10,
//   fn: function() {
//     console.log(this); // {x: 10, fn: ƒ}  指向该对象
//     console.log(this.x); // 10
//   }
// }
// obj.fn()

// 2.1

// var obj = {
//   x: 10,
//   fn: function() {
//     console.log(this); // window
//     console.log(this.x); // undefined
//   }
// }
// // fn被赋值到另一个变量中
// const fn1 = obj.fn;
// fn1()



// 3. 函数用 call 或者 apply调用
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  // this 指向当前的函数名
  // 给传入的 this 对象创建一个函数
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myApply = function(context, args) {
  if (!args) args = [];
  return this.myCall(context, ...args)
}

// Function.prototype.myBind = function(context, ...args) {
//   const that = this;
//   return function() {
//     return that.myCall(context, ...args);
//   }
// }

Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const that = this;
  return function F() {
    // 返回一个函数， 我们可以 new F(), 所以需要判断
    if (this instanceof F) {
      return new that(...args, ...arguments)
    }
    return that.myCall(context, args.concat(...arguments));
  }
}

var obj = {
  x: 10
}
var fn = function() {
  console.log(this); // {x: 10}
  console.log(this.x); // 10
}
// 自己实现的是含有 fn对象的
fn.myBind(obj)();


// 4. 全局 & 调用普通函数   this => window

var obj1 = {
  x: 10,
  fn: function() {
    // 函数 f 虽然是在 obj.fn 内部定义的，但是它仍然是一个普通的函数，this 仍然指向 window
    function f() {
      console.log(this); // window
    }
    f();
  }
}
obj1.fn()
