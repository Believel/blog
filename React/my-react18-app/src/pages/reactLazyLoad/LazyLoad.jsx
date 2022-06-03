import React from 'react';
import ReactDOM from 'react-dom';
// 原理：
// 存储所有的要渲染的元素在数组中
// 如果元素的高度在可视区域的高度内就渲染要显示的UI,并删除数组中这个元素,否则就显示默认的UI
// 当元素滚动的时候，同样按上述方式渲染
let listeners = []
// _ 当没有参数的时候可以使用，es6语法
let lazyLoadHandler = _ => {
  for(let i = 0; i < listeners.length; i++){
    let listener = listeners[i]
    checkVisible(listener)
  }
}
let checkVisible = component => {
  // 获取此组件的DOM节点
  // 此 api deprecated
  let node = ReactDOM.findDOMNode(component)
  // 返回元素的大小及相对于视口的位置
  let { top } = node.getBoundingClientRect();
  // 比较元素的top值是否比可视区域大小的高度大
  let visible = top < (window.innerHeight || document.documentElement.clientHeight)
  // 在可视区域内
  if(visible) {
    // 过滤到可视区域的元素节点
    listeners = listeners.filter(item => item != component)
    // 渲染显示图片UI
    component.setState({visible})
  }
}
class LazyLoad extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false
  }
  // 挂载完成
  componentDidMount() {
    if (listeners.length === 0) {
      window.addEventListener('scroll', lazyLoadHandler)
    }
    
    // 不使用this方式添加当前实例
    listeners.push(this)
    checkVisible(this)
  }
  render() {
    return (
      <div>
        {
          this.state.visible ? 
          (this.props.children):
          (<div className="lazyload-placeholder" style={{height: this.props.height}}></div>)
        }
      </div>
    )
  }
}
export default LazyLoad