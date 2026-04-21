import { ProductExtra } from '../product/Product';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  deliveryTime: string;
  extras: ProductExtra[];
}
