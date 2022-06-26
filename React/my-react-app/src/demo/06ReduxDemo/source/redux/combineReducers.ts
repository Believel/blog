
/**
 * 
 * @param {*} reducers reducers对象，里面每一个value值都是一个reducer
 */
export default function combineReducers(reducers: any) {
  // 返回一个总的reducer
  return function combination(state: any = {}, action: any) {
    
    let nextState: any = {}
    let hasChanged = false;
    for (const key in reducers) {
      const reducer = reducers[key]
      const nextStateItem = reducer(state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
      // 给最外层包裹的对象赋值
      nextState[key] = nextStateItem;
    }
    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length

    return hasChanged ? nextState : state
  }
}