import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import brandCallebaut from '@/src/assets/brand-callebaut.jpeg';
import brandAmbrosi from '@/src/assets/brand-ambrosi.jpeg';
import brandAmh from '@/src/assets/brand-amh.jpeg';
import brandFarmersChoice from '@/src/assets/brand-farmers-choice.jpeg';
import brandMidfield from '@/src/assets/brand-midfield.jpeg';
import brandBeefCity from '@/src/assets/brand-beef-city.jpeg';
import brandBoursin from '@/src/assets/brand-boursin.jpeg';
import brandBridel from '@/src/assets/brand-bridel.jpeg';
import brandElleVire from '@/src/assets/brand-elle-vire.jpeg';
import brandFletcher from '@/src/assets/brand-fletcher.jpeg';
import brandGermania from '@/src/assets/brand-germania.jpeg';
import brandIleDeFrance from '@/src/assets/brand-ile-de-france.jpeg';
import brandMargaretRiver from '@/src/assets/brand-margaret-river.jpeg';
import brandNorbest from '@/src/assets/brand-norbest.jpeg';
import brandTajima from '@/src/assets/brand-tajima.jpeg';
import brandPrestageFarms from '@/src/assets/brand-prestage-farms.jpeg';
import brandSoignon from '@/src/assets/brand-soignon.jpeg';
import brandPresident from '@/src/assets/brand-president.jpeg';
import brandSweetBLaban from '@/src/assets/brand-sweet-b-laban.png';
import brandAlmarai from '@/src/assets/brand-almarai.png';
import { supabase } from '../src/integrations/supabase/client';

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

  if (products.length === 0) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
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
          <p className="text-center text-gray-500 dark:text-gray-400">No products available in this section yet.</p>
        </div>
      </section>
    );
  }

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
                        <span className="font-bold text-gray-900 dark:text-white text-lg">Rs. {product.price.toLocaleString()}</span>
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
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Filter products based on flags - show default products if none flagged
  const flaggedBestsellers = products.filter(p => p.isBestseller);
  const flaggedNewArrivals = products.filter(p => p.isNewArrival);
  
  // If no products are flagged, show first 8 products as fallback
  const bestsellers = flaggedBestsellers.length > 0 ? flaggedBestsellers : products.slice(0, 8);
  const newArrivals = flaggedNewArrivals.length > 0 ? flaggedNewArrivals : products.slice(0, 8);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    
    // Validate email
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setSubscribeMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setSubscribing(true);
    setSubscribeMessage(null);

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: trimmedEmail });

    setSubscribing(false);

    if (error) {
      if (error.code === '23505') { // Unique violation
        setSubscribeMessage({ type: 'error', text: 'This email is already subscribed.' });
      } else {
        setSubscribeMessage({ type: 'error', text: 'Subscription failed. Please try again.' });
      }
    } else {
      setSubscribeMessage({ type: 'success', text: 'Thank you for subscribing!' });
      setEmail('');
    }
  };

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
            
             <div className="w-full max-w-4xl mx-auto">
                <Link to="/shop" className="block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/50 hover:scale-[1.01] transition-transform duration-300">
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <img src={brandCallebaut} alt="Callebaut" className="w-full h-16 object-contain" />
                    <img src={brandAmbrosi} alt="Ambrosi" className="w-full h-16 object-contain" />
                    <img src={brandAmh} alt="AMH" className="w-full h-16 object-contain" />
                    <img src={brandFarmersChoice} alt="Farmer's Choice" className="w-full h-16 object-contain" />
                    <img src={brandMidfield} alt="The Midfield Group" className="w-full h-16 object-contain" />
                    <img src={brandBeefCity} alt="Beef City Black" className="w-full h-16 object-contain" />
                    <img src={brandBoursin} alt="Boursin" className="w-full h-16 object-contain" />
                    <img src={brandBridel} alt="Bridel" className="w-full h-16 object-contain" />
                    <img src={brandElleVire} alt="Elle & Vire Professionnel" className="w-full h-16 object-contain" />
                    <img src={brandFletcher} alt="Fletcher" className="w-full h-16 object-contain" />
                    <img src={brandGermania} alt="Villa Germania" className="w-full h-16 object-contain" />
                    <img src={brandIleDeFrance} alt="Ile de France" className="w-full h-16 object-contain" />
                    <img src={brandMargaretRiver} alt="Margaret River Wagyu Beef" className="w-full h-16 object-contain" />
                    <img src={brandNorbest} alt="Norbest" className="w-full h-16 object-contain" />
                    <img src={brandTajima} alt="Tajima Australian Grainfed Wagyu" className="w-full h-16 object-contain" />
                    <img src={brandPrestageFarms} alt="Prestage Farms" className="w-full h-16 object-contain" />
                    <img src={brandSoignon} alt="Soignon" className="w-full h-16 object-contain" />
                    <img src={brandPresident} alt="Président" className="w-full h-16 object-contain" />
                    <img src={brandSweetBLaban} alt="Sweet B. Laban" className="w-full h-16 object-contain" />
                    <img src={brandAlmarai} alt="Almarai" className="w-full h-16 object-contain" />
                  </div>
                </Link>
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
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:outline-none"
                  style={{ backgroundColor: '#ffffff', color: '#1f2937' }}
                  disabled={subscribing}
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {subscribeMessage && (
                <p className={`mt-4 text-sm font-medium ${subscribeMessage.type === 'success' ? 'text-white' : 'text-yellow-200'}`}>
                  {subscribeMessage.text}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <a 
        href="https://wa.me/923454617510" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform flex items-center gap-2 pr-6 group"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="font-bold text-sm hidden group-hover:block transition-all">WhatsApp Us</span>
      </a>
    </div>
  );
};

export default Home;