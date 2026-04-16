import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppThemes } from '@/constants/theme';
import { AppTheme } from '@/types/theme';

export const useAppTheme = (): AppTheme => {
  const scheme = useColorScheme() ?? 'light';
  return AppThemes[scheme];
};
