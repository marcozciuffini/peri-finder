import { FontFamily } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: AppTheme) =>
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
