import * as types from '../actions-types';

interface State {
  number: number
}
export const counterReducer = (state: State, action: any) => {
  if (!state) return { number: 0}
  switch (action.type) {
    case types.INCREMENT:
      return { ...state, number: state.number + action.payload }
    case types.DECREMENT:
      return { ...state, number: state.number - action.payload }
    case types.THUNKINCREMENT:
      return { ...state, number: state.number + action.payload }
    default:
      return state;
  }
}