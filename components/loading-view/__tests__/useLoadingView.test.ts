import en from '@/locales/en.json';
import { Phase, useLoadingStore } from '@/stores/loadingStore';
import { act, renderHook } from '@testing-library/react-native';

const mockHideAsync = jest.fn(() => Promise.resolve());
jest.mock('expo-splash-screen', () => ({
  hideAsync: () => mockHideAsync(),
  preventAutoHideAsync: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (options?.returnObjects) {
        return [
          'Finding your nearest PERi-PERi',
          'Heating up the grill',
          'Counting the chillies',
          'Basting the chicken',
        ];
      }
      return key;
    },
  }),
}));

const mockFetchRestaurants = jest.fn();
jest.mock('@/stores/restaurantStore', () => ({
  useRestaurantStore: {
    getState: () => ({ fetchRestaurants: mockFetchRestaurants }),
  },
}));

import { useLoadingView } from '../useLoadingView';

const seedPhase = (phase: Phase) =>
  useLoadingStore.setState({ animationPhase: phase });

describe('useLoadingView', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    seedPhase('splash');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('visible is true for all non-hidden phases', () => {
    seedPhase('fetching');
    const { result } = renderHook(() => useLoadingView());
    expect(result.current.visible).toBe(true);
  });

  it('visible is false when phase is hidden', () => {
    seedPhase('hidden');
    const { result } = renderHook(() => useLoadingView());
    expect(result.current.visible).toBe(false);
  });

  it('phrase is one of the values from the translations array', () => {
    const { result } = renderHook(() => useLoadingView());
    expect(en.home.loadingPhrases).toContain(result.current.phrase);
  });

  it('phrase stays the same across re-renders', () => {
    const { result, rerender } = renderHook(() => useLoadingView());
    const first = result.current.phrase;
    rerender({});
    expect(result.current.phrase).toBe(first);
  });

  it('returns blockY and containerOpacity animated values', () => {
    const { result } = renderHook(() => useLoadingView());
    expect(result.current.blockY).toBeDefined();
    expect(result.current.containerOpacity).toBeDefined();
  });

  it('calls SplashScreen.hideAsync when phase transitions to entering', async () => {
    renderHook(() => useLoadingView());
    await act(async () => { seedPhase('entering'); });
    expect(mockHideAsync).toHaveBeenCalledTimes(1);
  });

  it('calls entryComplete after entry animation completes', async () => {
    renderHook(() => useLoadingView());
    await act(async () => { seedPhase('entering'); });
    await act(async () => { jest.runAllTimers(); });
    expect(mockFetchRestaurants).toHaveBeenCalled();
  });

  it('calls exitComplete after exit animation completes', async () => {
    renderHook(() => useLoadingView());
    await act(async () => { seedPhase('exiting'); });
    await act(async () => { jest.runAllTimers(); });
    expect(useLoadingStore.getState().animationPhase).toBe('hidden');
  });
});
