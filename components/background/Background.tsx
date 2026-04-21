import { Image } from 'expo-image';
import { StyleSheet, View, useColorScheme } from 'react-native';

import { styles as themeStyles } from './styles/Background.styles';

type Props = {
  loadingScreen?: boolean;
};

const Background = ({ loadingScreen }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = themeStyles[colorScheme];

  if (colorScheme === 'dark') {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
          testID="dark-background"
          source={require('@/assets/images/dark-background.svg')}
          style={[styles.darkBg, loadingScreen && styles.opacity]}
          contentFit="cover"
        />
      </View>
    );
  }

  return (
    <View style={styles.lightBg} pointerEvents="none">
      <Image
        testID="background-piece"
        source={require('@/assets/images/side_piece_2.svg')}
        style={[styles.piece, styles.topLeft, loadingScreen && styles.opacity]}
        contentFit="fill"
      />
      <Image
        testID="background-piece"
        source={require('@/assets/images/side_piece.svg')}
        style={[styles.piece, styles.topMiddleRight, loadingScreen && styles.opacity]}
        contentFit="fill"
      />
      <Image
        testID="background-piece"
        source={require('@/assets/images/side_piece_3.svg')}
        style={[styles.piece, styles.bottomRight, loadingScreen && styles.opacity]}
        contentFit="fill"
      />
    </View>
  );
};

export default Background;
