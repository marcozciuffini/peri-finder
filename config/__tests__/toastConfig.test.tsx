import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { styles } from '../styles/toastConfig.styles';
import { toastConfig } from '../toastConfig';

const mockBaseToast = jest.fn().mockReturnValue(null);
jest.mock('react-native-toast-message', () => ({
  BaseToast: (props: any) => mockBaseToast(props),
}));

const ErrorToast = toastConfig.error!;
const SuccessToast = toastConfig.success!;

const baseProps = {
  position: 'top' as const,
  type: 'error' as const,
  isVisible: true,
  show: jest.fn(),
  hide: jest.fn(),
  onPress: jest.fn(),
  props: {},
};

describe('toastConfig — error', () => {
  it('renders text1', () => {
    const { getByText } = render(<ErrorToast {...baseProps} text1="Something went wrong" />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('renders text2 when provided', () => {
    const { getByText } = render(
      <ErrorToast {...baseProps} text1="Something went wrong" text2="Please try again" />
    );
    expect(getByText('Please try again')).toBeTruthy();
  });

  it('does not render text2 when not provided', () => {
    const { queryByText } = render(<ErrorToast {...baseProps} text1="Something went wrong" />);
    expect(queryByText('Please try again')).toBeNull();
  });

  it('still applies the rotation transform to the container', () => {
    const { getByTestId } = render(<ErrorToast {...baseProps} text1="Something went wrong" />);
    const style = StyleSheet.flatten(getByTestId('error-toast-container').props.style);
    expect(style.transform).toEqual(expect.arrayContaining([{ rotate: '-2deg' }]));
  });
});

describe('toastConfig — success', () => {
  beforeEach(() => mockBaseToast.mockClear());

  it('passes contentContainerStyle to BaseToast', () => {
    render(<SuccessToast {...baseProps} text1="Done" />);
    expect(mockBaseToast).toHaveBeenCalledWith(
      expect.objectContaining({ contentContainerStyle: styles.content })
    );
  });

  it('passes text1Style to BaseToast', () => {
    render(<SuccessToast {...baseProps} text1="Done" />);
    expect(mockBaseToast).toHaveBeenCalledWith(
      expect.objectContaining({ text1Style: styles.text })
    );
  });

  it('passes text2Style to BaseToast', () => {
    render(<SuccessToast {...baseProps} text1="Done" />);
    expect(mockBaseToast).toHaveBeenCalledWith(
      expect.objectContaining({ text2Style: styles.subtext })
    );
  });
});
