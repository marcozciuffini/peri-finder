import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { getVersion } from '@/modules/app-version';
import { createStyles } from './styles/RestaurantList.styles';

const appVersion = getVersion();

const RestaurantListHeader = () => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{t('restaurantList.title')}</Text>
      <Text style={styles.subtitle}>{t('restaurantList.version', { version: appVersion })}</Text>
    </View>
  );
};

export default RestaurantListHeader;
