import React from 'react'
import LazyLoad from './LazyLoad'

const ulStyle = {
  width: 800,
  margin: '0 auto',
  listStyle: 'none'
}
const imgStyle = {
  display: 'block',
  textAlign: 'center',
  margin: '20px 0',
  maxWidth: '100%',
  height: 300
}
const ReactLazyLoad = () => {
  let images = [
    'http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg',
    'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg',
    'http://ww2.sinaimg.cn/mw690/62aad664jw1f2nxvz2cj6j20u01hck1o.jpg',
    'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvzfjv6j20u01hc496.jpg',
    'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxw0e1mlj20u01hcgvs.jpg',
    'http://ww4.sinaimg.cn/mw690/62aad664jw1f2nxw0p95dj20u01hc7d8.jpg',
    'http://ww2.sinaimg.cn/mw690/62aad664jw1f2nxw134xqj20u01hcqjg.jpg',
    'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxw1kcykj20u01hcn9p.jpg'
  ]

  return (
    <>
      <ul style={ulStyle}>
        {
          images.map((image, index) => (
            <LazyLoad key={index} height={300} throttle={2000}>
              <li><img src={image} style={imgStyle} /></li>
            </LazyLoad>
          ))
        }
      </ul>
    </>
  )
}

export default ReactLazyLoad