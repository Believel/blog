import { combineReducers } from 'redux';
import { counterReducer } from './counter'
import { todoReducer } from './todos'

interface State {
  themeColor: string
}
interface Action {
  type: string;
  themeColor: string
}
// 设置主题
const themeReducer = (state: State, action: Action) => {
  if (!state) {
    return { themeColor: 'red'}
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor}
    default:
      return state
  }
}
// 把多个 reducer 合并成一个大对象，每个对象中存放的就是每个 reducer 函数
// ! combineReducers 源码实现  有问题
// function combineReducers(reducers: any) {
//   return (state: any, action: any) => {
//     let newState: any = {};
//     for(let attr in reducers) {
//       let reducer = reducers[attr];
//       newState[attr] = reducer(state[attr], action)
//     }
//     return newState
//   }
// }


// const combineReducers = (reducers: any) => (state: any, action: any) => Object.keys(reducers).reduce((currentState: any, key) => {
//   console.log("state", state, action, reducers)
//   currentState[key] = reducers[key](state[key], action);
//   return currentState;
// }, {});

// 合并 reducer 之后返回一个新的函数
export const rootReducers = combineReducers({
  themeReducer,
  counterReducer,
  todoReducer
})