import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // In a real app we'd fetch based on ID. Here we default to the "Oats" product if ID matches, or just the first one if not found, 
  // but strictly looking at the design, let's just show the Oats details for the demo purpose if ID=1, or generically otherwise.
  
  // Specific mock data for the Oats page to match Screenshot 2 perfectly
  const product = products.find(p => p.id === Number(id)) || products[0];
  const isOats = product.id === 1;

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
                    <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center p-8 relative">
                        {product.isOrganic && <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Organic</span>}
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <button className="aspect-square rounded-lg border-2 border-primary p-1 bg-white"><img src={product.image} className="w-full h-full object-contain" alt="thumb" /></button>
                        <button className="aspect-square rounded-lg border border-gray-200 p-1 bg-white hover:border-gray-400"><img src={products[1].image} className="w-full h-full object-contain" alt="thumb" /></button>
                        <button className="aspect-square rounded-lg border border-gray-200 p-1 bg-white hover:border-gray-400"><img src={products[2].image} className="w-full h-full object-contain" alt="thumb" /></button>
                        <button className="aspect-square rounded-lg border border-gray-200 p-1 bg-white hover:border-gray-400 flex items-center justify-center text-gray-400"><span className="material-icons">play_circle_outline</span></button>
                    </div>
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
                        <span className="text-gray-500">({product.reviews || 128} Reviews)</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-green-500 font-medium">In Stock</span>
                    </div>

                    <div className="border-y border-gray-100 dark:border-gray-700 py-6 mb-6">
                        <div className="flex items-end gap-3 mb-4">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                            {product.originalPrice && <span className="text-lg text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>}
                            {product.originalPrice && <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded mb-1">-17%</span>}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                            Premium quality organic whole grain rolled oats sourced directly from sustainable farms. Perfect for a hearty breakfast, baking cookies, or adding texture to your favorite smoothies. Gluten-free and rich in fiber.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Size</label>
                            <div className="flex flex-wrap gap-3">
                                <button className="px-4 py-2 rounded border border-gray-200 dark:border-gray-600 hover:border-primary text-sm font-medium">500g</button>
                                <button className="px-4 py-2 rounded border-2 border-primary bg-blue-50 dark:bg-blue-900/20 text-primary text-sm font-bold">1kg</button>
                                <button className="px-4 py-2 rounded border border-gray-200 dark:border-gray-600 hover:border-primary text-sm font-medium">2.5kg</button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg w-max bg-white dark:bg-gray-700">
                                <button className="px-4 py-2 text-gray-600 hover:text-primary"><span className="material-icons text-sm">remove</span></button>
                                <span className="w-12 text-center font-semibold text-gray-800 dark:text-white">1</span>
                                <button className="px-4 py-2 text-gray-600 hover:text-primary"><span className="material-icons text-sm">add</span></button>
                            </div>
                            <Link to="/cart" className="flex-1 bg-primary hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex justify-center items-center gap-2 transition-transform transform hover:-translate-y-0.5">
                                <span className="material-icons">shopping_bag</span> Add to Cart
                            </Link>
                            <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <span className="material-icons text-gray-500">favorite_border</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-gray-500">
                         <div className="flex items-center gap-2"><span className="material-icons text-green-500 text-lg">local_shipping</span> Delivery by <span className="font-bold text-gray-700 dark:text-gray-300">Nov 24</span></div>
                         <div className="flex items-center gap-2"><span className="material-icons text-green-500 text-lg">verified_user</span> 2 Year Warranty</div>
                         <div className="flex items-center gap-2"><span className="material-icons text-green-500 text-lg">eco</span> 100% Organic Certified</div>
                         <div className="flex items-center gap-2"><span className="material-icons text-green-500 text-lg">refresh</span> 30 Day Returns</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
            <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                    <li className="mr-2"><button className="inline-block p-4 border-b-2 border-primary text-primary active">Description</button></li>
                    <li className="mr-2"><button className="inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300">Nutritional Info</button></li>
                    <li className="mr-2"><button className="inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300">Reviews (128)</button></li>
                </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
                <h3 className="font-display text-xl font-bold mb-4 text-gray-900 dark:text-white">Product Details</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Our Organic Whole Grain Rolled Oats are harvested from the finest fields. Milled to perfection, offering a chewy texture and nutty flavor.</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li><strong>High in Fiber:</strong> Supports digestive health.</li>
                    <li><strong>Heart Healthy:</strong> Contains beta-glucan.</li>
                    <li><strong>Versatile:</strong> Ideal for porridge, granola, cookies.</li>
                </ul>
            </div>
        </div>

        {/* Related */}
        <div className="mt-16 mb-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white uppercase">You May Also Like</h2>
                <Link to="/shop" className="text-primary hover:text-green-700 font-medium text-sm flex items-center">View All <span className="material-icons text-sm ml-1">arrow_forward</span></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[products[1], products[2], products[6], products[3]].map((p, i) => (
                    p && (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all p-4 border border-gray-100 group">
                         <div className="relative h-40 mb-4 bg-gray-50 dark:bg-gray-700/50 rounded flex items-center justify-center">
                             <img src={p.image} className="h-32 object-contain group-hover:scale-110 transition-transform" alt={p.name} />
                         </div>
                         <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm mb-1 truncate">{p.name}</h3>
                         <p className="text-xs text-gray-500 uppercase mb-3">{p.category}</p>
                         <div className="flex justify-between items-center">
                             <span className="font-bold text-lg text-primary">${p.price.toFixed(2)}</span>
                             <button className="text-primary bg-blue-50 p-1 rounded hover:bg-primary hover:text-white transition-colors"><span className="material-icons">add</span></button>
                         </div>
                    </div>
                    )
                ))}
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;