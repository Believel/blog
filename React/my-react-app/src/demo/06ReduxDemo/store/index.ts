import { createStore, applyMiddleware } from '../source/redux';

import { rootReducers } from './reducers/rootReducer'


// export const store = createStore(rootReducers)
// 希望可以实现添加多个中间件
// let dispatch = store.dispatch;
// 这种方式是自己修改dispatch,增加logger中间件
// store.dispatch = function(action) {
//   console.log('老的状态：' + JSON.stringify(store.getState()));
//   dispatch(action);
//   console.log('新的状态:' + JSON.stringify(store.getState()))
// }




// 处理 action 是函数的中间件
const thunk = ({ dispatch, getState } : any) => (next: any) => (action: any) => {
  if (typeof action === 'function') {
    action(dispatch, getState)
  } else {
    // 旧的dispatch
    next(action)
  }
}

// 处理日志的中间件
const logger1 = ({ dispatch, getState}: any) => (next: any) => (action: any) => {
  console.log('老状态1前：' + getState().counterReducer.number);
  next(action);
  console.log('老状态1后：' + getState().counterReducer.number)
}

// 处理 action 是promise 的中间件

const promise = ({ dispatch, getState}: any) => (next: any) => (action: any) => {
  if (action && action.then) {
    action.then(dispatch)
  } else if (action && action.payload && action.payload.then) {
    action.payload.then((payload: any) => dispatch({...action, payload}), (payload: any) => dispatch({...action, payload}))
  } else {
    if (action) {
      next(action)
    }
  }
}

// export const store = applyMiddleware(promise, thunk, logger1)(createStore)(rootReducers)
export const store = createStore(rootReducers, applyMiddleware(promise, thunk, logger1))


// function add1(str: string) {
//   return str;
// }
// function add2(str: string) {
//   return str + 1
// }
// function add3(str: string) {
//   return str + 2
// }

// function compose(...fns: any[]) {
//   if (fns.length === 1) {
//     return fns[0]
//   }
//   return fns.reduce((a, b) => {
//     return (...args: any) => a(b(...args))
//   })
// }

// 从右项左开始计算，把每次的计算结果传递给下一个参数中，以此类推
// function compose(...fns: any[]) {
//   return function(...args: any[]) {
//     // 先拿到最后一个参数
//     let last = fns.pop();
//     return fns.reduceRight((val, fn) => {
//       return fn(val);
//     }, last(...args))
//   }
// }

// console.log(compose(add3, add2, add1)('aaa'))