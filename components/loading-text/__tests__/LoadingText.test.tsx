import { act, render } from '@testing-library/react-native';
import LoadingText from '../LoadingText';

describe('LoadingText', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders the phrase text', () => {
    const { getByText } = render(<LoadingText text="Finding PERi" />);
    expect(getByText(/Finding PERi/)).toBeTruthy();
  });

  it('always renders all three dot characters', () => {
    const { getAllByText } = render(<LoadingText text="Finding PERi" />);
    expect(getAllByText('.')).toHaveLength(3);
  });

  it('dots are hidden on initial render', () => {
    const { getByTestId } = render(<LoadingText text="Finding PERi" />);
    expect(getByTestId('dot-1').props.style.color).toBe('#000000');
    expect(getByTestId('dot-2').props.style.color).toBe('#000000');
    expect(getByTestId('dot-3').props.style.color).toBe('#000000');
  });

  it('reveals one dot after 500ms', () => {
    const { getByTestId } = render(<LoadingText text="Finding PERi" />);
    act(() => { jest.advanceTimersByTime(500); });
    expect(getByTestId('dot-1').props.style.color).toBe('#FFFFFF');
    expect(getByTestId('dot-2').props.style.color).toBe('#000000');
    expect(getByTestId('dot-3').props.style.color).toBe('#000000');
  });

  it('reveals two dots after 1000ms', () => {
    const { getByTestId } = render(<LoadingText text="Finding PERi" />);
    act(() => { jest.advanceTimersByTime(1000); });
    expect(getByTestId('dot-1').props.style.color).toBe('#FFFFFF');
    expect(getByTestId('dot-2').props.style.color).toBe('#FFFFFF');
    expect(getByTestId('dot-3').props.style.color).toBe('#000000');
  });

  it('reveals all three dots after 1500ms', () => {
    const { getByTestId } = render(<LoadingText text="Finding PERi" />);
    act(() => { jest.advanceTimersByTime(1500); });
    expect(getByTestId('dot-1').props.style.color).toBe('#FFFFFF');
    expect(getByTestId('dot-2').props.style.color).toBe('#FFFFFF');
    expect(getByTestId('dot-3').props.style.color).toBe('#FFFFFF');
  });

  it('resets all dots to hidden after 2000ms', () => {
    const { getByTestId } = render(<LoadingText text="Finding PERi" />);
    act(() => { jest.advanceTimersByTime(2000); });
    expect(getByTestId('dot-1').props.style.color).toBe('#000000');
    expect(getByTestId('dot-2').props.style.color).toBe('#000000');
    expect(getByTestId('dot-3').props.style.color).toBe('#000000');
  });

  it('clears the interval on unmount', () => {
    const clearSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<LoadingText text="Finding PERi" />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
