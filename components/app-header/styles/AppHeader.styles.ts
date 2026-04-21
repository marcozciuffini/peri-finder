import { AppThemes, FontFamily } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

const statusBarHeight = Constants.statusBarHeight ?? 0;

const build = (theme: AppTheme) =>
  StyleSheet.create({
    mainContainer: {
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
    bird: {
      position: 'absolute',
      left: -8,
      bottom: -10,
      height: 80,
      width: 80,
      opacity: 0.7,
      aspectRatio: 1,
      transform: [{ rotate: '-12deg' }],
    },
    chilli: {
      position: 'absolute',
      right: 10,
      top: statusBarHeight - 5,
      height: 50,
      width: 50,
      opacity: 0.8,
      transform: [{ rotate: '22deg' }],
    },
    title: {
      fontSize: 28,
      fontFamily: FontFamily.brand,
      color: '#FFFFFF',
      textAlign: 'center',
      maxWidth: '80%',
      alignSelf: 'center',
    },
    subtitle: {
      fontSize: 17,
      fontFamily: FontFamily.brand,
      color: theme.colors.tint,
      textAlign: 'center',
      maxWidth: '80%',
      alignSelf: 'center',
      marginTop: 6,
    },
  });

export const styles = {
  light: build(AppThemes.light),
  dark: build(AppThemes.dark),
};
