// 对象都是通过函数创建的
// 每个函数都有一个 prototype, 即原型
// 每个对象都有一个 __proto__,可成为隐式原型


// instanceof 判断规则：沿着对象的__proto__这条线找，同时函数沿着函数的prototype这条线找，如果两条线能同时找到同一个引用，即同一个对象，那么就返回true

function myInstanceof(f1, Fn) {
  let left = f1.__proto__;
  const right = Fn.prototype;
  while(left) {
    if (left === right) {
      return true
    }
    left = left.__proto__;
  }
  return false
}

// Function.__proto__ = Function.prototype;
// Object.__proto__ = Function.prototype


// 继承
// 原型链：访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找。

function Foo() {}

const f1 = new Foo();
f1.a = 10

Foo.prototype.a = 100;
Foo.prototype.b = 200;

// 是否是基本属性
// console.log(f1.hasOwnProperty('b'));


// !执行上下文
// 函数每被调用一次，都会产生一个新的执行上下文环境。因为不同的调用可能就会有不同的参数。
// 函数在定义的时候，就已经确定了函数体内部自由变量的作用域

var a =10;
function fn() {
  console.log(a)
}
function bar(f) {
  var a = 20;
  f();
}
bar(fn);


