import {combineReducers, configureStore} from '@reduxjs/toolkit'
import cartSlice from "../components/client/Cart/cartSlice";
import authSlice from '../pages/client/auth/authSlice';
import productSlice from '../pages/client/product/productSlice';


export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
    cart: cartSlice.reducer,
    }
});
export default store;