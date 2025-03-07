import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;
import Swal from 'sweetalert2';
import axios from 'axios';

const initialState = {
  shoppingCartList: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setShoppingCart(state, { payload }) {
      state.shoppingCartList = payload
    },
  },
});

export const getShoppingCart = createAsyncThunk(
  'shoppingCart/getShoppingCart',
  async(payload, { dispatch }) => {
    const addCartUrl = `${baseUrl}v2/api/${api}/cart`;
    
    try {
      const response = await axios.get(addCartUrl);
      const { carts } = response.data.data;
      console.log(carts);
      
      dispatch(setShoppingCart(carts))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
)

export const addProductToCart = createAsyncThunk(
  'shoppingCart/addProductToCart',
  async( { product_id, qty }, { dispatch } ) => {
    const addCartUrl = `${baseUrl}v2/api/${api}/cart`;
    try {
      const response = await axios.post(addCartUrl, {
        data: {
          product_id,
          qty,
        },
      });      
      if (response.data.success) {
        await Swal.fire({
          title: '已加入購物車',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      dispatch(getShoppingCart())
    } catch (error) {
      alert(error.response.data.message);
    }
  }
)

export const { setShoppingCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
