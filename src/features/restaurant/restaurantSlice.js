import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRestaurantsAPI, fetchRestaurantByIdAPI } from './restaurantAPI';

const initialState = {
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
};

export const fetchRestaurants = createAsyncThunk('restaurants/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchRestaurantsAPI();
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to load restaurants');
  }
});

export const fetchRestaurantById = createAsyncThunk('restaurants/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await fetchRestaurantByIdAPI(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Restaurant not found');
  }
});

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRestaurant = action.payload;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;
