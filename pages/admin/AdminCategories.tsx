import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';

const AdminCategories: React.FC = () => {
  const { categories, products, addCategory, deleteCategory } = useStore();
  
  // Create Category Logic
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  
  const handleAddCategory = () => {
    if (!newCategoryName || !newCategorySlug) return;
    addCategory({ name: newCategoryName, slug: newCategorySlug });
    setNewCategoryName('');
    setNewCategorySlug('');
  };

  const getProductCount = (categoryName: string) => {
    return products.filter(p => p.category === categoryName).length;
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
           <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Category Management</h2>
               <p className="text-sm text-gray-500">Organize your store inventory structure.</p>
           </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Stats */}
           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center">
               <div><p className="text-sm text-gray-500">Total Categories</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p></div>
               <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><span className="material-icons">folder</span></div>
           </div>
           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center">
               <div><p className="text-sm text-gray-500">Most Popular</p><p className="text-2xl font-bold text-gray-900 dark:text-white">Vegetables</p></div>
               <div className="p-2 bg-green-50 text-green-600 rounded-full"><span className="material-icons">trending_up</span></div>
           </div>
           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center">
               <div><p className="text-sm text-gray-500">Empty Categories</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.filter(c => getProductCount(c.name) === 0).length}</p></div>
               <div className="p-2 bg-orange-50 text-orange-600 rounded-full"><span className="material-icons">warning</span></div>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
               <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add Category</h3>
               <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
                   <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category Name</label>
                       <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2" placeholder="e.g. Organic Fruits" 
                         value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} required />
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                       <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2" placeholder="e.g. organic-fruits"
                         value={newCategorySlug} onChange={e => setNewCategorySlug(e.target.value)} required />
                   </div>
                   <button type="submit" className="w-full bg-primary text-white py-2 rounded shadow hover:bg-green-600">Save Category</button>
               </form>
           </div>
           
           <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
               <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-between">
                   <input type="text" placeholder="Search categories..." className="rounded border-gray-300 text-sm p-1 px-2" />
               </div>
               <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                     <thead className="bg-gray-50 dark:bg-gray-900/50">
                         <tr>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Count</th>
                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                         {categories.map(category => (
                           <tr key={category.id}>
                               <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center text-gray-900 dark:text-white">{category.name}</div></td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.slug}</td>
                               <td className="px-6 py-4 whitespace-nowrap text-center"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{getProductCount(category.name)}</span></td>
                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                 <button onClick={() => deleteCategory(category.id)} className="text-red-600 hover:text-red-900">Delete</button>
                               </td>
                           </tr>
                         ))}
                     </tbody>
                 </table>
               </div>
           </div>
       </div>
    </div>
  );
};

export default AdminCategories;