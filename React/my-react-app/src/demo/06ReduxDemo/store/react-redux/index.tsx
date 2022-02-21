import React, { Component, createContext } from "react"

import { store } from "../createStore"

// React-redux 源码实现
interface PropviderProps {
  store: any;
  children: React.ReactNode
}

// 类方式实现
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
const StoreContext = createContext(null)
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

// 高阶函数
// 1. connect 接收两个参数 mapStateToProps, mapDispatchToProps,然后返回一个函数，这个返回的函数是高阶组件
// 2. 这个高阶组件会接收一个组件作为参数，然后用新组件包装以后再返回
const connect = (mapStateToProps: (states: any) => any, mapDispatchToProps: (dispatch: any) => any) => (OldComponent: any) => {
  class NewComponent extends Component<Props, State> {
    constructor(props: Props, state: State) {
      super(props)
      this.state = {
        allProps: {}
      }
    }

    componentDidMount() {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }
    _updateProps() {
      const { store } = this.context;
      const stateProps = mapStateToProps(store.getState);
      const dispatchProps = mapDispatchToProps(store.dispatch);
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }
    render(): React.ReactNode {
      return (
        <>
          <OldComponent {...this.state.allProps} />
        </>
      )
    }
   
  }
  NewComponent.contextType = StoreContext

  return NewComponent
}

export {
  Provider,
  connect
}