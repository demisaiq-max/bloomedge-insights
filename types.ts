export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string | null;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isOrganic?: boolean;
  stock?: number | null;
  description?: string | null;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

export interface Order {
  id: string;
  user_id: string | null;
  total: number;
  status: string;
  shipping_address: string | null;
  created_at: string;
  items?: number;
  customer?: string;
}
