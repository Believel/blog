import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText
} from './ReactWorkTags'
import { Placement, isStr, isFn, isUndefined } from "./utils";
/**
 * 创建 fiber
 * @param {*} vnode
 * @param {*} returnFiber 父 fiber
 * @returns 新的 fiber
 */
export default function createFiber(vnode, returnFiber) {
  const newFiber = {
    // 原生标签 string
    type: vnode.type,
    key: vnode.key,
    // 属性
    props: vnode.props,
    // 第一个子fiber          首次创建无值
    child: null,
    // 下一个兄弟fiber        首次创建无值
    sibling: null,
    // 父fiber
    return: returnFiber,
    // 不同类型的组件， stateNode也不同
    // 原生标签 -> dom节点
    // class 实例
    // func  函数
    stateNode: null,
    // 标记当前fiber提交的是什么操作，比如插入、更新、删除
    flags: Placement,

    // 记录节点在当前层级下的位置
    index: null,
    // old fiber
    alternate: null,
    // 函数组件存的hook
    memorizedState: null
  };
  const { type } = vnode
  // 原生标签
  if (isStr(type)) {
    newFiber.tag = HostComponent
  } else if (isFn(type)) {
    // 函数或者类
    newFiber.tag = type.prototype.isReactComponent ? ClassComponent : FunctionComponent
  } else if (isUndefined(type)) {
    // 文本节点
    newFiber.tag = HostText
    newFiber.props = { children: vnode }
  } else {
    newFiber.tag = Fragment
  }

  return newFiber;
}
