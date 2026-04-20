import { act, fireEvent, render } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import RestaurantList from '../RestaurantList';

jest.mock('expo-haptics');
jest.mock('expo-image', () => ({ Image: 'Image' }));
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
}));
jest.mock('@/components/background/Background', () => () => null);
jest.mock('@/components/restaurant-item/RestaurantItem', () => {
  const { Text } = require('react-native');
  return ({ restaurant }: any) => <Text testID="restaurant-item">{restaurant.name}</Text>;
});
jest.mock('@/components/restaurant-list/RestaurantListEmpty', () => {
  const { Text } = require('react-native');
  return ({ loading, error }: any) => (
    <Text testID="list-empty">{loading ? 'loading' : error ?? 'empty'}</Text>
  );
});

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

const baseProps = {
  restaurants: [],
  loading: false,
  refreshing: false,
  onRefetch: jest.fn(),
};

describe('RestaurantList', () => {
  it('renders a restaurant item for each restaurant', () => {
    const { getAllByTestId } = render(
      <RestaurantList {...baseProps} restaurants={[sellyOak, bullring]} />
    );
    expect(getAllByTestId('restaurant-item')).toHaveLength(2);
  });

  it('renders the empty component when the list is empty', () => {
    const { getByTestId } = render(<RestaurantList {...baseProps} />);
    expect(getByTestId('list-empty')).toBeTruthy();
  });

  it('calls onRefetch and triggers heavy haptic on pull-to-refresh', () => {
    const onRefetch = jest.fn();
    const { getByTestId } = render(
      <RestaurantList {...baseProps} restaurants={[sellyOak]} onRefetch={onRefetch} />
    );
    act(() => getByTestId('restaurant-list').props.refreshControl.props.onRefresh());
    expect(onRefetch).toHaveBeenCalledTimes(1);
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
  });

  it('does not show a refresh control when there is an error and no restaurants', () => {
    const { getByTestId } = render(<RestaurantList {...baseProps} error="Something went wrong" />);
    expect(getByTestId('restaurant-list').props.refreshControl).toBeUndefined();
  });

  it('shows a refresh control when restaurants is empty but there is no error', () => {
    const { getByTestId } = render(<RestaurantList {...baseProps} />);
    expect(getByTestId('restaurant-list').props.refreshControl).toBeDefined();
  });
});
