import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

// Reusable Product Carousel Component
interface ProductCarouselProps {
  title: string;
  products: Product[];
  className?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, className = "" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering && scrollRef.current) {
        const { current } = scrollRef;
        // Check if we reached near the end
        if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 50) {
           current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
           // Scroll by width of one card (approx 300px + gap)
           current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 8000); // 8 seconds auto-scroll

    return () => clearInterval(interval);
  }, [isHovering]);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <section 
      className={`py-16 ${className}`} 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
    >
        <div className="container mx-auto px-4 relative group">
          <div className="relative flex items-center justify-center mb-12">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 text-sm uppercase tracking-widest font-semibold">
                {title}
              </span>
            </div>
          </div>

          <div className="relative -mx-4 px-4">
              {/* Left Arrow */}
              <button 
                onClick={() => scroll(-320)}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-full shadow-xl transition-all duration-300 transform ${isHovering ? 'opacity-100 translate-x-2' : 'opacity-0 -translate-x-full'}`}
                aria-label="Previous"
              >
                <span className="material-icons">chevron_left</span>
              </button>

              {/* Carousel Container */}
              <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
              >
                {products.map((product, idx) => (
                  <div key={`${product.id}-${idx}`} className="min-w-[280px] w-[280px] sm:w-[300px] flex-shrink-0 group/card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <Link to={`/product/${product.id}`} className="relative pt-[100%] block bg-white p-6">
                      <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-4 group-hover/card:scale-105 transition-transform duration-500" />
                      {/* Badges */}
                      {product.isNew && <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">NEW</span>}
                      {product.isOrganic && <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">ORGANIC</span>}
                    </Link>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate flex-1 pr-2" title={product.name}>{product.name}</h3>
                          <button className="text-gray-400 hover:text-primary transition-colors">
                              <span className="material-icons">add</span>
                          </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 dark:text-white text-lg">Rs{product.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={() => scroll(320)}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-full shadow-xl transition-all duration-300 transform ${isHovering ? 'opacity-100 -translate-x-2' : 'opacity-0 translate-x-full'}`}
                aria-label="Next"
              >
                <span className="material-icons">chevron_right</span>
              </button>
          </div>
        </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { products } = useStore();
  
  // Create derived lists safely
  const bestsellers = products.length > 0 ? [...products, ...products].slice(0, 10) : []; 
  const newArrivals = products.length > 0 ? [...products].reverse().slice(0, 10) : [];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white uppercase">
                We Source <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Premium</span> Goods<br/>
                Globally
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Over 2,700 imported food items from the world's most trusted brands delivered straight to your doorstep.
              </p>
              <div className="pt-4">
                <Link to="/shop" className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 font-semibold uppercase tracking-wider hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg">
                  Shop Now
                </Link>
              </div>
            </div>
            
             <div className="w-full max-w-2xl mx-auto">
                <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-white/50">
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-3 gap-6 items-center justify-items-center">
                            <Link to="/shop" className="w-full flex justify-center hover:scale-105 transition-transform duration-300">
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Almarai_logo.svg/1200px-Almarai_logo.svg.png" alt="Almarai" className="h-16 md:h-20 w-auto object-contain" />
                            </Link>
                            <Link to="/shop" className="w-full flex justify-center hover:scale-105 transition-transform duration-300">
                                <img src="https://placehold.co/400x200/ffffff/0055a5.png?text=LATBRI&font=montserrat" alt="Latbri" className="h-16 md:h-20 w-auto object-contain mix-blend-multiply dark:mix-blend-normal" />
                            </Link>
                            <Link to="/shop" className="w-full flex justify-center hover:scale-105 transition-transform duration-300">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Kraft_Heinz_Company_logo.svg/1200px-Kraft_Heinz_Company_logo.svg.png" alt="KraftHeinz" className="h-12 md:h-14 w-auto object-contain" />
                            </Link>
                        </div>
                        <div className="flex justify-center gap-12 md:gap-20 items-center">
                            <Link to="/shop" className="hover:scale-105 transition-transform duration-300">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Galbani_logo.svg/1200px-Galbani_logo.svg.png" alt="Galbani" className="h-16 md:h-20 w-auto object-contain" />
                            </Link>
                            <Link to="/shop" className="hover:scale-105 transition-transform duration-300">
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Frico_logo.svg/1200px-Frico_logo.svg.png" onError={(e) => {(e.target as HTMLImageElement).src = "https://placehold.co/400x200/ffffff/e30613.png?text=Frico&font=playfair-display";}} alt="Frico" className="h-16 md:h-20 w-auto object-contain" />
                            </Link>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Bestsellers Carousel */}
      <ProductCarousel 
        title="Bestsellers" 
        products={bestsellers} 
        className="bg-white dark:bg-gray-900" 
      />

      {/* New Arrivals Carousel */}
      <ProductCarousel 
        title="New Arrivals" 
        products={newArrivals} 
        className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700" 
      />

      {/* Newsletter */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden" style={{ background: 'linear-gradient(to right, #22c55e, #3b82f6)' }}>
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Join the BloomEdge Family</h2>
              <p className="mb-8 max-w-xl mx-auto opacity-90">
                Subscribe to our newsletter for exclusive deals, new arrivals, and healthy living tips.
              </p>
              <form className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 border-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="button"
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <a href="#" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform flex items-center gap-2 pr-6 group">
        <span className="material-icons">chat</span>
        <span className="font-bold text-sm hidden group-hover:block transition-all">WhatsApp Us</span>
      </a>
    </div>
  );
};

export default Home;