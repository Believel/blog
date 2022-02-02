import React, { useContext} from 'react'

import { ContextColor } from './Color';

export default () => {
  const { data: { color }} = useContext(ContextColor);
  return (
    <>
      <h3 style={{color}}>我是标题</h3>
    </>
  )
}