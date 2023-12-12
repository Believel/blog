import React from 'react'
import ReactDOM from 'react-dom'

export  const PortalsDemo = (props: any) => {
  // 正常渲染
  // return(
  //   <div className='modal'>
  //     {props.children}
  //   </div>
  // )

  // 使用 Portals 渲染到body上
  // fixed 元素要放在 body上，有更好的浏览器兼容性
  return ReactDOM.createPortal(
    <div className='modal'>
      {props.children}
    </div>,
    document.body
  )
}

export default PortalsDemo