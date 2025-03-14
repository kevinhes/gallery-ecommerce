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

export const editProductQty = createAsyncThunk(
  'shoppingCart/editProductToCart',
  async ({ cart_id, product_id, qty }, { dispatch }) => {
    const editCartUrl = `${baseUrl}v2/api/${api}/cart/${cart_id}`;
    try {
      const response = await axios.put(editCartUrl, {
        data: {
          product_id,
          qty,
        },
      });
      if (response.data.success) {
        await Swal.fire({
          title: '產品數量已調整',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      await dispatch(getShoppingCart())
    } catch (error) {
      alert(error.response.data.message);
    }
  }
)

export const deleteProductFromShoppingCart = createAsyncThunk(
  'shoppingCart/deleteProductFromShoppingCart',
  async ({product_id}, {dispatch}) => {
    const deleteCartUrl = `${baseUrl}v2/api/${api}/cart/${product_id}`;
    try {
      const response = await axios.delete(deleteCartUrl);
      if (response.data.success) {
        await Swal.fire({
          title: '產品已刪除',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      await dispatch(getShoppingCart())
    } catch (error) {
      alert(error.response.data.message);
    }
  }
)

export const deleteAllProduct = createAsyncThunk(
  'shoppingCart/deleteAllProduct',
  async (payload, {dispatch}) => {
    const deleteCartUrl = `${baseUrl}v2/api/${api}/carts`;
    try {
      const response = await axios.delete(deleteCartUrl);
      if (response.data.success) {
        await Swal.fire({
          title: '購物車已清空',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      await dispatch(getShoppingCart())
    } catch (error) {
      alert(error.response.data.message);
    }
  }
)




export const { setShoppingCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
