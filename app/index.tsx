import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import RestaurantList from '@/components/restaurant-list/RestaurantList';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fetchRestaurants } from '@/services/api';
import { type Restaurant } from '@/types/apiResponseTypes';
import { AppTheme } from '@/types/theme';

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRestaurants = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
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
        <ActivityIndicator size="large" color={theme.colors.tint} />
        <Text style={styles.message}>{t('home.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
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

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      backgroundColor: theme.colors.background,
    },
    message: {
      color: theme.colors.text,
    },
    error: {
      color: theme.colors.error,
    },
  });
