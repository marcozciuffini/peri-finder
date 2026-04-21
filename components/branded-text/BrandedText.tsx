import { Text, TextProps } from 'react-native';
import { styles } from './styles/BrandedText.styles';

const BrandedText = ({ style, ...props }: TextProps) => (
  <Text style={[styles.text, style]} {...props} />
);

export default BrandedText;
