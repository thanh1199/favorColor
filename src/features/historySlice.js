
import { createSlice } from '@reduxjs/toolkit';
import pick from '../calc/pick';

const initialState = [
  {
    value: [...pick()],
    like: false
  }
];
export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      return [...state, {...action.payload}]
    },
    changeLike: (state, action) => {
      state[action.payload].like = !state[action.payload].like
    }
  },
});
  
export const { addToHistory, changeLike } = historySlice.actions;
export const selectHistory = (state) => state.history;
export default historySlice.reducer;