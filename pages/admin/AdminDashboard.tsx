import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { products, orders, stats, categories } = useStore();

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
           <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
               <p className="text-sm text-gray-500">Welcome back, Admin. Here's what's happening with your store today.</p>
           </div>
           <div className="text-sm text-gray-500">Last updated: Just now</div>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
               <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-green-100 text-green-600 rounded-lg"><span className="material-icons">payments</span></div>
                   <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
               </div>
               <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
               <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">${stats.totalSales.toLocaleString()}</p>
           </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
               <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><span className="material-icons">shopping_bag</span></div>
                   <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">+5.2%</span>
               </div>
               <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
               <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalOrders.toLocaleString()}</p>
           </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
               <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><span className="material-icons">group</span></div>
                   <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">+8.1%</span>
               </div>
               <h3 className="text-gray-500 text-sm font-medium">Active Visitors</h3>
               <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.visitors.toLocaleString()}</p>
           </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
               <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><span className="material-icons">inventory</span></div>
                   <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">0%</span>
               </div>
               <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
               <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{products.length}</p>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Recent Activity / Chart */}
           <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Sales Analytics</h3>
               <div className="h-64 flex items-end justify-between space-x-2">
                   {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 85, 95].map((h, i) => (
                       <div key={i} className="w-full bg-blue-50 dark:bg-gray-700 rounded-t-sm relative group">
                           <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all duration-500 group-hover:bg-green-600" style={{ height: `${h}%` }}></div>
                           <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity">
                               ${h * 150}
                           </div>
                       </div>
                   ))}
               </div>
               <div className="flex justify-between mt-4 text-xs text-gray-400">
                   <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
               </div>
           </div>

           {/* Popular Categories */}
           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Inventory Status</h3>
               <div className="space-y-4">
                   <div>
                       <div className="flex justify-between text-sm mb-1">
                           <span className="text-gray-600 dark:text-gray-400">Low Stock Items</span>
                           <span className="font-semibold text-red-500">{products.filter(p => p.lowStock).length}</span>
                       </div>
                       <div className="w-full bg-gray-100 rounded-full h-2">
                           <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                       </div>
                   </div>
                   <div>
                       <div className="flex justify-between text-sm mb-1">
                           <span className="text-gray-600 dark:text-gray-400">In Stock</span>
                           <span className="font-semibold text-green-500">{products.filter(p => !p.lowStock).length}</span>
                       </div>
                       <div className="w-full bg-gray-100 rounded-full h-2">
                           <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                       </div>
                   </div>
               </div>

               <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Top Categories</h3>
               <div className="space-y-3">
                   {categories.slice(0, 4).map(cat => (
                       <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                           <div className="flex items-center gap-3">
                               <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-500 text-xs font-bold">
                                   {cat.name.charAt(0)}
                               </div>
                               <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{cat.name}</span>
                           </div>
                           <span className="text-xs font-bold text-gray-500">{products.filter(p => p.category === cat.name).length} Items</span>
                       </div>
                   ))}
               </div>
           </div>
       </div>

       {/* Recent Orders */}
       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
           <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h3>
               <button className="text-primary text-sm font-semibold hover:underline">View All</button>
           </div>
           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
               <thead className="bg-gray-50 dark:bg-gray-900/50">
                   <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                   </tr>
               </thead>
               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                   {orders.map((order) => (
                       <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{order.id}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.customer}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</td>
                           <td className="px-6 py-4 whitespace-nowrap">
                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                   ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                     order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                     order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                                   {order.status}
                               </span>
                           </td>
                       </tr>
                   ))}
               </tbody>
           </table>
       </div>
    </div>
  );
};

export default AdminDashboard;