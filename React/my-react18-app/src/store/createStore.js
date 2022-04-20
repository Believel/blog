export function createStore(reducer) {
  let currentState;
  let listeners = [];
  function getState() {
    return currentState
  }
  function dispatch(action) {
    currentState = reducer(action, currentState)
    listeners.map(listener => listener())
  }
  function subscribe(listener) {
    listeners.push(listener)
  }
  // 初始化state默认值
  dispatch({})
  return {
    getState,
    dispatch,
    subscribe
  }
}