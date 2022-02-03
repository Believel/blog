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
  thunkIncrement: () => {
    return (dispatch: any) => {
      setTimeout(function() {
        dispatch({ type: types.THUNKINCREMENT, payload: 1})
      }, 1000)
    }
  },
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