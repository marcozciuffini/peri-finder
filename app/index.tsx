import RestaurantList from '@/components/restaurant-list/RestaurantList';
import { useRestaurants } from '@/stores/restaurantStore';

export const RestaurantsPage = () => {
  const { restaurants, isFetchingRestaurants, isRefetching, error, hasData, refetch } = useRestaurants();

  return (
    <RestaurantList
      restaurants={restaurants}
      loading={isFetchingRestaurants}
      refreshing={isRefetching}
      error={!hasData && error ? error : null}
      onRefetch={refetch}
    />
  );
};

export default RestaurantsPage;
