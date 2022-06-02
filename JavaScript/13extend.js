// 实现继承
// * 1. 原型链继承
// function Parent() {
//   this.name = 'parent'
//   this.arr = [1,2]
// }

// function Child() {
//   this.type = 'child'
// }

// Child.prototype = new Parent()

// 缺点：两个实例使用的是一个原型对象，内存空间是共享的
// const c1 = new Child()
// const c2 = new Child()
// c1.arr.push(3)
// console.log(c2.arr, c2.name) // [1, 2, 3]

// * 2. 构造函数继承
// function Parent() {
//   this.name = 'parent'
// }
// Parent.prototype.getName = function() {
//   return this.name
// }

// function Child() {
  // 只能继承父类的实例属性和方法，不能继承原型属性和方法
  // Parent.call(this)
  // this.type = 'child'
// }
// let child = new Child()
// console.log(child)
// console.log(child.getName()) // child.getName is not a function


// * 3. 组合继承
// function Parent() {
//   this.name = 'parent'
//   this.play = [1, 2, 3]
// }
// Parent.prototype.getName = function() {
//   return this.name
// }
// function Child() {
//   // 只能继承父类的实例属性和方法，不能继承原型属性和方法
//   // 第二次调用Parent
//   Parent.call(this)
//   this.type = 'child'
// }
// // 第一次调用Parent
// Child.prototype = new Parent()
// Child.prototype.constructor = Child
// const c1 = new Child()
// const c2 = new Child()
// c1.play.push(4) // 互不影响
// console.log(c1, c2)
// 缺点：多了构造一次的性能开销

// * 4. 原型式继承
// let parent = {
//   name: 'parent',
//   arr: [1, 2, 3],
//   getName: function() {
//     return this.name
//   }
// }

// let p = Object.create(parent)
// p.name = 'tom'
// p.arr.push(4)
// let p1 = Object.create(parent)
// p1.arr.push(5)
// console.log(p.name === p.getName()) // true
// console.log(p.arr, p1.arr) // [1,2,3,4,5] [1,2,3,4,5]
// 缺点：Object.create方法是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能

// * 5. 寄生组合式继承
// function clone(parent, child) {
//   // 用Object.create减少组合继承中多进行一次构造的过程
//   child.prototype = Object.create(parent.prototype)
//   child.prototype.constructor = child
// }

// function parent() {
//   this.name = 'parent'
//   this.arr = [1, 2]
// }
// parent.prototype.getName = function() {
//   return this.name
// }

// function child() {
//   parent.call(this)
//   this.friends = 'child1'
// }

// clone(parent, child)
// child.prototype.getFriends = function() {
//   return this.friends
// }

// * 6 extends

class Parent {
  constructor(name) {
    this.name = name
  }
  getName = function() {
    console.log('parent', this.name)
  }
}
class Child extends Parent {
  constructor(name, age) {
    // 子类中存在构造函数，则需要在使用this之前首先调用 super()
    super(name)
    this.age = age
  }

}

const c1 = new Child('zpp', '21')
c1.getName()
