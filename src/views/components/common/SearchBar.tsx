import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS } from '../../../core/theme/colors';
import { RADIUS, SPACING } from '../../../core/theme/spacing';

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({
  value,
  placeholder,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
  },
  input: {
    height: 52,
    color: COLORS.text,
    fontSize: 15,
  },
});
