import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { supabase } from '@/src/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItemCount } = useStore();
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
    navigate('/');
  };

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
            <Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="BloomEdge Enterprises" className="h-12 w-auto" />
            </Link>
            <nav className="hidden lg:flex items-center space-x-8 font-medium text-sm text-gray-700 dark:text-gray-200">
              <Link to="/shop?category=Dairy" className="hover:text-primary transition-colors">DAIRY</Link>
              <Link to="/shop?category=Pantry" className="hover:text-primary transition-colors">PANTRY</Link>
              <Link to="/shop?category=Vegetables" className="hover:text-primary transition-colors">PRODUCE</Link>
              <Link to="/shop?filter=organic" className="hover:text-primary transition-colors">ORGANIC</Link>
              <Link to="/shop?filter=sale" className="hover:text-primary transition-colors text-red-500 font-bold">SALE</Link>
              
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
              
              {/* User Account Section */}
              <div className="relative" ref={dropdownRef}>
                {user ? (
                  <>
                    <button 
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
                        </div>
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <span className="material-icons-outlined text-lg">logout</span>
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                    <span className="material-icons-outlined">person</span>
                  </Link>
                )}
              </div>

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