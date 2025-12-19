import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
             <Route index element={<Navigate to="dashboard" replace />} />
             <Route path="dashboard" element={<AdminDashboard />} />
             <Route path="products" element={<AdminProducts />} />
             <Route path="categories" element={<AdminCategories />} />
             <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;