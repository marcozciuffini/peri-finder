import RestaurantItem from '@/components/restaurant-item/RestaurantItem';
import { ITEM_TOTAL } from '@/components/restaurant-item/styles/RestaurantItem.styles';
import { useAppTheme } from '@/hooks/useAppTheme';
import { type Restaurant } from '@/types/apiResponseTypes';
import { useCallback } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '@/components/background/Background';
import RestaurantListEmpty from './RestaurantListEmpty';
import { createStyles } from './styles/RestaurantList.styles';

type Props = {
  restaurants: Restaurant[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  error?: string | null;
  onRetry?: () => void;
};

const keyExtractor = (item: Restaurant) => item.url;

const getItemLayout = (_: ArrayLike<Restaurant> | null | undefined, index: number) => ({
  length: ITEM_TOTAL,
  offset: ITEM_TOTAL * index,
  index,
});

const RestaurantList = ({ restaurants, loading, refreshing, onRefresh, error, onRetry }: Props) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => <RestaurantItem restaurant={item} />,
    []
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.listContainer}>
        <Background />
        <FlatList
          style={styles.flatList}
          data={restaurants}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<RestaurantListEmpty loading={loading} error={error} onRetry={onRetry} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.tint]}
              tintColor={theme.colors.tint}
              progressBackgroundColor={theme.colors.background}
            />
          }
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
