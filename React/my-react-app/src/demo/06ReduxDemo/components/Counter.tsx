import React from 'react';
import { connect } from 'react-redux';
import Action from '../store/actions/counter'
import { Button } from 'antd'

interface Props {
  counter: number;
  incrementCounter: () => void;
  decrementCounter: () => void;
  thunkIncrement: () => void;
  promiseIncrement: () => void;
  payloadIncrement: () => void;
}
const Counter = (props: Props) => {
  console.log("props", props)
  const { counter, incrementCounter, decrementCounter, thunkIncrement, promiseIncrement, payloadIncrement } = props;
  return (
    <>
      <h4>案例2：计数器</h4>
      <p>{counter}</p>
      <Button onClick={incrementCounter} style={{marginRight: '10px'}}>+</Button>
      <Button onClick={decrementCounter} style={{marginRight: '10px'}}>-</Button>
      <Button onClick={() => {
        setTimeout(incrementCounter, 1000)
      }} style={{marginRight: '10px'}}>过一秒后+</Button>
      <Button onClick={thunkIncrement} style={{marginRight: '10px'}}>过一秒后加1（异步）</Button>
      <Button onClick={promiseIncrement} style={{marginRight: '10px'}}>promise(加1)</Button>
      <Button onClick={payloadIncrement}>promise(加1)</Button>
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    counter: state.counterReducer.number
  }
}

const mapDispatchToProps = Action

export default connect(mapStateToProps, mapDispatchToProps)(Counter);