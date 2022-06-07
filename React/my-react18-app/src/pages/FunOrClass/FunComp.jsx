// 函数组件与类组件的本质区别：函数式组件捕获了渲染所使用的值。
export default function ProfileFunctionPage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user)
  }
  const handleClick = () => {
    setTimeout(showMessage, 3000)
  }
  return (
    <button onClick={handleClick}>Follow</button>
  )
}