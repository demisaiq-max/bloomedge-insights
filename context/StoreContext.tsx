import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Order } from '../types';
import { products as initialProducts } from '../data';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  stats: {
    totalSales: number;
    totalOrders: number;
    visitors: number;
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  // Initialize categories based on data + some defaults
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Dairy', slug: 'dairy', description: 'Fresh milk, cheese, and yogurt' },
    { id: '2', name: 'Pantry', slug: 'pantry', description: 'Staples like rice, pasta, and grains' },
    { id: '3', name: 'Vegetables', slug: 'vegetables', description: 'Farm fresh vegetables' },
    { id: '4', name: 'Organic', slug: 'organic', description: 'Certified organic products' },
    { id: '5', name: 'Yogurt', slug: 'yogurt', description: 'Probiotic rich yogurts' },
    { id: '6', name: 'Sale', slug: 'sale', description: 'Discounted items' },
    { id: '7', name: 'Beverages', slug: 'beverages', description: 'Juices, water, and sodas' },
    { id: '8', name: 'Bakery', slug: 'bakery', description: 'Fresh bread and pastries' },
    { id: '9', name: 'Snacks', slug: 'snacks', description: 'Chips, nuts, and crackers' },
    { id: '10', name: 'Meat', slug: 'meat', description: 'Fresh cuts of meat' },
    { id: '11', name: 'Seafood', slug: 'seafood', description: 'Sustainably sourced seafood' },
    { id: '12', name: 'Frozen', slug: 'frozen', description: 'Frozen meals and veggies' },
    { id: '13', name: 'Household', slug: 'household', description: 'Cleaning and home supplies' },
    { id: '14', name: 'Personal Care', slug: 'personal-care', description: 'Soaps, shampoos, and lotions' },
  ]);

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

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { ...product, id: newId }]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setCategories([...categories, { ...category, id: newId }]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <StoreContext.Provider value={{ 
      products, 
      categories, 
      orders, 
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