import { useDeferredValue, useState, memo } from 'react'
function ListItem({children}) {
  let now = performance.now()
  while(performance.now() - now < 3) {}
  return <li className='listitem'>{children}</li>
}
const MySlowList = memo(function({text}){
  let items = []
  for (let i = 0; i < 80; i++) {
    items.push(
      <ListItem key={i}>
        Result #{i} from "{text}"
      </ListItem>
    )
  }
  return (
    <div className='border'>
      <b>Results for "{text}"</b>
      <ul className='list'>
        {items}
      </ul>
    </div>
  )
})
export default function UseDeferredValuePage() {
  const [text, setText] = useState('hello')
  // 延迟更新
  const deferredText = useDeferredValue(text)
  const handleChange = (e) => {
    setText(e.target.value)
  }
  return (
    <div>
      <h3>UseDeferredValuePage</h3>
      <input value={text} onChange={handleChange} />
      {/* 但在必要时可以将列表延后 */}
      <p>{deferredText}</p>
      <MySlowList text={deferredText}></MySlowList>
    </div>
  )
}
