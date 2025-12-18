import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Order } from '../types';
import { supabase } from '@/src/integrations/supabase/client';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  stats: {
    totalSales: number;
    totalOrders: number;
    visitors: number;
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate stats from real data
  const stats = {
    totalSales: orders.reduce((sum, order) => sum + Number(order.total), 0),
    totalOrders: orders.length,
    visitors: 0, // Would need analytics for real visitor count
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
      image: p.image,
      isNew: p.is_new ?? false,
      isOrganic: p.is_organic ?? false,
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
        image: product.image,
        description: product.description,
        is_new: product.isNew ?? false,
        is_organic: product.isOrganic ?? false,
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
    if (updatedProduct.image !== undefined) updateData.image = updatedProduct.image;
    if (updatedProduct.description !== undefined) updateData.description = updatedProduct.description;
    if (updatedProduct.isNew !== undefined) updateData.is_new = updatedProduct.isNew;
    if (updatedProduct.isOrganic !== undefined) updateData.is_organic = updatedProduct.isOrganic;
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
      loading,
      addProduct, 
      updateProduct, 
      deleteProduct,
      addCategory,
      deleteCategory,
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
