import { FontFamily } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: AppTheme, statusBarHeight: number) =>
  StyleSheet.create({
    container: {
      zIndex: 10,
      backgroundColor: '#000000',
      paddingHorizontal: 16,
      paddingTop: statusBarHeight + 12,
      paddingBottom: 24,
    },
    slant: {
      height: 24,
      backgroundColor: '#000000',
      marginTop: -12,
      marginHorizontal: -8,
      transform: [{ skewY: '-1.5deg' }],
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.surface,
    },
    title: {
      fontSize: 28,
      fontFamily: FontFamily.brand,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: FontFamily.brand,
      color: theme.colors.tint,
      textAlign: 'center',
      marginTop: 6,
    },
  });
