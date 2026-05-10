import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../core/navigation/routeTypes';
import { COLORS } from '../../../core/theme/colors';
import { RADIUS, SPACING } from '../../../core/theme/spacing';
import { useOrderTrackingViewModel } from '../../../viewmodels/order/useOrderTrackingViewModel';
import { useCartStore } from '../../../store/cartStore';
import { useOrderStore } from '../../../store/orderStore';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderTracking'>;

export default function OrderTrackingScreen({ navigation }: Props) {
  const clearCart = useCartStore(state => state.clearCart);
  const clearOrder = useOrderStore(state => state.clearOrder);
  const {
    orderNumber,
    statusTitle,
    statusMessage,
    estimatedTime,
    steps,
    deliveryPerson,
    items,
    total,
  } = useOrderTrackingViewModel();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Seguimiento del pedido</Text>
          <Text style={styles.subtitle}>Pedido #{orderNumber}</Text>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            clearCart();
            clearOrder();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }}
        >
          <Text style={styles.homeIcon}>⌂</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successCard}>
          <View style={styles.successCircle}>
            <Text style={styles.successIcon}>✓</Text>
          </View>

          <Text style={styles.successTitle}>{statusTitle}</Text>
          <Text style={styles.successText}>{statusMessage}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estado del pedido</Text>

          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <View
                    style={[
                      styles.stepCircle,
                      step.status === 'completed' && styles.stepCircleCompleted,
                      step.status === 'current' && styles.stepCircleCurrent,
                      step.status === 'pending' && styles.stepCirclePending,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepIcon,
                        step.status === 'pending' && styles.stepIconPending,
                      ]}
                    >
                      {step.icon}
                    </Text>
                  </View>

                  {!isLast && (
                    <View
                      style={[
                        styles.stepLine,
                        step.status === 'completed'
                          ? styles.stepLineCompleted
                          : styles.stepLinePending,
                      ]}
                    />
                  )}
                </View>

                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      step.status === 'completed' && styles.stepTitleCompleted,
                      step.status === 'current' && styles.stepTitleCurrent,
                      step.status === 'pending' && styles.stepTitlePending,
                    ]}
                  >
                    {step.title}
                  </Text>

                  <Text
                    style={[
                      styles.stepDescription,
                      step.status === 'completed' &&
                        styles.stepDescriptionCompleted,
                      step.status === 'current' &&
                        styles.stepDescriptionCurrent,
                      step.status === 'pending' &&
                        styles.stepDescriptionPending,
                    ]}
                  >
                    {step.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.estimatedCard}>
          <View style={styles.estimatedIconBox}>
            <Text style={styles.estimatedIcon}>⏱</Text>
          </View>

          <View>
            <Text style={styles.estimatedLabel}>Tiempo estimado</Text>
            <Text style={styles.estimatedValue}>{estimatedTime}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu repartidor</Text>

          <View style={styles.deliveryRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{deliveryPerson.initials}</Text>
            </View>

            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryName}>{deliveryPerson.name}</Text>
              <Text style={styles.deliveryVehicle}>
                {deliveryPerson.vehicle}
              </Text>
              <Text style={styles.deliveryRating}>
                ★★★★★ {deliveryPerson.rating}
              </Text>
            </View>
          </View>

          <View style={styles.deliveryActions}>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => Alert.alert('Llamar', 'Funcionalidad demo')}
            >
              <Text style={styles.callButtonText}>☎ Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => Alert.alert('Mensaje', 'Funcionalidad demo')}
            >
              <Text style={styles.messageButtonText}>💬 Mensaje</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Productos</Text>

          {items.map(item => (
            <View key={item.id} style={styles.productRow}>
              <Text style={styles.productName}>
                {item.quantity}x {item.name}
              </Text>
              <Text style={styles.productPrice}>
                S/ {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>S/ {total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => Alert.alert('Ayuda', 'Luego conectaremos soporte.')}
        >
          <Text style={styles.helpText}>¿Necesitas ayuda con tu pedido?</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  homeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  successCard: {
    backgroundColor: '#ECFDF3',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  successCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  successIcon: {
    fontSize: 34,
    color: COLORS.white,
    fontWeight: '900',
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
  },
  successText: {
    marginTop: SPACING.sm,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
    textAlign: 'center',
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
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  stepRow: {
    flexDirection: 'row',
    minHeight: 88,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  stepCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIcon: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  },
  stepContent: {
    flex: 1,
    paddingTop: 6,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
  },
  stepTitleCompleted: {
    color: COLORS.primary,
  },
  stepDescription: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  stepDescriptionCompleted: {
    color: COLORS.success,
    fontWeight: '700',
  },
  estimatedCard: {
    backgroundColor: COLORS.primarySoft,
    borderColor: '#FFD0BF',
    borderWidth: 1,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  estimatedIconBox: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFE2D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  estimatedIcon: {
    fontSize: 28,
  },
  estimatedLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  estimatedValue: {
    marginTop: 2,
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FF8A1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryName: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
  },
  deliveryVehicle: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  deliveryRating: {
    marginTop: 6,
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: '700',
  },
  deliveryActions: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  callButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  callButtonText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 16,
  },
  messageButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  messageButtonText: {
    color: COLORS.primary,
    fontWeight: '900',
    fontSize: 16,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  productName: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textSecondary,
    marginRight: SPACING.md,
  },
  productPrice: {
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
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
  },
  helpButton: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  helpText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  stepCircleCompleted: {
    backgroundColor: COLORS.primary,
  },

  stepCircleCurrent: {
    backgroundColor: COLORS.warning,
  },

  stepCirclePending: {
    backgroundColor: '#E5E7EB',
  },

  stepIconPending: {
    color: COLORS.textSecondary,
  },

  stepLineCompleted: {
    backgroundColor: COLORS.primary,
  },

  stepLinePending: {
    backgroundColor: '#E5E7EB',
  },

  stepTitleCurrent: {
    color: COLORS.warning,
  },

  stepTitlePending: {
    color: COLORS.textSecondary,
  },

  stepDescriptionCurrent: {
    color: COLORS.warning,
    fontWeight: '700',
  },

  stepDescriptionPending: {
    color: COLORS.textLight,
  },
});
