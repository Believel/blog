import { Placement, Update, updateNode } from "./utils";
import {
  updateHostComponent,
  updateFunctionComponent,
  updateClassComponent,
  updateHostTextComponent,
  updateFragmentComponent
} from "./ReactFiberReconciler";

import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText
} from './ReactWorkTags'
import { scheduleCallback } from './scheduler/index'

// wip work in progress 当前正在工作中的
let wipRoot = null;
let wip = null;

// 更新 fiber
export function scheduleUpdateOnFiber(fiber) {
  fiber.alternate = {...fiber};

  wipRoot = fiber;
  wip = fiber;

  scheduleCallback(workLoop)
}

function performUnitOfWork() {
  // 1. 处理当前的任务
  const { tag } = wip;
  // 更新当前组件
  switch (tag) {
    // 原生标签
    case HostComponent:
      // 1. 更新 props  stateNode
      // 2. 协调子 fiber： 主要是更新孩子节点上的父filber,child fiber,sibling fiber形成一颗链表树
      updateHostComponent(wip)
      break;
    // 函数组件
    case FunctionComponent:
      updateFunctionComponent(wip)
      break;
    // 类组件
    case ClassComponent:
      updateClassComponent(wip)
      break;
    // Fragment
    case Fragment:
      updateFragmentComponent(wip)
      break
    // 文本
    case HostText:
      updateHostTextComponent(wip)
      break
    default:
      break;
  }

  // 2. 处理下一个任务   深度优先遍历 
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
// timeRemaining() 可以返回此帧还剩多少时间供用户使用
// didTimeout 此callback任务是否超时
function workLoop() {
  // wip && IdleDeadline.timeRemaining() > 0
  while (wip) {
    performUnitOfWork();
  } // 如果说没有剩余时间了，就需要放弃执行任务控制权，执行控制权交还给浏览器

  // requestIdleCallback(workLoop);

  if (!wip && wipRoot) {
    commitRoot();
  }
}
// window.requestIdleCallback(callback)方法插入一个函数, 这个函数将在浏览器空闲时期被调用
// requestIdleCallback(workLoop);

// 提交
function commitRoot() {
  commitWorker(wipRoot);
  wipRoot = null;
}

function commitWorker(wip) {
  if (!wip) {
    return;
  }
  // 1. 提交自己
  const {flags, stateNode} = wip;
  // 父dom节点
  let parentNode = getParentNode(wip.return); // wip.return.stateNode;
  if (flags & Placement && stateNode) {
    const before = getHostSibling(wip.sibling)
    console.log(wip)
    insertOrAppendPlacementNode(stateNode, before, parentNode)
  }

  if (flags & Update && stateNode) {
    // 更新属性
    updateNode(stateNode, wip.alternate.props, wip.props);
  }
  if (wip.deletions) {
    // 删除wip的子节点
    commitDeletions(wip.deletions, stateNode || parentNode)
  }

  if (wip.tag === FunctionComponent) {
    invokeHooks(wip)
  }

  // 2. commit child
  commitWorker(wip.child);

  // 3. commit sibling
  commitWorker(wip.sibling);
}
function commitDeletions(deletions, parentNode) {
  for (let i = 0; i < deletions.length; i++) {
    parentNode.removeChild(getStateNode(deletions[i]));
  }
}
// 不是每个fiber都有dom节点
function getStateNode(fiber) {
  let tem = fiber;

  while (!tem.stateNode) {
    tem = tem.child;
  }

  return tem.stateNode;
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
function getHostSibling(sibling) {
  while(sibling) {
    if (sibling.stateNode && !(sibling.flags & Placement)) {
      return sibling.stateNode
    }
    sibling = sibling.sibling
  }
}

function insertOrAppendPlacementNode(stateNode, before, parentNode) {
  if (before) {
    parentNode.insertBefore(stateNode, before)
  } else {
    parentNode.appendChild(stateNode)
  }
}

function invokeHooks(wip) {
  const { updateQueueOfEffect, updateQueueOfLayout } = wip;
  for (let i = 0; i < updateQueueOfLayout.length; i++) {
    const effect = updateQueueOfLayout[i]
    effect.create()
  }

  for (let i = 0; i < updateQueueOfEffect.length; i++) {
    const effect = updateQueueOfEffect[i]
    scheduleCallback(() => {
      effect.create();
    })
  }
}