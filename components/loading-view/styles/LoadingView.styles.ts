import { AppTheme } from '@/types/theme';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: AppTheme) =>
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
      top: '63%',
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
