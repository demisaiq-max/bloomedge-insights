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
  const [loading, setLoading] = useState(true);

  const [orders] = useState<Order[]>([
    { id: '#ORD-7782', customer: 'Alice Freeman', date: 'Oct 24, 2023', total: 125.50, status: 'Pending', items: 4 },
    { id: '#ORD-7781', customer: 'Martin Smith', date: 'Oct 24, 2023', total: 45.00, status: 'Shipped', items: 2 },
    { id: '#ORD-7780', customer: 'Jessica Doe', date: 'Oct 23, 2023', total: 230.20, status: 'Delivered', items: 8 },
    { id: '#ORD-7779', customer: 'Ryan Bolt', date: 'Oct 23, 2023', total: 15.75, status: 'Cancelled', items: 1 },
    { id: '#ORD-7778', customer: 'Sarah Connor', date: 'Oct 22, 2023', total: 89.99, status: 'Delivered', items: 3 },
  ]);

  const stats = {
    totalSales: 15430.50,
    totalOrders: 1245,
    visitors: 8503,
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

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories()]);
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

    return () => {
      supabase.removeChannel(productsChannel);
      supabase.removeChannel(categoriesChannel);
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
