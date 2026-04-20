import { useAppTheme } from '@/hooks/useAppTheme';
import { useLoadingStore } from '@/stores/loadingStore';
import { useFonts } from 'expo-font';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

export const useLayoutConfig = () => {
  const theme = useAppTheme();
  const startEntry = useLoadingStore((s) => s.startEntry);

  const [fontsLoaded, fontError] = useFonts({
    NandosHand: require('@/assets/fonts/nandos-hand-alt.ttf'),
    Barlow_400Regular: require('@expo-google-fonts/barlow/400Regular/Barlow_400Regular.ttf'),
    Barlow_500Medium: require('@expo-google-fonts/barlow/500Medium/Barlow_500Medium.ttf'),
    Barlow_600SemiBold: require('@expo-google-fonts/barlow/600SemiBold/Barlow_600SemiBold.ttf'),
  });

  const fontsReady = fontsLoaded || !!fontError;

  useEffect(() => {
    if (fontsReady) {
      startEntry();
    }
  }, [fontsReady, startEntry]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
  }, [theme.colors.background]);

  return { 
    fontsReady
  };
};
