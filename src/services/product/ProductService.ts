import { PRODUCTS_MOCK } from '../../data/mock/products.mock';
import { Product } from '../../models/product/Product';

class ProductService {
  getAll(): Product[] {
    return PRODUCTS_MOCK;
  }

  getPopular(): Product[] {
    return PRODUCTS_MOCK.slice(0, 4);
  }

  getByCategory(category: string): Product[] {
    if (category === 'Todos') {
      return PRODUCTS_MOCK;
    }

    return PRODUCTS_MOCK.filter(product => product.category === category);
  }

  searchProducts(query: string, category: string = 'Todos'): Product[] {
    const baseProducts = this.getByCategory(category);

    if (!query.trim()) {
      return baseProducts;
    }

    const normalizedQuery = query.toLowerCase();

    return baseProducts.filter(
      product =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery),
    );
  }

  getById(id: string): Product | undefined {
    return PRODUCTS_MOCK.find(product => product.id === id);
  }
}

export const productService = new ProductService();
