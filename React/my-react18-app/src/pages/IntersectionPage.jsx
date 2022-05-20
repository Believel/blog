import { createRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function IntersectionPage(){
  // useInView 判断元素是否在可视区域内
  // ref 存储上一次DOM实例
  // inView 存储元素是否可见的boolean值
  const [ref, inView] = useInView()

  // const divRef = createRef()

  // useEffect(() => {
  //   // 提供一种异步观察目标元素与其祖先元素或顶级文档视窗交叉状态的方法
  //   const io = new IntersectionObserver(entries => {
  //     // 一般会触发两次回调。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）
  //     entries.forEach(entry => {
  //       // 可见性发生的时间，是一个高精度时间戳，单位为毫秒
  //       console.log(entry.time)
  //       // 根元素的矩形区域信息，getBoundingClientReact方法的返回值，如果没有根元素，则返回null
  //       console.log(entry.rootBounds)
  //       // 目标元素的矩形区域的信息
  //       console.log(entry.boundingClientRect)
  //       // 目标元素与视口（或根元素）的交叉区域的信息
  //       console.log(entry.intersectionRect)
  //       // 目标元素的可见比例，完全可见为1，完全不可见时小于等于0
  //       console.log(entry.intersectionRatio) 
  //       // 被观察的目标元素，是一个DOM元素
  //       console.log(entry.target)
  //     })
  //   }, {
  //     // 决定了什么时候触发回调函数, 
  //     // [0, 0.25, 0.5, 0.75, 1] 表示当目标元素0%，25%，50%，75%，100%可见时，会触发回调函数
  //     threshold: [0, 0.25, 0.5, 0.75, 1],
  //     // 指定目标元素所在的容器节点（即根元素）
  //     // root
  //     // 定义根元素的margin,用来扩展或者缩小rootBounds这个句型的大小
  //     // rootMargin
  //   })
  //   io.observe(divRef.current)

  // }, [])

  return (
    <div ref={ref}>
      <h2>{`Header inside viewport ${inView}`}</h2>
    </div>
  )
}


// 某个元素是否进入了“视口”（viewport）,即用户能不能看到它
// IntersectionObserver 可以自动观察元素是否可见  (不支持IE, chrome51+支持)
// 可见的本质是：目标元素与视口产生一个交叉区

// lazy load 惰性加载：某些静态资源，只有用户向下滚动，他们进入视口时才加载，这样可以节省带宽，提高网页性能。