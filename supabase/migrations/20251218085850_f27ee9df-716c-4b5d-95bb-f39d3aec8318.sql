-- Add shipping_cost and tax_percentage columns to products
ALTER TABLE public.products 
ADD COLUMN shipping_cost numeric DEFAULT 0,
ADD COLUMN tax_percentage numeric DEFAULT 0;