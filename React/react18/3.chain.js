// 链表
class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload
    this.nextUpdate = nextUpdate
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null // 原状态
    this.firstUpdate = null // 第一个更新
    this.lastUpdate = null // 最后一个更新
  }
  enqueueUpdate(update) {
    // debugger
    if (this.firstUpdate === null) {
      this.firstUpdate = this.lastUpdate = update
    } else {
      // 让上一个最后一个节点的nextUpdate指向自己
      this.lastUpdate.nextUpdate = update
      // 让最后一个节点指向自己
      this.lastUpdate = update 
    }
  }
  // 1. 获取老状态。
  // 2. 遍历这个链表，进行更新， 得到新状态
  forceUpdate() {
    let currentState = this.baseState || {}
    let currentUpdate = this.firstUpdate
    while(currentUpdate) {
      let nextState = typeof currentUpdate.payload === 'function' ?
        currentUpdate.payload(currentState) : currentUpdate.payload
      currentState = { ...currentState, ...nextState } // 使用当前更新得到新的状态
      currentUpdate = currentUpdate.nextUpdate // 找下一个节点
    }
    this.firstUpdate = this.lastUpdate = null // 更新完成后要把链表清空
    this.baseState = currentState
    return currentState
  }
}
let queue = new UpdateQueue()

queue.enqueueUpdate(new Update({name: 'zu'}))
queue.enqueueUpdate(new Update({number: 0}))
queue.enqueueUpdate(new Update((state) => ( {number: state.number + 1 })))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
queue.forceUpdate()
console.log(queue.baseState) 

// 链表可中断


// 链表、数组：多个元素存储组成的
// 区别：
// 链表：通过next指针联系在一起；数组是通过下标
// 数组：如果在中间插入新的元素，其他元素会重新计算；链表：不会重新计算，说白了是赋值或者替换的一种感觉
// 数组：通过下标进行查找即可；链表：每次查找都需要从头开始找