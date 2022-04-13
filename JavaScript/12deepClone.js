
 // 比较 for in , for of , Object.keys 区别
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

// for (let i in  arr) {
//   console.log(i)
// }


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
console.log('JSON', JSON.parse(JSON.stringify(target)))


const source = {
  // 这个不可以
  name: test
}

const b = Object.assign({}, target)
console.log('Object.assign', b)
// 测试数据
// b.d.name = '222'
// console.log('1111', target)


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

const isObj = val =>  typeof val === 'object' && val !== null
function deepClone(obj) {
  if (!isObj(obj) ) {
    throw new TypeError('传入的参数不是对象')
  }
  let newObj = {}

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


console.log('deepClone', deepClone(data))


