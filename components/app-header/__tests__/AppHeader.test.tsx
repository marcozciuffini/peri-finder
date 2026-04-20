import { render } from '@testing-library/react-native';
import AppHeader from '../AppHeader';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 34, bottom: 34, left: 0, right: 0 }),
}));

describe('AppHeader', () => {
  it('renders the title', () => {
    const { getByText } = render(<AppHeader title="PERi Finder" />);
    expect(getByText('PERi Finder')).toBeTruthy();
  });

  it('renders the subtitle when provided', () => {
    const { getByText } = render(<AppHeader title="PERi Finder" subtitle="v1.0.34" />);
    expect(getByText('v1.0.34')).toBeTruthy();
  });

  it('does not render a subtitle when not provided', () => {
    const { queryByText } = render(<AppHeader title="PERi Finder" />);
    expect(queryByText('v')).toBeNull();
  });
});
