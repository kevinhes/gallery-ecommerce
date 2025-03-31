import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../helpers/auth';
import Swal from 'sweetalert2';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;
import axios from 'axios';

export const adminOrdersSlice = createSlice({
  name: 'adminNews',
  initialState: {
    ordersList: [],
    ordersPagination: {},
  },
  reducers: {
    setOrdersList(state, { payload }) {
      state.ordersList = payload;
    },
    setOrdersPagination(state, { payload }) {
      state.ordersPagination = payload;
    },
  },
});

export const getOrdersList = createAsyncThunk(
  'adminOrders/getOrdersList',
  async (payload, { dispatch }) => {
    const getAllNewsUrl = `${baseUrl}v2/api/${api}/admin/orders`
    const cookies = document.cookie.split(';');
    const hexToken = getCookie(cookies);
    try {
      const response = await axios.get(getAllNewsUrl, {
        headers: { Authorization: hexToken },
      });
      console.log(response);
      
      const { orders } = response.data
      const { pagination } = response.data
      
      dispatch(setOrdersList(orders));
      dispatch(setOrdersPagination(pagination));
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: 'error',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
);

export const { setOrdersList, setOrdersPagination } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;
