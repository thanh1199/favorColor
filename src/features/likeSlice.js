
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1]
]

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    toLike: (state, action) => {
      state.pop()
      state.unshift(action.payload)
    },
    toDislike: (state, action) => {
      const removed = action.payload[0]
      const otherLiked = action.payload[1]
      const newState = state.filter(c => !(c[0] === removed[0] && c[1] === removed[1] && c[2] === removed[2]))
      newState.push(otherLiked)
      for (var i = newState.length; i < 5; i++) {
        newState.push([-1, -1, -1])
      }
      return [...newState]
    }
  },
});
  
export const { toLike, toDislike } = likeSlice.actions;
export const selectLike = (state) => state.like;
export default likeSlice.reducer;