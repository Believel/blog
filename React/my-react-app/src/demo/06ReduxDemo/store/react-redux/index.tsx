import React, { Component, createContext } from "react"

import { store } from "../createStore"

// React-redux 源码实现
interface PropviderProps {
  store: any;
  children: React.ReactNode
}
// 
const Provider = (props: PropviderProps) => {

  const { store } = props;
  const StoreContext = createContext(null)

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

interface State {
  allState: any
}

// 高阶函数
const connect = (mapStateToProps: (states: any) => any, mapDispatchToProps: (dispatch: any) => any) => (OldComponent: any) => {
  class NewComponent extends Component<{}, State> {

    constructor(props: {}, state: State) {
      super(props)
      this.state = {
        allState: {}
      }
    }

    componentDidMount() {
      const allState = mapStateToProps(store.getState);
      const allDispatch = mapDispatchToProps(store.dispatch);
      this.setState({
        allState: Object.assign(this.state.allState, allState, allDispatch)
      })
    }
    render(): React.ReactNode {
      return (
        <>
          <OldComponent {...this.state.allState} />
        </>
      )
    }
   
  }

  return NewComponent
}

export default {
  Provider,
  connect
}