// 满二叉树：除最后一层无任何子节点外，每一层上的所有节点都有两个子节点二叉树。如果层数k,节点数为（2^k）-1
// 完全二叉树：若设二叉树深度为h,除h层外，其他各层（1~h-1）的节点数都达到最大数，第h层所有节点都是连续几种在最左边，这就是完全二叉树
// 最小堆：是一种经过排序的完全二叉树，其中任一非终端节点的数据值均不大于其左子节点和右子节点的值

// 返回最小堆堆顶元素
export function peek(heap) {
  return heap.length === 0 ? null : heap[0]
}

// 往最小堆中插入元素
// 1. 把node插入数组尾部
// 2. 往上调整最小堆
export function push(heap, node) {
  let index = heap.length
  heap.push(node)
  siftUp(heap, node, index)
}

function siftUp(heap, node, i) {
  let index = i
  while(index > 0) {
    // 父节点：把数值index-1向右移1位
    const parentIndex = (index - 1) >> 1
    const parent = heap[parentIndex]
    if (compare(parent, node) > 0) {
      // parent > node 不符合最小堆条件
      heap[parentIndex] = node
      heap[index] = parent
      index = parentIndex
    } else {
      return
    }
  }
}
// 删除堆顶元素
// 1. 最后一个元素覆盖堆顶
// 2. 向下调整
export function pop(heap) {
  if (heap.length === 0) {
    return null
  }
  // 先取堆顶元素
  const first = heap[0]
  // 取尾元素放到heap[0],这个时候已经不是最小堆了，需要往下调整
  const last = heap.pop()
  if (first !== last) {
    heap[0] = last
    siftDown(heap, last, 0)
  }
  return first
}
// 从0位置节点开始往下调整，与左右子节点比较，找出最小
function siftDown(heap, node, i) {
  let index = i;
  const len = heap.length;
  // 在len值上右移1为
  const halfLen = len >> 1;
  while (index < halfLen) {
    // 左节点索引
    const leftIndex = (index + 1) * 2 - 1;
    // 右节点索引
    const rightIndex = leftIndex + 1;
    const left = heap[leftIndex];
    const right = heap[rightIndex];

    if (compare(left, node) < 0) {
      // left < node,
      // ? left、right
      if (rightIndex < len && compare(right, left) < 0) {
        // right 最小， 交换right和parent
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        // 没有right或者left<right
        // 交换left和parent
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (rightIndex < len && compare(right, node) < 0) {
      // right 最小， 交换right和parent
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // parent最小
      return;
    }
  }
}


function compare(a, b) {
  //   return a - b;
  const diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}