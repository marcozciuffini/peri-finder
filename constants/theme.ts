/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
import { AppTheme } from '@/types/theme';

const nandosRed = '#C8102E';
const nandosDark = '#1A0A0A';

export const Colors = {
  light: {
    text: '#1A0A0A',
    background: '#FFF8F8',
    tint: nandosRed,
    icon: '#7A5C5C',
    tabIconDefault: '#7A5C5C',
    tabIconSelected: nandosRed,
  },
  dark: {
    text: '#F5EDED',
    background: nandosDark,
    tint: '#FF4D6A',
    icon: '#A08080',
    tabIconDefault: '#A08080',
    tabIconSelected: '#FF4D6A',
  },
};

export const AppThemes: Record<'light' | 'dark', AppTheme> = {
  light: {
    dark: false,
    colors: {
      background: '#FFF8F8',
      surface: '#FFF0F0',
      border: '#F2D6D6',
      text: '#1A0A0A',
      icon: '#7A5C5C',
      tint: nandosRed,
      error: '#EF5350',
    },
  },
  dark: {
    dark: true,
    colors: {
      background: '#1A0A0A',
      surface: '#2A1010',
      border: '#3D1A1A',
      text: '#F5EDED',
      icon: '#A08080',
      tint: '#FF4D6A',
      error: '#EF5350',
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
