import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { Platform, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { AppTheme } from '@/types/theme';
import '@/i18n';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = useAppTheme();
  const styles = createStyles(theme);

  SystemUI.setBackgroundColorAsync(theme.colors.background);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={navTheme}>
        <View style={styles.root}>
          <View style={styles.content}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
          </View>
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      width: '100%',
      ...(Platform.OS === 'web' && {
        maxWidth: 780,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      }),
    },
  });
