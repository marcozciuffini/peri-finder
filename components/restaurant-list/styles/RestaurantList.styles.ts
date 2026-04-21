import { AppThemes, FontFamily } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import { StyleSheet } from 'react-native';

const build = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: -5
    },
    listContainer: {
      flex: 1,
    },
    flatList: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    list: {
      padding: 16,
    },
    indicator: {
      marginTop: 32,
    },
    errorContainer: {
      alignItems: 'center',
      paddingTop: 32,
      gap: 24,
    },
    errorText: {
      fontFamily: FontFamily.brand,
      fontSize: 28,
      color: theme.colors.error,
      textAlign: 'center',
      paddingHorizontal: 32,
    },
  });

export const styles = {
  light: build(AppThemes.light),
  dark: build(AppThemes.dark),
};
