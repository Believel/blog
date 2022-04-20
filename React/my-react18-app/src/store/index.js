import { createStore } from './createStore'
import { useRef } from 'react'

function reducer(action, state = 0) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'MINUS':
      return state - 1
    default:
      return state
  }
}
export function useStore() {
  const storeRef = useRef()
  if (!storeRef.current) {
    storeRef.current = createStore(reducer)
  }
  return storeRef.current;
}
