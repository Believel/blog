// 洗牌算法：从原始数组中随机抽取一个新的元素到新数组中
// 1. 从还没处理的数组(n个)中，产生一个[0, n]的随机数
// 2. 从剩下的n个元素中把随机数取到新数组中
// 3. 删除原数组的随机数
// 4. 重复2.3步骤直到所有元素取完
// 5. 最终返回一个新的打乱的数组


// 这种方式需要去除原数组 arr中的元素，所以时间复杂度为 O(n2)
// function shuffle(arr) {
//   const result = [];
//   let random;
//   while(arr.length > 0) {
//     random = Math.floor(Math.random() * arr.length);
//     result.push(arr[random])
//     arr.splice(random, 1)
//   }
//   return result
// }


// 每次从未处理的数组中随机取一个元素，然后把该元素放到数组的尾部，即数组的尾部放的就是已经处理过的元素
// O(n)
function shuffle(arr) {
  let len = arr.length,
    random;
  while(0 !== len) {
    random = Math.floor(Math.random() * len)
    len--;
    [arr[len], arr[random]] = [arr[random], arr[len]]
  }
  return arr
}

console.log(shuffle([1, 2, 3, 4, 5]))