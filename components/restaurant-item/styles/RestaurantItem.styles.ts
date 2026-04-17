import { AppTheme } from '@/types/theme';
import { FontFamily } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    item: {
      height: ITEM_HEIGHT,
      paddingHorizontal: 16,
      paddingVertical: ITEM_PADDING_VERTICAL,
      marginBottom: ITEM_MARGIN_BOTTOM,
      borderRadius: 12,
      borderWidth: 1,
      gap: TEXT_GAP,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    name: {
      fontSize: 16,
      fontFamily: FontFamily.semiBold,
      color: theme.colors.tint,
    },
    address: {
      fontSize: 14,
      fontFamily: FontFamily.regular,
      color: theme.colors.text,
    },
    locality: {
      fontSize: 13,
      fontFamily: FontFamily.regular,
      color: theme.colors.icon,
    },
  });

export const ITEM_PADDING_VERTICAL = 16;
const TEXT_LINE_HEIGHT = 24;
const TEXT_LINES = 3;
export const TEXT_GAP = 4;
export const ITEM_MARGIN_BOTTOM = 16;

export const ITEM_HEIGHT =
  ITEM_PADDING_VERTICAL * 2 + TEXT_LINE_HEIGHT * TEXT_LINES + TEXT_GAP * (TEXT_LINES - 1);
export const ITEM_TOTAL = ITEM_HEIGHT + ITEM_MARGIN_BOTTOM;
