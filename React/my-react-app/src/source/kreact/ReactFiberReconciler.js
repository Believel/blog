import createFiber from "./createFiber";
import {renderWithHooks} from "./hooks";
import {isArray, isStr, Update, updateNode} from "./utils";

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    updateNode(wip.stateNode, {}, wip.props);
  }

  reconcileChildren(wip, wip.props.children);
}

export function updateFunctionComponent(wip) {
  renderWithHooks(wip);

  const {type, props} = wip;
  const children = type(props);
  reconcileChildren(wip, children);
}

// 1 2 3 4
// 2 3 4
// 协调子节点
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
