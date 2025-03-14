import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;
import axios from 'axios';

export const frontendNewsSlice = createSlice({
  name: 'frontendProducts',
  initialState: {
    newsList: [],
  },
  reducers: {
    setNewsList(state, { payload }) {
      state.newsList = payload
    },
    setPagination(state, { payload }) {
      state.pagination = payload
    },
  },
});

export const getNewsListByPage = createAsyncThunk(
  'frontendNews/getNewsListByPage',
  async({ page = 1, maxPage = Infinity } = {}, { dispatch }) => {
    const getNewsUrl = `${baseUrl}v2/api/${api}/articles?page=${page}`;
    if (page === 0 || page > maxPage) return;
    try {
      const response = await axios.get(getNewsUrl);
      const { articles } = response.data;
      const { pagination } = response.data;
      console.log(pagination);
      
      
      dispatch(setNewsList(articles))
      dispatch(setPagination(pagination))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
)

export const { setNewsList, setPagination } = frontendNewsSlice.actions;

export default frontendNewsSlice.reducer;