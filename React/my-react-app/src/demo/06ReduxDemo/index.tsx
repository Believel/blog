import React from 'react';
import './style/index.css';
import Header from '../06ReduxDemo/components/Header';
import Content from '../06ReduxDemo/components/Content';

import Counter from '../06ReduxDemo/components/Counter';

export default () => {
  return (
    <div className='redux-container'>
      <h2>redux、react-redux使用案例</h2>
      <hr/>
      <Header />
      <Content />
      <hr/>
      <Counter />

    </div>
  )
}