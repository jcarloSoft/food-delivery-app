import React from 'react';
import {
  Alert,
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
import { useOrderTypeViewModel } from '../../../viewmodels/order/useOrderTypeViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderType'>;

export default function OrderTypeScreen({ navigation }: Props) {
  const { options, selectedOrderType, setOrderType } = useOrderTypeViewModel();

  const handleContinue = () => {
    if (!selectedOrderType) {
      Alert.alert('Selecciona una opción', 'Debes elegir un tipo de pedido.');
      return;
    }

    navigation.navigate('Checkout');
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

        <Text style={styles.title}>Tipo de pedido</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>
          Selecciona cómo deseas recibir tu pedido
        </Text>

        {options.map(option => {
          const selected = selectedOrderType === option.id;

          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.9}
              style={[styles.optionCard, selected && styles.optionCardSelected]}
              onPress={() => setOrderType(option.id)}
            >
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: option.backgroundColor },
                ]}
              >
                <Text style={styles.icon}>{option.icon}</Text>
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>
                  {option.description}
                </Text>

                <View style={styles.badgeRow}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{option.badge}</Text>
                  </View>

                  {option.secondBadge ? (
                    <View style={styles.greenBadge}>
                      <Text style={styles.greenBadgeText}>
                        {option.secondBadge}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>

              {selected ? (
                <View style={styles.checkCircle}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Información importante</Text>
          <Text style={styles.infoText}>
            • Los tiempos son estimados y pueden variar
          </Text>
          <Text style={styles.infoText}>
            • El delivery es gratis en pedidos mayores a S/ 25
          </Text>
          <Text style={styles.infoText}>
            • Para recojo, espera la confirmación del restaurante
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <AppButton title="Continuar al pago" onPress={handleContinue} />
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
    paddingBottom: 120,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  optionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  optionCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  icon: {
    fontSize: 30,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
  },
  optionDescription: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  badge: {
    backgroundColor: '#F1F1F1',
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
  },
  greenBadge: {
    backgroundColor: '#DCFCE7',
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
  },
  greenBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.success,
  },
  checkCircle: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: COLORS.white,
    fontWeight: '900',
  },
  infoCard: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: '#FFD0BF',
    padding: SPACING.xl,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 24,
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
});
