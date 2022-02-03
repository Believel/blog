import { createStore } from 'redux';
import { rootReducers } from './reducers/rootReducer'

export const store = createStore(rootReducers)