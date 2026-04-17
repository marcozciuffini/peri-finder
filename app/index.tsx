import { useCallback, useEffect, useState } from 'react';

import RestaurantList from '@/components/restaurant-list/RestaurantList';
import { fetchRestaurants } from '@/services/api';
import { type Restaurant } from '@/types/apiResponseTypes';

export default function HomeScreen() {
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

  const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <RestaurantList
      restaurants={restaurants}
      loading={loading}
      refreshing={refreshing}
      onRefresh={onRefresh}
      error={error}
      onRetry={handleRetry}
    />
  );
}
