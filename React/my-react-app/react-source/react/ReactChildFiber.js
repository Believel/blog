import createFiber from "./createFiber";
import {isArray, isStringOrNumber, Placement, Update } from "./utils";

function deleteChild(returnFiber, childToDelete) {
  const deletions = returnFiber.deletions
  if (deletions) {
    returnFiber.deletions.push(childToDelete)
  } else {
    returnFiber.deletions = [childToDelete];
  }
}
// 删除节点
function deleteRemainingChildren(returnFiber, currentFirstChild) {
  let childToDelete = currentFirstChild
  while(childToDelete) {
    deleteChild(returnFiber, childToDelete)
    childToDelete = childToDelete.sibling
  }
}
function mapRemainingChildren(oldFiber) {
  const existingChildren = new Map()
  let existingChild = oldFiber
  while(existingChild) {
    existingChildren.set(
      existingChild.key || existingChild.index,
      existingChild
    )
    existingChild = existingChild.sibling
  }
  return existingChildren;
}

// 初次渲染，只是记录下标
// 更新，检查接点是否移动
function placeChild(
  newFiber,
  lastPlacedIndex,
  newIndex,
  shouldTrackSideEffects
){
  // 设置当前层级的位置
  newFiber.index = newIndex;
  if (!shouldTrackSideEffects) {
    // 父节点初次渲染
    return lastPlacedIndex;
  }
  // 父节点更新
  // 子节点是初次渲染还是更新呢
  const current = newFiber.alternate
  if (current) {
    const oldIndex = current.index
    // 子节点是更新
    // lastPlacedIndex 记录了上次dom节点相对更新节点的最远位置
    if (oldIndex < lastPlacedIndex) {
      // move
      newFiber.flags |= Placement
      return lastPlacedIndex
    } else {
      return oldIndex
    }
  } else {
    // 子节点是初次渲染
    // | 是按为或操作，就是只有有一个1就是1，两个都是0才是0
    newFiber.flags |= Placement
    return lastPlacedIndex
  }
}



// 1 2 3 4
// 2 3 4
/**
 * 协调子节点： 主要是更新孩子节点上的父filber,child fiber,sibling fiber形成一颗链表树
 * @param {*} returnFiber 父fiber
 * @param {*} children 孩子 filber
 * @returns 
 */
 export function reconcileChildren(returnFiber, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = isArray(children) ? children : [children];

  // 记录上个fiber
  let previousNewFiber = null;
  // old child
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
  // 下一个 oldFiber  | 暂时缓存下一个oldFiber
  let nextOldFiber = null;
  // 用于判断是 returnFiber初次渲染还是更新
  let shouldTrackSideEffects = !!returnFiber.alternate
  let newIndex = 0;
  // 上一次dom节点插入的最远位置
  let lastPlacedIndex = 0;

  // *1. 从左往右遍历，比较新老节点，如果节点可以复用，继续往右，否则就停止
  for (; oldFiber && newIndex < newChildren.length; newIndex++) {
    const newChild = newChildren[newIndex]
    if (newChild === null) {
      continue
    }
    if (oldFiber.index > newIndex) {
      nextOldFiber = oldFiber
      oldFiber = null
    } else {
      nextOldFiber = oldFiber.sibling
    }
    // 比较新旧两个节点是否可以复用
    const same = sameNode(newChild, oldFiber)
    if (!same) {
      if (oldFiber == null) {
        oldFiber = nextOldFiber
      }
      // 中断循环
      break
    }
    const newFiber = createFiber(newChild, returnFiber)
    Object.assign(newFiber, {
      stateNode: oldFiber.stateNode,
      alternate: oldFiber,
      flags: Update
    })
    // 节点更新
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    )
    if (previousNewFiber === null) {
      returnFiber.child = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }
    previousNewFiber = newFiber
    oldFiber = nextOldFiber
  }
  // *2. 新节点没了，老节点还有
  // 0 1 2
  // 0
  if (newIndex === newChildren.length) {
    deleteRemainingChildren(returnFiber, oldFiber)
    return;
  }
  // *3. 初次渲染
  // 老节点没了，新节点还有
  if (!oldFiber) {
    for (; newIndex < newChildren.length; newIndex++) {
      const newChild = newChildren[newIndex]
      if (newChild === null) {
        continue
      }
      // 创建新的孩子 fiber 节点
      const newFiber = createFiber(newChild, returnFiber);
      lastPlacedIndex = placeChild(
        newFiber,
        lastPlacedIndex,
        newIndex,
        shouldTrackSideEffects
      )
      // head node
      if (previousNewFiber === null) {
        returnFiber.child = newFiber
      } else {
        previousNewFiber.sibling = newFiber
      }
      previousNewFiber = newFiber
    }
  }
  // *4 新老接点都还有
  // old 0 1 [2 3 4]
  // new 0 1 [3 4]
  // !4.1 把剩下的old单链表构建哈希表
  const existingChildren = mapRemainingChildren(oldFiber)
  // !4.2 遍历新节点，通过新节点的key去哈希表中查找节点，找到就复用节点，并且删除哈希表中对应的节点
  for (; newIndex < newChildren.length; newIndex++) {
    const newChild = newChildren[newIndex]
    if (newChild === null) {
      continue
    }
    const newFiber = createFiber(newChild, returnFiber)
    const matchedFiber = existingChildren.get(newFiber.key || newFiber.index)
    if (matchedFiber) {
      // 节点复用
      Object.assign(newFiber, {
        stateNode: matchedFiber.stateNode,
        alternate: matchedFiber,
        flags: Update
      })
      existingChildren.delete(newFiber.key || newFiber.index)
    }
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    )
    if (previousNewFiber === null) {
      returnFiber.child = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }
    previousNewFiber = newFiber
  }
  // *5 old的哈希表中还有值，遍历哈希表删除所有old
  if (shouldTrackSideEffects) {
    existingChildren.forEach(child => deleteChild(returnFiber, child))
  }
}
// 节点复用的条件：1. 同一层级下  2. 类型相同   3. key相同
function sameNode(a, b) {
  return a && b && a.key === b.key && a.type === b.type;
}
