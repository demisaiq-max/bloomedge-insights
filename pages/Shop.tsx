import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Shop: React.FC = () => {
  const { products, categories: storeCategories, addToCart } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const urlCategory = searchParams.get('category');
  const urlFilter = searchParams.get('filter');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory || 'All');
  const [selectedFilter, setSelectedFilter] = useState<string>(urlFilter || '');
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>('default');
  
  // Sync with URL params
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
      setSelectedFilter('');
    } else if (urlFilter) {
      setSelectedCategory('All');
      setSelectedFilter(urlFilter);
    }
  }, [urlCategory, urlFilter]);
  
  // Use categories from context
  const categories = ['All', ...storeCategories.map(c => c.name)];
  
  const getCount = (cat: string) => cat === 'All' ? products.length : products.filter(p => p.category === cat).length;

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    
    // Apply special filters
    if (selectedFilter === 'sale') {
      result = result.filter(p => p.salePrice && p.salePrice > 0);
    } else if (selectedFilter === 'organic') {
      result = result.filter(p => p.isOrganic);
    } else if (selectedCategory !== 'All') {
      // Filter by category
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Filter by price (use sale price if available)
    result = result.filter(p => {
      const effectivePrice = p.salePrice || p.price;
      return effectivePrice <= priceRange;
    });
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      default:
        break;
    }
    
    return result;
  }, [products, selectedCategory, selectedFilter, priceRange, sortBy]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedFilter('');
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    searchParams.delete('filter');
    setSearchParams(searchParams);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setSelectedCategory('All');
    searchParams.delete('category');
    if (filter) {
      searchParams.set('filter', filter);
    } else {
      searchParams.delete('filter');
    }
    setSearchParams(searchParams);
  };

  const getPageTitle = () => {
    if (selectedFilter === 'sale') return 'Sale Items';
    if (selectedFilter === 'organic') return 'Organic Products';
    return selectedCategory;
  };

  const saleProductsCount = products.filter(p => p.salePrice && p.salePrice > 0).length;
  const organicProductsCount = products.filter(p => p.isOrganic).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <h2 className="text-xl font-display font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">Categories</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-sm max-h-96 overflow-y-auto">
              {categories.map(cat => (
                <li key={cat}>
                    <button 
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full text-left block px-4 py-3 transition-colors flex justify-between items-center ${selectedCategory === cat && !selectedFilter ? 'font-semibold text-primary bg-green-50 dark:bg-green-900/20 border-l-4 border-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        {cat} <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat && !selectedFilter ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}`}>{getCount(cat)}</span>
                    </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Filters */}
          <h2 className="text-xl font-display font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">Special</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              <li>
                <button 
                    onClick={() => handleFilterSelect('sale')}
                    className={`w-full text-left block px-4 py-3 transition-colors flex justify-between items-center ${selectedFilter === 'sale' ? 'font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                    <span className="flex items-center gap-2">
                      <span className="material-icons text-sm text-red-500">local_offer</span>
                      Sale Items
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${selectedFilter === 'sale' ? 'bg-red-500 text-white' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300'}`}>{saleProductsCount}</span>
                </button>
              </li>
              <li>
                <button 
                    onClick={() => handleFilterSelect('organic')}
                    className={`w-full text-left block px-4 py-3 transition-colors flex justify-between items-center ${selectedFilter === 'organic' ? 'font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                    <span className="flex items-center gap-2">
                      <span className="material-icons text-sm text-green-600">eco</span>
                      Organic
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${selectedFilter === 'organic' ? 'bg-green-600 text-white' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300'}`}>{organicProductsCount}</span>
                </button>
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-display font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">Filter By Price</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
             <input 
               type="range" 
               min="0" 
               max="10000" 
               value={priceRange}
               onChange={(e) => setPriceRange(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
             />
             <div className="flex justify-between text-xs text-gray-500 mt-2">
                 <span>Rs. 0</span>
                 <span className="font-semibold text-primary">Rs. {priceRange.toLocaleString()}{priceRange >= 10000 ? '+' : ''}</span>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
             <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white uppercase">{getPageTitle()}</h1>
                <p className="text-sm text-gray-500">Showing {filteredAndSortedProducts.length} results</p>
             </div>
             <select 
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
               className="mt-2 sm:mt-0 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 cursor-pointer"
             >
                 <option value="default">Default sorting</option>
                 <option value="price-low">Price: Low to High</option>
                 <option value="price-high">Price: High to Low</option>
             </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredAndSortedProducts.map((product) => {
               const isOnSale = product.salePrice && product.salePrice > 0;
               const displayPrice = isOnSale ? product.salePrice : product.price;
               const discount = isOnSale ? Math.round(((product.price - product.salePrice!) / product.price) * 100) : 0;
               
               return (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col group">
                    <Link to={`/product/${product.id}`} className="relative h-48 bg-white p-4 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
                        <img src={product.images?.[0] || product.image || ''} alt={product.name} className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {isOnSale && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              -{discount}% OFF
                            </span>
                          )}
                          {product.isOrganic && (
                            <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">ORGANIC</span>
                          )}
                          {(product.stock ?? 0) <= 10 && (product.stock ?? 0) > 0 && !isOnSale && (
                            <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">LOW STOCK</span>
                          )}
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm text-gray-400 hover:text-primary hover:bg-green-50 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <span className="material-icons text-sm">add_shopping_cart</span>
                        </button>
                    </Link>
                    <div className="p-4 flex flex-col flex-grow">
                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">{product.category}</p>
                        <Link to={`/product/${product.id}`} className="font-semibold text-gray-900 dark:text-white text-sm mb-2 hover:text-primary transition-colors line-clamp-2">{product.name}</Link>
                        <div className="mt-auto pt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className={`font-bold ${isOnSale ? 'text-red-500' : 'text-primary'}`}>
                                  Rs. {displayPrice?.toLocaleString()}
                                </span>
                                {isOnSale && (
                                  <span className="text-xs text-gray-400 line-through">
                                    Rs. {product.price.toLocaleString()}
                                  </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
               );
             })}
          </div>
          {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                  <span className="material-icons text-4xl text-gray-300 mb-2">search_off</span>
                  <p className="text-gray-500">No products found matching your filters.</p>
              </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;