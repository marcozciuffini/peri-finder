import { Image } from 'expo-image';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createStyles } from './styles/Background.styles';

type Props = {
  loadingScreen?: boolean;
};

const Background = ({ loadingScreen }: Props) => {
  const theme = useAppTheme();
  const colorScheme = useColorScheme();
  const { height } = useWindowDimensions();
  const styles = createStyles(theme, height);

  if (colorScheme === 'dark') {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
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
        source={require('@/assets/images/side_piece_2.svg')}
        style={[styles.piece, styles.topLeft, loadingScreen && styles.opacity]}
        contentFit="fill"
      />
      <Image
        source={require('@/assets/images/side_piece.svg')}
        style={[styles.piece, styles.topMiddleRight, loadingScreen && styles.opacity]}
        contentFit="fill"
      />
      <Image
        source={require('@/assets/images/side_piece_3.svg')}
        style={[styles.piece, styles.bottomRight, loadingScreen && styles.opacity]}
        contentFit="fill"
      />
    </View>
  );
};

export default Background;
