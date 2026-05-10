import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Snackbar } from 'react-native-snackbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../core/navigation/routeTypes';
import { COLORS } from '../../../core/theme/colors';
import { RADIUS, SPACING } from '../../../core/theme/spacing';
import SearchBar from '../../components/common/SearchBar';
import ProductCard from '../../components/product/ProductCard';
import { useProductsViewModel } from '../../../viewmodels/product/useProductsViewModel';
import { useCartStore } from '../../../store/cartStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Products'>;

export default function ProductsScreen({ navigation }: Props) {
  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    products,
    loading,
    error,
    reloadProducts,
  } = useProductsViewModel();

  const addToCart = useCartStore(state => state.addToCart);
  const items = useCartStore(state => state.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Productos</Text>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={styles.cartButtonText}>
              {totalItems > 0 ? `🛒 ${totalItems}` : '🛒'}
            </Text>
          </TouchableOpacity>
        </View>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar productos..."
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsContainer}
        >
          {categories.map(category => {
            const isActive = selectedCategory === category;

            return (
              <TouchableOpacity
                key={category}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[styles.tabText, isActive && styles.tabTextActive]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {loading ? (
          <Text style={styles.stateText}>Cargando productos...</Text>
        ) : null}

        {error ? (
          <TouchableOpacity onPress={reloadProducts}>
            <Text style={styles.errorText}>{error}. Toca para reintentar.</Text>
          </TouchableOpacity>
        ) : null}

        {!loading && !error ? (
          <Text style={styles.count}>
            {products.length} productos encontrados
          </Text>
        ) : null}

        <FlatList
          data={products}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: item.id })
              }
              onAdd={() => {
                addToCart(item);

                Snackbar.show({
                  text: `${item.name} agregado al carrito`,
                  duration: Snackbar.LENGTH_SHORT,
                  action: {
                    text: 'VER',
                    textColor: '#FFFFFF',
                    onPress: () => navigation.navigate('Cart'),
                  },
                });
              }}
            />
          )}
          ListEmptyComponent={
            !loading && !error ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>No hay productos</Text>
                <Text style={styles.emptyText}>
                  Intenta cambiar la búsqueda o recargar la lista.
                </Text>

                <TouchableOpacity
                  style={styles.reloadButton}
                  onPress={reloadProducts}
                >
                  <Text style={styles.reloadButtonText}>Recargar</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
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
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  back: {
    fontSize: 28,
    color: COLORS.text,
    width: 32,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  cartButton: {
    minWidth: 52,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.sm,
  },
  cartButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.primary,
  },
  tabsScroll: {
    height: 64,
    maxHeight: 64,
    marginBottom: SPACING.md,
  },
  tabsContainer: {
    height: 64,
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: SPACING.lg,
  },
  tab: {
    height: 38,
    minWidth: 74,
    paddingHorizontal: 18,
    backgroundColor: '#F0F0F0',
    borderRadius: RADIUS.pill,
    marginRight: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 18,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  stateText: {
    marginBottom: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  errorText: {
    marginBottom: SPACING.md,
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '800',
  },
  count: {
    marginTop: 0,
    marginBottom: SPACING.md,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  row: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyBox: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
  },
  emptyText: {
    marginTop: SPACING.sm,
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  reloadButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  reloadButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },
});
