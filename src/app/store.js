import { configureStore } from '@reduxjs/toolkit';
import historyReducer from '../features/historySlice';
import nextColorReducer from '../features/nextColorSlice';
import indexSliceReducer from '../features/indexSlice';
import likeSliceReducer from '../features/likeSlice';
import nextColorRuleReducer from '../features/nextColorRuleSlice';
import noLikeReducer from '../features/noLikeSlice'
import logReducer from '../features/logSlice'

export const store = configureStore({
  reducer: {
    history: historyReducer,
    nextColor: nextColorReducer,
    index: indexSliceReducer,
    like: likeSliceReducer,
    nextColorRule: nextColorRuleReducer,
    noLike: noLikeReducer,
    log: logReducer,
  },
});
