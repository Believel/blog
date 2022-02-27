import React, { useState, useEffect } from 'react'

const Counter = function() {
  const [count, setCount] = useState<number>(0)

  // 模拟生命周期： componentDidMount
  useEffect(() => {
    console.log('ajax 执行了')
  }, [])

  // 模拟生命周期： componentDidUpdate
  useEffect(() => {
    console.log('count', count)
  }, [count])

  useEffect(() => {
    let timer = setInterval(() => {
      console.log(new Date())
    }, 1000)
    // 模拟生命周期：componentWillUnmount
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <p>this is count: { count }</p>
      <button onClick={() => setCount(count + 1)}> plus count</button>
    </div>
  )
}

export default Counter