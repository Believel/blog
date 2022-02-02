import React, { useContext } from 'react';
import { ContextColor, UPDATE_COLOR } from './Color';


export default () => {
  const { data: { color }, dispatch } = useContext(ContextColor);
  return (
    <>
      <button style={{color}} onClick={() => dispatch({type: UPDATE_COLOR, payload: 'green'})}>变绿</button>
      <button style={{color}} onClick={() => dispatch({type: UPDATE_COLOR, payload: 'red'})}>变红</button>
    </>
  )

}