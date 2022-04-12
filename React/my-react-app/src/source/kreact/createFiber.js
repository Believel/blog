import {Placement} from "./utils";
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
    props: vnode.props,
    // 第一个子fiber          首次创建无值
    child: null,
    // 下一个兄弟fiber        首次创建无值
    sibling: null,
    // 父fiber
    return: returnFiber,
    // 如果是原生标签 dom节点
    // 类组件 类实例          首次创建无值
    stateNode: null,
    // 标记当前fiber提交的是什么操作，比如插入、更新、删除
    flags: Placement,

    // old fiber
    alternate: null,
  };
  return newFiber;
}
