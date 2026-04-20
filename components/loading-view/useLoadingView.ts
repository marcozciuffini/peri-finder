import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, useAnimatedValue, useWindowDimensions } from 'react-native';

import { useLoadingStore } from '@/stores/loadingStore';

const MIN_DISPLAY_MS = 2500;

export const useLoadingView = () => {
  const { height } = useWindowDimensions();
  const { t } = useTranslation();

  const animationPhase = useLoadingStore((s) => s.animationPhase);

  const shownAt = useRef(0);

  const [phrase] = useState(() => {
    const phrases = t('home.loadingPhrases', { returnObjects: true }) as string[];
    return phrases[Math.floor(Math.random() * phrases.length)];
  });

  const blockY = useAnimatedValue(height);
  const containerOpacity = useAnimatedValue(1);

  useEffect(() => {
    if (animationPhase === 'entering') {
      shownAt.current = Date.now();
      SplashScreen.hideAsync().then(() =>
        Animated.spring(blockY, {
          toValue: 0,
          tension: 40,
          friction: 12,
          useNativeDriver: true,
        }).start(() => useLoadingStore.getState().entryComplete())
      );
    }

    if (animationPhase === 'exiting') {
      const elapsed = Date.now() - shownAt.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      const animation = Animated.sequence([
        Animated.delay(remaining),
        Animated.timing(blockY, {
          toValue: height,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]);
      animation.start(() => useLoadingStore.getState().exitComplete());
      return () => animation.stop();
    }
  }, [animationPhase, blockY, containerOpacity, height]);

  return { 
    visible: animationPhase !== 'hidden', 
    phrase, 
    blockY, 
    containerOpacity
  };
};
