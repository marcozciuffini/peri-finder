import { renderHook } from '@testing-library/react-native';
import { AppThemes } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';

jest.unmock('@/hooks/useAppTheme');

const mockColorScheme = jest.fn();
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: mockColorScheme,
}));

describe('useAppTheme', () => {
  it('returns the light theme when colorScheme is light', () => {
    mockColorScheme.mockReturnValue('light');
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.colors.background).toBe(AppThemes.light.colors.background);
    expect(result.current.dark).toBe(false);
  });

  it('returns the dark theme when colorScheme is dark', () => {
    mockColorScheme.mockReturnValue('dark');
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.colors.background).toBe(AppThemes.dark.colors.background);
    expect(result.current.dark).toBe(true);
  });

  it('falls back to the light theme when colorScheme is null', () => {
    mockColorScheme.mockReturnValue(null);
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.colors.background).toBe(AppThemes.light.colors.background);
  });

  it('light and dark themes have different background colors', () => {
    expect(AppThemes.light.colors.background).not.toBe(AppThemes.dark.colors.background);
  });
});
