import { StyleSheet } from 'react-native';
import { AppTheme } from '@/types/theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingTop: 16,
      paddingHorizontal: 16,
      paddingBottom: 12,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.colors.text,
    },
    list: {
      padding: 16,
    },
  });
