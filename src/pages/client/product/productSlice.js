import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
   "product/get",
   async () => {
     const {data} = await axios.get('https://json-server-phanducmanh.herokuapp.com/products')
     return data
   }
 )

const productSlice = createSlice({
   name: "product",
   initialState: {
      products: {
         getProducts: null,
         isFetching: false,
         error: false,
      },
      product: {
         getProduct: null,
         isFetching: false,
         error: false,
      },
   },
   reducers: {
      getProductStart: (state)=>{
         state.product.isFetching = true;
         state.product.error = false;
      },
      getProductSuccess: (state, action) =>{
         state.product.isFetching = false;
         state.product.getProduct = action.payload;
         state.product.error = false;
      },
      getProductFail: (state) =>{
         state.product.isFetching = false;
         state.product.error = true;
      },
      // getProductsStart: (state)=>{
      //    state.products.isFetching = true;
      //    state.products.error = false;
      // },
      getProductsSuccess: (state, action) =>{
         state.products.getProducts = action.payload;
      },
      // getProductsFail: (state) =>{
      //    state.products.error = true;
      // }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        state = action.payload
        return state
      })
    }
})

export const {
   getProductStart,
   getProductSuccess,
   getProductFail,
   // getProductsStart,
   getProductsSuccess,
   // getProductsFail,
} = productSlice.actions;

export default productSlice.reducer;