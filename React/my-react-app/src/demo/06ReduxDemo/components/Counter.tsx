import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch } from '../source/react-redux';
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

  // 使用 redux 中 hooks
  // 获取指定的state值
  // const counter = useSelector((state: any) => state.counterReducer.number);
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch({ type: "INCREMENT", payload: 2 });
  }, []);


  return (
    <>
      <h4>案例2：计数器</h4>
      <p>{counter}</p>
      <Button onClick={incrementCounter} style={{marginRight: '10px'}}>+</Button>
      <Button onClick={add} style={{marginRight: '10px'}}>hook +</Button>
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