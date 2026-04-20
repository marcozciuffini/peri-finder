import { Text, TouchableOpacity } from 'react-native';

import { styles } from './styles/NandosButton.styles';

type Props = {
  label: string;
  onPress: () => void;
};

const NandosButton = ({ label, onPress }: Props) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

export default NandosButton;
