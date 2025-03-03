import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../helpers/auth";
import Swal from 'sweetalert2'
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;
import axios from "axios";

export const adminProductSlice = createSlice({
  name: 'adminProduct',
  initialState: {
    productsList: [],
    pagination: {},
  },
  reducers: {
    setProductsList( state, { payload } ) {
      state.productsList = payload
    },
    setPagination( state, { payload } ) {
      state.pagination = payload
    },
  }
})

export const getProductsList = createAsyncThunk(
  'adminProduct/getProductsList',
  async ( payload, { dispatch } ) => {
    const getProductsUrl = `${baseUrl}v2/api/${api}/admin/products/all`
    const cookies = document.cookie.split(';');
    const hexToken = getCookie(cookies)
    
    const response = await axios.get(getProductsUrl, {
      headers: { Authorization: hexToken },
    })
    const { products } = response.data
    const productsArray = Object.values(products)
    dispatch(setProductsList(productsArray))
    
  }
)

export const getProductsListByPage = createAsyncThunk(
  'adminProduct/getProductsListByPage',
  async({ page = 1, maxPage = Infinity } = {}, {dispatch}) => {
    if ( page === 0 || page > maxPage ) {
      Swal.fire({
        title: '沒有下一頁',
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
      })
      return
    }
    const getProductsUrl = `${baseUrl}v2/api/${api}/admin/products?page=${page}`
    const cookies = document.cookie.split(';');
    const hexToken = getCookie(cookies)
    try {
      const response = await axios.get(getProductsUrl, {
        headers: { Authorization: hexToken },
      })
      console.log(response);
      
      const { products } = response.data
      const { pagination } = response.data
      dispatch(setProductsList(products))
      dispatch(setPagination(pagination))
    } catch(error) {
      Swal.fire({
        title: error.response.data.message,
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
      })
      
    }
    
  }
)


export const { setProductsList, setPagination } = adminProductSlice.actions
export default adminProductSlice.reducer