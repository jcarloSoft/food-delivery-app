import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './core/navigation/AppNavigator';
import { COLORS } from './core/theme/colors';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <AppNavigator />
    </>
  );
}
