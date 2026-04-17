import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { memo, useMemo } from 'react';
import { Linking, Platform, Pressable, Text, View } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { type Restaurant } from '@/types/apiResponseTypes';
import { createStyles } from './styles/RestaurantItem.styles';

type Props = {
  restaurant: Restaurant;
};

const RestaurantItem = memo(({ restaurant }: Props) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { streetAddress, addressLocality, postalCode } = restaurant.geo.address;

  const onNamePress = () => WebBrowser.openBrowserAsync(restaurant.url);

  const onMapPress = () => {
    const query = encodeURIComponent(`Nando's ${restaurant.name}, ${postalCode}`);
    const url = Platform.select({
      ios: `maps:?q=${query}`,
      android: `geo:0,0?q=${query}`,
    });
    if (url) {
      Linking.openURL(url)
    };
  };

  return (
    <View style={styles.item}>
      <View style={styles.nameRow}>
        <Pressable
          onPress={onNamePress}
          style={({ pressed }) => [styles.nameContainer, pressed && styles.namePressed]}
        >
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
        </Pressable>
        <Pressable onPress={onMapPress} hitSlop={8}>
          <Ionicons name="location-outline" size={26} color={theme.colors.tint} />
        </Pressable>
      </View>
      <View style={styles.addressContainer}>
        {!!streetAddress && (
          <Text style={styles.address} numberOfLines={1} selectable>
            {streetAddress}
          </Text>
        )}
        {!!addressLocality && (
          <Text style={styles.address} numberOfLines={1} selectable>
            {addressLocality}
          </Text>
        )}
        <Text style={styles.locality} numberOfLines={1} selectable>
          {postalCode}
        </Text>
      </View>
    </View>
  );
});

export default RestaurantItem;
