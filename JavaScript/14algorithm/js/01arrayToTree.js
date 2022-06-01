export const arr2 = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
];
/**
 * 数组转成树结构
 * arr Array
 */
export default function arrayToTree(arr) {
  let result = {}
  let m = {};
  // 1. 每一项组成一个哈希表
  for (let item of arr) {
    m[item.id] = { ...item, children: [] }
  }
  // 遍历每一项，找到根数赋值，其他项赋到对应的children里面
  arr.forEach(item => {
    const pid = item.pid;
    const id = item.id;
    if (pid === 0) {
      result = m[id]
    } else {
       if (!m[pid]) {
        m[pid] = {
          children: []
        }
       } 
       m[pid].children.push(m[id])
    }
  })
  return result

}
console.log(arrayToTree(arr2))
