import { fireEvent, render } from '@testing-library/react-native';
import { Linking } from 'react-native';
import RestaurantItem from '../RestaurantItem';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Medium: 'Medium', Heavy: 'Heavy' },
}));

const mockOpenBrowserAsync = jest.fn();
jest.mock('expo-web-browser', () => ({
  openBrowserAsync: (...args: any[]) => mockOpenBrowserAsync(...args),
}));

const mockOpenURL = jest.spyOn(Linking, 'openURL');

const fullRestaurant = {
  name: "Nando's Selly Oak",
  url: 'https://www.nandos.co.uk/restaurants/selly-oak',
  geo: {
    address: {
      streetAddress: 'The Triangle, Bristol Road',
      addressLocality: 'Selly Oak',
      postalCode: 'B29 6BJ',
    },
  },
};

const minimalRestaurant = {
  name: "Nando's Birmingham Bullring",
  url: 'https://www.nandos.co.uk/restaurants/birmingham-bullring',
  geo: {
    address: {
      streetAddress: '',
      addressLocality: '',
      postalCode: 'B5 4BE',
    },
  },
};

const noPostcodeRestaurant = {
  name: "Nando's Birmingham Broad Street",
  url: 'https://www.nandos.co.uk/restaurants/birmingham-broad-street',
  geo: {
    address: {
      streetAddress: '110 Broad Street',
      addressLocality: 'Birmingham',
      postalCode: '',
    },
  },
};

describe('RestaurantItem', () => {
  beforeEach(() => jest.clearAllMocks());

  it('displays the restaurant name', () => {
    const { getByText } = render(<RestaurantItem restaurant={fullRestaurant} />);
    expect(getByText("Nando's Selly Oak")).toBeTruthy();
  });

  it('displays the postal code', () => {
    const { getByText } = render(<RestaurantItem restaurant={fullRestaurant} />);
    expect(getByText('B29 6BJ')).toBeTruthy();
  });

  it('displays the street address when present', () => {
    const { getByText } = render(<RestaurantItem restaurant={fullRestaurant} />);
    expect(getByText('The Triangle, Bristol Road')).toBeTruthy();
  });

  it('does not display street address when it is empty', () => {
    const { queryByText } = render(<RestaurantItem restaurant={minimalRestaurant} />);
    expect(queryByText('The Triangle, Bristol Road')).toBeNull();
  });

  it('displays the address locality when present', () => {
    const { getByText } = render(<RestaurantItem restaurant={fullRestaurant} />);
    expect(getByText('Selly Oak')).toBeTruthy();
  });

  it('does not display address locality when it is empty', () => {
    const { queryByText } = render(<RestaurantItem restaurant={minimalRestaurant} />);
    expect(queryByText('Selly Oak')).toBeNull();
  });

  it('opens the restaurant URL when the name is pressed', () => {
    const { getByText } = render(<RestaurantItem restaurant={fullRestaurant} />);
    fireEvent.press(getByText("Nando's Selly Oak"));
    expect(mockOpenBrowserAsync).toHaveBeenCalledWith(fullRestaurant.url);
  });

  it('does not display the postal code when it is empty', () => {
    const { queryByText } = render(<RestaurantItem restaurant={noPostcodeRestaurant} />);
    expect(queryByText('B29 6BJ')).toBeNull();
  });

  it('does not show the map button when the postal code is empty', () => {
    const { queryByTestId } = render(<RestaurantItem restaurant={noPostcodeRestaurant} />);
    expect(queryByTestId('map-button')).toBeNull();
  });

  it('opens a maps URL with the restaurant name and postcode when the map button is pressed', () => {
    const { getByTestId } = render(<RestaurantItem restaurant={fullRestaurant} />);
    fireEvent.press(getByTestId('map-button'));
    expect(mockOpenURL).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent("Nando's Selly Oak"))
    );
    expect(mockOpenURL).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent('B29 6BJ'))
    );
  });
});
