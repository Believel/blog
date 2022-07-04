import React from 'react'

interface Props {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  onIncrementAsync: () => void
}
const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }: Props) => {
  return (
    <div>
      <button onClick={onIncrementAsync}>
        Increment after 1 second
      </button>
      <button onClick={onIncrement}>
        Increment
      </button>
      {' '}
      <button onClick={onDecrement}>
        Decrement
      </button>
      <hr />
      <div>
        Clicked: {value} times
      </div>
    </div>
  )
}
export default Counter
