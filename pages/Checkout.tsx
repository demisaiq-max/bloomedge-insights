import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { supabase } from '@/src/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Calculate shipping and tax from cart items (same logic as Cart)
  const totalShipping = cart.reduce((sum, item) => sum + ((item.shippingCost ?? 0) * item.quantity), 0);
  const totalTax = cart.reduce((sum, item) => {
    const itemPrice = (item.salePrice ?? item.price) * item.quantity;
    const taxAmount = itemPrice * ((item.taxPercentage ?? 0) / 100);
    return sum + taxAmount;
  }, 0);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) {
        setEmail(session.user.email);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) {
        setEmail(session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const total = cartTotal + totalShipping + totalTax;

  const handlePlaceOrder = async () => {
    // Validate required fields
    if (!firstName || !lastName || !address || !city || !phone) {
      alert('Please fill in all required fields');
      return;
    }

    if (!user) {
      alert('Please log in to place an order');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order
      const fullAddress = `${address}, ${city}, ${state} ${postalCode}`;
      const customerName = `${firstName} ${lastName}`;

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: total,
          status: 'pending',
          shipping_address: fullAddress,
          customer_name: customerName,
          customer_email: email,
          customer_phone: phone,
          customer_city: city,
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.salePrice ?? item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      // Clear cart and show success
      clearCart();
      setOrderSuccess(true);

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
          <span className="material-icons text-6xl text-green-500 mb-4">check_circle</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Thank you for your order. We will process it shortly.</p>
          <Link 
            to="/shop" 
            className="inline-block bg-primary hover:bg-green-600 text-white px-6 py-3 rounded font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <Link to="/shop" className="text-primary hover:underline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center">
                 <img src="/logo.png" alt="BloomEdge Enterprises" className="h-10 w-auto" />
            </Link>
            <div className="flex items-center text-primary text-sm font-semibold">
                <span className="material-icons text-sm mr-1">lock</span> Secure Checkout
            </div>
         </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
         <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
             {/* Form Section */}
             <section className="lg:col-span-7">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Contact Information</h2>
                        {!user && (
                          <span className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link></span>
                        )}
                    </div>
                    <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address" 
                            className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary py-2 px-3 border" 
                            readOnly={!!user}
                          />
                          {user && <p className="text-xs text-gray-500 mt-1">Logged in as {user.email}</p>}
                        </div>
                        <label className="flex items-center">
                            <input type="checkbox" className="text-primary focus:ring-primary rounded" />
                            <span className="ml-2 text-sm text-gray-500">Keep me up to date on news and exclusive offers</span>
                        </label>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
                     <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                     <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                         <div className="sm:col-span-3">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First name</label>
                             <input 
                               type="text" 
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" 
                             />
                         </div>
                         <div className="sm:col-span-3">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last name</label>
                             <input 
                               type="text" 
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" 
                             />
                         </div>
                         <div className="sm:col-span-6">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                             <input 
                               type="text" 
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" 
                             />
                         </div>
                         <div className="sm:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                             <input 
                               type="text" 
                               value={city}
                               onChange={(e) => setCity(e.target.value)}
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" 
                             />
                         </div>
                         <div className="sm:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State / Province</label>
                             <input 
                               type="text" 
                               value={state}
                               onChange={(e) => setState(e.target.value)}
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" 
                             />
                         </div>
                         <div className="sm:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Postal code</label>
                             <input 
                               type="text" 
                               value={postalCode}
                               onChange={(e) => setPostalCode(e.target.value)}
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" 
                             />
                         </div>
                         <div className="sm:col-span-6">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                             <input 
                               type="tel" 
                               value={phone}
                               onChange={(e) => setPhone(e.target.value)}
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border" 
                             />
                         </div>
                     </div>
                </div>

                {totalShipping > 0 && (
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
                      <h2 className="text-xl font-bold mb-6">Shipping Method</h2>
                      <div className="space-y-4">
                          <div className="relative flex items-center justify-between border border-primary bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 cursor-pointer">
                               <div className="flex items-center">
                                   <input type="radio" name="shipping" className="h-4 w-4 text-primary focus:ring-primary" defaultChecked />
                                   <div className="ml-3 text-sm">
                                       <span className="block font-medium text-gray-900 dark:text-white">Standard Shipping</span>
                                       <span className="block text-gray-500">3-5 business days</span>
                                   </div>
                               </div>
                               <span className="font-semibold text-gray-900 dark:text-white">Rs. {totalShipping.toLocaleString()}</span>
                          </div>
                      </div>
                  </div>
                )}
                
                <div className="flex justify-end gap-4 mt-8">
                    <Link to="/cart" className="text-blue-500 hover:text-blue-700 font-medium text-sm flex items-center">Return to Cart</Link>
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-green-600 text-white px-6 py-3 rounded font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                </div>
             </section>

             {/* Order Summary Sidebar */}
             <section className="lg:col-span-5 mt-10 lg:mt-0">
                 <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
                     <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                     <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                         {cart.map((item) => {
                           const displayPrice = item.salePrice ?? item.price;
                           return (
                             <li key={item.id} className="flex py-6">
                                 <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white p-1">
                                     <img src={item.images?.[0] || item.image || ''} className="h-full w-full object-contain" alt={item.name} />
                                 </div>
                                 <div className="ml-4 flex flex-1 flex-col">
                                     <div className="flex justify-between text-base font-medium">
                                         <h3>{item.name}</h3>
                                         <p className="ml-4">Rs. {(displayPrice * item.quantity).toLocaleString()}</p>
                                     </div>
                                     <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                     <div className="flex flex-1 items-end justify-between text-sm">
                                         <p className="text-gray-500">Qty {item.quantity}</p>
                                         {item.salePrice && (
                                           <p className="text-xs text-gray-400 line-through">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                         )}
                                     </div>
                                 </div>
                             </li>
                           );
                         })}
                     </ul>
                     <div className="border-t border-gray-200 mt-6 pt-6 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <p>Subtotal</p>
                            <p>Rs. {cartTotal.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <p>Shipping</p>
                            {totalShipping > 0 ? (
                              <p>Rs. {totalShipping.toLocaleString()}</p>
                            ) : (
                              <p className="text-green-500 font-medium">Free</p>
                            )}
                        </div>
                        {totalTax > 0 && (
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                              <p>Tax</p>
                              <p>Rs. {totalTax.toLocaleString()}</p>
                          </div>
                        )}
                        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-200">
                            <p>Total</p>
                            <p className="text-2xl text-primary">Rs. {total.toLocaleString()}</p>
                        </div>
                     </div>
                 </div>
             </section>
         </div>
      </main>
      
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
              <p>&copy; 2024 BloomEdge Enterprises. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default Checkout;
