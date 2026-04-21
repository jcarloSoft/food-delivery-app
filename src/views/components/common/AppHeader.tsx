import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../core/theme/colors';
import { SPACING } from '../../../core/theme/spacing';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  leftText?: string;
  rightText?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}

export default function AppHeader({
  title,
  subtitle,
  leftText,
  rightText,
  onPressLeft,
  onPressRight,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {leftText ? (
          <TouchableOpacity onPress={onPressLeft}>
            <Text style={styles.action}>{leftText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={[styles.side, styles.right]}>
        {rightText ? (
          <TouchableOpacity onPress={onPressRight}>
            <Text style={styles.action}>{rightText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  side: {
    width: 70,
  },
  right: {
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  action: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
