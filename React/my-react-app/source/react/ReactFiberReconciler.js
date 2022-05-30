import createFiber from "./createFiber";
import {renderWithHooks} from "./hooks";
import {isArray, isStr, Update, updateNode} from "./utils";
// 更新原生标签
export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    // 创建 DOM 节点
    wip.stateNode = document.createElement(wip.type);
    // 更新原生标签节点
    updateNode(wip.stateNode, {}, wip.props);
  }
  // 协调子节点
  reconcileChildren(wip, wip.props.children);
}
// 更新函数组件
export function updateFunctionComponent(wip) {
  renderWithHooks(wip);

  const {type, props} = wip;
  const children = type(props);
  reconcileChildren(wip, children);
}

// 1 2 3 4
// 2 3 4
/**
 * 协调子节点： 主要是更新孩子节点上的父filber,child fiber,sibling fiber形成一颗链表树
 * @param {*} returnFiber 父fiber
 * @param {*} children 孩子 filber
 * @returns 
 */
function reconcileChildren(returnFiber, children) {
  if (isStr(children)) {
    return;
  }

  const newChildren = isArray(children) ? children : [children];

  // 记录上个fiber
  let previousNewFiber = null;
  // old child
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    // 创建新的孩子 fiber 节点
    const newFiber = createFiber(newChild, returnFiber);
    const same = sameNode(newFiber, oldFiber);

    if (same) {
      // 节点复用
      Object.assign(newFiber, {
        alternate: oldFiber,
        stateNode: oldFiber.stateNode,
        flags: Update,
      });
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    // 第一个孩子节点
    if (i === 0) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}
function sameNode(a, b) {
  return a && b && a.key === b.key && a.type === b.type;
}
