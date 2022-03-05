import {isFn, isStr, Placement, Update, updateNode} from "./utils";
import {
  updateHostComponent,
  updateFunctionComponent,
} from "./ReactFiberReconciler";

// wip work in progress 当前正在工作中的
let wipRoot = null;
let wip = null;

export function scheduleUpdateOnFiber(fiber) {
  fiber.alternate = {...fiber};

  wipRoot = fiber;
  wip = fiber;
}

function performUnitOfWork() {
  // 1. 处理当前的任务
  // todo
  const {type} = wip;
  if (isStr(type)) {
    updateHostComponent(wip);
  } else if (isFn(type)) {
    updateFunctionComponent(wip);
  }

  // 2. 处理下一个任务
  // 深度优先遍历 王朝的故事
  if (wip.child) {
    wip = wip.child;
    return;
  }

  let next = wip;

  while (next) {
    if (next.sibling) {
      wip = next.sibling;
      return;
    }
    next = next.return;
  }
  wip = null;
}

function workLoop(IdleDeadline) {
  while (wip && IdleDeadline.timeRemaining() > 0) {
    performUnitOfWork();
  }

  requestIdleCallback(workLoop);

  if (!wip && wipRoot) {
    commitRoot();
  }
}

requestIdleCallback(workLoop);

function commitRoot() {
  commitWorker(wipRoot);
  wipRoot = null;
}

function commitWorker(wip) {
  if (!wip) {
    return;
  }
  // 1. cmmiit自己
  const {flags, stateNode} = wip;
  // 父dom节点
  let parentNode = getParentNode(wip.return); // wip.return.stateNode;
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode);
  }

  if (flags & Update && stateNode) {
    updateNode(stateNode, wip.alternate.props, wip.props);
  }

  // 2. commit child
  commitWorker(wip.child);

  // 3. commit sibling
  commitWorker(wip.sibling);
}

function getParentNode(wip) {
  let tem = wip;
  while (tem) {
    if (tem.stateNode) {
      return tem.stateNode;
    }
    tem = tem.return;
  }
}
