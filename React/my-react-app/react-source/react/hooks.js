import { func } from "prop-types";
import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";
import { HookPassive, areHookInputsEqual, HookLayout } from './utils'
// 当前正在工作的 fiber
let currentlyRendingFiber = null;
// 当前正在工作的 hook, 相当于一个伪 hook
let workInProgressHook = null;

// 老hook
let currentHook = null;

// 初始化全局变量
export function renderWithHooks(wip) {
  currentlyRendingFiber = wip;
  // 头 hook
  currentlyRendingFiber.memorizedState = null;
  workInProgressHook = null;

  // 为了方便，useEffect和useLayoutEffect区分开，并且以数组管理
  // 源码中是放在一起的，并且是个链表
  currentlyRendingFiber.updateQueueOfEffect = [];
  currentlyRendingFiber.updateQueueOfLayout = [];
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
    currentlyRendingFiber.memorizedState = current.memorizedState;
    if (workInProgressHook) {
      // 不是第一个hook
      workInProgressHook = hook = workInProgressHook.next;

      currentHook = currentHook.next
    } else {
      // 第一个hook
      workInProgressHook = hook = currentlyRendingFiber.memorizedState;

      currentHook = current.memorizedState
    }
  } else {
    currentHook = null
    // 初次渲染 白手起家
    hook = {
      memorizedState: null, //状态值
      next: null, //指向下一个hook
    };
    if (workInProgressHook) {
      // 不是第一个hook
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // 第一个hook
      workInProgressHook = currentlyRendingFiber.memorizedState = hook;
    }
  }

  return hook;
}

export function useReducer(reducer, initalState) {
  const hook = updateWorkInProgressHook();

  // 初次渲染
  if (!currentlyRendingFiber.alternate) {
    hook.memorizedState = initalState;
  }
  // 闭包：作用在函数内，当前hook的值是在内存中的
  const dispatch = disPatchReducerAction.bind(null, currentlyRendingFiber, hook, reducer)

  return [hook.memorizedState, dispatch];
}
function disPatchReducerAction(fiber, hook, reducer, action){
  // 更新正在工作的hook对应的最新值
  hook.memorizedState = reducer ? reducer(hook.memorizedState): action;

  // 更新 当前fiber会重新渲染页面，因而 useReducer函数会重新执行
  // 更新 fiber的时候会对 fiber.alternate = {...fiber} 记住老的fiber节点
  fiber.alternate = {...fiber};
  fiber.sibling = null
  scheduleUpdateOnFiber(fiber);
};

export function useState(initalState) {
  return useReducer(null, initalState)
}

function updateEffectImp(hooksFlags, create, deps) {
  const hook = updateWorkInProgressHook()
  if (currentHook) {
    const prevEffect = currentHook.memorizedState
    if (deps) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(deps, prevDeps)) {
        return
      }
    }
  }
  const effect = {
    hooksFlags,
    create,
    deps
  }
  hook.memorizedState = effect;
  if (hooksFlags & HookPassive) {
    currentlyRendingFiber.updateQueueOfEffect.push(effect)
  } else if (hooksFlags & HookLayout) {
    currentlyRendingFiber.updateQueueOfLayout.push(effect)
  }

}
export function useEffect(create, deps) {
  return updateEffectImp(HookPassive, create, deps)
}
export function useLayoutEffect(create, deps) {
  return updateEffectImp(HookLayout, create, deps);
}