import { useTransition } from 'react'

export default function Button({refresh}) {
  // Transition update 过渡更新，如UI从一个视图向另一个视图的更新。通常这种更新用户并不着急看到
  // startTransition 可以在任何你想更新的时候。
  const [isPending, startTransition] = useTransition()
  return (
    <div className='border'>
      <h3>Button</h3>
      <button onClick={() => {
        startTransition(() => {
          refresh()
        })
      }}
        disabled={isPending}
      >
        点击刷新数据
      </button>
      {
        isPending ? <div>loading...</div> : null
      }
    </div>
  )
}
// 与 setTimeout 异同
// startTransition 并不会延迟调度，而是会立即执行
// startTransition 接收的函数是同步执行的，只是这个 update 被加了一个 transitions的标记。
// 而这个标记，React内部处理更新的时候是会作为参考信息的