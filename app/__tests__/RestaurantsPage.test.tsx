import * as api from '@/services/api';
import { useRestaurantStore } from '@/stores/restaurantStore';
import { Restaurant } from '@/types/apiResponseTypes';
import { act, render } from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
import { RestaurantsPage } from '../index';

jest.mock('@/services/api', () => ({ fetchRestaurants: jest.fn() }));
jest.mock('expo-haptics');
jest.mock('expo-web-browser');
jest.mock('react-native/Libraries/Linking/Linking', () => ({ openURL: jest.fn() }));
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
}));
jest.mock('@/components/background/Background', () => () => null);
jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: { show: jest.fn() },
}));

const mockFetchRestaurants = jest.mocked(api.fetchRestaurants);
const mockToastShow = jest.mocked(Toast.show);

const sellyOak: Restaurant = {
  name: "Nando's Selly Oak",
  url: 'https://www.nandos.co.uk/restaurants/selly-oak',
  geo: { address: { streetAddress: 'Bristol Road', addressLocality: 'Selly Oak', postalCode: 'B29 6BJ' } },
};

const bullring: Restaurant = {
  name: "Nando's Bullring",
  url: 'https://www.nandos.co.uk/restaurants/bullring',
  geo: { address: { streetAddress: 'The Bullring', addressLocality: 'Birmingham', postalCode: 'B5 4BE' } },
};

const doFetch = () => act(() => useRestaurantStore.getState().fetchRestaurants());
const doRefetch = () => act(async () => {
  useRestaurantStore.getState().refetch();
  await jest.runAllTimersAsync();
});

describe('RestaurantsPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockFetchRestaurants.mockReset();
    mockToastShow.mockReset();
    useRestaurantStore.setState({
      restaurants: [],
      isFetchingRestaurants: true,
      isRefetching: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows a loading indicator before the fetch resolves', () => {
    mockFetchRestaurants.mockResolvedValue({ ok: true, data: [sellyOak] });
    const { getByTestId } = render(<RestaurantsPage />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders the restaurant list after a successful fetch', async () => {
    mockFetchRestaurants.mockResolvedValue({ ok: true, data: [sellyOak, bullring] });
    const { getByText } = render(<RestaurantsPage />);
    await doFetch();
    expect(getByText("Nando's Selly Oak")).toBeTruthy();
    expect(getByText("Nando's Bullring")).toBeTruthy();
  });

  it('shows the error message with a retry button when the fetch fails', async () => {
    mockFetchRestaurants.mockResolvedValue({ ok: false, message: 'Network error' });
    const { getByText } = render(<RestaurantsPage />);
    await doFetch();
    expect(getByText('Network error')).toBeTruthy();
    expect(getByText('home.retry')).toBeTruthy();
  });

  it('shows the no restaurants message when the fetch returns an empty list', async () => {
    mockFetchRestaurants.mockResolvedValue({ ok: true, data: [] });
    const { getByText } = render(<RestaurantsPage />);
    await doFetch();
    expect(getByText('home.noRestaurants')).toBeTruthy();
  });

  it('updates the list after a successful refetch', async () => {
    mockFetchRestaurants.mockResolvedValue({ ok: true, data: [sellyOak] });
    const { getByText, queryByText } = render(<RestaurantsPage />);
    await doFetch();
    expect(getByText("Nando's Selly Oak")).toBeTruthy();

    mockFetchRestaurants.mockResolvedValue({ ok: true, data: [bullring] });
    await doRefetch();
    expect(getByText("Nando's Bullring")).toBeTruthy();
    expect(queryByText("Nando's Selly Oak")).toBeNull();
  });

  it('preserves existing data and shows a toast when a refetch fails', async () => {
    mockFetchRestaurants.mockResolvedValue({ ok: true, data: [sellyOak] });
    const { getByText } = render(<RestaurantsPage />);
    await doFetch();

    mockFetchRestaurants.mockResolvedValue({ ok: false, message: 'Server error' });
    await doRefetch();

    expect(getByText("Nando's Selly Oak")).toBeTruthy();
    expect(mockToastShow).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error', text1: 'Server error' })
    );
  });
});
