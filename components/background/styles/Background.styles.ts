import { AppThemes } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import { Dimensions, StyleSheet } from 'react-native';

const screenHeight = Dimensions.get('window').height;

const topPieceHeight = screenHeight * 0.45;
const bottomPieceHeight = screenHeight * 0.38;

const build = (theme: AppTheme) =>
  StyleSheet.create({
    lightBg: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background,
    },
    darkBg: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.5,
    },
    piece: {
      position: 'absolute',
      opacity: 0.4,
    },
    opacity: {
      opacity: 1,
    },
    topLeft: {
      top: 0,
      left: 0,
      aspectRatio: 247 / 722,
      height: topPieceHeight,
    },
    topMiddleRight: {
      top: 0,
      right: 0,
      aspectRatio: 155 / 594,
      height: topPieceHeight,
    },
    bottomRight: {
      bottom: 0,
      right: 0,
      aspectRatio: 354 / 663,
      height: bottomPieceHeight,
    },
  });

export const styles = {
  light: build(AppThemes.light),
  dark: build(AppThemes.dark),
};
