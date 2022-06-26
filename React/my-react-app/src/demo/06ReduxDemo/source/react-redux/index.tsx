import React, { Component, createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react"
import { bindActionCreators } from '../redux'

// React-redux 源码实现
interface PropviderProps {
  store: any;
  children: React.ReactNode
}

// Provider : 类方式实现
// export class Provider extends Component {
//   static propTypes = {
//       store: PropTypes.object,
//       children: PropTypes.any
//   }
//   // 生产者消费者模式
//   // 通过静态属性childCOntextTypes声明提供给子组件的Context对象的属性，并实现一个实例getChildContext方法，返回一个代表Context的纯对象(plain object)
//   static childContextTypes = {
//       store: PropTypes.object
//   }
//   // 上下文：使用Context,可以跨越组件进行数据传递
//   getChildContext() {
//       return {
//           store: this.props.store
//       }
//   }
//   render() {
//       return (
//           <div>{this.props.children}</div>
//       )
//   }
// }
// 函数实现
// 1. 创建 context 对象
const StoreContext = createContext(null)

// 2. Provider 组件传递value(store)
const Provider = (props: PropviderProps) => {

  const { store } = props;
  

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

interface State {
  allProps: any
}
interface Props {
  store: any
}

// 3. 后代消费 provider 传递下来的value
// * contextType 只能用在类组件，只能订阅单一的context来源
// * useContext 只能用在类组件或者自定义Hook中
// * Consumer 没有组件限制
// 高阶函数
// 1. connect 接收两个参数 mapStateToProps, mapDispatchToProps,然后返回一个函数，这个返回的函数是高阶组件
// 2. 这个高阶组件会接收一个组件作为参数，然后用新组件包装以后再返回
// const connect = (mapStateToProps: (states: any) => any, mapDispatchToProps: (dispatch: any) => any) => (OldComponent: any) => {
//   class NewComponent extends Component<Props, State> {
//     constructor(props: Props, state: State) {
//       super(props)
//       this.state = {
//         allProps: {}
//       }
//     }

//     componentDidMount() {
//       // 在类组件中拿到 store 对象
//       const { store } = this.context
//       this._updateProps()
//       store.subscribe(() => this._updateProps())
//     }
//     _updateProps() {
//       const { store } = this.context;
//       const stateProps = mapStateToProps(store.getState);
//       const dispatchProps = mapDispatchToProps(store.dispatch);
//       this.setState({
//         allProps: {
//           ...stateProps,
//           ...dispatchProps,
//           ...this.props
//         }
//       })
//     }
//     render(): React.ReactNode {
//       return (
//         <>
//           <OldComponent {...this.state.allProps} />
//         </>
//       )
//     }
   
//   }
//   NewComponent.contextType = StoreContext

//   return NewComponent
// }

const connect = (mapStateToProps: (states: any) => any, mapDispatchToProps: any) => (WrappedComponent: any) => (props: any) => {
  const store = useContext(StoreContext);
  const { getState, dispatch, subscribe} = store as any;
  let allProps = {}
  const stateProps = mapStateToProps(getState());
  let dispatchProps
  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch);
  } else {
    dispatchProps =  bindActionCreators(mapDispatchToProps, dispatch);
  }
 
  allProps = {
    ...stateProps,
    ...dispatchProps,
    ...props
  }
  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    // 订阅
    const unsubscribe = subscribe(() => {
      forceUpdate()
    })
    return () => {
      unsubscribe()
    }
  }, [subscribe])

  return <WrappedComponent {...allProps} />

}

function useForceUpdate() {
  const [state, setState] = useState<number>(0)

  const update = useCallback(() => {
    setState((prev) => prev + 1)
  }, [])

  return update;
}
/**
 * 
 * @param selector 更新state函数
 */
function useSelector(selector: any) {
  const store = useContext(StoreContext) as any
  // 得到返回的指定state
  console.log('states', store.getState())
  const selectedState = selector(store.getState())
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [store.subscribe]);

  return selectedState;

}
function useDispatch() {
  const store = useContext(StoreContext);

  const { dispatch } = store as any;

  return dispatch;
}
export {
  Provider,
  connect,
  useSelector,
  useDispatch
}