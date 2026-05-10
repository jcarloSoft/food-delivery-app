import { Alert } from 'react-native';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { PaymentMethod } from '../../models/order/PaymentMethod';

export const useCheckoutViewModel = () => {
  const items = useCartStore(state => state.items);
  const total = useCartStore(state => state.getTotal());

  const orderType = useOrderStore(state => state.orderType);
  const paymentMethod = useOrderStore(state => state.paymentMethod);
  const customerName = useOrderStore(state => state.customerName);
  const customerPhone = useOrderStore(state => state.customerPhone);
  const notes = useOrderStore(state => state.notes);

  const setPaymentMethod = useOrderStore(state => state.setPaymentMethod);
  const setCustomerName = useOrderStore(state => state.setCustomerName);
  const setCustomerPhone = useOrderStore(state => state.setCustomerPhone);
  const setNotes = useOrderStore(state => state.setNotes);

  const paymentMethods = [
    {
      id: 'YAPE' as PaymentMethod,
      title: 'Yape',
      icon: '📱',
      color: '#A855F7',
    },
    {
      id: 'CARD' as PaymentMethod,
      title: 'Tarjeta',
      icon: '💳',
      color: '#3B82F6',
    },
    {
      id: 'CASH' as PaymentMethod,
      title: 'Efectivo',
      icon: '💵',
      color: '#22C55E',
    },
  ];

  const getOrderTypeLabel = () => {
    if (orderType === 'LOCAL') return 'Comer en local';
    if (orderType === 'PICKUP') return 'Recojo';
    if (orderType === 'DELIVERY') return 'Delivery';
    return 'No seleccionado';
  };

  const validateCheckout = () => {
    if (!customerName.trim()) {
      Alert.alert('Dato requerido', 'Ingresa el nombre completo.');
      return false;
    }

    if (!customerPhone.trim()) {
      Alert.alert('Dato requerido', 'Ingresa el teléfono.');
      return false;
    }

    if (!paymentMethod) {
      Alert.alert('Dato requerido', 'Selecciona un método de pago.');
      return false;
    }

    return true;
  };

  const isPhoneValid = customerPhone.trim().length >= 9;

  const canConfirmOrder =
    customerName.trim().length > 2 &&
    isPhoneValid &&
    !!paymentMethod &&
    items.length > 0;

  return {
    canConfirmOrder,
    isPhoneValid,
    items,
    total,
    orderType,
    paymentMethod,
    customerName,
    customerPhone,
    notes,
    paymentMethods,
    getOrderTypeLabel,
    setPaymentMethod,
    setCustomerName,
    setCustomerPhone,
    setNotes,
    validateCheckout,
  };
};
