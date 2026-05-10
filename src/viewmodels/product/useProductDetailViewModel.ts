import { useMemo, useState } from 'react';
import { ProductExtra } from '../../models/product/Product';
import { productService } from '../../services/product/ProductService';

export const useProductDetailViewModel = (productId: string) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([]);

  const product = useMemo(() => productService.getById(productId), [productId]);

  const toggleExtra = (extra: ProductExtra) => {
    setSelectedExtras(prev => {
      const exists = prev.some(item => item.id === extra.id);

      if (exists) {
        return prev.filter(item => item.id !== extra.id);
      }

      return [...prev, extra];
    });
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const extrasTotal = useMemo(() => {
    return selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  }, [selectedExtras]);

  const unitTotal = useMemo(() => {
    return (product?.price ?? 0) + extrasTotal;
  }, [product, extrasTotal]);

  const finalTotal = useMemo(() => {
    return unitTotal * quantity;
  }, [unitTotal, quantity]);

  return {
    product,
    quantity,
    selectedExtras,
    toggleExtra,
    increaseQuantity,
    decreaseQuantity,
    extrasTotal,
    unitTotal,
    finalTotal,
  };
};
