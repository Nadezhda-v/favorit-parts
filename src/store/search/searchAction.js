import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGoods } from '../../api/goods';

export const fetchBrands = createAsyncThunk(
  'search/fetchBrands',
  async (number, { rejectWithValue }) => {
    try {
      const goods = await requestGoods(number);
      const brands = [
        ...new Set(goods.map((item) => item.brand).filter(Boolean)),
      ];
      if (brands.length === 0) {
        return rejectWithValue(
          'Для этого артикула не найдено ни одного производителя.',
        );
      }
      return brands;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchOffers = createAsyncThunk(
  'search/fetchOffers',
  async ({ number, brand }, { rejectWithValue }) => {
    try {
      return await requestGoods(number, brand);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
