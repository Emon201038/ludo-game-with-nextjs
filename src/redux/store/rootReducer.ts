// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
// import { api } from './api';
import { matchSlice } from '@/redux/features/game/ludoSlice';

const rootReducer = combineReducers({
  ludo: matchSlice.reducer,
  // [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
