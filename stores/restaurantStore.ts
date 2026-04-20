import i18n from '@/i18n';
import { fetchRestaurants as fetchRestaurantsApi } from '@/services/api';
import { Restaurant } from '@/types/apiResponseTypes';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

type RestaurantStore = {
  restaurants: Restaurant[];
  isFetchingRestaurants: boolean;
  isRefetching: boolean;
  error: string | null;
  fetchRestaurants: () => Promise<void>;
  refetch: () => Promise<void>;
};

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  restaurants: [],
  isFetchingRestaurants: true,
  isRefetching: false,
  error: null,
  fetchRestaurants: async () => {
    set({ isFetchingRestaurants: true, error: null });
    const result = await fetchRestaurantsApi();
    if (result.ok && result.data?.length) {
      set({ restaurants: result.data, isFetchingRestaurants: false });
    } else if (result.ok) {
      set({ restaurants: [], isFetchingRestaurants: false });
    } else {
      set({ error: result.message, isFetchingRestaurants: false });
    }
  },
  refetch: async () => {
    let hasData = false;
    set((s) => {
      hasData = s.restaurants.length > 0;
      return hasData ? { isRefetching: true, error: null } : { isFetchingRestaurants: true, error: null };
    });
    const [result] = await Promise.all([fetchRestaurantsApi(), new Promise((r) => setTimeout(r, 250))]);
    if (result.ok && result.data?.length) {
      set({ restaurants: result.data, isFetchingRestaurants: false, isRefetching: false });
    } else if (result.ok) {
      set({ restaurants: [], isFetchingRestaurants: false, isRefetching: false });
    } else {
      set({ error: result.message, isFetchingRestaurants: false, isRefetching: false });
      if (hasData) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: i18n.t('home.errorSubtitle'),
        });
      }
    }
  },
}));

export const useRestaurants = () =>
  useRestaurantStore(
    useShallow((s) => ({
      restaurants: s.restaurants,
      isFetchingRestaurants: s.isFetchingRestaurants,
      isRefetching: s.isRefetching,
      error: s.error,
      hasData: s.restaurants.length > 0,
      refetch: s.refetch,
    }))
  );
