import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import NandosButton from '@/components/nandos-button/NandosButton';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './styles/RestaurantList.styles';

type Props = {
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
};

const RestaurantListEmpty = ({ loading, error, onRetry }: Props) => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const styles = createStyles(theme);

  if (loading) {
    return <ActivityIndicator size="large" color={theme.colors.tint} style={styles.indicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        {onRetry && <NandosButton label={t('home.retry')} onPress={onRetry} />}
      </View>
    );
  }

  return null;
};

export default RestaurantListEmpty;
