import React, { useState, useEffect } from "react";
import Counter from './Sub'

import UseRefDemo from './UseRefDemo'

interface Props {
  useInfo: {
    name: string
  }
}

function Child (props: Props) {
  const { useInfo } = props
  // render : 初始化 state
  //! re-render: 只恢复初始化的 state 值，不会再重新设置新的值。(所以此时name的值不随userInfo.name变化的)
  const [name, setName] = useState<string>(useInfo.name)
  return (
    <div>
      child: { name }
    </div>
  )
}

// 过时的闭包捕获具有过时值的变量
function createIncrement (i: number) {
  let value = 0;
  function increment() {
    value += i;
    console.log(value)
    const message = `Current value is ${value}`
    return function logValue() {
      console.log(message)
    }
  }
  return increment
}

const HooksDemo = () => {
  const [show, setShow] = useState<boolean>(false)
  const [name, setName] = useState<string>('张三')
  const [count, setCount] = useState<number>(0)
  const useInfo = {
    name
  }
  // 过时的闭包调用  -------------------------
  // const inc = createIncrement(1)
  // const log = inc() // 1
  // inc() // 2
  // inc() // 3
  // // 无法正确工作
  // log() // Current value is 1

  // 使用新的闭包 ----------------------
  const inc = createIncrement(1)
  inc() // 1
  inc() // 2
  const log = inc() // 3
  // 正确工作
  log() // Current value is 1


  // Hook 中过时的闭包
  useEffect(() => {
    let id = setInterval(() => {
      console.log(`Count is : ${count}`)
    }, 2000)
    return () => {
      clearInterval(id)
    }
  }, [count])

  return (
    <div>
      <h3>React Hooks from React 16.8 version</h3>
      <button onClick={() => setShow(false)}>show=false</button>
      <button onClick={() => setName('李四')}>setName:{name}</button>
      <button onClick={() => setCount(count + 1)}>加1</button>
      {
        show && <Counter />
      }
      <UseRefDemo />
      <Child useInfo={useInfo} />
    </div>
  )
}

export default HooksDemo