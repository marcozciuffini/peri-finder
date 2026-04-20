import { fireEvent, render } from '@testing-library/react-native';
import NandosButton from '../NandosButton';

describe('NandosButton', () => {
  it('renders the label', () => {
    const { getByText } = render(<NandosButton label="Try Again" onPress={jest.fn()} />);
    expect(getByText("Try Again")).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<NandosButton label="Try Again" onPress={onPress} />);
    fireEvent.press(getByText('Try Again'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress before it is tapped', () => {
    const onPress = jest.fn();
    render(<NandosButton label="Try Again" onPress={onPress} />);
    expect(onPress).not.toHaveBeenCalled();
  });
});
