import { createSlice} from '@reduxjs/toolkit'
import { getProducts, getProduct } from '../../../redux/actions';
const initialState = {
   filter: ''
}

export const filterSlice = createSlice({
   name: 'productFilter',
   initialState: {
		products: [],
	},
   reducers: {
      filterProducts: (state = initialState, action) => {
			state.products = state.products.filter((product) =>
         product.name.toLowerCase().includes(action.payload)
			);
		},
   },
   extraReducers: {
		[getProduct.fulfilled]: (state, action) => {
			state.products = action.payload;
		},
	},
})

export const {filterProducts} = filterSlice.actions;
export default filterSlice.reducer;
