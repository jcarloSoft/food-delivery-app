import { useEffect, useState } from 'react';
import { CATEGORIES_MOCK } from '../../data/mock/categories.mock';
import { Product } from '../../models/product/Product';
import { productApiService } from '../../services/product/ProductApiService';

export const useHomeViewModel = () => {
  const [search, setSearch] = useState('');
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState('');

  const categories = CATEGORIES_MOCK;

  const loadPopularProducts = async () => {
    try {
      setLoadingProducts(true);
      setErrorProducts('');

      const products = await productApiService.getAll();
      setPopularProducts(products.slice(0, 4));
    } catch {
      setErrorProducts('No se pudieron cargar los productos populares');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadPopularProducts();
  }, []);

  return {
    search,
    setSearch,
    categories,
    popularProducts,
    loadingProducts,
    errorProducts,
    reloadPopularProducts: loadPopularProducts,
  };
};
