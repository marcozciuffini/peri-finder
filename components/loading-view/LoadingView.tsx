import { Animated, Image, View } from 'react-native';
import { memo } from 'react';

import { useAppTheme } from '@/hooks/useAppTheme';
import Background from '../background/Background';
import LoadingText from '../loading-text/LoadingText';
import { createStyles } from './styles/LoadingView.styles';
import { useLoadingView } from './useLoadingView';

const LoadingView = memo(function LoadingView() {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const { visible, phrase, blockY, containerOpacity } = useLoadingView();

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]} pointerEvents="auto">
      <Background loadingScreen />
      <View style={styles.iconContainer}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <Animated.View style={[styles.block, { transform: [{ translateY: blockY }] }]}>
        <LoadingText text={phrase} />
      </Animated.View>
    </Animated.View>
  );
});

export default LoadingView;
