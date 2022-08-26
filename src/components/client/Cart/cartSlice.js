import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    amount: 0,
  },
  reducers: {
    add: (state, action) => {
      const product = action.payload;
      const productInCart = state?.cart?.find((item) => item.id === product.id);
      if (!productInCart) {
        state.cart?.push({ ...product, amount: 1 });
      } else{
        productInCart.amount += 1;
      }
      state.amount += 1;
      state.total += product.saleOffPrice || product.originalPrice;
    },
    increase: (state, action) => {
      const currentItem = state.cart.find((item) => item.id === action.payload);
      if(currentItem) {
        currentItem.amount +=1;
        currentItem.total = currentItem.saleOffPrice * currentItem.amount
        state.total = state.cart.reduce((accu, item) => item.total ? accu + item.total : accu + item.saleOffPrice, 0)
      }
    },
    decrease: (state, action) => {
      const product = action.payload
      const currentItem = state.cart.find((item) => item.id === action.payload);
      if(currentItem) {
        currentItem.amount -=1;
        currentItem.total = currentItem.saleOffPrice * currentItem.amount
        state.total = state.cart.reduce((accu, item) => item.total ? accu + item.total : accu - item.saleOffPrice, 0)
        if(currentItem.amount ===0) {
          if (window.confirm('Are you sure you want to')) {
            state.cart = state.cart.filter((p) => p.id !== action.payload)
          }
        }
      }
      state.amount -= 1;
      state.total -= product.saleOffPrice || product.originalPrice;
    },
  },
});

export const { add, increase,decrease } = cartSlice.actions;

export default cartSlice;