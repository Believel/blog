import * as types from '../actions-types';
import { store } from '../createStore';
import { bindActionCreators } from 'redux';
const dispatch = store.dispatch;

const actions = {
  incrementCounter: () => {
    dispatch({ type: types.INCREMENT, payload: 1 })
  },
  decrementCounter: () => {
    dispatch({ type: types.DECREMENT, payload: 1 })
  },
  // 异步 action  (对应库  redux-thunk )
  thunkIncrement: () => {
    // 返回函数，其中有 dispatch 参数
    return (dispatch: any) => {
      setTimeout(function() {
        dispatch({ type: types.THUNKINCREMENT, payload: 1})
      }, 1000)
    }
  },
  // 异步 promise （对应库 redux-promise）
  promiseIncrement() {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve({type: types.THUNKINCREMENT, payload: 1})
      }, 1000)
    })
  },
  payloadIncrement() {
    return {
      type: types.THUNKINCREMENT,
      paload: new Promise((resolve: any) => {
        setTimeout(() => {
          if (Math.random() > .5) {
            resolve(100)
          } else {
            resolve(-100)
          }
        }, 1000)
      })
    }
  }
}

// bindActionCreators： 主要用来将 actions 转换成 dispatch(action) 这种格式，方便进行 actions 分离，并且使代码更简洁
// ! 源码实现
// function bindActionCreator(actionCreator: any, dispatch: any) {
//   return function() {
//     return dispatch(actionCreator.apply(this, arguments))
//   }
// }
export default bindActionCreators(actions, dispatch)