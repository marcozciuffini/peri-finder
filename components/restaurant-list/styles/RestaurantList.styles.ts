import { StyleSheet } from 'react-native';
import { AppTheme } from '@/types/theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    list: {
      padding: 16,
      backgroundColor: theme.colors.background,
    },
  });
