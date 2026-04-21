import { render } from '@testing-library/react-native';
import LoadingView from '../LoadingView';

const mockUseLoadingView = jest.fn();

jest.mock('../useLoadingView', () => ({
  useLoadingView: () => mockUseLoadingView(),
}));

jest.mock('@/components/background/Background', () => 'Background');
jest.mock('@/components/loading-text/LoadingText', () => {
  const { Text } = jest.requireActual('react-native');
  function MockLoadingText({ text }: { text: string }) { return <Text>{text}</Text>; }
  return MockLoadingText;
});

const visibleState = {
  visible: true,
  phrase: 'Finding PERi',
  blockY: { interpolate: jest.fn() },
  containerOpacity: { interpolate: jest.fn() },
};

describe('LoadingView', () => {
  it('renders the loading phrase when visible', () => {
    mockUseLoadingView.mockReturnValue(visibleState);
    const { getByText } = render(<LoadingView />);
    expect(getByText('Finding PERi')).toBeTruthy();
  });

  it('renders nothing when not visible', () => {
    mockUseLoadingView.mockReturnValue({ ...visibleState, visible: false });
    const { toJSON } = render(<LoadingView />);
    expect(toJSON()).toBeNull();
  });
});
