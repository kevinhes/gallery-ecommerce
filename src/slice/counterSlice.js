import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    addCount: (state) => {
      state.count += 1;
    },
    addCountByAmount: (state, action) => {
      console.log(action.payload);
      state.count += action.payload;
    },
  },
});

export const { addCount, addCountByAmount } = counterSlice.actions;
export default counterSlice.reducer;
