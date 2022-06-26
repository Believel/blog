import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { Item } from '../store/reducers/todos'
import Action from '../store/actions/todo'
// import { connect } from 'react-redux'
import { connect } from '../source/react-redux';

type ToggleType =  'all' | 'completed' | 'uncompleted';
interface Props {
  toggleType: ToggleType
  todoList: Item[];
  addTodo: (text: string) => any;
  delTodo: (index: number) => any;
  toggleTodo: (index: number) => any;
  switchType: (toggleType: ToggleType) => any
} 
const Todo = (props: Props) => {
  const { todoList, toggleType, addTodo, delTodo, toggleTodo, switchType } = props;
  const [ val, setVal] = useState<string>('')

  const handleChange = (e: any) => {
    setVal(e.target.value)
  }
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      addTodo(e.target.value);
      setVal('');
    }
  }
  return (
    <div>
      <h4>案例3：todo list</h4>
      <Input placeholder='请输入' onKeyDown={handleKeyDown} value={val} onChange={handleChange}/>
      <ul>
        {
          todoList.map((todo: Item, index: number) => {
            return (
              <li key={index}>
                <span style={{textDecoration: todo.completed ? 'line-through': ''}} onClick={() => toggleTodo(index)}>{todo.text}</span>
                <Button onClick={() => delTodo(index)} style={{marginLeft: '10px'}}>删除{todo.completed}</Button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <Button danger={toggleType === 'all' ? true : false} onClick={() => switchType('all')}>全部</Button>
        <Button danger={toggleType === 'completed' ? true : false} onClick={() => switchType('completed')}>已完成</Button>
        <Button danger={toggleType === 'uncompleted'? true : false} onClick={() => switchType('uncompleted')}>未完成</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    toggleType: state.todoReducer.toggleType,
    todoList: state.todoReducer.items
  }
}
const mapDispatchToProps = Action;

export default connect(mapStateToProps, mapDispatchToProps)(Todo)