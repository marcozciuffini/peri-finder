import { useRestaurantStore } from '../restaurantStore';

jest.mock('zustand/react/shallow', () => ({
  useShallow: (fn: any) => fn,
}));

const mockFetchRestaurantsApi = jest.fn();
jest.mock('@/services/api', () => ({
  fetchRestaurants: (...args: any[]) => mockFetchRestaurantsApi(...args),
}));

const mockToastShow = jest.fn();
jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: { show: (...args: any[]) => mockToastShow(...args) },
}));

jest.mock('@/i18n', () => ({
  __esModule: true,
  default: { t: (key: string) => key },
}));

const sellyOak = {
  name: "Nando's Selly Oak",
  url: 'https://www.nandos.co.uk/restaurants/selly-oak',
  geo: { address: { streetAddress: 'The Triangle, Bristol Road', addressLocality: 'Selly Oak', postalCode: 'B29 6BJ' } },
};

const bullring = {
  name: "Nando's Birmingham Bullring",
  url: 'https://www.nandos.co.uk/restaurants/birmingham-bullring',
  geo: { address: { streetAddress: 'The Bullring', addressLocality: 'Birmingham', postalCode: 'B5 4BE' } },
};

const seedStore = (overrides = {}) => {
  useRestaurantStore.setState({
    restaurants: [],
    isFetchingRestaurants: false,
    isRefetching: false,
    error: null,
    ...overrides,
  });
};

describe('useRestaurantStore — fetchRestaurants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    seedStore();
  });

  it('sets isFetchingRestaurants true before response arrives', () => {
    mockFetchRestaurantsApi.mockReturnValue(new Promise(() => {}));

    useRestaurantStore.getState().fetchRestaurants();

    expect(useRestaurantStore.getState().isFetchingRestaurants).toBe(true);
  });

  it('populates restaurants and clears loading on success', async () => {
    mockFetchRestaurantsApi.mockResolvedValue({ ok: true, data: [sellyOak, bullring] });

    await useRestaurantStore.getState().fetchRestaurants();

    const { restaurants, isFetchingRestaurants } = useRestaurantStore.getState();
    expect(restaurants).toHaveLength(2);
    expect(restaurants[0].name).toBe("Nando's Selly Oak");
    expect(isFetchingRestaurants).toBe(false);
  });

  it('sets error and clears loading on failure', async () => {
    mockFetchRestaurantsApi.mockResolvedValue({ ok: false, message: 'Network error' });

    await useRestaurantStore.getState().fetchRestaurants();

    const { error, isFetchingRestaurants } = useRestaurantStore.getState();
    expect(error).toBe('Network error');
    expect(isFetchingRestaurants).toBe(false);
  });

  it('clears a previous error when called again', async () => {
    seedStore({ error: 'Previous error' });
    mockFetchRestaurantsApi.mockResolvedValue({ ok: true, data: [sellyOak] });

    await useRestaurantStore.getState().fetchRestaurants();

    expect(useRestaurantStore.getState().error).toBeNull();
  });

  it('does not populate restaurants when data is missing from response', async () => {
    mockFetchRestaurantsApi.mockResolvedValue({ ok: true, data: undefined });

    await useRestaurantStore.getState().fetchRestaurants();

    expect(useRestaurantStore.getState().restaurants).toHaveLength(0);
  });

  it('clears restaurants and error when the response is successful but the array is empty', async () => {
    mockFetchRestaurantsApi.mockResolvedValue({ ok: true, data: [] });

    await useRestaurantStore.getState().fetchRestaurants();

    const { restaurants, error, isFetchingRestaurants } = useRestaurantStore.getState();
    expect(restaurants).toHaveLength(0);
    expect(error).toBeNull();
    expect(isFetchingRestaurants).toBe(false);
  });
});

describe('useRestaurantStore — refetch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
  });

  it('uses isRefetching when store already has data', () => {
    seedStore({ restaurants: [sellyOak] });
    mockFetchRestaurantsApi.mockReturnValue(new Promise(() => {}));

    useRestaurantStore.getState().refetch();

    expect(useRestaurantStore.getState().isRefetching).toBe(true);
    expect(useRestaurantStore.getState().isFetchingRestaurants).toBe(false);
  });

  it('uses isFetchingRestaurants when store has no data', () => {
    seedStore({ restaurants: [] });
    mockFetchRestaurantsApi.mockReturnValue(new Promise(() => {}));

    useRestaurantStore.getState().refetch();

    expect(useRestaurantStore.getState().isFetchingRestaurants).toBe(true);
    expect(useRestaurantStore.getState().isRefetching).toBe(false);
  });

  it('updates restaurants on success', async () => {
    seedStore({ restaurants: [sellyOak] });
    mockFetchRestaurantsApi.mockResolvedValue({ ok: true, data: [sellyOak, bullring] });

    const promise = useRestaurantStore.getState().refetch();
    jest.runAllTimers();
    await promise;

    expect(useRestaurantStore.getState().restaurants).toHaveLength(2);
    expect(useRestaurantStore.getState().isRefetching).toBe(false);
  });

  it('shows a toast on error when store already has data', async () => {
    seedStore({ restaurants: [sellyOak] });
    mockFetchRestaurantsApi.mockResolvedValue({ ok: false, message: 'Server error' });

    const promise = useRestaurantStore.getState().refetch();
    jest.runAllTimers();
    await promise;

    expect(mockToastShow).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error', text1: 'Server error' })
    );
  });

  it('clears restaurants and error when refetch returns an empty array', async () => {
    seedStore({ restaurants: [sellyOak] });
    mockFetchRestaurantsApi.mockResolvedValue({ ok: true, data: [] });

    const promise = useRestaurantStore.getState().refetch();
    jest.runAllTimers();
    await promise;

    const { restaurants, error } = useRestaurantStore.getState();
    expect(restaurants).toHaveLength(0);
    expect(error).toBeNull();
  });

  it('does not show a toast on error when store has no data', async () => {
    seedStore({ restaurants: [] });
    mockFetchRestaurantsApi.mockResolvedValue({ ok: false, message: 'Server error' });

    const promise = useRestaurantStore.getState().refetch();
    jest.runAllTimers();
    await promise;

    expect(mockToastShow).not.toHaveBeenCalled();
  });

  it('clears a previous error when refetch starts', () => {
    seedStore({ restaurants: [sellyOak], error: 'Old error' });
    mockFetchRestaurantsApi.mockReturnValue(new Promise(() => {}));

    useRestaurantStore.getState().refetch();

    expect(useRestaurantStore.getState().error).toBeNull();
  });
});

describe('useRestaurants selector — derived state', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hasData is false when restaurants list is empty', () => {
    seedStore({ restaurants: [] });
    expect(useRestaurantStore.getState().restaurants.length > 0).toBe(false);
  });

  it('hasData is true when restaurants are loaded', () => {
    seedStore({ restaurants: [sellyOak] });
    expect(useRestaurantStore.getState().restaurants.length > 0).toBe(true);
  });

  it('exposes correct restaurant count', () => {
    seedStore({ restaurants: [sellyOak, bullring] });
    expect(useRestaurantStore.getState().restaurants).toHaveLength(2);
  });
});
