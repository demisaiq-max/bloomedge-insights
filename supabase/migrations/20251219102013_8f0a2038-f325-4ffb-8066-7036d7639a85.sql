-- Add admin policies for orders table
CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Admins can update orders" 
ON public.orders 
FOR UPDATE 
USING (is_admin());

CREATE POLICY "Admins can delete orders" 
ON public.orders 
FOR DELETE 
USING (is_admin());

-- Add admin policies for order_items table so admins can see order details
CREATE POLICY "Admins can view all order items" 
ON public.order_items 
FOR SELECT 
USING (is_admin());

-- Add customer details columns to orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS customer_name TEXT,
ADD COLUMN IF NOT EXISTS customer_email TEXT,
ADD COLUMN IF NOT EXISTS customer_phone TEXT,
ADD COLUMN IF NOT EXISTS customer_city TEXT;