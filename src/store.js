import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './slice/toastSlice';
import frontendProductsReducer from './slice/frontendProductsSlice';
import frontendNewsReducer from './slice/frontendNewsSlice';
import shoppingCartReducer from './slice/shoppingCartSlice';
import adminNewsReducer from './slice/adminNewsSlice';
import adminOrdersReducer from './slice/adminOrdersSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    frontendProducts:frontendProductsReducer,
    frontendNews:frontendNewsReducer,
    shoppingCart:shoppingCartReducer,
    adminNews: adminNewsReducer,
    adminOrders: adminOrdersReducer
  },
});
