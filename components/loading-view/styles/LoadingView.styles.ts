import { AppThemes } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import { StyleSheet } from 'react-native';

const build = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    iconContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
    block: {
      position: 'absolute',
      bottom: '20%',
      left: 24,
      right: 24,
      borderRadius: 3,
      borderWidth: 1,
      paddingVertical: 16,
      paddingHorizontal: 28,
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.loadingBlock,
      borderColor: theme.colors.border,
    },
  });

export const styles = {
  light: build(AppThemes.light),
  dark: build(AppThemes.dark),
};
