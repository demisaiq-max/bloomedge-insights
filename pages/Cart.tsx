import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStore } from '../context/StoreContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, cartItemCount } = useStore();
  
  const tax = cartTotal * 0.05; // 5% tax
  const total = cartTotal + tax;

  const handleIncrement = (productId: string, currentQuantity: number) => {
    updateCartQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateCartQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <nav className="flex mb-8 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-medium">Shopping Cart</span>
        </nav>

        <h2 className="text-3xl font-display font-bold mb-8 text-gray-900 dark:text-white">Your Cart ({cartItemCount} Items)</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                    </div>
                    
                    {cart.map((item) => (
                        <div key={item.id} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                                <div className="w-full md:col-span-6 flex items-center gap-4">
                                    <div className="h-20 w-20 flex-shrink-0 bg-white border border-gray-200 rounded p-2">
                                        <img src={item.image || ''} className="w-full h-full object-contain" alt={item.name} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>
                                </div>
                                <div className="w-full md:col-span-2 flex justify-between md:justify-center items-center">
                                    <span className="md:hidden text-sm text-gray-500">Price:</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Rs{item.price.toLocaleString()}</span>
                                </div>
                                <div className="w-full md:col-span-2 flex justify-between md:justify-center items-center">
                                    <span className="md:hidden text-sm text-gray-500">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700">
                                        <button 
                                          onClick={() => handleDecrement(item.id, item.quantity)}
                                          className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                                        >
                                          -
                                        </button>
                                        <span className="w-10 text-center py-1 text-sm text-gray-900 dark:text-white font-medium">{item.quantity}</span>
                                        <button 
                                          onClick={() => handleIncrement(item.id, item.quantity)}
                                          className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                                        >
                                          +
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full md:col-span-2 flex justify-between md:justify-end items-center gap-4">
                                    <span className="md:hidden text-sm text-gray-500">Total:</span>
                                    <span className="font-bold text-gray-900 dark:text-white">Rs{(item.price * item.quantity).toLocaleString()}</span>
                                    <button 
                                      onClick={() => removeFromCart(item.id)}
                                      className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                      <span className="material-icons">close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {cart.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            <span className="material-icons text-4xl mb-2">shopping_cart</span>
                            <p>Your cart is empty.</p>
                            <Link to="/shop" className="text-primary hover:underline mt-2 inline-block">Continue Shopping</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary */}
            <div className="lg:w-1/3 w-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>Subtotal</span> 
                          <span className="font-medium text-gray-900 dark:text-white">Rs{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>Shipping</span> 
                          <span className="font-medium text-green-500">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>Tax (Est.)</span> 
                          <span className="font-medium text-gray-900 dark:text-white">Rs{tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                            <span className="text-2xl font-bold text-primary">Rs{total.toFixed(2)}</span>
                        </div>
                    </div>
                    {cart.length > 0 ? (
                      <Link to="/checkout" className="w-full mt-8 bg-primary hover:bg-green-600 text-white font-bold py-3 px-4 rounded shadow-lg flex justify-center items-center gap-2 transition-transform hover:-translate-y-0.5">
                          <span>Proceed to Checkout</span> <span className="material-icons text-sm">arrow_forward</span>
                      </Link>
                    ) : (
                      <button disabled className="w-full mt-8 bg-gray-300 text-gray-500 font-bold py-3 px-4 rounded cursor-not-allowed">
                          <span>Cart is Empty</span>
                      </button>
                    )}
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;