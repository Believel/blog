import * as types from '../actions-types';
import { store } from '..';
import { bindActionCreators } from 'redux';
const dispatch = store.dispatch;

const actions = {
  addTodo: (todo: string) => {
    return { type: types.ADD_TODO, text: todo}
  },
  delTodo: (index: number) => {
    return { type: types.DEL_TODO, index}
  },
  toggleTodo: (index: number) => {
    return { type: types.TOGGLE_TODO, index}
  },
  switchType: (toggleType: string) => {
    return { type: types.SWITCH_TYPE, toggleType}
  }

}

export default bindActionCreators(actions, dispatch)