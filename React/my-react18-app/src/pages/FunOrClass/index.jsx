import { useState } from 'react'
import FunComp from './FunComp'
import ClassComponent from './ClassComponent'
import FunComp2 from './FunComp2'

const userList = [
  { key: 'Dan', value: 'Dan' },
  { key: 'Sun', value: 'Sun' }
]

// 在点击按钮之后，延迟时间内切换下拉数据，看下alert的值分别是什么
export default function Profile() {
  const [user, setUser] = useState('Dan')
  const handleSelect = (e) => {
    setUser(e.target.value)
  }
  return (
    <>
      <div>Choose profile to view: 
        <select onChange={handleSelect} value={user}>
          {
            userList.map(user => <option key={user.value}>{user.value}</option>)
          }
        </select>
      </div>
      <FunComp user={user}/>(Function)
      <ClassComponent user={user}/>(Class)
      <FunComp2 />
    </>
  )

}