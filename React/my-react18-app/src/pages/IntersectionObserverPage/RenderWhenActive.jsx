// 阻塞组件重新渲染
class RenderWhenActive extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.active
  }
  render() {
    return this.props.children
  }
}