import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import BrandedText from '../BrandedText';

describe('BrandedText', () => {
  it('renders the text content', () => {
    const { getByText } = render(<BrandedText>PERi Finder</BrandedText>);
    expect(getByText('PERi Finder')).toBeTruthy();
  });

  it('applies the NandosHand font family', () => {
    const { getByText } = render(<BrandedText>PERi Finder</BrandedText>);
    const style = StyleSheet.flatten(getByText('PERi Finder').props.style);
    expect(style.fontFamily).toBe('NandosHand');
  });

  it('merges custom styles without overriding the font family', () => {
    const { getByText } = render(
      <BrandedText style={{ fontSize: 24 }}>PERi Finder</BrandedText>
    );
    const style = StyleSheet.flatten(getByText('PERi Finder').props.style);
    expect(style.fontFamily).toBe('NandosHand');
    expect(style.fontSize).toBe(24);
  });

  it('allows the font family to be overridden by a custom style', () => {
    const { getByText } = render(
      <BrandedText style={{ fontFamily: 'Barlow' }}>PERi Finder</BrandedText>
    );
    const style = StyleSheet.flatten(getByText('PERi Finder').props.style);
    expect(style.fontFamily).toBe('Barlow');
  });
});
