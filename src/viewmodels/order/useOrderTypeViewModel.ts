import { useOrderStore } from '../../store/orderStore';
import { OrderType } from '../../models/order/OrderType';

export const useOrderTypeViewModel = () => {
  const selectedOrderType = useOrderStore(state => state.orderType);
  const setOrderType = useOrderStore(state => state.setOrderType);

  const options = [
    {
      id: 'LOCAL' as OrderType,
      title: 'Comer en local',
      description: 'Disfruta tu comida en nuestro restaurante',
      badge: 'Inmediato',
      icon: '🍽️',
      backgroundColor: '#EEF5FF',
    },
    {
      id: 'PICKUP' as OrderType,
      title: 'Recojo',
      description: 'Recoge tu pedido en el restaurante',
      badge: '15-20 min',
      icon: '📦',
      backgroundColor: '#EFFFF4',
    },
    {
      id: 'DELIVERY' as OrderType,
      title: 'Delivery',
      description: 'Te lo llevamos a tu dirección',
      badge: '30-40 min',
      secondBadge: 'Envío gratis',
      icon: '🚴',
      backgroundColor: '#FFF7EA',
    },
  ];

  return {
    options,
    selectedOrderType,
    setOrderType,
  };
};
