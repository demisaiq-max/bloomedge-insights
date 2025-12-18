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
  customer: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: number;
}
