import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUser } from "../api/Auth";
import {
	loginStart,
	loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFail,
  registerStart,
  registerSuccess,
} from "../pages/client/auth/authSlice";
import { getProductFail, getProductsFail, getProductsStart, getProductsSuccess, getProductStart, getProductSuccess } from "../pages/client/product/productSlice";

// export const getProducts = async (dispatch) => {
//   try {
//     const {data} = await axios.get('https://json-server-phanducmanh.herokuapp.com/products')
//     console.log(data);
//     dispatch(getProductsSuccess(data))
//   } catch (error) {
//     // dispatch(getProductsFail())
//   }
// };
export const getProduct = async (id,dispatch) =>{
  dispatch(getProductStart())
  try {
    const {data} = await axios.get('https://json-server-phanducmanh.herokuapp.com/products/' +id)
    dispatch(getProductSuccess(data))
  } catch (error) {
    dispatch(getProductFail())
  }
};
export const registerUser = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const {data} = await axios.post("https://json-server-phanducmanh.herokuapp.com/users", user);
    console.log(data);
    dispatch(registerSuccess());
  } catch (error) {
    dispatch(registerFail());
  }
};  

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  const { email, password } = user;
  const {data} = await axios.get('https://json-server-phanducmanh.herokuapp.com/users');
  if (data) {
    const users = await data.filter(user => user.email == email && user.password == password);
    console.log(users);
    if (!users || users == "" || null) {
      console.log('lam on chinh xac');
    }else{
      localStorage.setItem('user', JSON.stringify(users))
    }
  }
  // console.log(users);
  // if (users == 'w' || !users) {
  //   console.log(123123);
  // }
  // else{
  // }
  // try {
  //   const {data} = await axios.post("https://json-server-phanducmanh.herokuapp.com/users", user);
  //   console.log(data);
   
  // } catch (error) {
  //   dispatch(registerFail());
  // }
};

