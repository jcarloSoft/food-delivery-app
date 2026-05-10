import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../core/navigation/routeTypes';
import { COLORS } from '../../../core/theme/colors';
import { RADIUS, SPACING } from '../../../core/theme/spacing';
import AppButton from '../../components/common/AppButton';
import { useCheckoutViewModel } from '../../../viewmodels/order/useCheckoutViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

export default function CheckoutScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const {
    items,
    total,
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
    isPhoneValid,
    canConfirmOrder,
  } = useCheckoutViewModel();

  const handleConfirm = () => {
    if (items.length === 0) {
      Alert.alert(
        'Carrito vacío',
        'Agrega productos antes de confirmar el pedido.',
      );
      navigation.navigate('Products');
      return;
    }

    const valid = validateCheckout();

    if (!valid) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OrderTracking');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Finalizar pedido</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.orderTypeBox}>
          <Text style={styles.orderTypeIcon}>📦</Text>
          <View>
            <Text style={styles.smallLabel}>Tipo de pedido</Text>
            <Text style={styles.orderTypeText}>{getOrderTypeLabel()}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos del cliente</Text>

          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            value={customerName}
            onChangeText={setCustomerName}
            placeholder="Ej: Juan Hilario"
            placeholderTextColor={COLORS.textLight}
            style={styles.input}
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            value={customerPhone}
            onChangeText={setCustomerPhone}
            placeholder="Ej: 910838645"
            placeholderTextColor={COLORS.textLight}
            keyboardType="phone-pad"
            maxLength={9}
            style={[
              styles.input,
              customerPhone.length > 0 && !isPhoneValid && styles.inputError,
            ]}
          />

          {customerPhone.length > 0 && !isPhoneValid ? (
            <Text style={styles.errorText}>
              El teléfono debe tener 9 dígitos
            </Text>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Método de pago</Text>

          <View style={styles.paymentRow}>
            {paymentMethods.map(method => {
              const selected = paymentMethod === method.id;

              return (
                <TouchableOpacity
                  key={method.id}
                  activeOpacity={0.85}
                  style={[
                    styles.paymentCard,
                    selected && styles.paymentCardSelected,
                  ]}
                  onPress={() => setPaymentMethod(method.id)}
                >
                  <View
                    style={[
                      styles.paymentIcon,
                      { backgroundColor: method.color },
                    ]}
                  >
                    <Text style={styles.paymentIconText}>{method.icon}</Text>
                  </View>

                  <Text style={styles.paymentText}>{method.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notas adicionales</Text>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Instrucciones especiales para tu pedido..."
            placeholderTextColor={COLORS.textLight}
            multiline
            textAlignVertical="top"
            style={styles.notesInput}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumen del pedido</Text>

          {items.map(item => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {item.quantity}x {item.name}
              </Text>
              <Text style={styles.summaryValue}>
                S/ {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total a pagar</Text>
            <Text style={styles.totalValue}>S/ {total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <AppButton
          title={
            loading
              ? 'Procesando pedido...'
              : `Confirmar pedido - S/ ${total.toFixed(2)}`
          }
          onPress={handleConfirm}
          disabled={!canConfirmOrder || loading}
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
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: 130,
  },
  orderTypeBox: {
    backgroundColor: COLORS.primarySoft,
    borderColor: '#FFD0BF',
    borderWidth: 1,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  orderTypeIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  smallLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  orderTypeText: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 2,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    height: 54,
    borderRadius: RADIUS.lg,
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentCard: {
    width: '31%',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  paymentCardSelected: {
    borderColor: COLORS.primary,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  paymentIconText: {
    fontSize: 22,
  },
  paymentText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
  },
  notesInput: {
    height: 100,
    borderRadius: RADIUS.lg,
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  summaryLabel: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textSecondary,
    marginRight: SPACING.md,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
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
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 26,
    fontWeight: '900',
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
  inputError: {
    borderColor: COLORS.danger,
    backgroundColor: '#FFF5F5',
  },

  errorText: {
    marginTop: -SPACING.md,
    marginBottom: SPACING.md,
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: '700',
  },
});
