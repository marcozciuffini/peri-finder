import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import Background from '../Background';

jest.mock('expo-image', () => ({
  Image: 'Image',
}));

const mockColorScheme = jest.fn();
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: mockColorScheme,
}));

describe('Background', () => {
  it('renders the dark background image in dark mode', () => {
    mockColorScheme.mockReturnValue('dark');
    const { getByTestId } = render(<Background />);
    expect(getByTestId('dark-background')).toBeTruthy();
  });

  it('renders three decorative pieces in light mode', () => {
    mockColorScheme.mockReturnValue('light');
    const { getAllByTestId } = render(<Background />);
    expect(getAllByTestId('background-piece')).toHaveLength(3);
  });

  it('applies full opacity to pieces when loadingScreen is true', () => {
    mockColorScheme.mockReturnValue('light');
    const { getAllByTestId } = render(<Background loadingScreen />);
    getAllByTestId('background-piece').forEach(piece => {
      const style = StyleSheet.flatten(piece.props.style)
      expect(style.opacity).toBe(1);
    });
  });

  it('applies reduced opacity to pieces when loadingScreen is false', () => {
    mockColorScheme.mockReturnValue('light');
    const { getAllByTestId } = render(<Background />);
    getAllByTestId('background-piece').forEach(piece => {
      const style = StyleSheet.flatten(piece.props.style)
      expect(style.opacity).toBe(0.4);
    });
  });
});
