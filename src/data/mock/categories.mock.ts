export interface CategoryItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

import { COLORS } from '../../core/theme/colors';

export const CATEGORIES_MOCK: CategoryItem[] = [
  { id: '1', name: 'Hamburguesas', emoji: '🍔', color: COLORS.categoryBeige },
  { id: '2', name: 'Pizza', emoji: '🍕', color: COLORS.categoryPink },
  { id: '3', name: 'Sushi', emoji: '🍣', color: COLORS.categoryLilac },
  { id: '4', name: 'Bebidas', emoji: '🥤', color: COLORS.categoryBlue },
  { id: '5', name: 'Postres', emoji: '🍰', color: COLORS.categoryPurple },
  { id: '6', name: 'Saludable', emoji: '🥗', color: COLORS.categoryGreen },
];
