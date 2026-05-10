import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../core/navigation/routeTypes';
import { COLORS } from '../../../core/theme/colors';
import { RADIUS, SPACING } from '../../../core/theme/spacing';
import AppButton from '../../components/common/AppButton';
import { useProductDetailViewModel } from '../../../viewmodels/product/useProductDetailViewModel';
import { useCartStore } from '../../../store/cartStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ navigation, route }: Props) {
  const { productId } = route.params;

  const {
    product,
    quantity,
    selectedExtras,
    toggleExtra,
    increaseQuantity,
    decreaseQuantity,
    finalTotal,
  } = useProductDetailViewModel(productId);

  const addToCart = useCartStore(state => state.addToCart);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Producto no encontrado</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedExtras, quantity);
    Alert.alert('Éxito', 'Producto agregado al carrito');
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.topButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.topButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>⭐ {product.rating}</Text>
            <Text style={styles.metaText}>🕒 {product.deliveryTime}</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {!!product.extras?.length && (
            <>
              <Text style={styles.sectionTitle}>Agrega extras</Text>

              {product.extras.map(extra => {
                const isSelected = selectedExtras.some(
                  item => item.id === extra.id,
                );

                return (
                  <TouchableOpacity
                    key={extra.id}
                    style={[
                      styles.extraCard,
                      isSelected && styles.extraCardSelected,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => toggleExtra(extra)}
                  >
                    <View>
                      <Text style={styles.extraName}>{extra.name}</Text>
                      <Text style={styles.extraPrice}>
                        +S/ {extra.price.toFixed(2)}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.checkCircle,
                        isSelected && styles.checkCircleSelected,
                      ]}
                    >
                      <Text style={styles.checkText}>
                        {isSelected ? '✓' : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </>
          )}

          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Cantidad</Text>

            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.qtyButtonSecondary}
                onPress={decreaseQuantity}
              >
                <Text style={styles.qtyButtonSecondaryText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                style={styles.qtyButtonPrimary}
                onPress={increaseQuantity}
              >
                <Text style={styles.qtyButtonPrimaryText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Precio base</Text>
              <Text style={styles.summaryValue}>
                S/ {product.price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Extras</Text>
              <Text style={styles.summaryValue}>
                S/{' '}
                {selectedExtras
                  .reduce((sum, extra) => sum + extra.price, 0)
                  .toFixed(2)}
              </Text>
            </View>

            <View style={[styles.summaryRow, styles.summaryTotalRow]}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>
                S/ {finalTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <AppButton
          title={`Agregar al carrito - S/ ${finalTotal.toFixed(2)}`}
          onPress={handleAddToCart}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtonText: {
    fontSize: 22,
    color: COLORS.text,
    fontWeight: '700',
  },
  spacer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: SPACING.xl,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
  },
  metaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  metaText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  description: {
    marginTop: SPACING.lg,
    fontSize: 18,
    color: COLORS.textSecondary,
    lineHeight: 30,
  },
  sectionTitle: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  extraCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  extraCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },
  extraName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  extraPrice: {
    marginTop: 4,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  checkCircleSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  quantitySection: {
    marginTop: SPACING.md,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 170,
  },
  qtyButtonSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonSecondaryText: {
    fontSize: 26,
    color: COLORS.text,
    fontWeight: '700',
  },
  qtyButtonPrimary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonPrimaryText: {
    fontSize: 26,
    color: COLORS.white,
    fontWeight: '700',
  },
  quantityText: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  summaryCard: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  summaryLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  summaryTotalRow: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginBottom: 0,
  },
  summaryTotalLabel: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  summaryTotalValue: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  backText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
