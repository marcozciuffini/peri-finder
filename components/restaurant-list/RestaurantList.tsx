import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RestaurantItem from '@/components/restaurant-item/RestaurantItem';
import { ITEM_TOTAL } from '@/components/restaurant-item/styles/RestaurantItem.styles';
import { useAppTheme } from '@/hooks/useAppTheme';
import { getVersion } from '@/modules/app-version';
import { type Restaurant } from '@/types/apiResponseTypes';
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

const appVersion = getVersion();

const RestaurantList = ({ restaurants, loading, refreshing, onRefresh, error, onRetry }: Props) => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => <RestaurantItem restaurant={item} />,
    []
  );

  const ListEmptyComponent = useCallback(() => {
    if (loading) {
      return <ActivityIndicator size="large" color={theme.colors.tint} style={styles.indicator} />;
    }
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          {onRetry && (
            <Pressable style={styles.retryButton} onPress={onRetry}>
              <Text style={styles.retryText}>{t('home.retry')}</Text>
            </Pressable>
          )}
        </View>
      );
    }
    return null;
  }, [loading, error, onRetry, styles, t, theme.colors.tint]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('restaurantList.title')}</Text>
        <Text style={styles.subtitle}>{t('restaurantList.version', { version: appVersion })}</Text>
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={refreshing}
        onRefresh={onRefresh}
        getItemLayout={loading || error ? undefined : getItemLayout}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={15}
      />
    </SafeAreaView>
  );
};

export default RestaurantList;
