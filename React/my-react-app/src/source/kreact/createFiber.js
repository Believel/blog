import {Placement} from "./utils";

export default function createFiber(vnode, returnFiber) {
  const newFiber = {
    // 原生标签 string
    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
    // 第一个子fiber
    child: null,
    // 下一个兄弟fiber
    sibling: null,
    // 父fiber
    return: returnFiber,
    // 如果是原生标签 dom节点
    // 类组件 类实例
    stateNode: null,
    // 标记当前fiber提交的是什么操作，比如插入、更新、删除
    flags: Placement,

    // old fiber
    alternate: null,
  };
  return newFiber;
}
