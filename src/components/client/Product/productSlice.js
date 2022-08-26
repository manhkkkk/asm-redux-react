import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchProduct } from './productSlice';

export const fetchProduct = createAsyncThunk(
  "product/get",
  async () => {
    const {data} = await axios.get('http://localhost:4000/products')
    return data
  }
)

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      localStorage.setItem('cart', JSON.stringify(action.payload) )
    })
  }
})

export default productSlice;