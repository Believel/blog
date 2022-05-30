import { renderWithHooks } from "./hooks";
import { updateNode } from "./utils";
import { reconcileChildren } from './ReactChildFiber'
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
// 更新类组件
export function updateClassComponent(wip) {
  const { type, props } = wip
  const instance = new type(props)
  const children = instance.render()

  reconcileChildren(wip, children)
}
// Fragment
export function updateFragmentComponent(wip) {
  reconcileChildren(wip, wip.props.children)
}
// 文本节点
export function updateHostTextComponent(wip) {
  wip.stateNode = document.createTextNode(wip.props.children)
}
