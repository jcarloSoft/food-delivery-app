import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routeTypes';
import HomeScreen from '../../views/screens/home/HomeScreen';
import ProductsScreen from '../../views/screens/product/ProductsScreen';
import ProductDetailScreen from '../../views/screens/product/ProductDetailScreen';
import CartScreen from '../../views/screens/cart/CartScreen';
import OrderTypeScreen from '../../views/screens/order/OrderTypeScreen';
import CheckoutScreen from '../../views/screens/order/CheckoutScreen';
import OrderTrackingScreen from '../../views/screens/order/OrderTrackingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="OrderType" component={OrderTypeScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
    </Stack.Navigator>
  );
}
