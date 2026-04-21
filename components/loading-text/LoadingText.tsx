import { useEffect, useState } from 'react';
import { Text, useColorScheme } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { styles as themeStyles } from './styles/LoadingText.styles';

type Props = {
  text: string;
};

const LoadingText = ({ text }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = useAppTheme();
  const styles = themeStyles[colorScheme];
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((i) => (i + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const dotColor = (n: number) =>
    dotIndex >= n ? theme.colors.loadingBlockText : theme.colors.loadingBlock;

  return (
    <Text style={styles.text}>
      {text}
      <Text testID="dot-1" style={{ color: dotColor(1) }}>.</Text>
      <Text testID="dot-2" style={{ color: dotColor(2) }}>.</Text>
      <Text testID="dot-3" style={{ color: dotColor(3) }}>.</Text>
    </Text>
  );
};

export default LoadingText;
