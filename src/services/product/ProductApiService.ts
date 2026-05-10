import { apiClient } from '../api/ApiClient';
import { Product } from '../../models/product/Product';

type ProductApiResponse = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  preparationTime: number;
  category: string;
  active: boolean;
};

const mapProductFromApi = (item: ProductApiResponse): Product => ({
  id: String(item.id),
  name: item.name,
  description: item.description,
  price: Number(item.price),
  rating: item.rating,
  deliveryTime: `${item.preparationTime} min`,
  category: item.category,
  image: item.imageUrl,
  extras: [],
});

class ProductApiService {
  async getAll(): Promise<Product[]> {
    const products = await apiClient.get<ProductApiResponse[]>('/products');
    return products.map(mapProductFromApi);
  }
}

export const productApiService = new ProductApiService();
