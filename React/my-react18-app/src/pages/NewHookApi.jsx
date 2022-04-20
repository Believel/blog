import {
  useId,
  useState,
  useEffect,
  useReducer,
  useSyncExternalStore,
  useInsertionEffect,
  useLayoutEffect
} from 'react'
import { useStore } from '../store/index'
export default function NewHookApi() {
  const id = useId()
  const [count, setCount] = useState(0)
  const store = useStore()
  // const state = store.getState()
  // const [, forceUpdate] = useReducer(x => x + 1, 0)
  // useEffect(() => {
  //   // 模拟组件更新
  //   store.subscribe(() => {
  //     forceUpdate()
  //   })
  // }, [])

  // 相当于有些redux中的事情，这里帮我们做了：订阅，取消订阅
  const state = useSyncExternalStore(store.subscribe, store.getState)


  useInsertionEffect(() => {
    console.log('useInsertEffect')
  }, [])
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  }, [])
  useEffect(() => {
    console.log('useEffect')
  }, [])

  return (
    <div className='border'>
      <h3 id={id}>New Hook api</h3>
      <button onClick={() => store.dispatch({type: 'ADD'})}>
        state:{state}
      </button>
      <button onClick={() => setCount(count + 1)}>
        count: {count}
      </button>
    </div>
  )
}