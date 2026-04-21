import { Product } from '../../models/product/Product';

export const PRODUCTS_MOCK: Product[] = [
  {
    id: '1',
    name: 'Hamburguesa Clásica',
    description: 'Carne 100% res, lechuga, tomate, queso cheddar',
    price: 18.9,
    rating: 4.8,
    deliveryTime: '15-20 min',
    category: 'Hamburguesas',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
    extras: [
      { id: 'e1', name: 'Queso extra', price: 3 },
      { id: 'e2', name: 'Tocino', price: 4 },
    ],
  },
  {
    id: '2',
    name: 'Hamburguesa BBQ',
    description: 'Doble carne, tocino ahumado, salsa BBQ',
    price: 24.9,
    rating: 4.9,
    deliveryTime: '20-25 min',
    category: 'Hamburguesas',
    image:
      'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1200&auto=format&fit=crop',
    extras: [
      { id: 'e3', name: 'Papas extra', price: 5 },
      { id: 'e4', name: 'Aros de cebolla', price: 6 },
    ],
  },
  {
    id: '3',
    name: 'Pizza Margherita',
    description: 'Salsa de tomate, mozzarella fresca y albahaca',
    price: 32,
    rating: 4.9,
    deliveryTime: '20-25 min',
    category: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1200&auto=format&fit=crop',
    extras: [
      { id: 'e5', name: 'Mozzarella extra', price: 4 },
      { id: 'e6', name: 'Aceitunas', price: 2.5 },
    ],
  },
  {
    id: '4',
    name: 'Pizza Pepperoni',
    description: 'Salsa de tomate, mozzarella y pepperoni',
    price: 36,
    rating: 4.8,
    deliveryTime: '20-25 min',
    category: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Sushi Mix',
    description: 'Selección de rolls frescos con salsa especial',
    price: 28.5,
    rating: 4.7,
    deliveryTime: '20-30 min',
    category: 'Sushi',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Ensalada Fresh',
    description: 'Mix de vegetales, palta, tomate cherry y aderezo',
    price: 16.5,
    rating: 4.6,
    deliveryTime: '10-15 min',
    category: 'Saludable',
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1200&auto=format&fit=crop',
  },
];
