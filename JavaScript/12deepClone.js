
 // 比较 for in , for of , Object.keys 区别
//  for in
// 1. 遍历对象及其原型链上可枚举的属性
// 2. 如果遍历数组，处理遍历其元素外，还会遍历开发者对数组对象自定义的可枚举属性及其原型链上的可枚举属性
// 3. 遍历对象返回的属性名和遍历数组返回的索引都是string类型
// 4. 某些情况下，可能按随机顺序遍历数组元素；

// for of
// 1. es6中添加的循环遍历语法
// 2. 支持遍历数组，类数组对象，字符串，Map对象，Set对象
// 3. 不支持变量普通对象
// 4. 遍历输出结果为自身的值

// Object.keys
// 1. 返回对象自身可枚举属性组成的数组
// 2. 不会遍历对象原型链上的属性以及 Symbol 属性
// 3. 对数组的遍历顺序和 for in 一致
 Array.prototype.getLength = function () {
  return this.length
}

var arr = ['a', 'b', 'c']
arr.name = 'hac'
Object.defineProperty(arr, 'age', {
  enumerable: true,
  value: 17,
  writable: true,
  configurable: true
})

for (let i in  arr) {
  console.log(i)
}
// 0
// 1
// 2
// name
// age
// getLength

for (let item of arr) {
  // console.log(item)
}
// a
// b
// c


// 深拷贝

// 不会拷贝，但是对对象的属性引用的是对象是可以
const test = {
  name: 'zpp'
}
const target = {
  a: undefined,
  b: function() {},
  c: Symbol('a'),
  // 可以 拷贝
  d: test
}
// console.log('JSON', JSON.parse(JSON.stringify(target))) // { d: {name: 'zpp}}


const source = {
  a: undefined,
  b: function() {},
  c: Symbol('a'),
  d: { e: 11},
  // 这个不可以
  name: test
}

const b = Object.assign({}, source)
// console.log('Object.assign', b)
// 测试数据
// b.name.name = '222'
// console.log('1111', source)


// 测试数据
var data = {
  age: 18,
  name: "liuruchao",
  education: ["小学", "初中", "高中", "大学", undefined, null],
  likesFood: new Set(["fish", "banana"]),
  friends: [
        { name: "summer",  sex: "woman"},
        { name: "daWen",   sex: "woman"},
        { name: "yang",    sex: "man" }  ], 
  work: {
          time: "2019",
          project: { name: "test",obtain: ["css", "html", "js"]} 
        },
  play: function() {    console.log("玩滑板");  }
}

// 判断是否是对象
const isObj = val =>  typeof val === 'object' && val !== null

// 判断是否是数组
// 方式1： Array.isArray(newObj)
// 方式2：newObj instanceof Array

function deepClone(obj) {
  if (!isObj(obj) ) {
    // throw new TypeError('传入的参数不是对象')
    return obj
  }
  let newObj = {}
  // 遍历对象
  Object.keys(obj).forEach(item => {
    const currentValue = obj[item]
    if (!isObj(currentValue)) {
      newObj[item] = currentValue
    } else if (Array.isArray(currentValue)) {
      newObj[item] = [...currentValue]
    } else if (currentValue instanceof Set) {
      newObj[item] = new Set([...currentValue])
    } else if (currentValue instanceof Map) {
      newObj[item] = new Map([...currentValue])
    } else {
      newObj[item] = deepClone(currentValue)
    }
  })

  return newObj
}

const newObj =  deepClone([1,2,3])
console.log('deepClone', newObj )

// obj.hasOwnProperty 判断是否是自身对象
