import Background from '@/components/background/Background';
import RestaurantItem from '@/components/restaurant-item/RestaurantItem';
import { ITEM_TOTAL } from '@/components/restaurant-item/styles/RestaurantItem.styles';
import { useAppTheme } from '@/hooks/useAppTheme';
import { type Restaurant } from '@/types/apiResponseTypes';
import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RestaurantListEmpty from './RestaurantListEmpty';
import { styles as themeStyles } from './styles/RestaurantList.styles';

type Props = {
  restaurants: Restaurant[];
  loading: boolean;
  refreshing: boolean;
  onRefetch: () => void;
  error?: string | null;
};

const keyExtractor = (item: Restaurant) => item.url;

const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
const onViewableItemsChanged = () => Haptics.selectionAsync();

const getItemLayout = (_: ArrayLike<Restaurant> | null | undefined, index: number) => ({
  length: ITEM_TOTAL,
  offset: ITEM_TOTAL * index,
  index,
});

const RestaurantList = ({ restaurants, loading, refreshing, onRefetch, error }: Props) => {
  const theme = useAppTheme();
  const styles = themeStyles[theme.dark ? 'dark' : 'light'];

  const hasRestaurants = !loading && !error && restaurants.length > 0;

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => <RestaurantItem restaurant={item} />,
    []
  );

  const handleRefresh = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onRefetch();
  }, [onRefetch]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.listContainer}>
        <Background />
        <FlatList
          testID="restaurant-list"
          style={styles.flatList}
          data={restaurants}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <RestaurantListEmpty loading={loading} hasRestaurants={hasRestaurants} error={error} onRetry={onRefetch} />
          }
          refreshControl={
            restaurants.length > 0 || (!loading && !error) ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[theme.colors.tint]}
                tintColor={theme.colors.tint}
                progressBackgroundColor={theme.colors.background}
              />
            ) : undefined
          }
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          getItemLayout={getItemLayout}
          removeClippedSubviews
          windowSize={5}
          initialNumToRender={15}
        />
      </View>
    </SafeAreaView>
  );
};

export default RestaurantList;
