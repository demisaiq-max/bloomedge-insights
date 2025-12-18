-- Add RLS policies for products table (INSERT, UPDATE, DELETE for authenticated users)
CREATE POLICY "Authenticated users can insert products" 
ON public.products 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" 
ON public.products 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete products" 
ON public.products 
FOR DELETE 
TO authenticated
USING (true);

-- Add RLS policies for categories table (INSERT, UPDATE, DELETE for authenticated users)
CREATE POLICY "Authenticated users can insert categories" 
ON public.categories 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories" 
ON public.categories 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete categories" 
ON public.categories 
FOR DELETE 
TO authenticated
USING (true);

-- Enable realtime for products and categories
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;