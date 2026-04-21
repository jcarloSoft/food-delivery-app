import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../../models/product/Product';
import { COLORS } from '../../../core/theme/colors';
import { RADIUS, SPACING } from '../../../core/theme/spacing';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAdd?: () => void;
}

export default function ProductCard({
  product,
  onPress,
  onAdd,
}: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>⭐ {product.rating}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <Text style={styles.time}>🕒 {product.deliveryTime}</Text>

        <View style={styles.footer}>
          <Text style={styles.price}>S/ {product.price.toFixed(2)}</Text>

          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: 140,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  description: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    minHeight: 36,
  },
  time: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  footer: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
});
