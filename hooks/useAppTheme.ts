import { AppThemes } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AppTheme } from '@/types/theme';

export const useAppTheme = (): AppTheme => {
  const scheme = useColorScheme() ?? 'light';
  return AppThemes[scheme];
};
