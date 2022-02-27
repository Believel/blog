import React, { useState } from "react";
import Counter from './Sub'

import UseRefDemo from './UseRefDemo'

const HooksDemo = () => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <div>
      <h3>React Hooks from React 16.8 version</h3>
      <button onClick={() => setShow(false)}>show=false</button>
      {
        show && <Counter />
      }
      <UseRefDemo />
    </div>
  )
}

export default HooksDemo