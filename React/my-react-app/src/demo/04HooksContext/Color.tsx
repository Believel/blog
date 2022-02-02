import React, { createContext, Dispatch, ReactElement, useReducer } from 'react';
export const UPDATE_COLOR = 'UPDATE_COLOR';
export const ContextColor = createContext({} as ContextType);

interface Props {
  children: ReactElement | ReactElement[]
}

interface State {
  color: string
}

interface Action {
  type: string;
  payload: any
}

interface ContextType {
  dispatch: Dispatch<Action>;
  data: {
    color: string;
  }
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return {
        ...state,
        color: action.payload
      }
    default:
      return state
  }
}

const initialState = {
  color: 'blue'
}
export default (props: Props) => {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextColor.Provider value={{data, dispatch}}>
      {props.children}
    </ContextColor.Provider>
  )
}