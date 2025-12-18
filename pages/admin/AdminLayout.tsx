import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/src/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const isActive = (path: string) => location.pathname.includes(path);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Check admin role after auth state change
      if (session?.user) {
        setTimeout(() => {
          checkAdminRole(session.user.id);
        }, 0);
      } else {
        setIsAdmin(false);
        setCheckingRole(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setCheckingRole(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      
      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    } finally {
      setCheckingRole(false);
    }
  };

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#10b981' }}></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="text-center p-8 rounded-lg shadow-lg max-w-md" style={{ backgroundColor: '#ffffff' }}>
          <span className="material-icons text-6xl mb-4" style={{ color: '#f59e0b' }}>lock</span>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>Authentication Required</h2>
          <p className="mb-6" style={{ color: '#6b7280' }}>
            You need to be logged in to access the admin panel. Please log in with an admin account.
          </p>
          <Link 
            to="/login" 
            className="inline-block px-6 py-3 rounded-lg font-bold transition-all"
            style={{ backgroundColor: '#10b981', color: '#ffffff' }}
          >
            Go to Login
          </Link>
          <div className="mt-4">
            <Link to="/" className="text-sm" style={{ color: '#6b7280' }}>
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="text-center p-8 rounded-lg shadow-lg max-w-md" style={{ backgroundColor: '#ffffff' }}>
          <span className="material-icons text-6xl mb-4" style={{ color: '#ef4444' }}>block</span>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>Access Denied</h2>
          <p className="mb-6" style={{ color: '#6b7280' }}>
            You don't have admin privileges. Only authorized administrators can access the product management section.
          </p>
          <p className="text-sm mb-6" style={{ color: '#9ca3af' }}>
            Logged in as: {user.email}
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 rounded-lg font-bold transition-all"
            style={{ backgroundColor: '#10b981', color: '#ffffff' }}
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 font-sans">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
           <img src="/logo.png" alt="BloomEdge Enterprises" className="h-8 w-auto mr-2" />
           <span className="font-normal text-gray-400 text-sm">Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
           <Link to="/admin/dashboard" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/admin/dashboard') ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
               <span className="material-icons text-lg">dashboard</span> Dashboard
           </Link>
           <Link to="/admin/products" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/admin/products') ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
               <span className="material-icons text-lg">inventory_2</span> Product Management
           </Link>
           <Link to="/admin/categories" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/admin/categories') ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
               <span className="material-icons text-lg">category</span> Categories
           </Link>
           <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
             <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Shop Status</div>
             <div className="flex items-center gap-2 px-3 py-1">
                 <span className="h-2 w-2 rounded-full bg-green-500"></span>
                 <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Online</span>
             </div>
           </div>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div 
              className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: '#10b981', color: '#ffffff' }}
            >
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
              <p className="text-xs" style={{ color: '#10b981' }}>Admin</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-40">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Portal</h1>
            <div className="flex items-center gap-4">
                <Link to="/" className="text-sm text-gray-500 hover:text-primary">View Store</Link>
                <div 
                  className="h-8 w-8 rounded-full flex items-center justify-center font-bold"
                  style={{ backgroundColor: '#10b981', color: '#ffffff' }}
                >
                  {user.email?.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
        <div className="p-6">
             <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;