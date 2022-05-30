import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";
// 当前正在工作的 fiber
let currentlyRendingFiber = null;
// 当前正在工作的 hook, 相当于一个伪 hook
let workInProressHook = null;
// 初始化全局变量
export function renderWithHooks(wip) {
  currentlyRendingFiber = wip;
  // 头 hook
  currentlyRendingFiber.memeorizedState = null;
  workInProressHook = null;
}
// 我的理解：
// 1. 每个函数中的hook会以链表的形式把对应的值存储起来
// 2. 更新的时候，会先更新当前hook中的 memeorizedState 值，然后重新更新当前fiber，此时相当于当前函数组件会重新执行一次，那么此时hook链表就会更新，对应显示的值也会更新

// fiber.memeorizedState(hook0)->next(hook1)->next(hook2)->next(hook3)(workInProressHook)
// workInProressHook
function updateWorkInProgressHook() {
  let hook;
  // ! 如何获取每一个 hook api 对应的 hook?
  let current = currentlyRendingFiber.alternate;
  //更新
  if (current) {
    currentlyRendingFiber.memeorizedState = current.memeorizedState;
    if (workInProressHook) {
      // 不是第一个hook
      workInProressHook = hook = workInProressHook.next;
    } else {
      // 第一个hook
      workInProressHook = hook = currentlyRendingFiber.memeorizedState;
    }
  } else {
    // 初次渲染 白手起家
    hook = {
      memeorizedState: null, //状态值
      next: null, //指向下一个hook
    };
    if (workInProressHook) {
      // 不是第一个hook
      workInProressHook = workInProressHook.next = hook;
    } else {
      // 第一个hook
      workInProressHook = currentlyRendingFiber.memeorizedState = hook;
    }
  }

  return hook;
}

export function useReducer(reducer, initalState) {
  const hook = updateWorkInProgressHook();

  // 初次渲染
  if (!currentlyRendingFiber.alternate) {
    hook.memeorizedState = initalState;
  }
  // 闭包：作用在函数内，当前hook的值是在内存中的
  const dispatch = (action) => {
    // 更新正在工作的hook对应的最新值
    hook.memeorizedState = reducer ? reducer(hook.memeorizedState, action): action;

    // 更新 当前fiber会重新渲染页面，因而 useReducer函数会重新执行
    // 更新 fiber的时候会对 fiber.alternate = {...fiber} 记住老的fiber节点
    scheduleUpdateOnFiber(currentlyRendingFiber);
  };
  return [hook.memeorizedState, dispatch];
}

export function useState(initalState) {
  return useReducer(null, initalState)
}
