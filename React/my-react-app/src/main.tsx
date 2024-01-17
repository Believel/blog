import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css';

// redux case
import ReduxDemoApp from './demo/06ReduxDemo'
import { store } from './demo/06ReduxDemo/store'
import { Provider } from './demo/06ReduxDemo/source/react-redux'
// import {Provider } from 'react-redux'


// react source demo entry
import '../react-source/index'

// react router demo entry
// import '../react-router-source/index'


// redux-saga case
// import './demo/10reduxSagaDemo'

ReactDOM.render(
  <React.StrictMode>
    {/* <App />
    <Provider store={store}>
      <ReduxDemoApp />
    </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
)
