import React from 'react'
import './App.css'
import TransitionPage from './pages/TransitionPage'
import UseDeferredValuePage from './pages/UseDeferredValuePage'
import NewHookApi from './pages/NewHookApi'

function App() {
  return (
    <div className="App">
      <h4>React version: {React.version}</h4>
      <TransitionPage/>
      <UseDeferredValuePage/>
      <NewHookApi />
    </div>
  )
}

export default App
