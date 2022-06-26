import { combineReducers} from '../../source/redux'
import { counterReducer } from './counter'
import { todoReducer } from './todos'

interface State {
  themeColor: string
}
interface Action {
  type: string;
  themeColor: string
}
// 设置主题
const themeReducer = (state: State, action: Action) => {
  if (!state) {
    return { themeColor: 'red'}
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor}
    default:
      return state
  }
}

// 合并 reducer 之后返回一个新的函数
export const rootReducers = combineReducers({
  themeReducer,
  counterReducer,
  todoReducer
})