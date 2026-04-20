import { AppTheme } from '@/types/theme';
import { StyleSheet } from 'react-native';

// Natural SVG dimensions — used to derive correct aspect ratios
// side_piece_2: 247×722  side_piece: 155×594  side_piece_3: 354×663

export const createStyles = (theme: AppTheme, screenHeight: number, loadingScreen?: boolean) => {
  const topPieceHeight = screenHeight * 0.45;
  const bottomPieceHeight = screenHeight * 0.38;

  return StyleSheet.create({
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
      width: Math.round(topPieceHeight * (247 / 722)),
      height: topPieceHeight,
    },
    topMiddleRight: {
      top: 0,
      right: 0,
      width: Math.round(topPieceHeight * (155 / 594)),
      height: topPieceHeight,
    },
    bottomRight: {
      bottom: 0,
      right: 0,
      width: Math.round(bottomPieceHeight * (354 / 663)),
      height: bottomPieceHeight,
    },
  });
};
