import { AppThemes, FontFamily } from '@/constants/theme';
import { AppTheme } from '@/types/theme';
import { PixelRatio, StyleSheet } from 'react-native';

const fontScale = PixelRatio.getFontScale();

const ITEM_PADDING_VERTICAL = 16;
const TEXT_LINE_HEIGHT = Math.ceil(24 * fontScale);
const TEXT_LINES = 4;
const TEXT_GAP = 4;
const ITEM_MARGIN_BOTTOM = 16;

export const ITEM_HEIGHT = ITEM_PADDING_VERTICAL * 2 + TEXT_LINE_HEIGHT * TEXT_LINES + TEXT_GAP * (TEXT_LINES - 1);
export const ITEM_TOTAL = ITEM_HEIGHT + ITEM_MARGIN_BOTTOM;

const build = (theme: AppTheme) =>
  StyleSheet.create({
    item: {
      height: ITEM_HEIGHT,
      paddingHorizontal: 16,
      paddingVertical: ITEM_PADDING_VERTICAL,
      marginBottom: ITEM_MARGIN_BOTTOM,
      borderRadius: 2,
      borderWidth: 3,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    nameContainer: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontFamily: FontFamily.semiBold,
      color: theme.colors.tint,
    },
    addressContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
    },
    address: {
      fontSize: 15,
      fontFamily: FontFamily.regular,
      color: theme.colors.text,
    },
    locality: {
      fontSize: 15,
      fontFamily: FontFamily.regular,
      color: theme.colors.icon,
    },
  });

export const styles = {
  light: build(AppThemes.light),
  dark: build(AppThemes.dark),
};
