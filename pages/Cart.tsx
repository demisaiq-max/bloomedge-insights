import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data';

const Cart: React.FC = () => {
  // Mock cart items
  const cartItems = [
      { product: products[1], quantity: 2 },
      { product: products[2], quantity: 4 },
      { product: products[4], quantity: 1 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const total = subtotal + 0.80; // Tax

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <nav className="flex mb-8 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
        </nav>

        <h2 className="text-3xl font-display font-bold mb-8 text-gray-900 dark:text-white">Your Cart ({cartItems.length} Items)</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 text-sm font-semibold text-gray-600 uppercase">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                    </div>
                    
                    {cartItems.map((item, idx) => (
                        <div key={idx} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                                <div className="w-full md:col-span-6 flex items-center gap-4">
                                    <div className="h-20 w-20 flex-shrink-0 bg-white border border-gray-200 rounded p-2">
                                        <img src={item.product.image} className="w-full h-full object-contain" alt={item.product.name} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500">{item.product.category}</p>
                                        <button className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 mt-1 md:hidden"><span className="material-icons text-sm">delete</span> Remove</button>
                                    </div>
                                </div>
                                <div className="w-full md:col-span-2 flex justify-between md:justify-center items-center">
                                    <span className="md:hidden text-sm text-gray-500">Price:</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">${item.product.price.toFixed(2)}</span>
                                </div>
                                <div className="w-full md:col-span-2 flex justify-between md:justify-center items-center">
                                    <span className="md:hidden text-sm text-gray-500">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded bg-white">
                                        <button className="px-2 py-1 hover:bg-gray-100">-</button>
                                        <input type="text" value={item.quantity} className="w-10 text-center border-none p-1 text-sm focus:ring-0" readOnly />
                                        <button className="px-2 py-1 hover:bg-gray-100">+</button>
                                    </div>
                                </div>
                                <div className="w-full md:col-span-2 flex justify-between md:justify-end items-center gap-4">
                                    <span className="md:hidden text-sm text-gray-500">Total:</span>
                                    <span className="font-bold text-gray-900 dark:text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                                    <button className="hidden md:block text-gray-400 hover:text-red-500"><span className="material-icons">close</span></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <Link to="/shop" className="inline-flex items-center text-primary hover:text-green-700 font-medium">
                        <span className="material-icons text-sm mr-2">arrow_back</span> Continue Shopping
                    </Link>
                </div>
            </div>

            {/* Summary */}
            <div className="lg:w-1/3 w-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span> <span className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Shipping</span> <span className="font-medium text-green-500">Free</span></div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax (Est.)</span> <span className="font-medium text-gray-900 dark:text-white">$0.80</span></div>
                        <div className="pt-4 pb-2">
                             <label className="block text-xs font-medium text-gray-500 mb-1">Have a coupon?</label>
                             <div className="flex gap-2">
                                 <input type="text" placeholder="Enter code" className="w-full rounded border-gray-300 text-sm focus:ring-primary focus:border-primary" />
                                 <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium">Apply</button>
                             </div>
                        </div>
                        <div className="border-t border-gray-200 my-4"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <Link to="/checkout" className="w-full mt-8 bg-primary hover:bg-green-600 text-white font-bold py-3 px-4 rounded shadow-lg flex justify-center items-center gap-2 transition-transform hover:-translate-y-0.5">
                        <span>Proceed to Checkout</span> <span className="material-icons text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;