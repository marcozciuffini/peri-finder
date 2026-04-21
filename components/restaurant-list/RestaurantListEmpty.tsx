import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';
import NandosButton from '@/components/nandos-button/NandosButton';
import { useAppTheme } from '@/hooks/useAppTheme';
import { styles as themeStyles } from './styles/RestaurantList.styles';

type Props = {
  loading: boolean;
  hasRestaurants?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

const RestaurantListEmpty = ({ loading, hasRestaurants, error, onRetry }: Props) => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const styles = themeStyles[theme.dark ? 'dark' : 'light'];

  if (loading) {
    return <ActivityIndicator testID="loading-indicator" size="large" color={theme.colors.tint} style={styles.indicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        {onRetry && <NandosButton label={t('home.retry')} onPress={onRetry} />}
      </View>
    );
  }

  if (!hasRestaurants) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('home.noRestaurants')}</Text>
      </View>
    );
  }

  return null;
};

export default RestaurantListEmpty;
