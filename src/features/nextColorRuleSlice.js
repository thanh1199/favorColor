
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]},
  {h: [-1], s: [-1], v: [-1]}
]

function shuffle (arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export const nextColorRuleSlice = createSlice({
  name: 'nextColorRule',
  initialState,
  reducers: {
    updateNextColorRule: (state, action) => {
      if (action.payload === "init") { 
        return initialState.map(state => ({h: [-1], s: [-1], v: [-1]}))
      }
      else return shuffle([...action.payload])
    },
  },
});
  
export const { updateNextColorRule } = nextColorRuleSlice.actions;
export const selectNextColorRule = (state) => state.nextColorRule;
export default nextColorRuleSlice.reducer;