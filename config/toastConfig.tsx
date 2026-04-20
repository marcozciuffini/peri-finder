import { Text, View } from 'react-native';
import { BaseToast, type ToastConfig } from 'react-native-toast-message';
import { styles } from './styles/toastConfig.styles';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      contentContainerStyle={styles.content}
      text1Style={styles.text}
      text2Style={styles.subtext}
    />
  ),
  error: ({ text1, text2 }) => (
    <View testID="error-toast-container" style={styles.nandosContainer}>
      <Text style={styles.nandosText}>{text1}</Text>
      {text2 && <Text style={styles.nandosSubtext}>{text2}</Text>}
    </View>
  ),
};
