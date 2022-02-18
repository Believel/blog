import React, { createRef, useEffect } from 'react'
import ClockCanvas from './canvas'

export default () => {
  const divRef = createRef() as any
  
  useEffect(() => {
    const canvas = new ClockCanvas()
    canvas.render(divRef.current)
  }, [])

  return (
    <div ref={divRef} style={{display: 'inline-block', width: '100%', height: '500px'}}>
    </div>
  )
}