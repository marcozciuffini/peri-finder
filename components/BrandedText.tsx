import { Text, TextProps } from 'react-native';

const BrandedText = ({ style, ...props }: TextProps) => (
  <Text style={[{ fontFamily: 'NandosHand' }, style]} {...props} />
);

export default BrandedText;
