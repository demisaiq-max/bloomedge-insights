import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from './pages/admin/AdminLayout';
import AdminCategories from './pages/admin/AdminCategories';

// Simple placeholder for Admin Dashboard
const AdminDashboard = () => <div className="text-center py-20"><h2 className="text-2xl font-bold">Welcome to Dashboard</h2></div>;
// Placeholder for Admin Products (reusing shop logic conceptually or just placeholder)
const AdminProducts = () => <div className="text-center py-20"><h2 className="text-2xl font-bold">Product Management</h2><p>List of products goes here...</p></div>;

const App: React.FC = () => {
  return (
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
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;