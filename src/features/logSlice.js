import { createSlice } from '@reduxjs/toolkit';
import calcLog from '../calc/calcLog';

const initialState = [calcLog()]

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    updateLog: (state, action) => {
        const nowLog = JSON.stringify((state.shift()))
        const newLog = JSON.stringify(calcLog(...action.payload))
        if (nowLog !== newLog) {
            state.unshift(JSON.parse(nowLog))
            state.unshift(JSON.parse(newLog))
        } else state.unshift(JSON.parse(nowLog))
    },
  },
});
  
export const { updateLog } = logSlice.actions;
export const selectLog = (state) => state.log;
export default logSlice.reducer;