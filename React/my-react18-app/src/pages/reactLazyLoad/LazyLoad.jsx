import React from 'react';
// import ReactDOM from 'react-dom';
// 原理：
// 存储所有的要渲染的元素在数组中
// 如果元素的高度在可视区域的高度内就渲染要显示的UI,并删除数组中这个元素,否则就显示默认的UI
// 当元素滚动的时候，监听滚动事件，遍历存储页面实例的数组，判断每一项是否显示，同样按上述方式渲染
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
  // let node = ReactDOM.findDOMNode(component)
  let node = component.ref;
  if (!(node instanceof HTMLElement)) {
    return;
  }
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
    // 存储当前元素实例
    this.setRef = this.setRef.bind(this)
  }
  state = {
    visible: false
  }
  // 设置实例给 this.ref
  setRef(element) {
    this.ref = element
  }
  shouldComponentUpdate(props, state) {
    return state.visible
  }
  // 挂载完成
  componentDidMount() {
    if (listeners.length === 0) {
      // 默认是滚动事件
      if (this.props.scroll) {
        window.addEventListener('scroll', lazyLoadHandler)
      }
      if (this.props.resize) {
        window.addEventListener('resize', lazyLoadHandler)
      }
    }
    
    // 使用this方式添加当前实例
    listeners.push(this)
    checkVisible(this)
  }
  componentWillUnmount() {
    if (listeners.length === 0 && typeof window !== 'undefined') {
      window.removeEventListener('scroll', lazyLoadHandler)
      window.removeEventListener('resize', lazyLoadHandler)
    }
  }
  render() {
    return (
      <div className='lazyload-wrapper' ref={this.setRef}>
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