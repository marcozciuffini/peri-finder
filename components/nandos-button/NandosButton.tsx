import { Pressable, Text } from 'react-native';

import { styles } from './styles/NandosButton.styles';

type Props = {
  label: string;
  onPress: () => void;
};

const NandosButton = ({ label, onPress }: Props) => (
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    onPress={onPress}
  >
    <Text style={styles.text}>{label}</Text>
  </Pressable>
);

export default NandosButton;
