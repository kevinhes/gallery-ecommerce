import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../helpers/auth';
// import Swal from 'sweetalert2';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;
import axios from 'axios';

export const adminNewsSlice = createSlice({
  name: 'adminNews',
  initialState: {
    articlesList: [],
    pagination: {},
  },
  reducers: {
    setArticlesList(state, { payload }) {
      state.articlesList = payload;
    },
    setPagination(state, { payload }) {
      state.pagination = payload;
    },
  },
});

export const getNewsList = createAsyncThunk(
  'adminProduct/getProductsList',
  async (payload, { dispatch }) => {
    const getAllNewsUrl = `${baseUrl}v2/api/${api}/admin/articles`
    const cookies = document.cookie.split(';');
    const hexToken = getCookie(cookies);

    const response = await axios.get(getAllNewsUrl, {
      headers: { Authorization: hexToken },
    });
    const { articles } = response.data
    const { pagination } = response.data
    console.log(pagination);
    
    dispatch(setArticlesList(articles));
    dispatch(setPagination(pagination));
  }
);

export const { setArticlesList, setPagination } = adminNewsSlice.actions;
export default adminNewsSlice.reducer;
