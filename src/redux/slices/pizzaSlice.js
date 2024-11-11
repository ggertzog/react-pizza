import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, search, order, sortType, currentPage } = params;
  const { data } = await axios.get(
    `https://671bc9142c842d92c3814c4d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = "loading";
          state.items = [];
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload;
          state.status = "success";
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = "error";
          state.items = [];
       })
 }
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
