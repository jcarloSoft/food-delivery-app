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
import { useCartStore } from '../../../store/cartStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
  const items = useCartStore(state => state.items);
  const increaseQuantity = useCartStore(state => state.increaseQuantity);
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);
  const subtotal = useCartStore(state => state.getSubtotal());
  const igv = useCartStore(state => state.getIgv());
  const total = useCartStore(state => state.getTotal());

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleContinue = () => {
    if (items.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos antes de continuar.');
      navigation.navigate('Products');
      return;
    }

    navigation.navigate('OrderType');
  };

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Eliminar producto',
      '¿Seguro que deseas eliminar este producto del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => removeFromCart(itemId),
        },
      ],
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Vaciar carrito',
      '¿Seguro que deseas eliminar todos los productos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Vaciar',
          style: 'destructive',
          onPress: clearCart,
        },
      ],
    );
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Carrito</Text>
            <Text style={styles.subtitle}>0 productos</Text>
          </View>
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>🛍️</Text>
          </View>

          <Text style={styles.emptyTitle}>Aún no agregaste productos</Text>
          <Text style={styles.emptyText}>
            Explora el menú y agrega tus platos favoritos para iniciar tu
            pedido.
          </Text>

          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.emptyButtonText}>Explorar productos</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Carrito</Text>
          <Text style={styles.subtitle}>
            {totalItems} productos en tu pedido
          </Text>
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
          <Text style={styles.clearButtonText}>Vaciar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {items.map(item => (
          <View key={item.id} style={styles.cartCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />

            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>
                {item.name}
              </Text>

              {item.extras.length > 0 ? (
                <Text style={styles.extrasText} numberOfLines={1}>
                  Extras: {item.extras.map(extra => extra.name).join(', ')}
                </Text>
              ) : (
                <Text style={styles.extrasText}>Sin extras</Text>
              )}

              <Text style={styles.productPrice}>
                S/ {(item.price * item.quantity).toFixed(2)}
              </Text>

              <Text style={styles.unitPrice}>
                S/ {item.price.toFixed(2)} c/u
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={[
                    styles.qtyButtonSecondary,
                    item.quantity === 1 && styles.qtyButtonDisabled,
                  ]}
                  disabled={item.quantity === 1}
                  onPress={() => decreaseQuantity(item.id)}
                >
                  <Text style={styles.qtySecondaryText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButtonPrimary}
                  onPress={() => increaseQuantity(item.id)}
                >
                  <Text style={styles.qtyPrimaryText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.continueShoppingText}>+ Seguir comprando</Text>
        </TouchableOpacity>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen del pedido</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>S/ {subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>IGV (18%)</Text>
            <Text style={styles.summaryValue}>S/ {igv.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.freeText}>Gratis</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>S/ {total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.promoCard}>
          <View style={styles.promoInfo}>
            <Text style={styles.promoTitle}>
              ¿Tienes un código promocional?
            </Text>
            <Text style={styles.promoText}>Aplícalo antes de continuar</Text>
          </View>

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <AppButton
          title={`Continuar pedido - S/ ${total.toFixed(2)}`}
          onPress={handleContinue}
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
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  backText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  clearButton: {
    marginLeft: 'auto',
    backgroundColor: '#FFF5F5',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  clearButtonText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '900',
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: 130,
  },
  cartCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  productImage: {
    width: 78,
    height: 78,
    borderRadius: RADIUS.lg,
  },
  productInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  productName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  extrasText: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  productPrice: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  unitPrice: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 90,
  },
  deleteText: {
    fontSize: 18,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButtonSecondary: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonDisabled: {
    opacity: 0.4,
  },
  qtySecondaryText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  qtyText: {
    width: 32,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  qtyButtonPrimary: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyPrimaryText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: -2,
  },
  continueShoppingButton: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: '#FFD0BF',
  },
  continueShoppingText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '900',
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.md,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  summaryLabel: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  freeText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.success,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
  },
  promoCard: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: '#FFD0BF',
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },
  promoText: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  applyButton: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  applyButtonText: {
    fontWeight: '800',
    color: COLORS.text,
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
  emptyIcon: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  emptyIconText: {
    fontSize: 54,
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: SPACING.sm,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
