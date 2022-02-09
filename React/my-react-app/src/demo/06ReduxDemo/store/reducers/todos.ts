import * as types from '../actions-types'

export interface Item {
  text: string;
  completed: boolean;
}
interface State {
  items: Item[];
  toggleType: 'all' | 'completed' | 'uncompleted'
}

export const todoReducer = (state: State, action: any) => {
  if (!state) return { items: [], toggleType: 'all'}
  switch (action.type) {
    case types.ADD_TODO:
      return { ...state, items: [...state.items, { text: action.text, completed: false }]};
    case types.DEL_TODO:
      return { ...state, items: [...state.items.slice(0, action.index), ...state.items.slice(action.index + 1)]};
    case types.TOGGLE_TODO:
      return {
        ...state,
        items: state.items.map((item: Item, index: number) => {
          if (index ===action.index) {
            item.completed = !item.completed
          }
          return item;
        })
      }
    case types.SWITCH_TYPE:
      return {
        ...state,
        toggleType: action.toggleType
      }
    default:
      return state;
  }
}