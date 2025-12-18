-- Add is_bestseller and is_new_arrival columns to products table
ALTER TABLE public.products 
ADD COLUMN is_bestseller boolean DEFAULT false,
ADD COLUMN is_new_arrival boolean DEFAULT false;