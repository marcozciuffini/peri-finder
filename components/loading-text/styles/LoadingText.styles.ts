import { AppThemes, FontFamily } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import { StyleSheet } from 'react-native';

const build = (theme: AppTheme) =>
  StyleSheet.create({
    text: {
      fontSize: 32,
      fontFamily: FontFamily.brand,
      color: theme.colors.loadingBlockText,
      textAlign: 'center',
    },
    hidden: {
      opacity: 0,
      color: 'transparent',
    },
  });

export const styles = {
  light: build(AppThemes.light),
  dark: build(AppThemes.dark),
};
