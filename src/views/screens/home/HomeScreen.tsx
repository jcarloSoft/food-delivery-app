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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../core/navigation/routeTypes';
import { COLORS } from '../../../core/theme/colors';
import { SPACING, RADIUS } from '../../../core/theme/spacing';
import AppHeader from '../../components/common/AppHeader';
import SearchBar from '../../components/common/SearchBar';
import CategoryCard from '../../components/home/CategoryCard';
import ProductCard from '../../components/product/ProductCard';
import { useHomeViewModel } from '../../../viewmodels/home/useHomeViewModel';
import { useCartStore } from '../../../store/cartStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { search, setSearch, categories, popularProducts } = useHomeViewModel();
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <AppHeader
          title="Sabor Express"
          subtitle="Entrega en 30 min"
          rightText="Carrito"
          onPressRight={() => navigation.navigate('Products')}
        />

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar comida, restaurante..."
        />

        <View style={styles.banner}>
          <Text style={styles.bannerTag}>🔥 Oferta Especial</Text>
          <Text style={styles.bannerTitle}>30% de descuento</Text>
          <Text style={styles.bannerSubtitle}>En tu primer pedido</Text>

          <View style={styles.coupon}>
            <Text style={styles.couponText}>Usa: PRIMERA30</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Categorías</Text>

        <View style={styles.categoriesGrid}>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              label={category.name}
              emoji={category.emoji}
              color={category.color}
              onPress={() => navigation.navigate('Products')}
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Populares</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.viewAll}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={popularProducts}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('Products')}
              onAdd={() => addToCart(item)}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingBottom: 30,
    paddingHorizontal: SPACING.lg,
  },
  banner: {
    backgroundColor: '#FF9F1C',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  bannerTag: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '800',
  },
  bannerSubtitle: {
    marginTop: 6,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
  },
  coupon: {
    marginTop: SPACING.lg,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADIUS.lg,
  },
  couponText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAll: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  row: {
    justifyContent: 'space-between',
  },
});
