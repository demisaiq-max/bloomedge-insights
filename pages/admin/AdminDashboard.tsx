import React from 'react';
import { useStore } from '../../context/StoreContext';

const AdminDashboard: React.FC = () => {
  const { products, orders, stats, categories } = useStore();

  // Calculate inventory stats
  const lowStockThreshold = 10;
  const lowStockProducts = products.filter(p => (p.stock ?? 0) <= lowStockThreshold);
  const inStockProducts = products.filter(p => (p.stock ?? 0) > lowStockThreshold);
  const lowStockPercent = products.length > 0 ? (lowStockProducts.length / products.length) * 100 : 0;
  const inStockPercent = products.length > 0 ? (inStockProducts.length / products.length) * 100 : 0;

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'delivered') return 'bg-green-100 text-green-800';
    if (statusLower === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (statusLower === 'shipped') return 'bg-blue-100 text-blue-800';
    return 'bg-red-100 text-red-800';
  };

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
               </div>
               <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
               <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">${stats.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
           </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
               <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><span className="material-icons">shopping_bag</span></div>
               </div>
               <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
               <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalOrders.toLocaleString()}</p>
           </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
               <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><span className="material-icons">category</span></div>
               </div>
               <h3 className="text-gray-500 text-sm font-medium">Categories</h3>
               <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{categories.length}</p>
           </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
               <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><span className="material-icons">inventory</span></div>
               </div>
               <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
               <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{products.length}</p>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Recent Activity / Chart */}
           <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Products Overview</h3>
               {products.length > 0 ? (
                 <div className="space-y-3 max-h-64 overflow-y-auto">
                   {products.slice(0, 8).map(product => (
                     <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                       <div className="flex items-center gap-3">
                         {product.image && (
                           <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                         )}
                         <div>
                           <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{product.name}</span>
                           <p className="text-xs text-gray-500">{product.category}</p>
                         </div>
                       </div>
                       <div className="text-right">
                         <span className="text-sm font-bold text-gray-900 dark:text-white">${Number(product.price).toFixed(2)}</span>
                         <p className="text-xs text-gray-500">Stock: {product.stock ?? 0}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="h-64 flex items-center justify-center text-gray-500">
                   <p>No products yet. Add some products to get started.</p>
                 </div>
               )}
           </div>

           {/* Inventory Status */}
           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Inventory Status</h3>
               <div className="space-y-4">
                   <div>
                       <div className="flex justify-between text-sm mb-1">
                           <span className="text-gray-600 dark:text-gray-400">Low Stock Items</span>
                           <span className="font-semibold text-red-500">{lowStockProducts.length}</span>
                       </div>
                       <div className="w-full bg-gray-100 rounded-full h-2">
                           <div className="bg-red-500 h-2 rounded-full" style={{ width: `${lowStockPercent}%` }}></div>
                       </div>
                   </div>
                   <div>
                       <div className="flex justify-between text-sm mb-1">
                           <span className="text-gray-600 dark:text-gray-400">In Stock</span>
                           <span className="font-semibold text-green-500">{inStockProducts.length}</span>
                       </div>
                       <div className="w-full bg-gray-100 rounded-full h-2">
                           <div className="bg-green-500 h-2 rounded-full" style={{ width: `${inStockPercent}%` }}></div>
                       </div>
                   </div>
               </div>

               <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Top Categories</h3>
               <div className="space-y-3">
                   {categories.length > 0 ? categories.slice(0, 4).map(cat => (
                       <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                           <div className="flex items-center gap-3">
                               <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-500 text-xs font-bold">
                                   {cat.name.charAt(0)}
                               </div>
                               <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{cat.name}</span>
                           </div>
                           <span className="text-xs font-bold text-gray-500">{products.filter(p => p.category === cat.name).length} Items</span>
                       </div>
                   )) : (
                     <p className="text-sm text-gray-500">No categories yet.</p>
                   )}
               </div>
           </div>
       </div>

       {/* Recent Orders */}
       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
           <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h3>
               <span className="text-gray-500 text-sm">{orders.length} total</span>
           </div>
           {orders.length > 0 ? (
             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                 <thead className="bg-gray-50 dark:bg-gray-900/50">
                     <tr>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                     </tr>
                 </thead>
                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                     {orders.slice(0, 10).map((order) => (
                         <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">#{order.id.slice(0, 8)}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.created_at)}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items || 0}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${Number(order.total).toFixed(2)}</td>
                             <td className="px-6 py-4 whitespace-nowrap">
                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                     {order.status}
                                 </span>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
           ) : (
             <div className="p-12 text-center text-gray-500">
               <p>No orders yet. Orders will appear here once customers start purchasing.</p>
             </div>
           )}
       </div>
    </div>
  );
};

export default AdminDashboard;