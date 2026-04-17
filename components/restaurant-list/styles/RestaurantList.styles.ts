import { FontFamily } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingTop: 24,
      paddingHorizontal: 16,
      paddingBottom: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 28,
      fontFamily: 'NandosHand',
      color: theme.colors.text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'NandosHand',
      color: theme.colors.text,
      textAlign: 'center',
      marginTop: 4,
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
    retryButton: {
      backgroundColor: theme.colors.tint,
      paddingHorizontal: 32,
      paddingVertical: 12,
      borderRadius: 24,
    },
    retryText: {
      fontFamily: FontFamily.brand,
      fontSize: 20,
      color: '#FFFFFF',
    },
  });
