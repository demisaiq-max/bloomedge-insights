export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isOrganic?: boolean;
  lowStock?: boolean;
  outOfStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}