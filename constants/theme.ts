/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { AppTheme } from '@/types/theme';
import { Platform } from 'react-native';

export const Palette = {
  monza: '#CE0A24',       // 206, 10, 36
  amaranth: '#EB3F55',    // 235, 63, 85
  mauvelous: '#F091AA',   // 240, 145, 170
  brightSun: '#FFCD41',   // 255, 205, 65
  flame: '#E8650A',       // 232, 101, 10
  black: '#000000',
};

export const Colors = {
  light: {
    text: Palette.black,
    background: '#FFF8F8',
    tint: Palette.monza,
    icon: '#7A5C5C',
    tabIconDefault: '#7A5C5C',
    tabIconSelected: Palette.monza,
  },
  dark: {
    text: '#F5EDED',
    background: '#1A0A0A',
    tint: Palette.amaranth,
    icon: '#A08080',
    tabIconDefault: '#A08080',
    tabIconSelected: Palette.amaranth,
  },
};

export const AppThemes: Record<'light' | 'dark', AppTheme> = {
  light: {
    dark: false,
    colors: {
      background: '#FFF8F8',
      surface: '#FFF6EC',
      border: '#F0D8D0',
      text: Palette.black,
      icon: '#7A5C5C',
      tint: Palette.monza,
      error: Palette.amaranth,
      accent: '#D4A830',
      subtle: '#D9849A',
      loadingBlock: Palette.black,
      loadingBlockText: '#FFFFFF',
    },
  },
  dark: {
    dark: true,
    colors: {
      background: '#1A0A0A',
      surface: '#241208',
      border: '#3D2210',
      text: '#F5EDED',
      icon: '#A08080',
      tint: Palette.amaranth,
      error: Palette.mauvelous,
      accent: '#B8882A',
      subtle: '#C4607A',
      loadingBlock: Palette.flame,
      loadingBlockText: Palette.black,
    },
  },
};

export const FontFamily = {
  brand: 'NandosHand',
  regular: 'Barlow_400Regular',
  medium: 'Barlow_500Medium',
  semiBold: 'Barlow_600SemiBold',
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
