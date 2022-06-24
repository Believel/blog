// 1. reduce() 方法对数组中每个元素按序执行一个由您提供的reducer函数，每一次运行reducer会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值
const array1 = [1, 2, 3, 4, 5];
/**
 * prev: 上一次调用callbackFn时的返回值。在第一次调用时，若指定了初始值intialValue,其值为initialValue,否则为数组索引为0的元素array[0]
 * next: 当前中正处理的元素。在第一次调用时，若指定了初始值intialValue,其值则为数组索引为0的元素array[0],否则为array[1]
 * currentIndex: 数组中正在处理的元素的索引。若指定了初始值，则起始索引号为0，否则从索引1开始。
 * array: 用于遍历的数组
 */
const sum = array1.reduce((prev, next, currentIndex, array) => {
  return prev + next
}, 0)
// console.log(sum)
// 2. concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
const array2 = ['a', 'b', 'c']
const array3 = [].concat(array2, 'd')
// console.log(array3)

// 3. copyWithin(target, start, end) 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度
// target 为基底的索引，复制序列到该位置
// start 为基底索引，开始复制元素的起始位置
// end 为基底的索引，开始复制元素的结束位置
const array4 = ['a', 'b', 'c', 'd']
// copy to index 0 the element at index 3
// console.log(array4.copyWithin(0, 3, 4)) //  ['d', 'b', 'c', 'd']
// console.log(array4.copyWithin(1, 3))// ['d', 'd', 'c', 'd']

// 4. every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
const array5 = [1, 30,40]
// console.log(array5.every(currentValue => currentValue < 50)) // true

// 5. fill(value, start, end) 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
// value 用来填充数组元素的值
// start 起始索引，默认值为0
// end 终止索引，默认值为 this.length
const array6 = [1, 2, 3, 4]
// console.log(array6.fill(0, 2, 4)) // [1, 2, 0, 0]

// 6. filter() 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素
const words = ['spray', 'limit', 'elite', 'exuberant', 'present']
const result = words.filter(word => word.length > 6)
// console.log(result)// ['exuberant', 'present']

// 7. find() 方法返回数组中满足提供测试函数的第一个元素的值
// 8. findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1
// 9. flat(depth) 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。depth默认为1
const array9 = [0, 1, 2, [3, 4]]
// console.log(array9.flat()) // [0, 1, 2, 3, 4]
// flat()方法会移除数组中的空项
const array99 = [1,2,,4,5]
// console.log(array99.flat()) // [1, 2, 4, 5]

// 10. flatMap()方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。
// console.log(array99.flatMap(item => [item * 2])) //  [2, 4, 8, 10]

// console.log(array99.reduce((acc, x) => acc.concat([x*2]), [])) // [2, 4, 8, 10]

// 11. forEach() 遍历数组
// 12. Array.from(arrayLike, mapFn, thisArg) 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
// arrayLike 想要转换成数组的伪数组对象或可迭代对象
// mapFn 如果指定了该参数，新数组中的每个元素会执行该回调函数
// 执行回调函数mapFn时this对象
console.log(Array.from('foo')) // ['f', 'o', 'o']
console.log(Array.from([1, 2, 3], x=>x+x)) // [2, 4, 6]

// 13. includes(element) 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回true，否则返回false
// 14. indexOf(element, fromIndex) 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
// 15. Array.isArray() 用于确定传递的值是否是一个Array
// 16. join() 方法将一个数组的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符
// 17. map()方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
// 18. Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
// console.log(Array.of(7)) // [,,,,,,]
// console.log(Array.of(1, 2, 3)) // [1,2,3]
// 19. pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法会更改数组的长度
// 20. push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
// 21. reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
// 22. reverse()方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。
// 23. shift()方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
// 24. slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
// 25. some()方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
// 26. sort()方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的
// 27. splice()方法通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组。
// 28. toLocalString()
// 29. soString() 返回一个字符串，表示指定的数组及其元素。
// 30. unshift() 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度（该方法修改原有数组）。
// 31. values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值。