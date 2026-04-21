import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './styles/AppHeader.styles';

type Props = {
  title: string;
  subtitle?: string;
};

const AppHeader = ({ title, subtitle }: Props) => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets.top);

  return (
    <View style={styles.header}>
      <View style={styles.mainContainer}>
        <Image source={require('@/assets/images/bird.png')} style={styles.bird} resizeMode="contain" />
        <Image source={require('@/assets/images/chilli.png')} style={styles.chilli} resizeMode="contain" />
        <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.slant} />
    </View>
  );
};

export default AppHeader;
