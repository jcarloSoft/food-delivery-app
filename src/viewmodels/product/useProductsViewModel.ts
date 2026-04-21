import { useMemo, useState } from 'react';
import { productService } from '../../services/product/ProductService';

const TABS = ['Todos', 'Hamburguesas', 'Pizza', 'Sushi', 'Saludable'];

export const useProductsViewModel = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = TABS;

  const products = useMemo(() => {
    return productService.searchProducts(search, selectedCategory);
  }, [search, selectedCategory]);

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    products,
  };
};
