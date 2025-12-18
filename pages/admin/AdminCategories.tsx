import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';

const AdminCategories: React.FC = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory, loading } = useStore();
  
  // Create Category Logic
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  const [saving, setSaving] = useState(false);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  
  const handleAddCategory = async () => {
    if (!newCategoryName || !newCategorySlug) return;
    setSaving(true);
    try {
      await addCategory({ name: newCategoryName, slug: newCategorySlug });
      setNewCategoryName('');
      setNewCategorySlug('');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please make sure you are logged in.');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenEditModal = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditSlug(category.slug);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editName || !editSlug) return;
    setSaving(true);
    try {
      await updateCategory(editingCategory.id, { name: editName, slug: editSlug });
      setIsEditModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category. Please make sure you are logged in.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please make sure you are logged in.');
      }
    }
  };

  const getProductCount = (categoryName: string) => {
    return products.filter(p => p.category === categoryName).length;
  };

  // Find most popular category
  const getMostPopularCategory = () => {
    if (categories.length === 0) return 'N/A';
    let maxCount = 0;
    let mostPopular = categories[0]?.name || 'N/A';
    categories.forEach(cat => {
      const count = getProductCount(cat.name);
      if (count > maxCount) {
        maxCount = count;
        mostPopular = cat.name;
      }
    });
    return mostPopular;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
               <div><p className="text-sm text-gray-500">Most Popular</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{getMostPopularCategory()}</p></div>
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
                       <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g. Organic Fruits" 
                         value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} required />
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                       <input type="text" className="mt-1 block w-full rounded border-gray-300 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g. organic-fruits"
                         value={newCategorySlug} onChange={e => setNewCategorySlug(e.target.value)} required />
                   </div>
                   <button type="submit" disabled={saving} className="w-full bg-primary text-white py-2 rounded shadow hover:bg-green-600 disabled:opacity-50">
                     {saving ? 'Saving...' : 'Save Category'}
                   </button>
               </form>
           </div>
           
           <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
               <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-between">
                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">All Categories</span>
               </div>
               <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                     <thead className="bg-gray-50 dark:bg-gray-900/50">
                         <tr>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Products</th>
                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                         {categories.map(category => (
                           <tr key={category.id}>
                               <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center text-gray-900 dark:text-white">{category.name}</div></td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.slug}</td>
                               <td className="px-6 py-4 whitespace-nowrap text-center"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{getProductCount(category.name)}</span></td>
                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                 <button onClick={() => handleOpenEditModal(category)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                 <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-900">Delete</button>
                               </td>
                           </tr>
                         ))}
                         {categories.length === 0 && (
                           <tr>
                             <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                               No categories found. Add your first category above.
                             </td>
                           </tr>
                         )}
                     </tbody>
                 </table>
               </div>
           </div>
       </div>

       {/* Edit Modal */}
       {isEditModalOpen && (
         <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsEditModalOpen(false)}></div>
             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
             <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
               <form onSubmit={handleUpdateCategory}>
                 <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                   <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">Edit Category</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category Name</label>
                       <input 
                         type="text" 
                         required 
                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                         value={editName} 
                         onChange={e => setEditName(e.target.value)} 
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                       <input 
                         type="text" 
                         required 
                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                         value={editSlug} 
                         onChange={e => setEditSlug(e.target.value)} 
                       />
                     </div>
                   </div>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                   <button 
                     type="submit" 
                     disabled={saving} 
                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                   >
                     {saving ? 'Saving...' : 'Update Category'}
                   </button>
                   <button 
                     type="button" 
                     onClick={() => setIsEditModalOpen(false)} 
                     className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                   >
                     Cancel
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       )}
    </div>
  );
};

export default AdminCategories;
