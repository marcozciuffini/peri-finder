import { FontFamily } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: -5
    },
    header: {
      paddingTop: 24,
      paddingHorizontal: 16,
      paddingBottom: 20,
      backgroundColor: '#000000',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.subtle + '55',
    },
    title: {
      fontSize: 28,
      fontFamily: 'NandosHand',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'NandosHand',
      color: theme.colors.tint,
      textAlign: 'center',
      marginTop: 6,
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
