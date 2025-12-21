import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/src/integrations/supabase/client';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    const redirectUrl = `${window.location.origin}/#/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectUrl,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900">
      {/* Image Side */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 relative overflow-hidden items-center justify-center">
        <img src="/images/auth-hero.jpg" alt="Premium Products" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-white text-center p-12">
          <img src="/logo.png" alt="BloomEdge" className="h-16 mx-auto mb-6 brightness-0 invert" />
          <p className="text-xl font-light">Quality products delivered to your doorstep.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <img src="/logo.png" alt="BloomEdge" className="h-12 mb-6 md:hidden mx-auto" />
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Forgot Password</h2>
            <p className="text-gray-500">Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-md text-center">
              <img src="/logo.png" alt="BloomEdge" className="h-12 mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-2">Check your inbox!</h3>
              <p className="text-sm mb-4">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your email and click the link to reset your password.
              </p>
              <p className="text-xs text-green-600 mb-4">
                Didn't receive the email? Check your spam folder.
              </p>
              <Link 
                to="/login" 
                className="inline-block px-6 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-green-700 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><span className="material-icons text-sm">email</span></span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com" 
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary sm:text-sm" 
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-widest rounded-md text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Remember your password? <Link to="/login" className="font-bold text-primary hover:text-green-500 uppercase text-xs tracking-wider ml-1">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
