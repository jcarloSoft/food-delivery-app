import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../core/theme/colors';
import { RADIUS, SPACING } from '../../../core/theme/spacing';

interface CategoryCardProps {
  label: string;
  emoji: string;
  color: string;
  onPress?: () => void;
}

export default function CategoryCard({
  label,
  emoji,
  color,
  onPress,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '31%',
    marginBottom: SPACING.lg,
  },
  iconBox: {
    height: 100,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  emoji: {
    fontSize: 34,
  },
  label: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
});
