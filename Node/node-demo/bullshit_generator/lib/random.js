// 如何创建随机模块

// 返回一个大于等于min，小于max的随机整数
export function randomInt(min, max) {
  const p = Math.random()
  // 向下取整
  return Math.floor(min * (1 - p) + max * p)
}


// 问题：
// 1. 需要用额外的变量lastPicked保存状态
// 2. 如果选择重复，需要重新选，变相增加选择次数
// 上一次选择的结果
// let lastPicked = null
// // 随机选出数组中一个元素
// export function randomPick(arr) {
//   // 本次选择的结果
//   let picked = null
//   // 这里是为了防止两次选的内容是一样的，如果一样就重新再选一次
//   do {
//     const index = randomInt(0, arr.length)
//     picked = arr[index]
//   } while (lastPicked === lastPicked);
//   lastPicked = picked
//   return picked
// }

// 用高阶函数原因：语料库只需要在初始化时加载一次，而随机语料的获取操作要进行许多次。
export function createRandomPicker(arr) {
  arr = [...arr]; // copy 数组，以免修改原始数据
  function randomPick() {
    const len = arr.length - 1;
    // 随机取数的范围从数组长度更改为数组长度减一, 这样我们就不会取到数组最后一位的元素
    const index = randomInt(0, len);
    const picked = arr[index];
    // 然后我们把每次取到的元素都和数组最后一位的元素进行交换，这样每次取过的元素下一次就在数组最后一位了,下一次也就不能取到它了,而下一次取到的数又会将它换出来，那么再一次就又能取到它了。
    [arr[index], arr[len]] = [arr[len], arr[index]];
    return picked;
  }
  randomPick(); // 抛弃第一次选择结果,这样就可以避免原本数组末位的那个元素在第一次随机取时永远取不到的问题。
  return randomPick;
}