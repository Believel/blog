import createFiber from "./createFiber";
import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function(children) {
  const root = this._internalRoot;
  updateContainer(children, root);
};

// container 就是dom节点
function createRoot(container) {
  const root = {containerInfo: container};

  return new ReactDOMRoot(root);
}

function updateContainer(element, root) {
  const {containerInfo} = root;
  const fiber = createFiber(element, {
    type: containerInfo.nodeName.toLocaleLowerCase(),
    stateNode: containerInfo,
  });

  console.log("fiber", fiber, element); //sy-log

  // 更新fiber

  scheduleUpdateOnFiber(fiber);
}
export default {createRoot};
