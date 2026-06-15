import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDishesAPI, fetchDishByIdAPI, searchDishesAPI } from './dishAPI';

const initialState = {
  dishes: [],
  selectedDish: null,
  searchResults: [],
  loading: false,
  error: null,
};

export const fetchDishes = createAsyncThunk('dishes/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchDishesAPI();
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to load dishes');
  }
});

export const fetchDishById = createAsyncThunk('dishes/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await fetchDishByIdAPI(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Dish not found');
  }
});

export const searchDishes = createAsyncThunk('dishes/search', async (query, { rejectWithValue }) => {
  try {
    const response = await searchDishesAPI(query);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Search failed');
  }
});

const dishSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDishById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDish = action.payload;
      })
      .addCase(fetchDishById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dishSlice.reducer;
