import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { cartItemCount } = useStore();
  const isDark = false; // We can implement theme context later

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-xs py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400">
          <div className="flex space-x-4 mb-2 md:mb-0">
            <span className="flex items-center"><span className="material-icons-outlined text-[14px] mr-1">email</span> contact@bloomedge.com</span>
            <span className="flex items-center"><span className="material-icons-outlined text-[14px] mr-1">phone</span> +1-800-BLOOM-ED</span>
          </div>
          <div className="flex space-x-4">
            <span className="flex items-center"><span className="material-icons-outlined text-[14px] mr-1">local_shipping</span> Free Shipping over $150</span>
            {/* Kept the top link as a secondary access point */}
            <Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 relative overflow-hidden flex items-center justify-center">
                 <span className="material-icons text-primary text-4xl">eco</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-tight text-gray-900 dark:text-white leading-none">BloomEdge</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Enterprises</span>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8 font-medium text-sm text-gray-700 dark:text-gray-200">
              <Link to="/shop" className="hover:text-primary transition-colors">DAIRY</Link>
              <Link to="/shop" className="hover:text-primary transition-colors">PANTRY</Link>
              <Link to="/shop" className="hover:text-primary transition-colors">PRODUCE</Link>
              <Link to="/shop" className="hover:text-primary transition-colors">ORGANIC</Link>
              <Link to="/shop" className="hover:text-primary transition-colors text-red-500">SALE</Link>
              
              {/* Product Management Link added to main nav as requested */}
              <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
              <Link to="/admin/products" className="flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-primary transition-colors">
                  <span className="material-icons-outlined text-lg">inventory_2</span>
                  PRODUCT MANAGEMENT
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                <span className="material-icons-outlined">search</span>
              </button>
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                <span className="material-icons-outlined">person</span>
              </Link>
              <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors relative">
                <span className="material-icons-outlined">shopping_cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>
              <button className="lg:hidden text-gray-600 dark:text-gray-300">
                <span className="material-icons-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;