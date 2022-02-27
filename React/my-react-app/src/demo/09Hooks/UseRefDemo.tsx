import React, { useRef, useEffect, createContext, useContext } from "react";
// Context 提供了一个无需为每层组件手动添加 props,就能在组件树间进行数据传递的方法

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树
const ThemeContext = createContext('light')

class ThemeButton extends React.Component {
  // 指定 contextType 读取当前 theme context
  static contextType?: React.Context<any> | undefined = ThemeContext
  render() {
    return (
      <div>
        {this.context}
      </div>
    )
  }
}

function ToolBar() {
  return (
    <div>
      <ThemeButton></ThemeButton>
    </div>
  )
}


const UseRefDemo = () => {
  const btnRef = useRef(null)

  useEffect(() => {
    console.log(btnRef.current)
  }, [])
  // 使用一个 Provider 来将值传递下面的组件树
  // 无论多深，任何组件都能读取这个值
  return (
    <ThemeContext.Provider value="dark">
      <button ref={btnRef}>按钮</button>
      <ToolBar />
    </ThemeContext.Provider>
  )
}

export default UseRefDemo