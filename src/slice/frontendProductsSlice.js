import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;
import axios from 'axios';

const initialState = {
  productsList: [],
  pagination: {},
  isPageChanged: false,
};

export const frontendProductsSlice = createSlice({
  name: 'frontendProducts',
  initialState,
  reducers: {
    setProducts(state, { payload }) {
      state.productsList = payload
    },
    setPagination(state, { payload }) {
      state.pagination = payload
    },
    setIsPageChanged(state, { payload }) {
      state.isPageChanged = payload
    }
  },
});

export const getFrontProductsListByPage = createAsyncThunk(
  'frontendProducts/getFrontProductsListByPage',
  async({ page = 1, maxPage = Infinity } = {}, { dispatch }) => {
    const getProductsUrl = `${baseUrl}v2/api/${api}/products?page=${page}`;
    
    if (page === 0 || page > maxPage) return;
    try {
      const response = await axios.get(getProductsUrl);
      const { products } = response.data;
      const { pagination } = response.data;
      console.log(products);
      
      dispatch(setProducts(products))
      dispatch(setPagination(pagination))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
)

export const { setProducts, setPagination, setIsPageChanged } = frontendProductsSlice.actions;

export default frontendProductsSlice.reducer;
