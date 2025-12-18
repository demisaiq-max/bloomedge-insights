import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStore } from '../context/StoreContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === id) || products[0];

  if (!product) return <div>Product not found</div>;

  // Get all images (use images array or fallback to single image)
  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
      ? [product.image] 
      : ['https://placehold.co/400x400/png?text=No+Image'];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
            <nav className="flex text-sm text-gray-500 dark:text-gray-400">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center"><Link to="/" className="hover:text-primary">Home</Link></li>
                    <li><span className="material-icons text-sm mx-1">chevron_right</span></li>
                    <li><Link to="/shop" className="hover:text-primary">Grocery</Link></li>
                    <li><span className="material-icons text-sm mx-1">chevron_right</span></li>
                    <li><span className="text-gray-900 dark:text-white font-medium truncate">{product.name}</span></li>
                </ol>
            </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Images */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center p-8 relative">
                        {product.isOrganic && <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Organic</span>}
                        
                        {/* Left Arrow */}
                        {allImages.length > 1 && (
                          <button
                            onClick={() => setSelectedImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
                          >
                            <span className="material-icons text-gray-600 dark:text-gray-300">chevron_left</span>
                          </button>
                        )}
                        
                        <img 
                          src={allImages[selectedImageIndex]} 
                          alt={product.name} 
                          className="w-full h-full object-contain" 
                        />
                        
                        {/* Right Arrow */}
                        {allImages.length > 1 && (
                          <button
                            onClick={() => setSelectedImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
                          >
                            <span className="material-icons text-gray-600 dark:text-gray-300">chevron_right</span>
                          </button>
                        )}
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    {allImages.length > 1 && (
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {allImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImageIndex === index 
                                ? 'border-primary ring-2 ring-primary/20' 
                                : 'border-gray-200 dark:border-gray-600 hover:border-primary/50'
                            }`}
                          >
                            <img 
                              src={img} 
                              alt={`${product.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                </div>

                {/* Info */}
                <div>
                    <h2 className="text-sm font-bold text-primary tracking-wide uppercase mb-2">BloomEdge Exclusive</h2>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
                    
                    <div className="flex items-center gap-4 text-sm mb-6">
                        <div className="flex text-yellow-400">
                            <span className="material-icons text-sm">star</span>
                            <span className="material-icons text-sm">star</span>
                            <span className="material-icons text-sm">star</span>
                            <span className="material-icons text-sm">star</span>
                            <span className="material-icons text-sm">star_half</span>
                        </div>
                        <span className="text-gray-500">({product.reviews || 0} Reviews)</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className={`font-medium ${product.stock && product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {product.stock && product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <div className="border-y border-gray-100 dark:border-gray-700 py-6 mb-6">
                        <div className="flex items-end gap-3 mb-4">
                        {product.salePrice && product.salePrice > 0 ? (
                          <>
                            <span className="text-3xl font-bold text-red-500">Rs. {product.salePrice.toLocaleString()}</span>
                            <span className="text-lg text-gray-400 line-through mb-1">Rs. {product.price.toLocaleString()}</span>
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-1">
                              {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                            </span>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">Rs. {product.price.toLocaleString()}</span>
                        )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                            {product.description || 'Premium quality product sourced directly from sustainable farms. Perfect for your daily needs.'}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg w-max bg-white dark:bg-gray-700">
                                <button 
                                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                  className="px-4 py-2 text-gray-600 hover:text-primary"
                                >
                                  <span className="material-icons text-sm">remove</span>
                                </button>
                                <span className="w-12 text-center font-semibold text-gray-800 dark:text-white">{quantity}</span>
                                <button 
                                  onClick={() => setQuantity(q => q + 1)}
                                  className="px-4 py-2 text-gray-600 hover:text-primary"
                                >
                                  <span className="material-icons text-sm">add</span>
                                </button>
                            </div>
                            <button 
                              onClick={handleAddToCart}
                              className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all hover:-translate-y-0.5"
                            >
                                <span className="material-icons">shopping_bag</span> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;