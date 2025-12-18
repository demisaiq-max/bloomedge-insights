import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Order, CartItem } from '../types';
import { supabase } from '../src/integrations/supabase/client';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  cart: CartItem[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  stats: {
    totalSales: number;
    totalOrders: number;
    visitors: number;
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [loading, setLoading] = useState(true);

  // Save cart whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  // Calculate cart totals (use sale price if available)
  const cartTotal = cart.reduce((sum, item) => sum + ((item.salePrice ?? item.price) * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate stats from real data
  const stats = {
    totalSales: orders.reduce((sum, order) => sum + Number(order.total), 0),
    totalOrders: orders.length,
    visitors: 0,
  };

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Fetch products from database
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
      return;
    }
    
    const mappedProducts: Product[] = (data || []).map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: Number(p.price),
      salePrice: (p as unknown as { sale_price?: number | null }).sale_price ? Number((p as unknown as { sale_price?: number | null }).sale_price) : null,
      image: p.image,
      images: (p as unknown as { images?: string[] }).images || [],
      isNew: p.is_new ?? false,
      isOrganic: p.is_organic ?? false,
      isBestseller: (p as unknown as { is_bestseller?: boolean }).is_bestseller ?? false,
      isNewArrival: (p as unknown as { is_new_arrival?: boolean }).is_new_arrival ?? false,
      stock: p.stock,
      description: p.description,
    }));
    
    setProducts(mappedProducts);
  };

  // Fetch categories from database
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }
    
    setCategories(data || []);
  };

  // Fetch orders from database with item counts
  const fetchOrders = async () => {
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*, order_items(count)')
      .order('created_at', { ascending: false });
    
    if (ordersError) {
      console.error('Error fetching orders:', ordersError);
      return;
    }
    
    const mappedOrders: Order[] = (ordersData || []).map(o => ({
      id: o.id,
      user_id: o.user_id,
      total: Number(o.total),
      status: o.status,
      shipping_address: o.shipping_address,
      created_at: o.created_at,
      items: o.order_items?.[0]?.count || 0,
    }));
    
    setOrders(mappedOrders);
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories(), fetchOrders()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Real-time subscriptions
  useEffect(() => {
    const productsChannel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    const categoriesChannel = supabase
      .channel('categories-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        () => {
          fetchCategories();
        }
      )
      .subscribe();

    const ordersChannel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(productsChannel);
      supabase.removeChannel(categoriesChannel);
      supabase.removeChannel(ordersChannel);
    };
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const { error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        category: product.category,
        price: product.price,
        sale_price: product.salePrice || null,
        image: product.image,
        images: product.images || [],
        description: product.description,
        is_new: product.isNew ?? false,
        is_organic: product.isOrganic ?? false,
        is_bestseller: product.isBestseller ?? false,
        is_new_arrival: product.isNewArrival ?? false,
        stock: product.stock ?? 0,
      });
    
    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    const updateData: Record<string, unknown> = {};
    
    if (updatedProduct.name !== undefined) updateData.name = updatedProduct.name;
    if (updatedProduct.category !== undefined) updateData.category = updatedProduct.category;
    if (updatedProduct.price !== undefined) updateData.price = updatedProduct.price;
    if (updatedProduct.salePrice !== undefined) updateData.sale_price = updatedProduct.salePrice || null;
    if (updatedProduct.image !== undefined) updateData.image = updatedProduct.image;
    if (updatedProduct.images !== undefined) updateData.images = updatedProduct.images;
    if (updatedProduct.description !== undefined) updateData.description = updatedProduct.description;
    if (updatedProduct.isNew !== undefined) updateData.is_new = updatedProduct.isNew;
    if (updatedProduct.isOrganic !== undefined) updateData.is_organic = updatedProduct.isOrganic;
    if (updatedProduct.isBestseller !== undefined) updateData.is_bestseller = updatedProduct.isBestseller;
    if (updatedProduct.isNewArrival !== undefined) updateData.is_new_arrival = updatedProduct.isNewArrival;
    if (updatedProduct.stock !== undefined) updateData.stock = updatedProduct.stock;

    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const addCategory = async (category: Omit<Category, 'id'>) => {
    const { error } = await supabase
      .from('categories')
      .insert({
        name: category.name,
        slug: category.slug,
        image: category.image,
      });
    
    if (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  return (
    <StoreContext.Provider value={{ 
      products, 
      categories, 
      orders,
      cart,
      loading,
      addProduct, 
      updateProduct, 
      deleteProduct,
      addCategory,
      deleteCategory,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartItemCount,
      stats
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
