import { renderHook, act } from '@testing-library/react-native';

const mockUseFonts = jest.fn();
jest.mock('expo-font', () => ({
  useFonts: (...args: any[]) => mockUseFonts(...args),
}));

const mockSetBackgroundColorAsync = jest.fn();
jest.mock('expo-system-ui', () => ({
  setBackgroundColorAsync: (...args: any[]) => mockSetBackgroundColorAsync(...args),
}));

const mockStartEntry = jest.fn();
jest.mock('@/stores/loadingStore', () => ({
  useLoadingStore: (selector: any) =>
    selector({ startEntry: mockStartEntry }),
}));

jest.unmock('@/hooks/useLayoutConfig');

import { useLayoutConfig } from '@/hooks/useLayoutConfig';

describe('useLayoutConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls startEntry when fonts finish loading', () => {
    mockUseFonts.mockReturnValue([true, null]);

    renderHook(() => useLayoutConfig());

    expect(mockStartEntry).toHaveBeenCalledTimes(1);
  });

  it('does not call startEntry while fonts are still loading', () => {
    mockUseFonts.mockReturnValue([false, null]);

    renderHook(() => useLayoutConfig());

    expect(mockStartEntry).not.toHaveBeenCalled();
  });

  it('calls startEntry when font loading errors (graceful fallback)', () => {
    mockUseFonts.mockReturnValue([false, new Error('Font failed')]);

    renderHook(() => useLayoutConfig());

    expect(mockStartEntry).toHaveBeenCalledTimes(1);
  });

  it('returns fontsReady true when fonts are loaded', () => {
    mockUseFonts.mockReturnValue([true, null]);

    const { result } = renderHook(() => useLayoutConfig());

    expect(result.current.fontsReady).toBe(true);
  });

  it('returns fontsReady false while fonts are loading', () => {
    mockUseFonts.mockReturnValue([false, null]);

    const { result } = renderHook(() => useLayoutConfig());

    expect(result.current.fontsReady).toBe(false);
  });

  it('calls setBackgroundColorAsync with the theme background color', () => {
    mockUseFonts.mockReturnValue([true, null]);

    renderHook(() => useLayoutConfig());

    expect(mockSetBackgroundColorAsync).toHaveBeenCalledWith('#FFF8F8');
  });
});
