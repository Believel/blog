/**
 * 
 * @param {*} reducer 一个总的reducer
 * @param {*} enhancer 中间件
 */
 export default function createStore(reducer: any, enhancer: any) {
  // 有中间件时，会执行此步
  // 即表明：每次dispatch触发的时候，都会执行一遍所有的中间件函数
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  // 当前总的state
  let currentState: any;
  // 当前总的listener函数
  let currentListener: any[] = []
  // 获取state
  function getState() {
    return currentState
  }
  // dispatch函数：
  // 1. 通过reducer更新最新的state
  // 2. 发布监听函数（目的：更新组件，然后在组件内部拿到最新的state,渲染在页面上）
  function dispatch(action: any) {
    currentState = reducer(currentState, action)
    // 发布
    currentListener.forEach(listener => listener());
  }
  // 订阅
  function subscribe(listener: any) {
    currentListener.push(listener)
    return () => {
      // 取消订阅
      const index = currentListener.indexOf(listener)
      currentListener.splice(index, 1)
    }
  }
  // 默认执行一次，拿到初始的state
  dispatch({})

  return {
    getState,
    dispatch,
    subscribe
  };
}