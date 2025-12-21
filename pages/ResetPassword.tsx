import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/src/integrations/supabase/client';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user came from a password reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      }
      setCheckingSession(false);
    };

    // Listen for auth state changes (when user clicks the reset link)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsValidSession(true);
        setCheckingSession(false);
      }
    });

    checkSession();

    return () => subscription.unsubscribe();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!password.trim()) {
      setError('Please enter a new password');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // Sign out the user after password reset so they can login fresh
      await supabase.auth.signOut();
    }
    setLoading(false);
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Verifying your reset link...</p>
        </div>
      </div>
    );
  }

  if (!isValidSession && !success) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900">
        <div className="hidden md:flex md:w-1/2 bg-gray-100 relative overflow-hidden items-center justify-center">
          <img src="/images/auth-hero.jpg" alt="Premium Products" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white text-center p-12">
            <img src="/logo.png" alt="BloomEdge" className="h-16 mx-auto mb-6 brightness-0 invert" />
            <p className="text-xl font-light">Quality products delivered to your doorstep.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8 text-center">
            <img src="/logo.png" alt="BloomEdge" className="h-12 mx-auto mb-6" />
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-8 rounded-md">
              <span className="material-icons text-4xl mb-3 block">warning</span>
              <h3 className="font-semibold text-xl mb-2">Invalid or Expired Link</h3>
              <p className="text-sm mb-4">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link 
                to="/forgot-password" 
                className="inline-block px-6 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-green-700 transition-colors"
              >
                Request New Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Reset Password</h2>
            <p className="text-gray-500">Enter your new password below.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-md text-center">
              <img src="/logo.png" alt="BloomEdge" className="h-12 mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-2">Password Reset Successful!</h3>
              <p className="text-sm mb-4">
                Your password has been updated successfully. You can now login with your new password.
              </p>
              <Link 
                to="/login" 
                className="inline-block px-6 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-green-700 transition-colors"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">New Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><span className="material-icons text-sm">lock</span></span>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary sm:text-sm" 
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Confirm New Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><span className="material-icons text-sm">lock_reset</span></span>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••" 
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
                {loading ? 'Updating Password...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
