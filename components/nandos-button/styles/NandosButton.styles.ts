import { FontFamily, Palette } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Palette.monza,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#FFFFFF55',
    transform: [{ rotate: '-2deg' }],
  },
  pressed: {
    opacity: 0.7,
    transform: [{ rotate: '-2deg' }, { scale: 0.96 }],
  },
  text: {
    fontFamily: FontFamily.brand,
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    flexShrink: 1,
  },
});
