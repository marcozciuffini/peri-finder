import { useLoadingStore } from '../loadingStore';

const mockFetchRestaurants = jest.fn();

jest.mock('@/stores/restaurantStore', () => ({
  useRestaurantStore: {
    getState: () => ({ fetchRestaurants: mockFetchRestaurants }),
  },
}));

const seedStore = (overrides = {}) => {
  useLoadingStore.setState({ animationPhase: 'splash', ...overrides });
};

describe('useLoadingStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    seedStore();
  });

  it('initial phase is splash', () => {
    expect(useLoadingStore.getState().animationPhase).toBe('splash');
  });

  it('startEntry transitions splash → entering', () => {
    useLoadingStore.getState().startEntry();
    expect(useLoadingStore.getState().animationPhase).toBe('entering');
  });

  it('startEntry is a no-op when already in entering phase', () => {
    seedStore({ animationPhase: 'entering' });
    useLoadingStore.getState().startEntry();
    expect(useLoadingStore.getState().animationPhase).toBe('entering');
  });

  it('startEntry is a no-op when in fetching phase', () => {
    seedStore({ animationPhase: 'fetching' });
    useLoadingStore.getState().startEntry();
    expect(useLoadingStore.getState().animationPhase).toBe('fetching');
  });

  it('fetchComplete transitions fetching → exiting', () => {
    seedStore({ animationPhase: 'fetching' });
    useLoadingStore.getState().fetchComplete();
    expect(useLoadingStore.getState().animationPhase).toBe('exiting');
  });

  it('exitComplete transitions exiting → hidden', () => {
    seedStore({ animationPhase: 'exiting' });
    useLoadingStore.getState().exitComplete();
    expect(useLoadingStore.getState().animationPhase).toBe('hidden');
  });

  it('entryComplete is a no-op when not in entering phase', async () => {
    seedStore({ animationPhase: 'fetching' });
    await useLoadingStore.getState().entryComplete();
    expect(mockFetchRestaurants).not.toHaveBeenCalled();
    expect(useLoadingStore.getState().animationPhase).toBe('fetching');
  });

  it('entryComplete transitions entering → fetching → exiting', async () => {
    seedStore({ animationPhase: 'entering' });
    mockFetchRestaurants.mockResolvedValue(undefined);

    await useLoadingStore.getState().entryComplete();

    expect(useLoadingStore.getState().animationPhase).toBe('exiting');
  });

  it('entryComplete calls fetchRestaurants', async () => {
    seedStore({ animationPhase: 'entering' });
    mockFetchRestaurants.mockResolvedValue(undefined);

    await useLoadingStore.getState().entryComplete();

    expect(mockFetchRestaurants).toHaveBeenCalledTimes(1);
  });

  it('entryComplete transitions to exiting even when fetch rejects', async () => {
    seedStore({ animationPhase: 'entering' });
    mockFetchRestaurants.mockRejectedValue(new Error('Network failure'));

    await useLoadingStore.getState().entryComplete().catch(() => {});

    expect(useLoadingStore.getState().animationPhase).toBe('exiting');
  });
});
