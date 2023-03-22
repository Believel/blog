// 最小堆：最小的元素在堆顶元素
// 无序数组：[4, 1, 3, 2, 16, 9, 10, 14, 8, 7]

// 返回最小堆s中最小元素（堆顶元素）
function minHeapMiniMum(s) {
  return s.length === 0 ? null : s[0]
}

/**
 * 删除最小堆s中最小元素 (堆顶元素),并返回
 * @param {*} s
 * @returns x
 */
function minHeapExtractMin(s) {
  if (s.length === 0) {
    return null
  }
  // 先取堆顶元素
  const first = s[0]
  // 取尾元素
  const last = s.pop()
  if (first !== last) {
    // 放到堆顶元素上，此时的堆不是最小堆了，需要向下调整
    s[0] = last
    siftDown(s, last, 0)
  }
  return first
}
/**
 * 从0位置节点开始往下调整，与左右子节点比较，找出最小
 * @param {*} s 元素列表
 * @param {*} node 当前位置元素
 * @param {*} i 当前位置元素索引
 */
function siftDown(s, node, i) {
  let index = i;
  const len = s.length;
  // 其实就是找出父节点：利用操作数（二进制）右移1位
  const halfLen = len >> 1
  while (index < halfLen) {
    // 左孩子节点索引
    const leftIndex = (index + 1) * 2 - 1
    // 右孩子节点索引
    const rightIndex = leftIndex + 1
    const left = s[leftIndex]
    const right = s[rightIndex]
    // 左节点小于父节点
    if (left < node) {
      if (rightIndex < len && right < left) {
        // right 最小，交换right和parent
        s[index] = right
        s[rightIndex] = node
        index = rightIndex
      } else {
        // 无right 或 left 最小, 交换left和parent
        s[index] = left
        s[leftIndex] = node
        index = leftIndex
      }
    } else if (rightIndex < len && right < node) {
      // right最小，交换right和parent
      s[index] = right
      s[rightIndex] = node
      index = rightIndex
    } else {
      // parent 最小
      return
    }
  }
}

// 往最小堆s中插入元素x
// 1. 把node插入数组尾部
// 2. 往上调整最小堆
function minHeapInsert(s, x) {
  let index = s.length
  s.push(x)
  siftUp(s, x, index)
}

function siftUp(heap, node, i) {
  let index = i
  while(index > 0) {
    // 父节点：把数值index-1向右移1位
    const parentIndex = (index - 1) >> 1
    const parent = heap[parentIndex]
    if (parent - node > 0) {
      // parent > node 不符合最小堆条件
      heap[parentIndex] = node
      heap[index] = parent
      index = parentIndex
    } else {
      return
    }
  }
}



