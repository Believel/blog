import * as types from '../actions-types';
import { store } from '..';
import { bindActionCreators } from 'redux';
const dispatch = store.dispatch;

const actions = {
  incrementCounter: () => {
    console.log('进来了')
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
export default bindActionCreators(actions, dispatch)