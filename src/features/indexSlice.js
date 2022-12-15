
import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;
export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    deIndex: (state) => {
        if (state > 0) {
            return state - 1
        } else {
            return state
        }
    },
    inIndex: (state) => {
        return state + 1
    }
  },
});
  
export const { deIndex, inIndex } = indexSlice.actions;
export const selectIndex = (state) => state.index;
export default indexSlice.reducer;