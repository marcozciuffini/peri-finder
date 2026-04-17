import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppHeader from '@/components/app-header/AppHeader';
import { toastConfig } from '@/components/toastConfig';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useColorScheme } from '@/hooks/useColorScheme';
import '@/i18n';
import { getVersion } from '@/modules/app-version';

const appVersion = getVersion();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const [loaded, error] = useFonts({
    'NandosHand': require('../assets/fonts/nandos-hand-alt.ttf'),
    'Barlow_400Regular': require('@expo-google-fonts/barlow/400Regular/Barlow_400Regular.ttf'),
    'Barlow_500Medium': require('@expo-google-fonts/barlow/500Medium/Barlow_500Medium.ttf'),
    'Barlow_600SemiBold': require('@expo-google-fonts/barlow/600SemiBold/Barlow_600SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
  }, [theme.colors.background]);

  if (!loaded && !error) {
    return null;
  }

  return (

      <ThemeProvider value={navTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              header: () => (
                <AppHeader
                  title={t('restaurantList.title')}
                  subtitle={t('restaurantList.version', { version: appVersion })}
                />
              ),
            }}
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      <Toast config={toastConfig} topOffset={insets.top + 8} />
      <StatusBar style="light" backgroundColor="#000000" />
      </ThemeProvider>
  );
}
