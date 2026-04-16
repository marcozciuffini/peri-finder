import * as WebBrowser from 'expo-web-browser';
import { Pressable, Text, View } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { type Restaurant } from '@/types/apiResponseTypes';
import { createStyles } from './styles/RestaurantItem.styles';

type Props = {
  restaurant: Restaurant;
};

const RestaurantItem = ({ restaurant }: Props) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { streetAddress, addressLocality, postalCode } = restaurant.geo.address;

  const onNamePress = () => WebBrowser.openBrowserAsync(restaurant.url);

  return (
    <View style={styles.item}>
      <Pressable onPress={onNamePress}>
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>
      </Pressable>
      <Text style={styles.address} numberOfLines={1}>
        {streetAddress}
      </Text>
      <Text style={styles.locality} numberOfLines={1}>
        {`${addressLocality}, ${postalCode}`}
      </Text>
    </View>
  );
};

export default RestaurantItem;
