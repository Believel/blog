import compose from "./compose"
/**
 * 
 * @param  {...any} middlewares 中间件数组
 */
export default function applyMiddleware(...middlewares: any[]) {
  return (createStore: any) => (reducer: any) => {
    // store对象： { getState, dispatch, subscribe }
    const store = createStore(reducer)
    let dispatch = store.dispatch

    // 处理加强dispatch
    const midAPI = {
      getState: store.getState,
      dispatch: (action: any, ...args: any[]) => dispatch(action, ...args)
    }

    // 给中间件传一层参数
    const middlewareChain = middlewares.map(middleware => middleware(midAPI))

    // 把所有的中间件的函数都执行了，同时还执行store.dispatch
    dispatch = compose(...middlewareChain)(store.dispatch)

    return {
      ...store,
      // 返回一个新的dispatch
      dispatch
    }

  }
}