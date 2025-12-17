import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 font-sans">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
           <span className="material-icons text-primary text-3xl mr-2">eco</span>
           <span className="font-bold text-lg text-gray-900 dark:text-white">BloomEdge<span className="font-normal text-gray-400">Admin</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
           <Link to="/admin/dashboard" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/admin/dashboard') ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
               <span className="material-icons text-lg">dashboard</span> Dashboard
           </Link>
           <Link to="/admin/products" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/admin/products') ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
               <span className="material-icons text-lg">inventory_2</span> Product Management
           </Link>
           <Link to="/admin/categories" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/admin/categories') ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
               <span className="material-icons text-lg">category</span> Categories
           </Link>
           <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
             <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Shop Status</div>
             <div className="flex items-center gap-2 px-3 py-1">
                 <span className="h-2 w-2 rounded-full bg-green-500"></span>
                 <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Online</span>
             </div>
           </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-40">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Portal</h1>
            <div className="flex items-center gap-4">
                <Link to="/" className="text-sm text-gray-500 hover:text-primary">View Store</Link>
                <div className="h-8 w-8 bg-primary rounded-full text-white flex items-center justify-center font-bold">A</div>
            </div>
        </header>
        <div className="p-6">
             <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;