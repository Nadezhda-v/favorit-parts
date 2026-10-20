import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_KEY, API_BASE } from '../../config';

async function requestGoods(number, brand) {
  let url = `${API_BASE}?key=${encodeURIComponent(API_KEY)}&number=${encodeURIComponent(number)}`;
  if (brand) {
    url += `&brand=${encodeURIComponent(brand)}&analogues=on`;
  }

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('Ошибка сети. Не удалось связаться с сервером.');
  }

  if (!response.ok)
    throw new Error(`Ошибка сервера: HTTP ${response.status}`);

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Сервер вернул некорректный ответ.');
  }

  if (data.error) throw new Error(data.error);

  const goods = Array.isArray(data.goods)
    ? data.goods.filter((item) => item && Object.keys(item).length > 0)
    : [];

  if (goods.length === 0) {
    throw new Error('Ничего не найдено. Проверьте артикул.');
  }

  return goods;
}

export const fetchBrands = createAsyncThunk(
  'search/fetchBrands',
  async (number, { rejectWithValue }) => {
    try {
      const goods = await requestGoods(number);
      const brands = [...new Set(goods.map((item) => item.brand).filter(Boolean))];
      if (brands.length === 0) {
        return rejectWithValue('Для этого артикула не найдено ни одного производителя.');
      }
      return brands;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOffers = createAsyncThunk(
  'search/fetchOffers',
  async ({ number, brand }, { rejectWithValue }) => {
    try {
      return await requestGoods(number, brand);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
