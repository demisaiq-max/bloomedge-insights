import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans">
       <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between h-16">
                   <div className="flex items-center">
                       <Link to="/" className="flex items-center gap-2">
                           <span className="material-icons text-primary text-3xl">eco</span>
                           <span className="font-bold text-xl text-gray-900 dark:text-white">BloomEdge</span>
                       </Link>
                   </div>
                   <div className="flex items-center space-x-4">
                       <Link to="/shop" className="text-sm font-medium text-gray-500 hover:text-gray-900">Shop</Link>
                       <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">Login</Link>
                       <span className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary">Sign Up</span>
                   </div>
               </div>
           </div>
       </nav>

       <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
           {/* Background Blurs */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
               <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl"></div>
               <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-3xl"></div>
           </div>

           <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-10">
               <div className="text-center">
                   <div className="mx-auto h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                       <span className="material-icons text-primary text-2xl">person_add</span>
                   </div>
                   <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h2>
                   <p className="mt-2 text-sm text-gray-600">Join BloomEdge for fresh produce delivered daily.</p>
               </div>
               
               <form className="mt-8 space-y-6">
                   <div className="space-y-4">
                       <div>
                           <label className="block text-sm font-medium text-gray-700">Full Name</label>
                           <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="material-icons text-gray-400 text-sm">badge</span></div>
                                <input type="text" placeholder="John Doe" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm" />
                           </div>
                       </div>
                       <div>
                           <label className="block text-sm font-medium text-gray-700">Email address</label>
                           <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="material-icons text-gray-400 text-sm">email</span></div>
                                <input type="email" placeholder="john@example.com" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm" />
                           </div>
                       </div>
                       <div>
                           <label className="block text-sm font-medium text-gray-700">Password</label>
                           <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="material-icons text-gray-400 text-sm">lock</span></div>
                                <input type="password" placeholder="••••••••" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm" />
                           </div>
                           <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                       </div>
                       <div>
                           <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                           <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="material-icons text-gray-400 text-sm">lock_reset</span></div>
                                <input type="password" placeholder="••••••••" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm" />
                           </div>
                       </div>
                   </div>

                   <div className="flex items-center">
                       <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                       <label className="ml-2 block text-sm text-gray-900">I agree to the <a href="#" className="text-primary font-medium">Terms</a> and <a href="#" className="text-primary font-medium">Privacy Policy</a></label>
                   </div>

                   <button type="button" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/30">
                       Create Account
                   </button>
               </form>
               
               <div className="mt-6 text-center">
                   <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="font-medium text-primary hover:text-green-600">Log in</Link></p>
               </div>
           </div>
       </main>
    </div>
  );
};

export default Signup;