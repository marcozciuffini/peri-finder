import { render, fireEvent } from '@testing-library/react-native';
import RestaurantListEmpty from '../RestaurantListEmpty';

jest.mock('@/components/nandos-button/NandosButton', () => {
  const { TouchableOpacity, Text } = jest.requireActual('react-native');
  function MockNandosButton({ label, onPress }: { label: string; onPress: () => void }) {
    return <TouchableOpacity onPress={onPress}><Text>{label}</Text></TouchableOpacity>;
  }
  return MockNandosButton;
});

describe('RestaurantListEmpty', () => {
  it('shows an activity indicator when loading', () => {
    const { getByTestId } = render(<RestaurantListEmpty loading={true} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('does not show an error message when loading', () => {
    const { queryByText } = render(<RestaurantListEmpty loading={true} error="Something went wrong" />);
    expect(queryByText('Something went wrong')).toBeNull();
  });

  it('shows the error message when not loading', () => {
    const { getByText } = render(<RestaurantListEmpty loading={false} error="Something went wrong" />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('shows the retry button when an error and onRetry are provided', () => {
    const { getByText } = render(
      <RestaurantListEmpty loading={false} error="Something went wrong" onRetry={jest.fn()} />
    );
    expect(getByText('home.retry')).toBeTruthy();
  });

  it('does not show the retry button when no onRetry is provided', () => {
    const { queryByText } = render(
      <RestaurantListEmpty loading={false} error="Something went wrong" />
    );
    expect(queryByText('home.retry')).toBeNull();
  });

  it('calls onRetry when the retry button is pressed', () => {
    const onRetry = jest.fn();
    const { getByText } = render(
      <RestaurantListEmpty loading={false} error="Something went wrong" onRetry={onRetry} />
    );
    fireEvent.press(getByText('home.retry'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when there is no loading state and no error', () => {
    const { toJSON } = render(<RestaurantListEmpty loading={false} hasRestaurants={true} />);
    expect(toJSON()).toBeNull();
  });

  it('shows the no restaurants message when hasRestaurants is false', () => {
    const { getByText } = render(<RestaurantListEmpty loading={false} hasRestaurants={false} />);
    expect(getByText('home.noRestaurants')).toBeTruthy();
  });

  it('does not show a retry button when hasRestaurants is false', () => {
    const { queryByText } = render(
      <RestaurantListEmpty loading={false} hasRestaurants={false} onRetry={jest.fn()} />
    );
    expect(queryByText('home.retry')).toBeNull();
  });

  it('does not show the no restaurants message when loading', () => {
    const { queryByText } = render(<RestaurantListEmpty loading={true} hasRestaurants={false} />);
    expect(queryByText('home.noRestaurants')).toBeNull();
  });
});
