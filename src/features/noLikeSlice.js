import { createSlice } from '@reduxjs/toolkit';

const initialState = 0

export const noLikeSlice = createSlice({
  name: 'noLike',
  initialState,
  reducers: {
    setNoLike: (state, action) => {
        return action.payload
    },
  },
});
  
export const { setNoLike } = noLikeSlice.actions;
export const selectNoLike = (state) => state.noLike;
export default noLikeSlice.reducer;