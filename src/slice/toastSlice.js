import { createSlice } from '@reduxjs/toolkit';

const initialState = { messages: [] };

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setMessage(state, { payload }) {
      const { text, status } = payload;
      const id = Date.now();

      state.messages.push({
        id,
        text,
        status,
      });
    },
    removeMessage(state, { payload }) {
      const index = state.messages.findIndex((message) => {
        return message.id === payload;
      });
      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    },
  },
});

export const { setMessage, removeMessage } = toastSlice.actions;

export default toastSlice.reducer;
