import React, { useEffect, useState } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import './App.css';
import Cart from './components/client/Cart';
import AddCart from './components/client/Product';
import AddProductPage from './pages/admin/AddProduct';
import EditProductPage from './pages/admin/EditProduct';
import Product from './pages/admin/Product';
import Home from './pages/client/Home';
import "./App.css"
import ProductDetail from './pages/client/product/ProductDetail';
import AdminLayout from './pages/layout/AdminLayout';
import WebsiteLayout from './pages/layout/WebsiteLayout';
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Signup from './pages/client/auth/Signup';
import Signin from './pages/client/auth/Signin';
import { PrivateRouter } from './lib/localstorage/authenticate';
import Categories from './pages/client/Category';
import Categorys from './pages/admin/categories/Categorys';
import AddCategorys from './pages/admin/categories/AddCategorys';
import EditCategory from './pages/admin/categories/EditCategorys';
import Users from './pages/admin/users/Users';
import AddUser from './pages/admin/users/AddUsers';
import EditUser from './pages/admin/users/EditUsers';
import Addtes from './pages/admin/EditTest';
import Checkout from './components/client/Cart/CheckOut';
import Order from './pages/admin/orders/Orders'
import EditOrder from './pages/admin/orders/EditOrder';
import Check from './components/client/Cart/Check';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/product' element={<AddCart />} />
          <Route index element={<Home />} />
        <Route path='/' element={<WebsiteLayout />}>
          <Route path='cart' element={<Cart />} />
          <Route path='categories/:id' element={<Categories />} />
          <Route path='product/detail/:id' element={<ProductDetail />} />
          <Route path='signup' element={<Signup/>}/>
          <Route path='login' element={<Signin/>}/>
          <Route path='checkout' element={<Checkout />}/>
          <Route path='checkoder' element={<Check />}/>
        </Route>
        <Route path='/admin' element={<PrivateRouter><AdminLayout /></PrivateRouter>}>
          <Route path='add' element={<Addtes/>}/>
          <Route index element={<Product />} />
          <Route path='category' element={<Categorys />} />
          <Route path='category/add' element={<AddCategorys />} />
          <Route path='category/edit/:id' element={<EditCategory />} />
          <Route path='product/add' element={<AddProductPage />} />
          <Route path='product/edit/:id' element={<EditProductPage />} />
          <Route path='user' element={<Users />} />
          <Route path='user/add' element={<AddUser />} />
          <Route path='user/edit/:id' element={<EditUser />} />
          <Route path='order' element={<Order/>}/>
          <Route path='order/edit/:id' element={<EditOrder/>}/>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;