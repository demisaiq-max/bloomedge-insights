import React from 'react';

const AdminCategories: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
           <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Category Management</h2>
               <p className="text-sm text-gray-500">Organize your store inventory structure.</p>
           </div>
           <button className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-green-600 flex items-center gap-2">
               <span className="material-icons text-sm">add</span> Create New Category
           </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Stats */}
           <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
               <div><p className="text-sm text-gray-500">Total Categories</p><p className="text-2xl font-bold">14</p></div>
               <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><span className="material-icons">folder</span></div>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
               <div><p className="text-sm text-gray-500">Most Popular</p><p className="text-2xl font-bold">Vegetables</p></div>
               <div className="p-2 bg-green-50 text-green-600 rounded-full"><span className="material-icons">trending_up</span></div>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
               <div><p className="text-sm text-gray-500">Empty Categories</p><p className="text-2xl font-bold">2</p></div>
               <div className="p-2 bg-orange-50 text-orange-600 rounded-full"><span className="material-icons">warning</span></div>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
               <h3 className="text-lg font-semibold mb-4">Add Category</h3>
               <form className="space-y-4">
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Category Name</label>
                       <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" placeholder="e.g. Organic Fruits" />
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Slug</label>
                       <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" placeholder="e.g. organic-fruits" />
                   </div>
                   <button type="button" className="w-full bg-primary text-white py-2 rounded shadow hover:bg-green-600">Save Category</button>
               </form>
           </div>
           
           <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between">
                   <input type="text" placeholder="Search categories..." className="rounded border-gray-300 text-sm" />
                   <button className="text-gray-400"><span className="material-icons">filter_list</span></button>
               </div>
               <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50">
                       <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                           <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Count</th>
                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                       </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                       <tr>
                           <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mr-2">VEG</span> Vegetables</div></td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">vegetables</td>
                           <td className="px-6 py-4 whitespace-nowrap text-center"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">30</span></td>
                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button className="text-primary hover:text-green-900 mr-2">Edit</button><button className="text-red-600 hover:text-red-900">Delete</button></td>
                       </tr>
                       {/* More rows... */}
                   </tbody>
               </table>
           </div>
       </div>
    </div>
  );
};

export default AdminCategories;