import { Image, Text, View, useColorScheme } from 'react-native';

import { styles as themeStyles } from './styles/AppHeader.styles';

type Props = {
  title: string;
  subtitle?: string;
};

const AppHeader = ({ title, subtitle }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = themeStyles[colorScheme];

  return (
    <>
      <View style={styles.mainContainer}>
        <Image source={require('@/assets/images/bird.png')} style={styles.bird} resizeMode="contain" />
        <Image source={require('@/assets/images/chilli.png')} style={styles.chilli} resizeMode="contain" />
        <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.slant} />
    </>
  );
};

export default AppHeader;
