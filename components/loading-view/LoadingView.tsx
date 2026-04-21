import { memo } from 'react';
import { Animated, Image, View, useColorScheme } from 'react-native';

import Background from '../background/Background';
import LoadingText from '../loading-text/LoadingText';
import { styles as themeStyles } from './styles/LoadingView.styles';
import { useLoadingView } from './useLoadingView';

const LoadingView = memo(function LoadingView() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = themeStyles[colorScheme];

  const { visible, phrase, blockY, containerOpacity } = useLoadingView();

  if (!visible) return null;

  return (
    <Animated.View testID="loading-view" style={[styles.container, { opacity: containerOpacity }]} pointerEvents="auto">
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
