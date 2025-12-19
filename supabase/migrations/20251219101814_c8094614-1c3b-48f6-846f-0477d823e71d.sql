-- Add SELECT policy to restrict newsletter subscriber access to admins only
CREATE POLICY "Only admins can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (is_admin());