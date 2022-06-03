import React from 'react'
import './App.css'
import TransitionPage from './pages/TransitionPage'
import UseDeferredValuePage from './pages/UseDeferredValuePage'
import NewHookApi from './pages/NewHookApi'
// 栏加载实现 - hook
// import IntersectionPage from "./pages/IntersectionPage";
// 简版懒加载
// import ReactLazyLoad from './pages/reactLazyLoad'

function App() {
  return (
    <div className="App">
      <h4>React version: {React.version}</h4>
      <TransitionPage/>
      <UseDeferredValuePage/>
      <NewHookApi />
      {/* <IntersectionPage/> */}
      {/* <ReactLazyLoad /> */}
    </div>
  )
}

export default App
