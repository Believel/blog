import React, { useState } from "react";
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

const HooksDemo = () => {
  const [show, setShow] = useState<boolean>(false)
  const [name, setName] = useState<string>('张三')
  const useInfo = {
    name
  }

  return (
    <div>
      <h3>React Hooks from React 16.8 version</h3>
      <button onClick={() => setShow(false)}>show=false</button>
      <button onClick={() => setName('李四')}>setName:{name}</button>
      {
        show && <Counter />
      }
      <UseRefDemo />
      <Child useInfo={useInfo} />
    </div>
  )
}

export default HooksDemo