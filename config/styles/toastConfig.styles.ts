import { FontFamily, Palette } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: FontFamily.brand,
    fontSize: 18,
  },
  subtext: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  nandosContainer: {
    alignSelf: 'center',
    minWidth: 280,
    maxWidth: '90%',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Palette.monza,
    borderRadius: 3,
    alignItems: 'center',
    gap: 4,
    transform: [{ rotate: '-2deg' }],
  },
  nandosText: {
    fontFamily: FontFamily.brand,
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    flexShrink: 1,
  },
  nandosSubtext: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.85,
    flexShrink: 1,
  },
});
