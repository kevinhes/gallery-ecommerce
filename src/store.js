import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './slice/toastSlice';
import frontendProductsReducer from './slice/frontendProductsSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    frontendProducts:frontendProductsReducer
  },
});
