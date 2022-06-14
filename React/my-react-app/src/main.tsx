import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css';
import '../react-source/index'

// redux case
import ReduxDemoApp from './demo/06ReduxDemo'
import { store } from './demo/06ReduxDemo/store/createStore'
// import { Provider } from './demo/06ReduxDemo/store/react-redux'
import {Provider } from 'react-redux'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//     <Provider store={store}>
//       <ReduxDemoApp />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// )
