import { useRef, useEffect } from 'react'

export default (callback, delay) => {
  const savedCallback = useRef()

  // 保存新的回调 - 主要是为了拿到callback依赖项变量是最新的值
  useEffect(() => {
    savedCallback.current = callback
  })

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay) {
      const timer = setInterval(tick, delay)
      return () => clearInterval(timer)
    }
  }, [delay])
}