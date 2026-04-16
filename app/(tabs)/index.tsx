import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import RestaurantList from '@/components/restaurant-list/RestaurantList';
import { ThemedText } from '@/components/themed-text';
import { fetchRestaurants } from '@/services/api';
import { type Restaurant } from '@/types/apiResponseTypes';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRestaurants = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    }
    const result = await fetchRestaurants();
    if (result.ok) {
      setRestaurants(result.data);
      setError(null);
    } else {
      setError(result.message);
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  const onRefresh = useCallback(() => loadRestaurants(true), [loadRestaurants]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <ThemedText>{t('home.loading')}</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <ThemedText>{t('home.error')}</ThemedText>
      </View>
    );
  }

  return (
    <RestaurantList
      restaurants={restaurants}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});
