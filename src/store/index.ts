import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

import markers from './markers';
import viewport from './viewport';
import userInterface from './userInterface';

const reducer = combineReducers({
  markers,
  viewport,
  userInterface,
});

const middleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

const store = configureStore({ reducer, middleware });

export type RootState = ReturnType<typeof reducer>

export default store;
