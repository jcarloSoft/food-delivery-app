export interface ProductExtra {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  deliveryTime: string;
  category: string;
  image: string;
  extras?: ProductExtra[];
}
