import { AppThemes } from '@/constants/theme';
import { useColorScheme } from 'react-native';
import { AppTheme } from '@/types/theme';

export const useAppTheme = (): AppTheme => {
  const scheme = useColorScheme() ?? 'light';
  return AppThemes[scheme];
};
