import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './styles/LoadingText.styles';

type Props = {
  text: string;
};

const LoadingText = ({ text }: Props) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
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
      <Text style={{ color: dotColor(1) }}>.</Text>
      <Text style={{ color: dotColor(2) }}>.</Text>
      <Text style={{ color: dotColor(3) }}>.</Text>
    </Text>
  );
};

export default LoadingText;
