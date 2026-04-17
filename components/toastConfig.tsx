import { StyleSheet, Text, View } from 'react-native';
import { BaseToast, ErrorToast, type ToastConfig } from 'react-native-toast-message';

import { FontFamily, Palette } from '@/constants/theme';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.success}
      contentContainerStyle={styles.content}
      text1Style={styles.text}
      text2Style={styles.subtext}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={styles.error}
      contentContainerStyle={styles.content}
      text1Style={styles.text}
      text2Style={styles.subtext}
    />
  ),
  nandos: ({ text1, text2 }) => (
    <View style={styles.nandosContainer}>
      <Text style={styles.nandosText}>{text1}</Text>
      {text2 && <Text style={styles.nandosSubtext}>{text2}</Text>}
    </View>
  ),
};

const styles = StyleSheet.create({
  success: {
    borderLeftColor: Palette.monza,
  },
  error: {
    borderLeftColor: Palette.amaranth,
  },
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
    marginHorizontal: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
        backgroundColor: Palette.monza,
    borderRadius: 3,
    alignItems: 'center',
    gap: 4,
    alignSelf: 'stretch',
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
