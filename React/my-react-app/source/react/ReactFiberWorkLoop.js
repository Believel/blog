import { isFn, isStr, Placement, Update, updateNode } from "./utils";
import {
  updateHostComponent,
  updateFunctionComponent,
} from "./ReactFiberReconciler";

// wip work in progress 当前正在工作中的
let wipRoot = null;
let wip = null;

// 更新 fiber
export function scheduleUpdateOnFiber(fiber) {
  fiber.alternate = {...fiber};

  wipRoot = fiber;
  wip = fiber;
}

function performUnitOfWork() {
  // 1. 处理当前的任务
  const {type} = wip;
  // 是字符串，更新原生标签
  if (isStr(type)) {
    // 1. 更新 props  stateNode
    // 2. 协调子 fiber： 主要是更新孩子节点上的父filber,child fiber,sibling fiber形成一颗链表树
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
// IdleDeadline 有两个对象：
// requestIdleCallback() 可以返回此帧还剩多少时间供用户使用
// didTimeout 此callback任务是否超时
function workLoop(IdleDeadline) {
  while (wip && IdleDeadline.requestIdleCallback() > 0) {
    performUnitOfWork();
  } // 如果说没有剩余时间了，就需要放弃执行任务控制权，执行控制权交还给浏览器

  requestIdleCallback(workLoop);

  if (!wip && wipRoot) {
    commitRoot();
  }
}
// window.requestIdleCallback(callback)方法插入一个函数, 这个函数将在浏览器空闲时期被调用
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
