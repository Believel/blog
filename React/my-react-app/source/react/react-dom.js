import createFiber from "./createFiber";
import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";
/**
 * 
 * @param {*} internalRoot 存储 dom 节点的对象
 */
function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

/**
 * 渲染函数：将 vdom 渲染成真实 DOM
 * @param {*} children JSX
 */
ReactDOMRoot.prototype.render = function(children) {
  const root = this._internalRoot;
  updateContainer(children, root);
};

// container 就是dom节点
function createRoot(container) {
  const root = {containerInfo: container};

  return new ReactDOMRoot(root);
}
/**
 * 1. 创建 fiber; 2. 更新 fiber
 * @param {*} element vdom
 * @param {*} root container object
 */
function updateContainer(element, root) {
  const {containerInfo} = root;
  const fiber = createFiber(element, {
    type: containerInfo.nodeName.toLocaleLowerCase(),
    stateNode: containerInfo,
  });
  // 组件初次渲染
  scheduleUpdateOnFiber(fiber);
}
export default {createRoot};
