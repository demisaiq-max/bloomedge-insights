import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900">
        {/* Image Side */}
        <div className="hidden md:flex md:w-1/2 bg-gray-100 relative overflow-hidden items-center justify-center">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6r3PwRTbHd9wdcP6y5Jjme8Cx6KbTTqVR3CLDYU7PY9Uv8h_YP4NV2iGP3mzzsb3A01mrcQGws9nfv4ZPviPOoJwAZDcMXJUb1KJieGmtdfWp6nPKAk6lY0IEOrJxEEs-oZumHLyApJfX9AiXSjVrcTMrgPb-su4_X78PtijVbEyfFnCDgW2YKnMfESPN0Y1iNsUhasvROe9_DKsoE_T4M6dJ6ChjQhiSQHMUrSjUq9eMnxTpSqZvvg7kvcCbqWKsYi7O6JywthP5" alt="Fresh Produce" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 text-white text-center p-12">
                <h1 className="text-5xl font-display font-bold mb-4">BLOOMEDGE</h1>
                <p className="text-xl font-light">Freshness delivered to your doorstep.</p>
            </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Login</h2>
                    <p className="text-gray-500">Please enter your credentials to access your account.</p>
                </div>
                
                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Email or Username</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><span className="material-icons text-sm">email</span></span>
                                <input type="email" placeholder="name@example.com" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                        </div>
                        <div>
                             <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Password</label>
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><span className="material-icons text-sm">lock</span></span>
                                <input type="password" placeholder="••••••••" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                         <label className="flex items-center">
                             <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                             <span className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Remember me</span>
                         </label>
                         <div className="text-sm">
                             <a href="#" className="font-medium text-primary hover:text-green-500">Forgot password?</a>
                         </div>
                    </div>

                    <button type="button" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-widest rounded-md text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Sign In
                    </button>
                </form>
                
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span></div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                         <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Google</button>
                         <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Facebook</button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Don't have an account? <Link to="/signup" className="font-bold text-primary hover:text-green-500 uppercase text-xs tracking-wider ml-1">Create an account</Link></p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;