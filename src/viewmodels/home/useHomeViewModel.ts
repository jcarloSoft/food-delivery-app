import { useMemo, useState } from 'react';
import { CATEGORIES_MOCK } from '../../data/mock/categories.mock';
import { productService } from '../../services/product/ProductService';

export const useHomeViewModel = () => {
  const [search, setSearch] = useState('');

  const categories = CATEGORIES_MOCK;
  const popularProducts = useMemo(() => productService.getPopular(), []);

  return {
    search,
    setSearch,
    categories,
    popularProducts,
  };
};
