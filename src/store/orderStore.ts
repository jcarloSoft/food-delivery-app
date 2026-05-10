import { create } from 'zustand';
import { OrderType } from '../models/order/OrderType';
import { PaymentMethod } from '../models/order/PaymentMethod';

interface OrderStore {
  orderType: OrderType | null;
  paymentMethod: PaymentMethod | null;
  customerName: string;
  customerPhone: string;
  notes: string;

  setOrderType: (type: OrderType) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
  setNotes: (notes: string) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderStore>(set => ({
  orderType: null,
  paymentMethod: null,
  customerName: '',
  customerPhone: '',
  notes: '',

  setOrderType: type => set({ orderType: type }),
  setPaymentMethod: method => set({ paymentMethod: method }),
  setCustomerName: name => set({ customerName: name }),
  setCustomerPhone: phone => set({ customerPhone: phone }),
  setNotes: notes => set({ notes }),
  clearOrder: () =>
    set({
      orderType: null,
      paymentMethod: null,
      customerName: '',
      customerPhone: '',
      notes: '',
    }),
}));
