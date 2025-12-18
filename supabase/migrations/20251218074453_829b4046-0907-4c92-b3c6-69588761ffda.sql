-- Add sale_price column to products table
ALTER TABLE public.products ADD COLUMN sale_price numeric DEFAULT NULL;