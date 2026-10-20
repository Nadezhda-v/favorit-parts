import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands, fetchOffers } from './searchAction';

const initialState = {
  number: '',
  brands: [],
  selectedBrand: null,
  goods: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    goBack(state) {
      state.selectedBrand = null;
      state.goods = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.number = action.meta.arg;
        state.brands = [];
        state.selectedBrand = null;
        state.goods = [];
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOffers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.number = action.meta.arg.number;
        state.selectedBrand = action.meta.arg.brand;
        state.goods = [];
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.goods = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedBrand = null;
        state.goods = [];
      });
  },
});

export const { goBack } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
