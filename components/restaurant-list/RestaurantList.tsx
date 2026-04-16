import { useCallback } from 'react';
import { FlatList } from 'react-native';

import RestaurantItem from '@/components/restaurant-item/RestaurantItem';
import { ITEM_TOTAL } from '@/components/restaurant-item/styles/RestaurantItem.styles';
import { useAppTheme } from '@/hooks/useAppTheme';
import { type Restaurant } from '@/types/apiResponseTypes';
import { createStyles } from './styles/RestaurantList.styles';

type Props = {
  restaurants: Restaurant[];
  refreshing: boolean;
  onRefresh: () => void;
};

const keyExtractor = (item: Restaurant) => item.url;

const RestaurantList = ({ restaurants, refreshing, onRefresh }: Props) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => <RestaurantItem restaurant={item} />,
    []
  );

  const getItemLayout = (_: ArrayLike<Restaurant> | null | undefined, index: number) => ({
    length: ITEM_TOTAL,
    offset: ITEM_TOTAL * index,
    index,
  });

  return (
    <FlatList
      data={restaurants}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      refreshing={refreshing}
      onRefresh={onRefresh}
      getItemLayout={getItemLayout}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={15}
    />
  );
};

export default RestaurantList;
