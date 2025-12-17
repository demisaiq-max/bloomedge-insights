import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data';

const Checkout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
                 <span className="material-icons text-primary text-3xl">eco</span>
                 <span className="font-display font-bold text-2xl text-gray-900 dark:text-white">BloomEdge</span>
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
                        <span className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link></span>
                    </div>
                    <div className="space-y-4">
                        <input type="email" placeholder="Email address" className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" />
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
                             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                         </div>
                         <div className="sm:col-span-3">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last name</label>
                             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                         </div>
                         <div className="sm:col-span-6">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                         </div>
                         <div className="sm:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                         </div>
                         <div className="sm:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State / Province</label>
                             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                         </div>
                         <div className="sm:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Postal code</label>
                             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                         </div>
                         <div className="sm:col-span-6">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                             <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                         </div>
                     </div>
                </div>

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
                             <span className="font-semibold text-gray-900 dark:text-white">$2.50</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end gap-4 mt-8">
                    <Link to="/cart" className="text-blue-500 hover:text-blue-700 font-medium text-sm flex items-center">Return to Cart</Link>
                    <button className="bg-primary hover:bg-green-600 text-white px-6 py-3 rounded font-semibold shadow-md">Continue to Payment</button>
                </div>
             </section>

             {/* Order Summary Sidebar */}
             <section className="lg:col-span-5 mt-10 lg:mt-0">
                 <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
                     <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                     <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                         {[products[1], products[7], products[5]].map((p, i) => (
                             <li key={i} className="flex py-6">
                                 <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white p-1">
                                     <img src={p.image} className="h-full w-full object-contain" alt={p.name} />
                                 </div>
                                 <div className="ml-4 flex flex-1 flex-col">
                                     <div className="flex justify-between text-base font-medium">
                                         <h3>{p.name}</h3>
                                         <p className="ml-4">${p.price.toFixed(2)}</p>
                                     </div>
                                     <p className="mt-1 text-sm text-gray-500">{p.category}</p>
                                     <div className="flex flex-1 items-end justify-between text-sm">
                                         <p className="text-gray-500">Qty 1</p>
                                     </div>
                                 </div>
                             </li>
                         ))}
                     </ul>
                     <div className="border-t border-gray-200 mt-6 pt-6">
                        <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white pt-4">
                            <p>Total</p>
                            <p className="text-2xl text-primary">$84.00</p>
                        </div>
                     </div>
                 </div>
             </section>
         </div>
      </main>
      
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
              <p>&copy; 2023 BloomEdge Enterprises. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default Checkout;