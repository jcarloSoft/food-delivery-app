import { useCartStore } from '../../store/cartStore';

export const useOrderTrackingViewModel = () => {
  const items = useCartStore(state => state.items);
  const total = useCartStore(state => state.getTotal());

  const steps = [
    {
      id: '1',
      title: 'Pedido confirmado',
      description: 'Completado',
      status: 'completed',
      icon: '✓',
    },
    {
      id: '2',
      title: 'Preparando',
      description: 'Estamos preparando tu pedido',
      status: 'current',
      icon: '⏱',
    },
    {
      id: '3',
      title: 'Listo',
      description: 'Tu pedido estará listo pronto',
      status: 'pending',
      icon: '📦',
    },
    {
      id: '4',
      title: 'Entregado',
      description: 'Pendiente',
      status: 'pending',
      icon: '✓',
    },
  ] as const;

  const deliveryPerson = {
    name: 'Juan Martínez',
    vehicle: 'En una moto Honda',
    rating: 4.9,
    initials: 'JM',
  };

  return {
    orderNumber: 'OR-2024-001',
    statusTitle: '¡Pedido confirmado!',
    statusMessage: 'Tu pedido está siendo preparado con cariño',
    estimatedTime: '20-25 min',
    steps,
    deliveryPerson,
    items,
    total,
  };
};
