
import { createSlice } from '@reduxjs/toolkit';
import pick from '../calc/pick';

const initialState = [
  pick(), pick(), pick(), pick(), pick(), 
  pick(), pick(), pick(), pick(), pick(), 
  pick(), pick(), pick(), pick(), pick()
];
export const nextColorSlice = createSlice({
  name: 'nextColor',
  initialState,
  reducers: {
    toNextColor: (state, action) => {
      state.push(pick({...action.payload}))
      state.shift()
    },
    updateNextColor: (state, action) => {
      if (action.payload === "init") return initialState.map(state => pick())
      else {
        const ruleArr = [...action.payload]
        const newState = []
        ruleArr.forEach(r => newState.push(pick({...r})))
        return [...newState]
      }
    },
  },
});
  
export const { updateNextColor, toNextColor } = nextColorSlice.actions;
export const selectNextColor = (state) => state.nextColor;
export default nextColorSlice.reducer;