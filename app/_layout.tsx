import AppHeader from '@/components/app-header/AppHeader';
import LoadingView from '@/components/loading-view/LoadingView';
import { toastConfig } from '@/config/toastConfig';
import { useLayoutConfig } from '@/hooks/useLayoutConfig';
import '@/i18n';
import { getVersion } from '@/modules/app-version';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

const appVersion = getVersion();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { fontsReady } = useLayoutConfig();

  const renderHeader = useCallback(() => (
    <AppHeader
      title={t('restaurantList.title')}
      subtitle={t('restaurantList.version', { version: appVersion })}
    />
  ), [t]);

  return (
    <ThemeProvider value={navTheme}>
      {fontsReady && (
        <>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                header: renderHeader,
              }}
            />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
          <Toast config={toastConfig} topOffset={insets.top + 8} />
        </>
      )}
      <StatusBar style="light" backgroundColor="#000000" />
      <LoadingView />
    </ThemeProvider>
  );
}
