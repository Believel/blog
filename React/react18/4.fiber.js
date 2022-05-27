/**
 * 1. fiber 之前是什么样的?为什么需要fiber?
 * 2. 看一下fiber的代码是怎么样的？完成任务之后，我是如何遍历子节点
 * 这种遍历是递归调用，执行栈会越来越深。而且不能中断，因为中断后再想恢复就非常难了 
 */
// let root = {
//   key: 'A1',
//   children: [
//     {
//       key: 'B1',
//       children: [
//         {
//           key: 'C1',
//           children:[]
//         },
//         {
//           key: 'C2',
//           children: []
//         }
//       ]
//     },
//     {
//       key: 'B2',
//       children: []
//     }
//   ]
// }

// function walk(element) {
//   doWork(element)
//   element.children.forEach(walk)
// }

// function doWork(element) {
//   console.log(element.key)
// }
// walk(root)


/**
 * fiber 是什么？
 * Fiber 是一个执行单元，每次执行完一个执行单元，React就会检查现在还剩多少时间，如果没有时间就将控制权让出去。
 * Fiber 是一种数据结构，React目前的做法是使用链表，每个VirtualDOM节点内部表示一个Fiber
 */

/**
 * Fiber 执行阶段
 * 协调阶段(render阶段)(Reconciliation)：可以认为是Diff阶段，这个阶段可以被中断，这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等，这些变更React称为副作用（Effect）
 * 提交阶段（Commit）：将上一次阶段计算出来的需要处理的副作用一次性执行了。这个阶段必须同步执行，不能被打断
 */

/**
 * render 阶段：深度优先遍历
 * 先从顶点开始遍历
 * 下一个节点：先儿子、后弟弟，再叔叔
 */
 let A1 = { type: 'div', key: 'A1' }
 let B1 = { type: 'div', key: 'B1', return: A1 }
 let B2 = { type: 'div', key: 'B2', return: A1 }
 let C1 = { type: 'div', key: 'C1', return: B1 }
 let C2 = { type: 'div', key: 'C2', return: B1 }
 A1.child = B1
 B1.sibling = B2
 B1.child = C1
 C1.sibling = C2
let rootFiber = A1
let nextUnitOfWork = null; // 下一个执行单元

 // deadline 是一个对象，有两个属性
// timeRemaining() 可以返回此帧还剩多少时间供用户使用
// didTimeout 此callback任务是否超时
function workLoop(deadline) {
  while((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextUnitOfWork) { // 如果有待执行的执行单元，就执行，然后返回下一个单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  if (!nextUnitOfWork) {
    console.log('render 阶段结束了')
  } else {
    // 如果说没有剩余时间了，就需要放弃执行任务控制权，执行控制权交还给浏览器
    requestIdleCallback(workLoop, { timeout: 1000 })
  }
}

function performUnitOfWork(fiber) {
  beginWork(fiber) // 处理fiber

  // 如果有儿子，返回大儿子
  if (fiber.child) {
    return fiber.child
  }
  // 没有儿子，说明此fiber已经完成
  while(fiber) {
    completeUnitWork(fiber)
    if (fiber.sibling) {
      return fiber.sibling
    }
    // 返回父节点
    fiber = fiber.return
  }
}
function beginWork(fiber) {
  console.log('开始', fiber.key); // A1 B1 C1 C2 B2
}
function completeUnitWork(fiber) {
  console.log('结束', fiber.key) // C1 C2 B1 B2 A1
}

nextUnitOfWork = rootFiber
// 可以实现可中断
requestIdleCallback(workLoop, { timeout: 1000})