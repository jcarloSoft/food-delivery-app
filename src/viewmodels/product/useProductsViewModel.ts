import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../models/product/Product';
import { productApiService } from '../../services/product/ProductApiService';

const TABS = [
  'Todos',
  'Hamburguesas',
  'Pizza',
  'Sushi',
  'Bebidas',
  'Postres',
  'Saludable',
];

export const useProductsViewModel = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = TABS;

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await productApiService.getAll();
      setAllProducts(data);
    } catch {
      setError('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const products = useMemo(() => {
    let base = allProducts;

    if (selectedCategory !== 'Todos') {
      base = base.filter(item => item.category === selectedCategory);
    }

    if (!search.trim()) return base;

    return base.filter(
      item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [allProducts, search, selectedCategory]);

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    products,
    loading,
    error,
    reloadProducts: loadProducts,
  };
};
