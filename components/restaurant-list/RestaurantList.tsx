import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const getItemLayout = (_: ArrayLike<Restaurant> | null | undefined, index: number) => ({
  length: ITEM_TOTAL,
  offset: ITEM_TOTAL * index,
  index,
});

const RestaurantList = ({ restaurants, refreshing, onRefresh }: Props) => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => <RestaurantItem restaurant={item} />,
    []
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('restaurantList.title')}</Text>
      </View>
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
    </SafeAreaView>
  );
};

export default RestaurantList;
