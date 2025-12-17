import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Shop: React.FC = () => {
  const { products, categories: storeCategories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Use categories from context
  const categories = ['All', ...storeCategories.map(c => c.name)];
  
  const getCount = (cat: string) => cat === 'All' ? products.length : products.filter(p => p.category === cat).length;

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <h2 className="text-xl font-display font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">Categories</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-sm max-h-96 overflow-y-auto">
              {categories.map(cat => (
                <li key={cat}>
                    <button 
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left block px-4 py-3 transition-colors flex justify-between items-center ${selectedCategory === cat ? 'font-semibold text-primary bg-green-50 dark:bg-green-900/20 border-l-4 border-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        {cat} <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}`}>{getCount(cat)}</span>
                    </button>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-xl font-display font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">Filter By Price</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
             <input type="range" min="0" max="10000" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
             <div className="flex justify-between text-xs text-gray-500 mt-2">
                 <span>Rs 0</span>
                 <span>Rs 10,000+</span>
             </div>
             <button className="w-full mt-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Apply Filter</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
             <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white uppercase">{selectedCategory}</h1>
                <p className="text-sm text-gray-500">Showing {filteredProducts.length} results</p>
             </div>
             <select className="mt-2 sm:mt-0 border-gray-300 dark:border-gray-700 rounded-md text-sm focus:ring-primary focus:border-primary">
                 <option>Default sorting</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
             </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col group">
                    <Link to={`/product/${product.id}`} className="relative h-48 bg-white p-4 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
                        <img src={product.image} alt={product.name} className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                        {product.lowStock && <span className="absolute top-2 left-2 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">LOW STOCK</span>}
                        {product.isOrganic && <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">ORGANIC</span>}
                        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm text-gray-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-icons text-sm">add</span>
                        </button>
                    </Link>
                    <div className="p-4 flex flex-col flex-grow">
                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">{product.category}</p>
                        <Link to={`/product/${product.id}`} className="font-semibold text-gray-900 dark:text-white text-sm mb-2 hover:text-primary transition-colors line-clamp-2">{product.name}</Link>
                        <div className="mt-auto pt-2 flex items-center justify-between">
                            <div>
                                <span className="font-bold text-primary">Rs{product.price.toLocaleString()}</span>
                                {product.originalPrice && <span className="text-xs text-gray-400 line-through ml-2">Rs{product.originalPrice.toLocaleString()}</span>}
                            </div>
                        </div>
                    </div>
                </div>
             ))}
          </div>
          {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                  <span className="material-icons text-4xl text-gray-300 mb-2">search_off</span>
                  <p className="text-gray-500">No products found in this category.</p>
              </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;