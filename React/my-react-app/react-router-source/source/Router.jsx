import { NavigationContext } from "./Context"

// 跨组件层级传递数据 context
export default function Router({ navigator, children, location }) {
  let navigationValue = { navigator, location }
  return (
    <NavigationContext.Provider value={navigationValue}>
      {children}
    </NavigationContext.Provider>
  )
}